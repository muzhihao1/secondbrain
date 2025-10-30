/**
 * Task Store
 *
 * Manages task state, caching, and synchronization with Obsidian vault.
 * Provides reactive task data for the /tasks page.
 */

import { writable, derived, get } from 'svelte/store';
import { taskExtractor } from '$services/taskExtractor.js';
import { dbService } from '$services/dbService.js';

/**
 * Main task store state
 */
const createTaskStore = () => {
  const { subscribe, set, update } = writable({
    todayTasks: [],
    overdueTasks: [],
    monthTasks: [],
    stats: {
      todayTotal: 0,
      todayCompleted: 0,
      overdueCount: 0,
      completionRate: 0,
      monthTotal: 0,
      monthCompleted: 0
    },
    loading: false,
    error: null,
    lastUpdated: null
  });

  return {
    subscribe,

    /**
     * Load today's tasks
     * @param {boolean} useCache - Whether to load from cache first
     * @returns {Promise<void>}
     */
    async loadTodaysTasks(useCache = true) {
      update(state => ({ ...state, loading: true, error: null }));

      try {
        // Try to load from cache first for instant UI
        if (useCache) {
          const cachedData = await this._loadFromCache('todayTasks');
          if (cachedData) {
            update(state => ({
              ...state,
              todayTasks: cachedData.today || [],
              overdueTasks: cachedData.overdue || [],
              loading: false
            }));
          }
        }

        // Fetch fresh data from task extractor
        const data = await taskExtractor.getTodaysTasks();

        // Update store
        update(state => ({
          ...state,
          todayTasks: data.today,
          overdueTasks: data.overdue,
          loading: false,
          lastUpdated: new Date().toISOString()
        }));

        // Cache for next time
        await this._saveToCache('todayTasks', data);

      } catch (error) {
        console.error('[TaskStore] Failed to load today\'s tasks:', error);
        update(state => ({
          ...state,
          loading: false,
          error: error.message
        }));
      }
    },

    /**
     * Load month's tasks
     * @param {boolean} useCache - Whether to load from cache first
     * @returns {Promise<void>}
     */
    async loadMonthTasks(useCache = true) {
      update(state => ({ ...state, loading: true, error: null }));

      try {
        // Try cache first
        if (useCache) {
          const cachedData = await this._loadFromCache('monthTasks');
          if (cachedData) {
            update(state => ({
              ...state,
              monthTasks: cachedData,
              loading: false
            }));
          }
        }

        // Fetch fresh data
        const tasks = await taskExtractor.getMonthTasks();

        // Update store
        update(state => ({
          ...state,
          monthTasks: tasks,
          loading: false,
          lastUpdated: new Date().toISOString()
        }));

        // Cache
        await this._saveToCache('monthTasks', tasks);

      } catch (error) {
        console.error('[TaskStore] Failed to load month tasks:', error);
        update(state => ({
          ...state,
          loading: false,
          error: error.message
        }));
      }
    },

    /**
     * Load task statistics
     * @returns {Promise<void>}
     */
    async loadStats() {
      try {
        const stats = await taskExtractor.getTaskStats();

        update(state => ({
          ...state,
          stats
        }));

        // Cache stats
        await this._saveToCache('taskStats', stats);

      } catch (error) {
        console.error('[TaskStore] Failed to load stats:', error);
      }
    },

    /**
     * Toggle task completion status
     * @param {string} taskId - Task ID
     * @param {boolean} isCompleted - New completion status
     * @param {string} view - View type ('today' or 'month')
     * @returns {Promise<void>}
     */
    async toggleTask(taskId, isCompleted, view = 'today') {
      const state = get({ subscribe });

      // Find the task in current state
      let task = null;
      let taskList = null;

      if (view === 'today') {
        task = state.todayTasks.find(t => t.id === taskId) ||
               state.overdueTasks.find(t => t.id === taskId);
        taskList = state.todayTasks.find(t => t.id === taskId) ? 'todayTasks' : 'overdueTasks';
      } else if (view === 'month') {
        task = state.monthTasks.find(t => t.id === taskId);
        taskList = 'monthTasks';
      }

      if (!task) {
        console.error('[TaskStore] Task not found:', taskId);
        return;
      }

      // Optimistic update
      update(state => {
        const newState = { ...state };
        const tasks = newState[taskList];
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        if (taskIndex >= 0) {
          tasks[taskIndex] = { ...tasks[taskIndex], isCompleted };
        }

        return newState;
      });

      try {
        // Update in Obsidian
        await taskExtractor.updateTaskStatus(taskId, isCompleted);

        // Reload stats after update
        await this.loadStats();

        console.log('[TaskStore] Task updated successfully:', taskId);

      } catch (error) {
        console.error('[TaskStore] Failed to update task:', error);

        // Revert optimistic update
        update(state => {
          const newState = { ...state };
          const tasks = newState[taskList];
          const taskIndex = tasks.findIndex(t => t.id === taskId);

          if (taskIndex >= 0) {
            tasks[taskIndex] = { ...tasks[taskIndex], isCompleted: !isCompleted };
          }

          return newState;
        });

        throw error;
      }
    },

    /**
     * Refresh all task data
     * @returns {Promise<void>}
     */
    async refresh() {
      // Clear cache
      taskExtractor.clearCache();

      // Reload all data
      await Promise.all([
        this.loadTodaysTasks(false),
        this.loadMonthTasks(false),
        this.loadStats()
      ]);
    },

    /**
     * Load data from IndexedDB cache
     * @private
     * @param {string} key - Cache key
     * @returns {Promise<any>} Cached data or null
     */
    async _loadFromCache(key) {
      try {
        const cached = await dbService.get('taskCache', key);
        if (cached && cached.data) {
          const age = Date.now() - cached.timestamp;
          // Cache is valid for 5 minutes
          if (age < 5 * 60 * 1000) {
            console.log(`[TaskStore] Loaded ${key} from cache (age: ${Math.round(age / 1000)}s)`);
            return cached.data;
          }
        }
        return null;
      } catch (error) {
        console.warn('[TaskStore] Cache read error:', error);
        return null;
      }
    },

    /**
     * Save data to IndexedDB cache
     * @private
     * @param {string} key - Cache key
     * @param {any} data - Data to cache
     * @returns {Promise<void>}
     */
    async _saveToCache(key, data) {
      try {
        await dbService.set('taskCache', key, {
          data,
          timestamp: Date.now()
        });
      } catch (error) {
        console.warn('[TaskStore] Cache write error:', error);
      }
    },

    /**
     * Clear all task data
     */
    clear() {
      set({
        todayTasks: [],
        overdueTasks: [],
        monthTasks: [],
        stats: {
          todayTotal: 0,
          todayCompleted: 0,
          overdueCount: 0,
          completionRate: 0,
          monthTotal: 0,
          monthCompleted: 0
        },
        loading: false,
        error: null,
        lastUpdated: null
      });
    }
  };
};

export const taskStore = createTaskStore();

/**
 * Derived store: All tasks combined
 */
export const allTasks = derived(
  taskStore,
  $taskStore => [
    ...$taskStore.todayTasks,
    ...$taskStore.overdueTasks,
    ...$taskStore.monthTasks
  ]
);

/**
 * Derived store: Task count
 */
export const taskCount = derived(
  taskStore,
  $taskStore => ({
    today: $taskStore.todayTasks.length,
    overdue: $taskStore.overdueTasks.length,
    month: $taskStore.monthTasks.length,
    total: $taskStore.todayTasks.length + $taskStore.overdueTasks.length
  })
);

/**
 * Derived store: High priority tasks
 */
export const highPriorityTasks = derived(
  taskStore,
  $taskStore => [
    ...$taskStore.todayTasks.filter(t => t.priority === 'high'),
    ...$taskStore.overdueTasks.filter(t => t.priority === 'high')
  ]
);
