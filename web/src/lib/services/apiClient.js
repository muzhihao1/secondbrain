/**
 * API Client Service
 * Handles all HTTP communications with the FastAPI backend
 */

import {
	API_BASE_URL,
	API_TIMEOUT,
	MAX_RETRIES,
	ERROR_MESSAGES
} from '$utils/constants.js';
import { sleep } from '$utils/helpers.js';

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
		// Check if online
		if (!navigator.onLine) {
			throw new Error('OFFLINE');
		}

		// Setup timeout controller
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), this.timeout);

		// Retry logic with exponential backoff
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

				// Don't retry on abort (timeout)
				if (error.name === 'AbortError') {
					throw new Error('TIMEOUT');
				}

				// Don't retry offline errors
				if (error.message === 'OFFLINE') {
					throw error;
				}

				// Retry on network errors
				if (attempt === this.maxRetries - 1) {
					throw error;
				}

				// Exponential backoff
				await sleep(1000 * Math.pow(2, attempt));
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
		return this._request('/api/capture', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
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
		formData.append('audio', audioBlob, 'recording.webm');

		return this._request('/api/capture/voice', {
			method: 'POST',
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
		return this._request('/api/stats/type-distribution');
	}

	/**
	 * GET /api/stats/tags - Get tag statistics
	 * @returns {Promise<Array>} Tag data
	 */
	async getTags() {
		return this._request('/api/stats/tags');
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
		return this._request('/api/health');
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
			console.error('Failed to fetch dashboard stats:', error);
			throw error;
		}
	}
}

// Export singleton instance
export const apiClient = new APIClient();

// Export class for testing
export { APIClient };
