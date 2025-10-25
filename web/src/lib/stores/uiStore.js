/**
 * UI Store
 * Manages UI state (toasts, modals, theme, etc.)
 */

import { writable } from 'svelte/store';
import { TOAST_DURATION } from '$utils/constants.js';
import { generateId } from '$utils/helpers.js';

function createUIStore() {
	const { subscribe, set, update } = writable({
		toasts: [],
		showInstallPrompt: false,
		theme: 'dark', // dark | light
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
		showToast(message, type = 'info', duration = TOAST_DURATION) {
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

			// Auto-remove after duration
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
				theme: s.theme === 'dark' ? 'light' : 'dark'
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

export const uiStore = createUIStore();
