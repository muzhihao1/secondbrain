/**
 * Task Extractor Service
 *
 * Extracts tasks from Obsidian daily work logs and provides task management functionality.
 * Parses markdown checkbox syntax and recognizes metadata:
 * - Status: - [ ] (incomplete) or - [x] (complete)
 * - Due dates: 📅 YYYY-MM-DD or ⏳ YYYY-MM-DD
 * - Priority: ⏫ (high priority)
 * - Tags: #tag-name
 *
 * Vault structure:
 * - Daily journals: 02_Execution/Journal/YYYY/YYYY-MM-DD-工作日志.md
 * - Monthly reviews: 01_Periodic/Monthly/YYYY-MM~YYYY-MM_复盘+规划.md
 */

import { obsidianApiClient } from './obsidianApiClient.js';

/**
 * Regular expressions for metadata extraction
 */
const PATTERNS = {
  // Checkbox: - [ ] or - [x] at start of line
  CHECKBOX: /^[-*]\s\[([ x])\]\s+(.+)$/i,

  // Due date: 📅 2025-10-30 or ⏳ 2025-10-30
  DUE_DATE: /[📅⏳]\s*(\d{4}-\d{2}-\d{2})/,

  // High priority: ⏫
  HIGH_PRIORITY: /⏫/,

  // Tags: #tag-name or #project/subtag
  TAGS: /#([a-zA-Z0-9_\-/]+)/g
};

/**
 * Task data model
 * @typedef {Object} Task
 * @property {string} id - Unique task identifier (hash of content + file + line)
 * @property {string} content - Task text content
 * @property {boolean} isCompleted - Completion status
 * @property {string} priority - 'high' or 'normal'
 * @property {string|null} dueDate - ISO date string or null
 * @property {string[]} tags - Array of tags
 * @property {string} sourceFile - Source markdown file path
 * @property {number} lineNumber - Line number in source file
 * @property {string} sourceDate - Date of the journal entry (YYYY-MM-DD)
 */

/**
 * Task Extractor Service
 */
class TaskExtractor {
  constructor() {
    this.cache = new Map(); // Cache parsed tasks by file path
    this.cacheTimestamps = new Map(); // Track cache freshness
    this.CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache TTL
  }

  /**
   * Get all tasks from daily logs within a date range
   * @param {Date} startDate - Start date (inclusive)
   * @param {Date} endDate - End date (inclusive)
   * @returns {Promise<Task[]>} Array of tasks
   */
  async getTasksInRange(startDate, endDate) {
    const tasks = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateStr = this.formatDate(currentDate);
      const fileTasks = await this.getTasksFromDate(dateStr);
      tasks.push(...fileTasks);

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return tasks;
  }

  /**
   * Get tasks from a specific date's journal entry
   * @param {string} dateStr - Date string (YYYY-MM-DD)
   * @returns {Promise<Task[]>} Array of tasks from that date
   */
  async getTasksFromDate(dateStr) {
    const filePath = this.getJournalPath(dateStr);

    // Check cache first
    if (this.isCacheValid(filePath)) {
      console.log(`[TaskExtractor] Using cached tasks for ${dateStr}`);
      return this.cache.get(filePath);
    }

    try {
      // Read journal file from Obsidian
      const content = await obsidianApiClient.readNote(filePath);

      // Parse tasks from markdown content
      const tasks = this.parseTasksFromMarkdown(content, filePath, dateStr);

      // Cache results
      this.cache.set(filePath, tasks);
      this.cacheTimestamps.set(filePath, Date.now());

      console.log(`[TaskExtractor] Extracted ${tasks.length} tasks from ${dateStr}`);
      return tasks;

    } catch (error) {
      // File doesn't exist or other error
      if (error.message && error.message.includes('404')) {
        console.log(`[TaskExtractor] No journal entry for ${dateStr}`);
        return [];
      }

      console.error(`[TaskExtractor] Error reading ${filePath}:`, error);
      return [];
    }
  }

  /**
   * Parse tasks from markdown content
   * @param {string} content - Markdown file content
   * @param {string} filePath - Source file path
   * @param {string} sourceDate - Date of the journal (YYYY-MM-DD)
   * @returns {Task[]} Parsed tasks
   */
  parseTasksFromMarkdown(content, filePath, sourceDate) {
    const tasks = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const match = line.match(PATTERNS.CHECKBOX);

      if (match) {
        const [, status, taskContent] = match;
        const isCompleted = status.toLowerCase() === 'x';

        // Extract metadata
        const dueDate = this.extractDueDate(taskContent);
        const priority = this.extractPriority(taskContent);
        const tags = this.extractTags(taskContent);

        // Clean content (remove metadata markers)
        const cleanContent = this.cleanTaskContent(taskContent);

        // Generate unique ID
        const id = this.generateTaskId(cleanContent, filePath, index + 1);

        tasks.push({
          id,
          content: cleanContent,
          isCompleted,
          priority,
          dueDate,
          tags,
          sourceFile: filePath,
          lineNumber: index + 1,
          sourceDate
        });
      }
    });

    return tasks;
  }

  /**
   * Extract due date from task content
   * @param {string} content - Task content
   * @returns {string|null} ISO date string or null
   */
  extractDueDate(content) {
    const match = content.match(PATTERNS.DUE_DATE);
    if (match && match[1]) {
      // Validate date format
      const dateStr = match[1];
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return dateStr;
      }
    }
    return null;
  }

  /**
   * Extract priority from task content
   * @param {string} content - Task content
   * @returns {string} 'high' or 'normal'
   */
  extractPriority(content) {
    return PATTERNS.HIGH_PRIORITY.test(content) ? 'high' : 'normal';
  }

  /**
   * Extract tags from task content
   * @param {string} content - Task content
   * @returns {string[]} Array of tag names
   */
  extractTags(content) {
    const tags = [];
    let match;

    // Reset regex state
    PATTERNS.TAGS.lastIndex = 0;

    while ((match = PATTERNS.TAGS.exec(content)) !== null) {
      tags.push(match[1]);
    }

    return tags;
  }

  /**
   * Clean task content by removing metadata markers
   * @param {string} content - Raw task content
   * @returns {string} Cleaned content
   */
  cleanTaskContent(content) {
    return content
      .replace(PATTERNS.DUE_DATE, '') // Remove date markers
      .replace(PATTERNS.HIGH_PRIORITY, '') // Remove priority marker
      .trim();
  }

  /**
   * Generate unique task ID
   * @param {string} content - Task content
   * @param {string} filePath - Source file path
   * @param {number} lineNumber - Line number
   * @returns {string} Unique ID
   */
  generateTaskId(content, filePath, lineNumber) {
    const str = `${filePath}:${lineNumber}:${content}`;
    return this.simpleHash(str);
  }

  /**
   * Simple hash function for generating IDs
   * @param {string} str - String to hash
   * @returns {string} Hash string
   */
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(36);
  }

  /**
   * Get journal file path for a specific date
   * Actual vault structure: 02_Execution/Journal/YYYY/YYYY-MM-DD-工作日志.md
   * @param {string} dateStr - Date string (YYYY-MM-DD)
   * @returns {string} Journal file path
   */
  getJournalPath(dateStr) {
    const year = dateStr.substring(0, 4);
    return `02_Execution/Journal/${year}/${dateStr}-工作日志.md`;
  }

  /**
   * Format date to YYYY-MM-DD string
   * @param {Date} date - Date object
   * @returns {string} Formatted date string
   */
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  /**
   * Check if cache is still valid
   * @param {string} filePath - File path
   * @returns {boolean} True if cache is valid
   */
  isCacheValid(filePath) {
    if (!this.cache.has(filePath)) {
      return false;
    }

    const timestamp = this.cacheTimestamps.get(filePath);
    const age = Date.now() - timestamp;

    return age < this.CACHE_TTL;
  }

  /**
   * Clear cache for a specific file or all files
   * @param {string} [filePath] - Optional file path to clear
   */
  clearCache(filePath) {
    if (filePath) {
      this.cache.delete(filePath);
      this.cacheTimestamps.delete(filePath);
    } else {
      this.cache.clear();
      this.cacheTimestamps.clear();
    }
  }

  /**
   * Update task status in source file
   * @param {string} taskId - Task ID
   * @param {boolean} isCompleted - New completion status
   * @returns {Promise<void>}
   *
   * CRITICAL: Clears cache after update to ensure data consistency
   */
  async updateTaskStatus(taskId, isCompleted) {
    // Find task in cache
    let task = null;
    let filePath = null;

    for (const [path, tasks] of this.cache.entries()) {
      task = tasks.find(t => t.id === taskId);
      if (task) {
        filePath = path;
        break;
      }
    }

    if (!task) {
      throw new Error(`Task ${taskId} not found in cache`);
    }

    try {
      // Read current file content
      const content = await obsidianApiClient.readNote(filePath);
      const lines = content.split('\n');

      // Update the specific line
      const lineIndex = task.lineNumber - 1;
      const currentLine = lines[lineIndex];

      // Toggle checkbox status
      const newStatus = isCompleted ? 'x' : ' ';
      const updatedLine = currentLine.replace(
        /^([-*]\s)\[[ x]\]/i,
        `$1[${newStatus}]`
      );

      lines[lineIndex] = updatedLine;

      // Write back to file
      const newContent = lines.join('\n');
      await obsidianApiClient.createNote(newContent, filePath);

      // CRITICAL FIX: Clear ALL cache after update
      // This ensures next getTodaysTasks() will re-read from file
      // and stats will be calculated with fresh data
      this.clearCache();

      console.log(`[TaskExtractor] Updated task ${taskId} status to ${isCompleted}, cache cleared`);

    } catch (error) {
      console.error(`[TaskExtractor] Failed to update task ${taskId}:`, error);
      throw error;
    }
  }

  /**
   * Get today's tasks (including overdue and completed)
   * @returns {Promise<Object>} Today's tasks categorized
   *
   * IMPORTANT: Returns ALL tasks (both completed and incomplete).
   * UI layer is responsible for filtering/displaying based on completion status.
   * This ensures accurate statistics calculation.
   */
  async getTodaysTasks() {
    const today = new Date();
    const todayStr = this.formatDate(today);

    // Optimized: Get tasks from last 7 days (reduced from 30 to minimize 404 errors)
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 7);

    const allTasks = await this.getTasksInRange(startDate, today);

    // Categorize tasks (keeping both completed and incomplete)
    const todayTasks = [];
    const overdueTasks = [];

    allTasks.forEach(task => {
      // NO LONGER FILTERING OUT COMPLETED TASKS!
      // This was the root cause of 0% completion rate bug

      if (!task.dueDate) {
        // Tasks without due date from today's journal
        if (task.sourceDate === todayStr) {
          todayTasks.push(task);
        }
      } else if (task.dueDate === todayStr) {
        // Tasks due today
        todayTasks.push(task);
      } else if (task.dueDate < todayStr) {
        // Overdue tasks
        overdueTasks.push(task);
      }
    });

    // Sort by priority and completion status
    const sortTasks = (a, b) => {
      // Incomplete tasks first
      if (!a.isCompleted && b.isCompleted) return -1;
      if (a.isCompleted && !b.isCompleted) return 1;

      // Then by priority
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (a.priority !== 'high' && b.priority === 'high') return 1;
      return 0;
    };

    todayTasks.sort(sortTasks);
    overdueTasks.sort(sortTasks);

    return {
      today: todayTasks,
      overdue: overdueTasks,
      total: todayTasks.length + overdueTasks.length,
      // Additional stats for UI
      todayIncomplete: todayTasks.filter(t => !t.isCompleted).length,
      overdueIncomplete: overdueTasks.filter(t => !t.isCompleted).length
    };
  }

  /**
   * Get this month's tasks
   * @returns {Promise<Task[]>} This month's tasks
   */
  async getMonthTasks() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const tasks = await this.getTasksInRange(startOfMonth, endOfMonth);

    // Filter tasks with due dates in this month, or tasks from this month's journals
    const monthStr = this.formatDate(startOfMonth).substring(0, 7); // YYYY-MM

    const filteredTasks = tasks.filter(task => {
      if (task.dueDate && task.dueDate.startsWith(monthStr)) {
        return true;
      }
      if (task.sourceDate.startsWith(monthStr)) {
        return true;
      }
      return false;
    });

    // Sort by due date, then priority
    filteredTasks.sort((a, b) => {
      // First by due date
      if (a.dueDate && b.dueDate) {
        const dateCompare = a.dueDate.localeCompare(b.dueDate);
        if (dateCompare !== 0) return dateCompare;
      } else if (a.dueDate) {
        return -1;
      } else if (b.dueDate) {
        return 1;
      }

      // Then by priority
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (a.priority !== 'high' && b.priority === 'high') return 1;

      return 0;
    });

    return filteredTasks;
  }

  /**
   * Get task statistics
   * @returns {Promise<Object>} Task statistics
   */
  async getTaskStats() {
    const todaysTasks = await this.getTodaysTasks();
    const monthTasks = await this.getMonthTasks();

    const todayTotal = todaysTasks.total;
    const todayCompleted = [...todaysTasks.today, ...todaysTasks.overdue]
      .filter(t => t.isCompleted).length;
    const overdueCount = todaysTasks.overdue.length;

    const completionRate = todayTotal > 0
      ? Math.round((todayCompleted / todayTotal) * 100)
      : 0;

    return {
      todayTotal,
      todayCompleted,
      overdueCount,
      completionRate,
      monthTotal: monthTasks.length,
      monthCompleted: monthTasks.filter(t => t.isCompleted).length
    };
  }
}

// Export singleton instance
export const taskExtractor = new TaskExtractor();
