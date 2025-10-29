/**
 * Sync Store
 * Manages online/offline state and synchronization
 */

import { writable, derived } from 'svelte/store';
import { dbService } from '$services/dbService.js';

function createSyncStore() {
	const { subscribe, set, update } = writable({
		online: navigator.onLine,
		syncing: false,
		lastSyncTime: null,
		pendingCount: 0
	});

	// Listen for online/offline events
	if (typeof window !== 'undefined') {
		window.addEventListener('online', () => {
			console.log('Network: Online');
			update((s) => ({ ...s, online: true }));
			// Trigger auto-sync when coming online
			autoSync();
		});

		window.addEventListener('offline', () => {
			console.log('Network: Offline');
			update((s) => ({ ...s, online: false }));
		});
	}

	// Auto-sync function
	async function autoSync() {
		try {
			const stats = await dbService.getStats();
			if (stats.unsynced > 0) {
				console.log(`Auto-syncing ${stats.unsynced} unsynced captures`);
				// Import captureStore dynamically to avoid circular dependency
				const { captureStore } = await import('./captureStore.js');
				await captureStore.syncOfflineCaptures();
			}
		} catch (error) {
			console.error('Auto-sync error:', error);
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
				console.error('Failed to refresh pending count:', error);
			}
		},

		/**
		 * Manual sync trigger
		 */
		async manualSync() {
			const { captureStore } = await import('./captureStore.js');
			await captureStore.syncOfflineCaptures();
		}
	};
}

export const syncStore = createSyncStore();

// Derived store: Is app offline?
export const isOffline = derived(syncStore, ($syncStore) => !$syncStore.online);

// Derived store: Has pending syncs?
export const hasPendingSync = derived(syncStore, ($syncStore) => $syncStore.pendingCount > 0);
