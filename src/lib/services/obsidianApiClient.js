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
			headers: {
				'Content-Type': 'text/markdown'  // Override to send markdown text
			},
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
	 *
	 * Saves to 00_Capture/Inbox/ as per Palantir Foundry five-layer architecture:
	 * - 00_Capture/Inbox/ is for quick temporary notes and ideas
	 * - Files should be processed and moved to other layers weekly
	 *
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

			// Use 00_Capture/Inbox as default folder (Palantir Foundry architecture)
			// This is the entry point for all quick captures
			const folder = '00_Capture/Inbox';

			// Create filename
			const filename = `${dateStr}_${timeStr}_quick-capture.md`;
			const path = `${folder}/${filename}`;

			// Format content as markdown with frontmatter
			const markdown = `---
created: ${timestamp.toISOString()}
type: quick-capture
input_type: ${data.input_type || 'text'}
tags: [quick-capture, inbox]
status: unprocessed
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
	 * Aggregates notes from multiple sources in the Palantir Foundry architecture:
	 * - 00_Capture/Inbox: Quick captures
	 * - 01_Periodic/Daily: Daily journal entries
	 *
	 * @param {Object} params - Query parameters
	 * @returns {Promise<Array>} Timeline entries
	 */
	async getTimeline(params = {}) {
		try {
			// Aggregate files from multiple locations
			const locations = [
				'00_Capture/Inbox',      // Quick captures
				'01_Periodic/Daily'      // Daily journal entries
			];

			let allFiles = [];

			// Fetch files from each location
			for (const location of locations) {
				try {
					const files = await this.listFiles(location);
					if (files && Array.isArray(files.files)) {
						allFiles = allFiles.concat(
							files.files
								.filter(f => typeof f === 'string' && f.endsWith('.md'))
								.map(f => ({ path: `${location}/${f}`, location }))
						);
					}
				} catch (error) {
					console.warn(`Failed to fetch files from ${location}:`, error);
					// Continue with other locations
				}
			}

			// Sort by filename (which includes date) and limit
			const limit = params.limit || 50;
			const sorted = allFiles
				.sort((a, b) => b.path.localeCompare(a.path)) // Reverse chronological
				.slice(0, limit);

			return {
				items: sorted.map(({ path, location }) => ({
					file_path: path,
					title: path.split('/').pop().replace('.md', ''),
					created: path.match(/\d{4}-\d{2}-\d{2}/)?.[0] || 'Unknown',
					location
				})),
				total: sorted.length
			};

		} catch (error) {
			console.error('Get timeline failed:', error);
			return { items: [], total: 0 };
		}
	}

	/**
	 * Transcribe audio to text without saving
	 * Uses SvelteKit API endpoint for server-side transcription
	 * @param {Blob} audioBlob - Audio file blob
	 * @returns {Promise<Object>} Transcription result with text and metadata
	 */
	async transcribeAudio(audioBlob) {
		try {
			console.log('[ObsidianAPI] Sending audio to transcription endpoint:', {
				size: `${Math.round(audioBlob.size / 1024)}KB`,
				type: audioBlob.type
			});

			// Call SvelteKit API endpoint for server-side transcription
			// This avoids CORS issues and protects API keys
			const response = await fetch('/api/transcribe', {
				method: 'POST',
				body: audioBlob,
				headers: {
					'Content-Type': audioBlob.type || 'audio/webm'
				}
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({ message: response.statusText }));
				throw new Error(errorData.message || `Transcription failed: ${response.statusText}`);
			}

			const result = await response.json();

			console.log('[ObsidianAPI] Transcription successful:', {
				provider: result.provider,
				model: result.model,
				textLength: result.text.length,
				language: result.metadata?.language
			});

			return {
				text: result.text,
				provider: result.provider,
				model: result.model,
				metadata: result.metadata
			};

		} catch (error) {
			console.error('[ObsidianAPI] Transcription failed:', error);
			throw error;
		}
	}

	/**
	 * Capture voice recording, transcribe and save to Obsidian
	 * @deprecated Use transcribeAudio() + capture() for unified save flow
	 * @param {Blob} audioBlob - Audio file blob
	 * @returns {Promise<Object>} Response with transcribed text
	 */
	async captureVoice(audioBlob) {
		try {
			// Transcribe audio
			const transcriptionResult = await this.transcribeAudio(audioBlob);

			// Save transcribed text to Obsidian
			console.log('[ObsidianAPI] Attempting to save to Obsidian...');

			const saveResult = await this.capture({
				content: transcriptionResult.text,
				input_type: 'voice',
				metadata: {
					transcription: {
						provider: transcriptionResult.provider,
						model: transcriptionResult.model,
						language: transcriptionResult.metadata?.language,
						duration: transcriptionResult.metadata?.duration
					}
				}
			});

			console.log('[ObsidianAPI] Save to Obsidian result:', saveResult);
			return saveResult;

		} catch (error) {
			console.error('[ObsidianAPI] Voice capture failed:', error);

			// Graceful degradation: save audio metadata reference
			const timestamp = new Date();
			const fallbackContent = `🎤 语音记录 (转录失败)

> ⚠️ 语音转文字失败: ${error.message}
>
> 可能原因:
> - 转录服务未配置或不可用
> - 音频格式不支持
> - 网络连接问题

**录制时间**: ${timestamp.toLocaleString('zh-CN')}
**文件大小**: ${Math.round(audioBlob.size / 1024)} KB
**音频格式**: ${audioBlob.type}

---
*配置说明:*
1. 设置 PUBLIC_VOICE_API_URL 环境变量指向 Cloudflare Workers AI
2. 或设置 OPENAI_API_KEY 使用 OpenAI Whisper API
`;

			return await this.capture({
				content: fallbackContent,
				input_type: 'voice',
				metadata: {
					error: error.message,
					audioSize: audioBlob.size,
					audioType: audioBlob.type
				}
			});
		}
	}

	/**
	 * Transcribe audio using Web Speech API (fallback method)
	 * @private
	 * @param {Blob} audioBlob - Audio file blob
	 * @returns {Promise<string>} Transcribed text
	 */
	async _transcribeWithWebSpeech(audioBlob) {
		return new Promise((resolve, reject) => {
			// Check browser support
			const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

			if (!SpeechRecognition) {
				reject(new Error('浏览器不支持语音识别。请使用 Chrome 浏览器或配置 Cloudflare Workers AI。'));
				return;
			}

			// Create audio element to play the recorded audio
			const audioUrl = URL.createObjectURL(audioBlob);
			const audio = new Audio(audioUrl);

			// Initialize speech recognition
			const recognition = new SpeechRecognition();
			recognition.lang = 'zh-CN'; // Chinese language
			recognition.continuous = true;
			recognition.interimResults = false;

			let transcript = '';

			recognition.onresult = (event) => {
				for (let i = event.resultIndex; i < event.results.length; i++) {
					if (event.results[i].isFinal) {
						transcript += event.results[i][0].transcript + ' ';
					}
				}
			};

			recognition.onerror = (event) => {
				URL.revokeObjectURL(audioUrl);
				reject(new Error(`语音识别失败: ${event.error}`));
			};

			recognition.onend = () => {
				URL.revokeObjectURL(audioUrl);
				if (transcript.trim()) {
					resolve(transcript.trim());
				} else {
					reject(new Error('未识别到语音内容'));
				}
			};

			// Note: Web Speech API works with live microphone, not pre-recorded audio
			// This is a limitation. For proper transcription, use Cloudflare Workers AI
			reject(new Error('Web Speech API 仅支持实时语音识别,不支持预录音频。请配置 Cloudflare Workers AI。'));
		});
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
