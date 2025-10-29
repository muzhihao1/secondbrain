/**
 * Vault Store - 知识库状态管理和IndexedDB持久化
 *
 * 提供笔记的 CRUD 操作和文件夹管理
 */

import { writable, derived } from 'svelte/store';

// Database configuration
const DB_NAME = 'VNextVault';
const DB_VERSION = 1;
const NOTES_STORE = 'notes';
const FOLDERS_STORE = 'folders';

// Stores
export const folders = writable([
  { id: 1, name: '今日日志', icon: 'calendar', count: 0, path: 'journal' },
  { id: 2, name: '项目文件夹', icon: 'folder', count: 0, path: 'projects' },
  { id: 3, name: '想法收集', icon: 'lightbulb', count: 0, path: 'ideas' },
  { id: 4, name: '知识库', icon: 'book', count: 0, path: 'knowledge' }
]);

export const notes = writable([]);
export const currentNote = writable(null);
export const selectedFolder = writable(null);
export const loading = writable(false);
export const error = writable(null);

// Derived stores
export const filteredNotes = derived(
  [notes, selectedFolder],
  ([$notes, $selectedFolder]) => {
    if (!$selectedFolder) return $notes;
    return $notes.filter(note => note.folderId === $selectedFolder.id);
  }
);

/**
 * IndexedDB Manager
 */
class VaultDB {
  constructor() {
    this.db = null;
  }

  /**
   * Initialize database
   */
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        console.error('IndexedDB error:', request.error);
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        console.log('IndexedDB initialized successfully');
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create notes store
        if (!db.objectStoreNames.contains(NOTES_STORE)) {
          const notesStore = db.createObjectStore(NOTES_STORE, {
            keyPath: 'id',
            autoIncrement: true
          });

          notesStore.createIndex('folderId', 'folderId', { unique: false });
          notesStore.createIndex('title', 'title', { unique: false });
          notesStore.createIndex('updatedAt', 'updatedAt', { unique: false });
          notesStore.createIndex('createdAt', 'createdAt', { unique: false });

          console.log('Notes store created');
        }

        // Create folders store
        if (!db.objectStoreNames.contains(FOLDERS_STORE)) {
          const foldersStore = db.createObjectStore(FOLDERS_STORE, {
            keyPath: 'id',
            autoIncrement: true
          });

          foldersStore.createIndex('name', 'name', { unique: false });

          console.log('Folders store created');
        }
      };
    });
  }

  /**
   * Create a new note
   */
  async createNote(note) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([NOTES_STORE], 'readwrite');
      const store = transaction.objectStore(NOTES_STORE);

      const noteData = {
        ...note,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      const request = store.add(noteData);

      request.onsuccess = () => {
        noteData.id = request.result;
        console.log('Note created:', noteData.id);
        resolve(noteData);
      };

      request.onerror = () => {
        console.error('Error creating note:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Get a note by ID
   */
  async getNote(id) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([NOTES_STORE], 'readonly');
      const store = transaction.objectStore(NOTES_STORE);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        console.error('Error getting note:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Get all notes
   */
  async getAllNotes() {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([NOTES_STORE], 'readonly');
      const store = transaction.objectStore(NOTES_STORE);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        console.error('Error getting all notes:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Update a note
   */
  async updateNote(id, updates) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([NOTES_STORE], 'readwrite');
      const store = transaction.objectStore(NOTES_STORE);
      const getRequest = store.get(id);

      getRequest.onsuccess = () => {
        const note = getRequest.result;

        if (!note) {
          reject(new Error('Note not found'));
          return;
        }

        const updated = {
          ...note,
          ...updates,
          updatedAt: Date.now()
        };

        const putRequest = store.put(updated);

        putRequest.onsuccess = () => {
          console.log('Note updated:', id);
          resolve(updated);
        };

        putRequest.onerror = () => {
          console.error('Error updating note:', putRequest.error);
          reject(putRequest.error);
        };
      };

      getRequest.onerror = () => {
        console.error('Error getting note for update:', getRequest.error);
        reject(getRequest.error);
      };
    });
  }

  /**
   * Delete a note
   */
  async deleteNote(id) {
    if (!this.db) await this.init();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([NOTES_STORE], 'readwrite');
      const store = transaction.objectStore(NOTES_STORE);
      const request = store.delete(id);

      request.onsuccess = () => {
        console.log('Note deleted:', id);
        resolve();
      };

      request.onerror = () => {
        console.error('Error deleting note:', request.error);
        reject(request.error);
      };
    });
  }

  /**
   * Search notes by title
   */
  async searchNotes(query) {
    if (!this.db) await this.init();

    const allNotes = await this.getAllNotes();

    if (!query || query.trim() === '') {
      return allNotes;
    }

    const lowercaseQuery = query.toLowerCase();
    return allNotes.filter(note =>
      note.title?.toLowerCase().includes(lowercaseQuery) ||
      note.content?.toLowerCase().includes(lowercaseQuery)
    );
  }
}

// Export singleton instance
export const vaultDB = new VaultDB();

/**
 * Store Actions
 */
export const vaultActions = {
  /**
   * Load all notes from IndexedDB
   */
  async loadNotes() {
    loading.set(true);
    error.set(null);

    try {
      const allNotes = await vaultDB.getAllNotes();
      notes.set(allNotes);

      // Update folder counts
      folders.update($folders => {
        return $folders.map(folder => ({
          ...folder,
          count: allNotes.filter(note => note.folderId === folder.id).length
        }));
      });

      console.log('Loaded notes:', allNotes.length);
    } catch (err) {
      console.error('Failed to load notes:', err);
      error.set(err.message);
    } finally {
      loading.set(false);
    }
  },

  /**
   * Create a new note
   */
  async createNote(noteData) {
    loading.set(true);
    error.set(null);

    try {
      const newNote = await vaultDB.createNote(noteData);

      notes.update($notes => [...$notes, newNote]);
      currentNote.set(newNote);

      // Update folder count
      if (newNote.folderId) {
        folders.update($folders => {
          return $folders.map(folder =>
            folder.id === newNote.folderId
              ? { ...folder, count: folder.count + 1 }
              : folder
          );
        });
      }

      console.log('Note created successfully');
      return newNote;
    } catch (err) {
      console.error('Failed to create note:', err);
      error.set(err.message);
      throw err;
    } finally {
      loading.set(false);
    }
  },

  /**
   * Update an existing note
   */
  async updateNote(id, updates) {
    loading.set(true);
    error.set(null);

    try {
      const updated = await vaultDB.updateNote(id, updates);

      notes.update($notes => {
        return $notes.map(note => note.id === id ? updated : note);
      });

      // Update current note if it's the one being edited
      currentNote.update($current => {
        return $current && $current.id === id ? updated : $current;
      });

      console.log('Note updated successfully');
      return updated;
    } catch (err) {
      console.error('Failed to update note:', err);
      error.set(err.message);
      throw err;
    } finally {
      loading.set(false);
    }
  },

  /**
   * Delete a note
   */
  async deleteNote(id) {
    loading.set(true);
    error.set(null);

    try {
      await vaultDB.deleteNote(id);

      // Get folder ID before removing
      let deletedFolderId;
      notes.update($notes => {
        const note = $notes.find(n => n.id === id);
        deletedFolderId = note?.folderId;
        return $notes.filter(n => n.id !== id);
      });

      // Update folder count
      if (deletedFolderId) {
        folders.update($folders => {
          return $folders.map(folder =>
            folder.id === deletedFolderId
              ? { ...folder, count: Math.max(0, folder.count - 1) }
              : folder
          );
        });
      }

      // Clear current note if it was deleted
      currentNote.update($current => {
        return $current && $current.id === id ? null : $current;
      });

      console.log('Note deleted successfully');
    } catch (err) {
      console.error('Failed to delete note:', err);
      error.set(err.message);
      throw err;
    } finally {
      loading.set(false);
    }
  },

  /**
   * Select a note for viewing/editing
   */
  selectNote(note) {
    currentNote.set(note);
  },

  /**
   * Select a folder
   */
  selectFolder(folder) {
    selectedFolder.set(folder);
  },

  /**
   * Search notes
   */
  async searchNotes(query) {
    loading.set(true);
    error.set(null);

    try {
      const results = await vaultDB.searchNotes(query);
      notes.set(results);
      console.log('Search results:', results.length);
    } catch (err) {
      console.error('Search failed:', err);
      error.set(err.message);
    } finally {
      loading.set(false);
    }
  }
};

// Initialize on module load
if (typeof window !== 'undefined') {
  vaultDB.init().then(() => {
    console.log('Vault DB ready');
    vaultActions.loadNotes();
  }).catch(err => {
    console.error('Failed to initialize Vault DB:', err);
  });
}
