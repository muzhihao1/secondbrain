/**
 * IndexedDB Service
 * Handles local data persistence for offline support
 */

import { DB_NAME, DB_VERSION, STORE_NAME } from '$utils/constants.js';
import { generateId } from '$utils/helpers.js';

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
				console.error('IndexedDB error:', request.error);
				reject(request.error);
			};

			request.onsuccess = () => {
				this.db = request.result;
				console.log('IndexedDB initialized successfully');
				resolve();
			};

			request.onupgradeneeded = (event) => {
				const db = event.target.result;

				// Create object store if it doesn't exist
				if (!db.objectStoreNames.contains(this.storeName)) {
					const objectStore = db.createObjectStore(this.storeName, {
						keyPath: 'id',
						autoIncrement: false
					});

					// Create indexes
					objectStore.createIndex('timestamp', 'timestamp', { unique: false });
					objectStore.createIndex('synced', 'synced', { unique: false });
					objectStore.createIndex('type', 'type', { unique: false });

					console.log('Object store created:', this.storeName);
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
			const transaction = this.db.transaction([this.storeName], 'readwrite');
			const objectStore = transaction.objectStore(this.storeName);
			const request = objectStore.add(record);

			request.onsuccess = () => {
				console.log('Capture added to IndexedDB:', record.id);
				resolve(record.id);
			};

			request.onerror = () => {
				console.error('Failed to add capture:', request.error);
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
			const transaction = this.db.transaction([this.storeName], 'readonly');
			const objectStore = transaction.objectStore(this.storeName);
			const index = objectStore.index('synced');
			const request = index.getAll(false);

			request.onsuccess = () => {
				console.log('Unsynced captures:', request.result.length);
				resolve(request.result);
			};

			request.onerror = () => {
				console.error('Failed to get unsynced captures:', request.error);
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
			const transaction = this.db.transaction([this.storeName], 'readwrite');
			const objectStore = transaction.objectStore(this.storeName);
			const getRequest = objectStore.get(id);

			getRequest.onsuccess = () => {
				const record = getRequest.result;
				if (record) {
					record.synced = true;
					record.syncedAt = Date.now();

					const updateRequest = objectStore.put(record);

					updateRequest.onsuccess = () => {
						console.log('Capture marked as synced:', id);
						resolve();
					};

					updateRequest.onerror = () => {
						console.error('Failed to mark as synced:', updateRequest.error);
						reject(updateRequest.error);
					};
				} else {
					console.warn('Record not found:', id);
					resolve();
				}
			};

			getRequest.onerror = () => {
				console.error('Failed to get record:', getRequest.error);
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
			const transaction = this.db.transaction([this.storeName], 'readonly');
			const objectStore = transaction.objectStore(this.storeName);
			const index = objectStore.index('timestamp');
			const request = index.openCursor(null, 'prev'); // Descending order

			const results = [];

			request.onsuccess = (event) => {
				const cursor = event.target.result;
				if (cursor && results.length < limit) {
					results.push(cursor.value);
					cursor.continue();
				} else {
					console.log('Retrieved captures from IndexedDB:', results.length);
					resolve(results);
				}
			};

			request.onerror = () => {
				console.error('Failed to get all captures:', request.error);
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
			const transaction = this.db.transaction([this.storeName], 'readwrite');
			const objectStore = transaction.objectStore(this.storeName);
			const request = objectStore.delete(id);

			request.onsuccess = () => {
				console.log('Capture deleted:', id);
				resolve();
			};

			request.onerror = () => {
				console.error('Failed to delete capture:', request.error);
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
			const transaction = this.db.transaction([this.storeName], 'readwrite');
			const objectStore = transaction.objectStore(this.storeName);
			const request = objectStore.clear();

			request.onsuccess = () => {
				console.log('All captures cleared from IndexedDB');
				resolve();
			};

			request.onerror = () => {
				console.error('Failed to clear captures:', request.error);
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
			const transaction = this.db.transaction([this.storeName], 'readonly');
			const objectStore = transaction.objectStore(this.storeName);
			const countRequest = objectStore.count();

			countRequest.onsuccess = () => {
				const total = countRequest.result;

				const syncedIndex = objectStore.index('synced');
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
				console.error('Failed to get stats:', countRequest.error);
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
			console.log('IndexedDB connection closed');
		}
	}
}

// Export singleton instance
export const dbService = new DBService();

// Export class for testing
export { DBService };
