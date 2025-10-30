/**
 * Vault Store - 知识库状态管理 (Obsidian Integration)
 *
 * Integrates with Obsidian REST API to provide real-time vault access.
 * Uses Palantir Foundry five-layer architecture for folder organization.
 */

import { writable, derived } from 'svelte/store';
import { obsidianApiClient } from '$services/obsidianApiClient.js';

/**
 * Palantir Foundry Folder Configuration
 * Maps Obsidian vault folders to display structure
 */
const FOUNDRY_FOLDERS = [
  {
    id: 'capture',
    name: '快速捕获',
    icon: 'inbox',
    path: '00_Capture/Inbox',
    description: '临时想法和快速记录'
  },
  {
    id: 'journal',
    name: '工作日志',
    icon: 'calendar',
    path: '01_Execution/Logs/Journal_Entries',
    description: '每日工作记录和任务'
  },
  {
    id: 'projects',
    name: '项目文档',
    icon: 'folder',
    path: '01_Execution/Projects',
    description: '项目规划和执行文档'
  },
  {
    id: 'knowledge',
    name: '知识库',
    icon: 'book',
    path: '03_Reference/Knowledge_Base',
    description: '长期参考资料和知识'
  },
  {
    id: 'standards',
    name: '标准规范',
    icon: 'file-check',
    path: '02_Standards',
    description: '流程规范和标准文档'
  }
];

// Stores
export const folders = writable([]);
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
 * Helper: Extract title from markdown content
 * @param {string} content - Markdown content
 * @returns {string} Title (first H1 or first line)
 */
function extractTitle(content) {
  if (!content) return '无标题笔记';

  // Try to find first H1 heading
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) return h1Match[1].trim();

  // Fallback to first non-empty line
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('---')) {
      return trimmed.substring(0, 50); // Max 50 chars
    }
  }

  return '无标题笔记';
}

/**
 * Helper: Parse file path to extract metadata
 * @param {string} filePath - Full file path
 * @param {string} folderPath - Folder base path
 * @returns {object} Metadata { id, name, ext, relativePath }
 */
function parseFilePath(filePath, folderPath) {
  const relativePath = filePath.replace(folderPath + '/', '');
  const parts = relativePath.split('/');
  const fileName = parts[parts.length - 1];
  const nameParts = fileName.split('.');
  const ext = nameParts.length > 1 ? nameParts.pop() : '';
  const name = nameParts.join('.');

  return {
    id: filePath, // Use full path as unique ID
    name,
    ext,
    relativePath,
    fileName
  };
}

/**
 * Store Actions - Obsidian API Integration
 */
export const vaultActions = {
  /**
   * Load folders from Foundry configuration
   * Checks which folders actually exist in Obsidian vault
   */
  async loadFolders() {
    loading.set(true);
    error.set(null);

    try {
      const availableFolders = [];

      // Check each configured folder
      for (const folder of FOUNDRY_FOLDERS) {
        try {
          // Try to list files in folder to verify it exists
          await obsidianApiClient.listFiles(folder.path);
          availableFolders.push({ ...folder, count: 0 });
        } catch (err) {
          // Folder doesn't exist, skip it
          console.warn(`[Vault] Folder not found: ${folder.path}`);
        }
      }

      folders.set(availableFolders);
      console.log('[Vault] Loaded folders:', availableFolders.length);

      // Load counts for each folder
      await this.updateFolderCounts();
    } catch (err) {
      console.error('[Vault] Failed to load folders:', err);
      error.set(err.message);
    } finally {
      loading.set(false);
    }
  },

  /**
   * Update note counts for all folders
   */
  async updateFolderCounts() {
    try {
      const $folders = await new Promise(resolve => {
        const unsubscribe = folders.subscribe(value => {
          unsubscribe();
          resolve(value);
        });
      });

      for (const folder of $folders) {
        try {
          const result = await obsidianApiClient.listFiles(folder.path);
          const fileCount = result.files?.filter(f => f.endsWith('.md')).length || 0;

          folders.update($folders =>
            $folders.map(f => f.id === folder.id ? { ...f, count: fileCount } : f)
          );
        } catch (err) {
          console.warn(`[Vault] Failed to count files in ${folder.path}:`, err);
        }
      }
    } catch (err) {
      console.error('[Vault] Failed to update folder counts:', err);
    }
  },

  /**
   * Load notes from selected folder
   */
  async loadNotes() {
    const $selectedFolder = await new Promise(resolve => {
      const unsubscribe = selectedFolder.subscribe(value => {
        unsubscribe();
        resolve(value);
      });
    });

    if (!$selectedFolder) {
      notes.set([]);
      return;
    }

    loading.set(true);
    error.set(null);

    try {
      const result = await obsidianApiClient.listFiles($selectedFolder.path);

      if (!result.files || result.files.length === 0) {
        notes.set([]);
        console.log('[Vault] No files in folder:', $selectedFolder.path);
        return;
      }

      // Filter markdown files and create note objects
      const mdFiles = result.files
        .filter(file => typeof file === 'string' && file.endsWith('.md'))
        .map(file => {
          const fullPath = `${$selectedFolder.path}/${file}`;
          const metadata = parseFilePath(fullPath, $selectedFolder.path);

          return {
            id: metadata.id, // Full path as ID
            title: metadata.name.replace(/-/g, ' '), // Convert hyphens to spaces
            folderId: $selectedFolder.id,
            folderPath: $selectedFolder.path,
            fileName: metadata.fileName,
            path: fullPath,
            content: null, // Lazy load content on demand
            updatedAt: null, // Will be populated when content is loaded
            tags: []
          };
        });

      notes.set(mdFiles);
      console.log('[Vault] Loaded notes:', mdFiles.length);
    } catch (err) {
      console.error('[Vault] Failed to load notes:', err);
      error.set(err.message);
      notes.set([]);
    } finally {
      loading.set(false);
    }
  },

  /**
   * Load note content from Obsidian
   * @param {object} note - Note object with path
   * @returns {Promise<object>} Note with content loaded
   */
  async loadNoteContent(note) {
    if (!note || !note.path) {
      throw new Error('Invalid note object');
    }

    try {
      const content = await obsidianApiClient.readNote(note.path);

      // Extract title from content if not present
      const title = extractTitle(content);

      const loadedNote = {
        ...note,
        content,
        title,
        updatedAt: Date.now() // Current time as updated time
      };

      // Update note in store
      notes.update($notes =>
        $notes.map(n => n.id === note.id ? loadedNote : n)
      );

      return loadedNote;
    } catch (err) {
      console.error('[Vault] Failed to load note content:', err);
      throw err;
    }
  },

  /**
   * Select a note for viewing/editing
   * Automatically loads content if not already loaded
   */
  async selectNote(note) {
    if (!note) {
      currentNote.set(null);
      return;
    }

    try {
      // Load content if not already loaded
      if (!note.content) {
        const loadedNote = await this.loadNoteContent(note);
        currentNote.set(loadedNote);
      } else {
        currentNote.set(note);
      }
    } catch (err) {
      console.error('[Vault] Failed to select note:', err);
      error.set(err.message);
    }
  },

  /**
   * Select a folder and load its notes
   */
  async selectFolder(folder) {
    selectedFolder.set(folder);
    await this.loadNotes();
  },

  /**
   * Create a new note in Obsidian
   * @param {object} noteData - { title, content, folderId }
   */
  async createNote(noteData) {
    const $selectedFolder = await new Promise(resolve => {
      const unsubscribe = selectedFolder.subscribe(value => {
        unsubscribe();
        resolve(value);
      });
    });

    if (!$selectedFolder) {
      throw new Error('No folder selected');
    }

    loading.set(true);
    error.set(null);

    try {
      const timestamp = new Date();
      const dateStr = timestamp.toISOString().split('T')[0];
      const timeStr = timestamp.toTimeString().split(' ')[0].replace(/:/g, '-');
      const fileName = `${dateStr}_${timeStr}_${noteData.title.replace(/\s+/g, '-')}.md`;
      const path = `${$selectedFolder.path}/${fileName}`;

      // Create markdown content
      const markdown = `# ${noteData.title}\n\n${noteData.content || ''}`;

      // Create note in Obsidian
      await obsidianApiClient.createNote(markdown, path);

      // Reload notes to show new note
      await this.loadNotes();

      console.log('[Vault] Note created:', path);
    } catch (err) {
      console.error('[Vault] Failed to create note:', err);
      error.set(err.message);
      throw err;
    } finally {
      loading.set(false);
    }
  },

  /**
   * Update an existing note in Obsidian
   * @param {string} noteId - Note path (used as ID)
   * @param {object} updates - { title, content }
   */
  async updateNote(noteId, updates) {
    loading.set(true);
    error.set(null);

    try {
      // Find note in store
      const $notes = await new Promise(resolve => {
        const unsubscribe = notes.subscribe(value => {
          unsubscribe();
          resolve(value);
        });
      });

      const note = $notes.find(n => n.id === noteId);
      if (!note) {
        throw new Error('Note not found');
      }

      // Create updated markdown content
      let newContent = updates.content || note.content || '';

      // Update H1 title if title changed
      if (updates.title && updates.title !== note.title) {
        newContent = newContent.replace(/^#\s+.+$/m, `# ${updates.title}`);
        // If no H1 found, prepend it
        if (!newContent.match(/^#\s+.+$/m)) {
          newContent = `# ${updates.title}\n\n${newContent}`;
        }
      }

      // Update note in Obsidian
      await obsidianApiClient.createNote(newContent, note.path);

      // Update note in store
      const updated = {
        ...note,
        ...updates,
        content: newContent,
        updatedAt: Date.now()
      };

      notes.update($notes =>
        $notes.map(n => n.id === noteId ? updated : n)
      );

      currentNote.update($current =>
        $current && $current.id === noteId ? updated : $current
      );

      console.log('[Vault] Note updated:', note.path);
      return updated;
    } catch (err) {
      console.error('[Vault] Failed to update note:', err);
      error.set(err.message);
      throw err;
    } finally {
      loading.set(false);
    }
  },

  /**
   * Delete a note from Obsidian
   * @param {string} noteId - Note path (used as ID)
   */
  async deleteNote(noteId) {
    loading.set(true);
    error.set(null);

    try {
      // Find note in store
      const $notes = await new Promise(resolve => {
        const unsubscribe = notes.subscribe(value => {
          unsubscribe();
          resolve(value);
        });
      });

      const note = $notes.find(n => n.id === noteId);
      if (!note) {
        throw new Error('Note not found');
      }

      // Delete from Obsidian
      await obsidianApiClient.deleteNote(note.path);

      // Remove from store
      notes.update($notes => $notes.filter(n => n.id !== noteId));

      // Clear current note if it was deleted
      currentNote.update($current =>
        $current && $current.id === noteId ? null : $current
      );

      // Update folder count
      await this.updateFolderCounts();

      console.log('[Vault] Note deleted:', note.path);
    } catch (err) {
      console.error('[Vault] Failed to delete note:', err);
      error.set(err.message);
      throw err;
    } finally {
      loading.set(false);
    }
  },

  /**
   * Search notes in current folder or all folders
   * @param {string} query - Search query
   */
  async searchNotes(query) {
    if (!query || query.trim() === '') {
      await this.loadNotes();
      return;
    }

    loading.set(true);
    error.set(null);

    try {
      // Use Obsidian search API
      const results = await obsidianApiClient.searchNotes(query);

      console.log('[Vault] Search results:', results);
      // TODO: Parse search results and update notes store
      // This requires understanding the search API response format
    } catch (err) {
      console.error('[Vault] Search failed:', err);
      error.set(err.message);
    } finally {
      loading.set(false);
    }
  }
};

// Initialize on module load
if (typeof window !== 'undefined') {
  vaultActions.loadFolders().catch(err => {
    console.error('[Vault] Failed to initialize vault:', err);
  });
}
