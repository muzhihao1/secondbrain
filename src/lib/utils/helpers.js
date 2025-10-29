/**
 * Utility helper functions
 */

/**
 * Format timestamp to human-readable date
 * @param {number|string} timestamp - Unix timestamp or ISO string
 * @returns {string} Formatted date string
 */
export function formatDate(timestamp) {
	const date = new Date(timestamp);
	const now = new Date();
	const diffMs = now - date;
	const diffMins = Math.floor(diffMs / 60000);
	const diffHours = Math.floor(diffMs / 3600000);
	const diffDays = Math.floor(diffMs / 86400000);

	if (diffMins < 1) return '刚刚';
	if (diffMins < 60) return `${diffMins}分钟前`;
	if (diffHours < 24) return `${diffHours}小时前`;
	if (diffDays < 7) return `${diffDays}天前`;

	return date.toLocaleDateString('zh-CN', {
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	});
}

/**
 * Format timestamp to time only
 * @param {number|string} timestamp - Unix timestamp or ISO string
 * @returns {string} Formatted time string
 */
export function formatTime(timestamp) {
	const date = new Date(timestamp);
	return date.toLocaleTimeString('zh-CN', {
		hour: '2-digit',
		minute: '2-digit'
	});
}

/**
 * Debounce function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text with ellipsis
 */
export function truncate(text, maxLength = 100) {
	if (!text) return '';
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength) + '...';
}

/**
 * Check if device is online
 * @returns {boolean} Online status
 */
export function isOnline() {
	return navigator.onLine;
}

/**
 * Get device type
 * @returns {string} 'mobile' | 'tablet' | 'desktop'
 */
export function getDeviceType() {
	const width = window.innerWidth;
	if (width < 768) return 'mobile';
	if (width < 1024) return 'tablet';
	return 'desktop';
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (error) {
		console.error('Failed to copy:', error);
		return false;
	}
}

/**
 * Download data as file
 * @param {string} data - Data to download
 * @param {string} filename - File name
 * @param {string} type - MIME type
 */
export function downloadFile(data, filename, type = 'text/plain') {
	const blob = new Blob([data], { type });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	a.click();
	window.URL.revokeObjectURL(url);
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export function generateId() {
	return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export function formatFileSize(bytes) {
	if (bytes === 0) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Sleep/delay function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
export function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry async function with exponential backoff
 * @param {Function} fn - Async function to retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} delay - Initial delay in ms
 * @returns {Promise<any>} Function result
 */
export async function retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
	for (let i = 0; i < maxRetries; i++) {
		try {
			return await fn();
		} catch (error) {
			if (i === maxRetries - 1) throw error;
			await sleep(delay * Math.pow(2, i));
		}
	}
}
