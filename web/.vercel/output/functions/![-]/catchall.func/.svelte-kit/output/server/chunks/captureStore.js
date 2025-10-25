import { w as writable, d as derived } from "./index.js";
import { A as API_BASE_URL, a as API_TIMEOUT, M as MAX_RETRIES, b as sleep, d as dbService, s as syncStore, u as uiStore, S as SUCCESS_MESSAGES, E as ERROR_MESSAGES } from "./syncStore.js";
class APIClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.timeout = API_TIMEOUT;
    this.maxRetries = MAX_RETRIES;
  }
  /**
   * Generic request method with retry logic and timeout
   * @private
   */
  async _request(endpoint, options = {}) {
    if (!navigator.onLine) {
      throw new Error("OFFLINE");
    }
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const response = await fetch(this.baseURL + endpoint, {
          ...options,
          signal: controller.signal,
          headers: {
            ...options.headers
          }
        });
        clearTimeout(timeoutId);
        if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          throw new Error(error.detail || `HTTP ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === "AbortError") {
          throw new Error("TIMEOUT");
        }
        if (error.message === "OFFLINE") {
          throw error;
        }
        if (attempt === this.maxRetries - 1) {
          throw error;
        }
        await sleep(1e3 * Math.pow(2, attempt));
      }
    }
  }
  /**
   * POST /api/capture - Text capture
   * @param {Object} data - Capture data
   * @param {string} data.content - Content to capture
   * @returns {Promise<Object>} API response with classification
   */
  async capture(data) {
    return this._request("/api/capture", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  }
  /**
   * POST /api/capture/voice - Voice capture
   * @param {Blob} audioBlob - Audio file blob
   * @returns {Promise<Object>} API response with transcription
   */
  async captureVoice(audioBlob) {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");
    return this._request("/api/capture/voice", {
      method: "POST",
      body: formData
      // Note: Don't set Content-Type for FormData
    });
  }
  /**
   * GET /api/timeline - Get timeline entries
   * @param {Object} params - Query parameters
   * @param {number} params.limit - Number of entries
   * @param {number} params.skip - Skip entries
   * @param {string} params.type - Filter by type
   * @returns {Promise<Array>} Timeline entries
   */
  async getTimeline(params = {}) {
    const query = new URLSearchParams(params);
    return this._request(`/api/timeline?${query}`);
  }
  /**
   * GET /api/stats/type-distribution - Get type distribution stats
   * @returns {Promise<Object>} Type distribution data
   */
  async getTypeDistribution() {
    return this._request("/api/stats/type-distribution");
  }
  /**
   * GET /api/stats/tags - Get tag statistics
   * @returns {Promise<Array>} Tag data
   */
  async getTags() {
    return this._request("/api/stats/tags");
  }
  /**
   * GET /api/stats/recent-activity - Get recent activity
   * @param {number} days - Number of days to fetch
   * @returns {Promise<Array>} Recent activity data
   */
  async getRecentActivity(days = 7) {
    return this._request(`/api/stats/recent-activity?days=${days}`);
  }
  /**
   * GET /api/search - Search captures
   * @param {string} query - Search query
   * @returns {Promise<Array>} Search results
   */
  async search(query) {
    const params = new URLSearchParams({ q: query });
    return this._request(`/api/search?${params}`);
  }
  /**
   * GET /api/health - Health check
   * @returns {Promise<Object>} Health status
   */
  async health() {
    return this._request("/api/health");
  }
  /**
   * Get all dashboard stats in parallel
   * @returns {Promise<Object>} All stats combined
   */
  async getDashboardStats() {
    try {
      const [typeDistribution, tags, recentActivity] = await Promise.all([
        this.getTypeDistribution(),
        this.getTags(),
        this.getRecentActivity()
      ]);
      return {
        typeDistribution,
        tags,
        recentActivity
      };
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
      throw error;
    }
  }
}
const apiClient = new APIClient();
function createCaptureStore() {
  const { subscribe, set, update } = writable({
    captures: [],
    loading: false,
    error: null
  });
  return {
    subscribe,
    /**
     * Quick text capture
     * @param {string} content - Text content to capture
     * @returns {Promise<Object>} Capture result
     */
    async capture(content) {
      if (!content || content.trim() === "") {
        uiStore.showToast("请输入内容", "error");
        return;
      }
      update((s) => ({ ...s, loading: true, error: null }));
      try {
        const result = await apiClient.capture({ content });
        update((s) => ({
          ...s,
          loading: false,
          captures: [result, ...s.captures]
        }));
        uiStore.showToast(SUCCESS_MESSAGES.CAPTURE_SAVED, "success");
        return result;
      } catch (error) {
        console.error("Capture error:", error);
        if (error.message === "OFFLINE") {
          try {
            await dbService.addCapture({ content, type: "text" });
            update((s) => ({ ...s, loading: false }));
            uiStore.showToast(ERROR_MESSAGES.OFFLINE, "warning");
            syncStore.incrementPending();
            return { offline: true };
          } catch (dbError) {
            console.error("Failed to save offline:", dbError);
            update((s) => ({ ...s, loading: false, error: dbError.message }));
            uiStore.showToast("保存失败", "error");
            throw dbError;
          }
        }
        update((s) => ({ ...s, loading: false, error: error.message }));
        uiStore.showToast(ERROR_MESSAGES.API_ERROR, "error");
        throw error;
      }
    },
    /**
     * Voice capture
     * @param {Blob} audioBlob - Audio file blob
     * @returns {Promise<Object>} Capture result
     */
    async captureVoice(audioBlob) {
      update((s) => ({ ...s, loading: true, error: null }));
      try {
        const result = await apiClient.captureVoice(audioBlob);
        update((s) => ({
          ...s,
          loading: false,
          captures: [result, ...s.captures]
        }));
        uiStore.showToast(SUCCESS_MESSAGES.VOICE_CAPTURED, "success");
        return result;
      } catch (error) {
        console.error("Voice capture error:", error);
        update((s) => ({ ...s, loading: false, error: error.message }));
        uiStore.showToast("语音转录失败", "error");
        throw error;
      }
    },
    /**
     * Sync offline captures
     * @returns {Promise<void>}
     */
    async syncOfflineCaptures() {
      try {
        const unsyncedCaptures = await dbService.getUnsyncedCaptures();
        if (unsyncedCaptures.length === 0) {
          return;
        }
        syncStore.setSyncing(true);
        for (const capture of unsyncedCaptures) {
          try {
            await apiClient.capture({ content: capture.content });
            await dbService.markAsSynced(capture.id);
            syncStore.decrementPending();
          } catch (error) {
            console.error("Failed to sync capture:", capture.id, error);
          }
        }
        syncStore.setSyncing(false);
        syncStore.updateLastSyncTime();
        uiStore.showToast(SUCCESS_MESSAGES.SYNC_COMPLETE, "success");
      } catch (error) {
        console.error("Sync error:", error);
        syncStore.setSyncing(false);
      }
    },
    /**
     * Load captures (from API or IndexedDB)
     * @param {number} limit - Number of captures to load
     * @returns {Promise<void>}
     */
    async loadCaptures(limit = 50) {
      update((s) => ({ ...s, loading: true }));
      try {
        const captures = await apiClient.getTimeline({ limit });
        update((s) => ({ ...s, loading: false, captures }));
      } catch (error) {
        console.error("Failed to load from API:", error);
        try {
          const captures = await dbService.getAllCaptures(limit);
          update((s) => ({ ...s, loading: false, captures }));
        } catch (dbError) {
          console.error("Failed to load from IndexedDB:", dbError);
          update((s) => ({ ...s, loading: false, error: dbError.message }));
        }
      }
    },
    /**
     * Search captures
     * @param {string} query - Search query
     * @returns {Promise<Array>} Search results
     */
    async search(query) {
      if (!query || query.trim() === "") {
        return [];
      }
      try {
        const results = await apiClient.search(query);
        return results;
      } catch (error) {
        console.error("Search error:", error);
        return [];
      }
    },
    /**
     * Clear captures
     */
    clear() {
      set({ captures: [], loading: false, error: null });
    }
  };
}
const captureStore = createCaptureStore();
derived(captureStore, ($captureStore) => $captureStore.captures.length);
export {
  captureStore
};
