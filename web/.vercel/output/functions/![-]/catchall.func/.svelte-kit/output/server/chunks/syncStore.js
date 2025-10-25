import { w as writable, d as derived } from "./index.js";
const API_BASE_URL = "http://localhost:8000";
const API_TIMEOUT = 1e4;
const MAX_RETRIES = 3;
const DB_NAME = "QuickCaptureDB";
const DB_VERSION = 1;
const STORE_NAME = "captures";
const TOAST_DURATION = 3e3;
const ERROR_MESSAGES = {
  OFFLINE: "您当前处于离线状态，内容已保存到本地",
  NETWORK_ERROR: "网络连接失败，请稍后重试",
  PERMISSION_DENIED: "需要麦克风权限才能录音",
  RECORDING_ERROR: "录音失败，请检查麦克风设置",
  API_ERROR: "API请求失败，请稍后重试",
  TIMEOUT: "请求超时，请检查网络连接"
};
const SUCCESS_MESSAGES = {
  CAPTURE_SAVED: "✅ 想法已保存",
  VOICE_CAPTURED: "✅ 语音已转录并保存",
  SYNC_COMPLETE: "✅ 数据同步完成"
};
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function createUIStore() {
  const { subscribe, set, update } = writable({
    toasts: [],
    showInstallPrompt: false,
    theme: "dark",
    // dark | light
    sidebarOpen: false
  });
  return {
    subscribe,
    /**
     * Show a toast notification
     * @param {string} message - Toast message
     * @param {string} type - Toast type: success | error | warning | info
     * @param {number} duration - Duration in ms (default: 3000)
     */
    showToast(message, type = "info", duration = TOAST_DURATION) {
      const toast = {
        id: generateId(),
        message,
        type,
        timestamp: Date.now()
      };
      update((s) => ({
        ...s,
        toasts: [...s.toasts, toast]
      }));
      setTimeout(() => {
        update((s) => ({
          ...s,
          toasts: s.toasts.filter((t) => t.id !== toast.id)
        }));
      }, duration);
    },
    /**
     * Remove a specific toast
     * @param {string} id - Toast ID
     */
    removeToast(id) {
      update((s) => ({
        ...s,
        toasts: s.toasts.filter((t) => t.id !== id)
      }));
    },
    /**
     * Clear all toasts
     */
    clearToasts() {
      update((s) => ({ ...s, toasts: [] }));
    },
    /**
     * Show PWA install prompt
     */
    showInstallPromptDialog() {
      update((s) => ({ ...s, showInstallPrompt: true }));
    },
    /**
     * Hide PWA install prompt
     */
    hideInstallPromptDialog() {
      update((s) => ({ ...s, showInstallPrompt: false }));
    },
    /**
     * Toggle theme
     */
    toggleTheme() {
      update((s) => ({
        ...s,
        theme: s.theme === "dark" ? "light" : "dark"
      }));
    },
    /**
     * Set theme
     * @param {string} theme - Theme name
     */
    setTheme(theme) {
      update((s) => ({ ...s, theme }));
    },
    /**
     * Toggle sidebar
     */
    toggleSidebar() {
      update((s) => ({ ...s, sidebarOpen: !s.sidebarOpen }));
    },
    /**
     * Close sidebar
     */
    closeSidebar() {
      update((s) => ({ ...s, sidebarOpen: false }));
    }
  };
}
const uiStore = createUIStore();
class DBService {
  constructor() {
    this.db = null;
    this.dbName = DB_NAME;
    this.dbVersion = DB_VERSION;
    this.storeName = STORE_NAME;
  }
  /**
   * Initialize IndexedDB
   * @returns {Promise<void>}
   */
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);
      request.onerror = () => {
        console.error("IndexedDB error:", request.error);
        reject(request.error);
      };
      request.onsuccess = () => {
        this.db = request.result;
        console.log("IndexedDB initialized successfully");
        resolve();
      };
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const objectStore = db.createObjectStore(this.storeName, {
            keyPath: "id",
            autoIncrement: false
          });
          objectStore.createIndex("timestamp", "timestamp", { unique: false });
          objectStore.createIndex("synced", "synced", { unique: false });
          objectStore.createIndex("type", "type", { unique: false });
          console.log("Object store created:", this.storeName);
        }
      };
    });
  }
  /**
   * Add a capture to local storage
   * @param {Object} data - Capture data
   * @param {string} data.content - Capture content
   * @param {string} data.type - Capture type (optional)
   * @returns {Promise<string>} Record ID
   */
  async addCapture(data) {
    if (!this.db) {
      await this.init();
    }
    const record = {
      id: generateId(),
      ...data,
      timestamp: Date.now(),
      synced: false,
      offline: true
    };
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.add(record);
      request.onsuccess = () => {
        console.log("Capture added to IndexedDB:", record.id);
        resolve(record.id);
      };
      request.onerror = () => {
        console.error("Failed to add capture:", request.error);
        reject(request.error);
      };
    });
  }
  /**
   * Get all unsynced captures
   * @returns {Promise<Array>} Unsynced captures
   */
  async getUnsyncedCaptures() {
    if (!this.db) {
      await this.init();
    }
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const objectStore = transaction.objectStore(this.storeName);
      const index = objectStore.index("synced");
      const request = index.getAll(false);
      request.onsuccess = () => {
        console.log("Unsynced captures:", request.result.length);
        resolve(request.result);
      };
      request.onerror = () => {
        console.error("Failed to get unsynced captures:", request.error);
        reject(request.error);
      };
    });
  }
  /**
   * Mark a capture as synced
   * @param {string} id - Capture ID
   * @returns {Promise<void>}
   */
  async markAsSynced(id) {
    if (!this.db) {
      await this.init();
    }
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const objectStore = transaction.objectStore(this.storeName);
      const getRequest = objectStore.get(id);
      getRequest.onsuccess = () => {
        const record = getRequest.result;
        if (record) {
          record.synced = true;
          record.syncedAt = Date.now();
          const updateRequest = objectStore.put(record);
          updateRequest.onsuccess = () => {
            console.log("Capture marked as synced:", id);
            resolve();
          };
          updateRequest.onerror = () => {
            console.error("Failed to mark as synced:", updateRequest.error);
            reject(updateRequest.error);
          };
        } else {
          console.warn("Record not found:", id);
          resolve();
        }
      };
      getRequest.onerror = () => {
        console.error("Failed to get record:", getRequest.error);
        reject(getRequest.error);
      };
    });
  }
  /**
   * Get all captures (for local timeline)
   * @param {number} limit - Maximum number of records
   * @returns {Promise<Array>} Captures sorted by timestamp
   */
  async getAllCaptures(limit = 100) {
    if (!this.db) {
      await this.init();
    }
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const objectStore = transaction.objectStore(this.storeName);
      const index = objectStore.index("timestamp");
      const request = index.openCursor(null, "prev");
      const results = [];
      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor && results.length < limit) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          console.log("Retrieved captures from IndexedDB:", results.length);
          resolve(results);
        }
      };
      request.onerror = () => {
        console.error("Failed to get all captures:", request.error);
        reject(request.error);
      };
    });
  }
  /**
   * Delete a capture
   * @param {string} id - Capture ID
   * @returns {Promise<void>}
   */
  async deleteCapture(id) {
    if (!this.db) {
      await this.init();
    }
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.delete(id);
      request.onsuccess = () => {
        console.log("Capture deleted:", id);
        resolve();
      };
      request.onerror = () => {
        console.error("Failed to delete capture:", request.error);
        reject(request.error);
      };
    });
  }
  /**
   * Clear all data
   * @returns {Promise<void>}
   */
  async clearAll() {
    if (!this.db) {
      await this.init();
    }
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readwrite");
      const objectStore = transaction.objectStore(this.storeName);
      const request = objectStore.clear();
      request.onsuccess = () => {
        console.log("All captures cleared from IndexedDB");
        resolve();
      };
      request.onerror = () => {
        console.error("Failed to clear captures:", request.error);
        reject(request.error);
      };
    });
  }
  /**
   * Get database statistics
   * @returns {Promise<Object>} Database stats
   */
  async getStats() {
    if (!this.db) {
      await this.init();
    }
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], "readonly");
      const objectStore = transaction.objectStore(this.storeName);
      const countRequest = objectStore.count();
      countRequest.onsuccess = () => {
        const total = countRequest.result;
        const syncedIndex = objectStore.index("synced");
        const unsyncedRequest = syncedIndex.count(false);
        unsyncedRequest.onsuccess = () => {
          resolve({
            total,
            unsynced: unsyncedRequest.result,
            synced: total - unsyncedRequest.result
          });
        };
        unsyncedRequest.onerror = () => {
          reject(unsyncedRequest.error);
        };
      };
      countRequest.onerror = () => {
        console.error("Failed to get stats:", countRequest.error);
        reject(countRequest.error);
      };
    });
  }
  /**
   * Close database connection
   */
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
      console.log("IndexedDB connection closed");
    }
  }
}
const dbService = new DBService();
function createSyncStore() {
  const { subscribe, set, update } = writable({
    online: navigator.onLine,
    syncing: false,
    lastSyncTime: null,
    pendingCount: 0
  });
  if (typeof window !== "undefined") {
    window.addEventListener("online", () => {
      console.log("Network: Online");
      update((s) => ({ ...s, online: true }));
      autoSync();
    });
    window.addEventListener("offline", () => {
      console.log("Network: Offline");
      update((s) => ({ ...s, online: false }));
    });
  }
  async function autoSync() {
    try {
      const stats = await dbService.getStats();
      if (stats.unsynced > 0) {
        console.log(`Auto-syncing ${stats.unsynced} unsynced captures`);
        const { captureStore } = await import("./captureStore.js");
        await captureStore.syncOfflineCaptures();
      }
    } catch (error) {
      console.error("Auto-sync error:", error);
    }
  }
  return {
    subscribe,
    /**
     * Set syncing status
     * @param {boolean} value - Syncing status
     */
    setSyncing(value) {
      update((s) => ({ ...s, syncing: value }));
    },
    /**
     * Update last sync time
     */
    updateLastSyncTime() {
      update((s) => ({ ...s, lastSyncTime: Date.now() }));
    },
    /**
     * Increment pending count
     */
    incrementPending() {
      update((s) => ({ ...s, pendingCount: s.pendingCount + 1 }));
    },
    /**
     * Decrement pending count
     */
    decrementPending() {
      update((s) => ({ ...s, pendingCount: Math.max(0, s.pendingCount - 1) }));
    },
    /**
     * Set pending count
     * @param {number} count - Pending count
     */
    setPendingCount(count) {
      update((s) => ({ ...s, pendingCount: count }));
    },
    /**
     * Refresh pending count from database
     */
    async refreshPendingCount() {
      try {
        const stats = await dbService.getStats();
        update((s) => ({ ...s, pendingCount: stats.unsynced }));
      } catch (error) {
        console.error("Failed to refresh pending count:", error);
      }
    },
    /**
     * Manual sync trigger
     */
    async manualSync() {
      const { captureStore } = await import("./captureStore.js");
      await captureStore.syncOfflineCaptures();
    }
  };
}
const syncStore = createSyncStore();
derived(syncStore, ($syncStore) => !$syncStore.online);
const hasPendingSync = derived(syncStore, ($syncStore) => $syncStore.pendingCount > 0);
export {
  API_BASE_URL as A,
  ERROR_MESSAGES as E,
  MAX_RETRIES as M,
  SUCCESS_MESSAGES as S,
  API_TIMEOUT as a,
  sleep as b,
  dbService as d,
  hasPendingSync as h,
  syncStore as s,
  uiStore as u
};
