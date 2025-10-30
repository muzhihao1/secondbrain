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

				// Use cursor to handle records with missing 'synced' field
				// This is safer than IDBKeyRange.only(false) which fails on undefined values
				let unsyncedCount = 0;
				const cursorRequest = objectStore.openCursor();

				cursorRequest.onsuccess = (event) => {
					const cursor = event.target.result;
					if (cursor) {
						// Count as unsynced if synced is false or undefined
						if (cursor.value.synced !== true) {
							unsyncedCount++;
						}
						cursor.continue();
					} else {
						// Done counting
						resolve({
							total,
							unsynced: unsyncedCount,
							synced: total - unsyncedCount
						});
					}
				};

				cursorRequest.onerror = () => {
					console.error('Failed to count unsynced items:', cursorRequest.error);
					reject(cursorRequest.error);
				};
			};

			countRequest.onerror = () => {
				console.error('Failed to get stats:', countRequest.error);
				reject(countRequest.error);
			};
		});
	}

	/**
	 * Generic get method for any object store
	 * @param {string} storeName - Object store name (e.g., 'taskCache', 'noteCache')
	 * @param {string} key - Key to retrieve
	 * @returns {Promise<any>} Value associated with the key
	 */
	async get(storeName, key) {
		if (!this.db) {
			await this.init();
		}

		return new Promise((resolve, reject) => {
			// Ensure store exists
			if (!this.db.objectStoreNames.contains(storeName)) {
				console.warn(`[DBService] Store '${storeName}' does not exist, creating it...`);
				// Store doesn't exist, need to create it via version upgrade
				this.db.close();
				this.dbVersion++;

				const request = indexedDB.open(this.dbName, this.dbVersion);

				request.onupgradeneeded = (event) => {
					const db = event.target.result;
					if (!db.objectStoreNames.contains(storeName)) {
						db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: false });
					}
				};

				request.onsuccess = () => {
					this.db = request.result;
					// Try get again
					const transaction = this.db.transaction([storeName], 'readonly');
					const objectStore = transaction.objectStore(storeName);
					const getRequest = objectStore.get(key);

					getRequest.onsuccess = () => resolve(getRequest.result);
					getRequest.onerror = () => reject(getRequest.error);
				};

				request.onerror = () => reject(request.error);
				return;
			}

			const transaction = this.db.transaction([storeName], 'readonly');
			const objectStore = transaction.objectStore(storeName);
			const request = objectStore.get(key);

			request.onsuccess = () => {
				resolve(request.result);
			};

			request.onerror = () => {
				console.error(`[DBService] Failed to get key '${key}' from store '${storeName}':`, request.error);
				reject(request.error);
			};
		});
	}

	/**
	 * Generic set method for any object store
	 * @param {string} storeName - Object store name (e.g., 'taskCache', 'noteCache')
	 * @param {string} key - Key to store
	 * @param {any} value - Value to store
	 * @returns {Promise<void>}
	 */
	async set(storeName, key, value) {
		if (!this.db) {
			await this.init();
		}

		return new Promise((resolve, reject) => {
			// Ensure store exists
			if (!this.db.objectStoreNames.contains(storeName)) {
				console.warn(`[DBService] Store '${storeName}' does not exist, creating it...`);
				// Store doesn't exist, need to create it via version upgrade
				this.db.close();
				this.dbVersion++;

				const request = indexedDB.open(this.dbName, this.dbVersion);

				request.onupgradeneeded = (event) => {
					const db = event.target.result;
					if (!db.objectStoreNames.contains(storeName)) {
						db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: false });
					}
				};

				request.onsuccess = () => {
					this.db = request.result;
					// Try set again
					const transaction = this.db.transaction([storeName], 'readwrite');
					const objectStore = transaction.objectStore(storeName);
					const putRequest = objectStore.put({ id: key, ...value });

					putRequest.onsuccess = () => resolve();
					putRequest.onerror = () => reject(putRequest.error);
				};

				request.onerror = () => reject(request.error);
				return;
			}

			const transaction = this.db.transaction([storeName], 'readwrite');
			const objectStore = transaction.objectStore(storeName);

			// Store value with key as 'id' field
			const record = { id: key, ...value };
			const request = objectStore.put(record);

			request.onsuccess = () => {
				console.log(`[DBService] Stored key '${key}' in store '${storeName}'`);
				resolve();
			};

			request.onerror = () => {
				console.error(`[DBService] Failed to set key '${key}' in store '${storeName}':`, request.error);
				reject(request.error);
			};
		});
	}

	/**
	 * Delete a key from any object store
	 * @param {string} storeName - Object store name
	 * @param {string} key - Key to delete
	 * @returns {Promise<void>}
	 */
	async delete(storeName, key) {
		if (!this.db) {
			await this.init();
		}

		return new Promise((resolve, reject) => {
			if (!this.db.objectStoreNames.contains(storeName)) {
				console.warn(`[DBService] Store '${storeName}' does not exist`);
				resolve(); // Not an error, key doesn't exist anyway
				return;
			}

			const transaction = this.db.transaction([storeName], 'readwrite');
			const objectStore = transaction.objectStore(storeName);
			const request = objectStore.delete(key);

			request.onsuccess = () => {
				console.log(`[DBService] Deleted key '${key}' from store '${storeName}'`);
				resolve();
			};

			request.onerror = () => {
				console.error(`[DBService] Failed to delete key '${key}' from store '${storeName}':`, request.error);
				reject(request.error);
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
