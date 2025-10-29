/**
 * Capture Store
 * Manages capture data and operations
 */

import { writable, derived, get } from 'svelte/store';
import { obsidianApiClient as apiClient } from '$services/obsidianApiClient.js';
import { dbService } from '$services/dbService.js';
import { syncStore } from './syncStore.js';
import { uiStore } from './uiStore.js';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '$utils/constants.js';

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
			if (!content || content.trim() === '') {
				uiStore.showToast('请输入内容', 'error');
				return;
			}

			update((s) => ({ ...s, loading: true, error: null }));

			try {
				// Try to save to server first
				const result = await apiClient.capture({ content });

				// Update local state
				update((s) => ({
					...s,
					loading: false,
					captures: [result, ...s.captures]
				}));

				uiStore.showToast(SUCCESS_MESSAGES.CAPTURE_SAVED, 'success');
				return result;
			} catch (error) {
				console.error('Capture error:', error);

				// If offline, save to local IndexedDB
				if (error.message === 'OFFLINE') {
					try {
						await dbService.addCapture({ content, type: 'text' });
						update((s) => ({ ...s, loading: false }));
						uiStore.showToast(ERROR_MESSAGES.OFFLINE, 'warning');
						syncStore.incrementPending();
						return { offline: true };
					} catch (dbError) {
						console.error('Failed to save offline:', dbError);
						update((s) => ({ ...s, loading: false, error: dbError.message }));
						uiStore.showToast('保存失败', 'error');
						throw dbError;
					}
				}

				update((s) => ({ ...s, loading: false, error: error.message }));
				uiStore.showToast(ERROR_MESSAGES.API_ERROR, 'error');
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

				uiStore.showToast(SUCCESS_MESSAGES.VOICE_CAPTURED, 'success');
				return result;
			} catch (error) {
				console.error('Voice capture error:', error);

				update((s) => ({ ...s, loading: false, error: error.message }));
				uiStore.showToast('语音转录失败', 'error');
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
						console.error('Failed to sync capture:', capture.id, error);
					}
				}

				syncStore.setSyncing(false);
				syncStore.updateLastSyncTime();
				uiStore.showToast(SUCCESS_MESSAGES.SYNC_COMPLETE, 'success');
			} catch (error) {
				console.error('Sync error:', error);
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
				// Try to load from API
				const captures = await apiClient.getTimeline({ limit });
				update((s) => ({ ...s, loading: false, captures }));
			} catch (error) {
				console.error('Failed to load from API:', error);

				// Fallback to IndexedDB
				try {
					const captures = await dbService.getAllCaptures(limit);
					update((s) => ({ ...s, loading: false, captures }));
				} catch (dbError) {
					console.error('Failed to load from IndexedDB:', dbError);
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
			if (!query || query.trim() === '') {
				return [];
			}

			try {
				const results = await apiClient.search(query);
				return results;
			} catch (error) {
				console.error('Search error:', error);
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

export const captureStore = createCaptureStore();

// Derived store: Total captures count
export const capturesCount = derived(captureStore, ($captureStore) => $captureStore.captures.length);
