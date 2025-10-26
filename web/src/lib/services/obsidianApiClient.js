/**
 * Obsidian Local REST API Client
 * Adapter for Obsidian Local REST API plugin
 * Docs: https://coddingtonbear.github.io/obsidian-local-rest-api/
 */

import {
	API_BASE_URL,
	API_KEY,
	API_TIMEOUT,
	MAX_RETRIES
} from '$utils/constants.js';
import { sleep } from '$utils/helpers.js';

class ObsidianAPIClient {
	constructor() {
		this.baseURL = API_BASE_URL;
		this.apiKey = API_KEY;
		this.timeout = API_TIMEOUT;
		this.maxRetries = MAX_RETRIES;
	}

	/**
	 * Generic request method with Obsidian REST API authentication
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
						'Authorization': `Bearer ${this.apiKey}`,
						'Content-Type': 'application/json',
						...options.headers
					}
				});

				clearTimeout(timeoutId);

				if (!response.ok) {
					const error = await response.text().catch(() => '');
					throw new Error(error || `HTTP ${response.status}`);
				}

				// Handle different response types
				const contentType = response.headers.get('content-type');
				if (contentType && contentType.includes('application/json')) {
					return await response.json();
				}
				return await response.text();

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
	 * Create a new note in Obsidian vault
	 * @param {string} content - Note content (markdown)
	 * @param {string} path - File path (e.g., "Daily_Operations/Logs/2025-10-25.md")
	 * @returns {Promise<Object>} Response with file path
	 */
	async createNote(content, path) {
		// Use PUT method to create/update file at specified path
		const response = await this._request(`/vault/${encodeURIComponent(path)}`, {
			method: 'PUT',
			body: content  // Send content directly as text, not JSON
		});

		return {
			success: true,
			file_path: path,
			message: '✅ 已保存到 Obsidian'
		};
	}

	/**
	 * Read note content from Obsidian vault
	 * @param {string} path - File path
	 * @returns {Promise<string>} Note content
	 */
	async readNote(path) {
		return await this._request(`/vault/${encodeURIComponent(path)}`, {
			method: 'GET'
		});
	}

	/**
	 * Update existing note
	 * @param {string} path - File path
	 * @param {string} content - New content
	 * @returns {Promise<Object>} Response
	 */
	async updateNote(path, content) {
		return await this._request(`/vault/${encodeURIComponent(path)}`, {
			method: 'PUT',
			body: JSON.stringify({ content })
		});
	}

	/**
	 * Delete note
	 * @param {string} path - File path
	 * @returns {Promise<Object>} Response
	 */
	async deleteNote(path) {
		return await this._request(`/vault/${encodeURIComponent(path)}`, {
			method: 'DELETE'
		});
	}

	/**
	 * List files in vault or directory
	 * @param {string} folder - Folder path (optional, defaults to root)
	 * @returns {Promise<Array>} List of files
	 */
	async listFiles(folder = '') {
		const endpoint = folder ? `/vault/${encodeURIComponent(folder)}/` : '/vault/';
		return await this._request(endpoint, {
			method: 'GET'
		});
	}

	/**
	 * Search notes in vault
	 * @param {string} query - Search query
	 * @returns {Promise<Array>} Search results
	 */
	async searchNotes(query) {
		return await this._request(`/search/?query=${encodeURIComponent(query)}`, {
			method: 'GET'
		});
	}

	/**
	 * Capture user input and save to appropriate location
	 * This is a high-level method that mimics the FastAPI capture endpoint
	 * @param {Object} data - Capture data
	 * @param {string} data.content - Content to capture
	 * @param {string} data.input_type - 'text' or 'voice'
	 * @returns {Promise<Object>} Response with file path
	 */
	async capture(data) {
		try {
			// Generate timestamp-based filename
			const timestamp = new Date();
			const dateStr = timestamp.toISOString().split('T')[0]; // YYYY-MM-DD
			const timeStr = timestamp.toTimeString().split(' ')[0].replace(/:/g, '-'); // HH-MM-SS

			// Determine folder based on content (简单规则)
			let folder = '01_Execution/Daily_Operations/Logs/Journal_Entries';

			// 简单的关键词匹配来决定文件夹
			const contentLower = data.content.toLowerCase();
			if (contentLower.includes('idea') || contentLower.includes('想法')) {
				folder = '01_Execution/Ideas';
			} else if (contentLower.includes('project') || contentLower.includes('项目')) {
				folder = '01_Execution/Projects';
			}

			// Create filename
			const filename = `${dateStr}_${timeStr}_quick-capture.md`;
			const path = `${folder}/${filename}`;

			// Format content as markdown with frontmatter
			const markdown = `---
created: ${timestamp.toISOString()}
type: quick-capture
input_type: ${data.input_type || 'text'}
tags: [quick-capture]
---

# Quick Capture

${data.content}
`;

			// Create the note
			await this.createNote(markdown, path);

			return {
				success: true,
				message: '✅ 已保存到 Obsidian',
				file_path: path,
				classification: {
					category: 'quick-capture',
					confidence: 1.0
				}
			};

		} catch (error) {
			console.error('Capture failed:', error);
			throw error;
		}
	}

	/**
	 * Get timeline of recent notes
	 * @param {Object} params - Query parameters
	 * @returns {Promise<Array>} Timeline entries
	 */
	async getTimeline(params = {}) {
		try {
			// List files from the logs directory
			const files = await this.listFiles('01_Execution/Daily_Operations/Logs/Journal_Entries');

			// Sort by name (which includes date) and limit
			const limit = params.limit || 50;
			const sorted = files
				.filter(f => f.endsWith('.md'))
				.sort()
				.reverse()
				.slice(0, limit);

			return {
				items: sorted.map(path => ({
					file_path: path,
					title: path.split('/').pop().replace('.md', ''),
					created: path.match(/\d{4}-\d{2}-\d{2}/)?.[0] || 'Unknown'
				})),
				total: sorted.length
			};

		} catch (error) {
			console.error('Get timeline failed:', error);
			return { items: [], total: 0 };
		}
	}

	/**
	 * Health check (check if plugin is accessible)
	 * @returns {Promise<Object>} Health status
	 */
	async health() {
		try {
			// Try to list root directory as health check
			await this.listFiles('');
			return {
				status: 'healthy',
				message: 'Obsidian Local REST API is accessible',
				timestamp: new Date().toISOString()
			};
		} catch (error) {
			return {
				status: 'unhealthy',
				message: error.message,
				timestamp: new Date().toISOString()
			};
		}
	}
}

// Export singleton instance
export const obsidianApiClient = new ObsidianAPIClient();

// Export class for testing
export { ObsidianAPIClient };
