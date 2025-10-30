<script>
  /**
   * Tasks Page - 任务管理
   *
   * 从工作日志 (01_Execution/Logs/Journal_Entries/*.md) 中提取和管理任务
   * - 今日任务视图（包括逾期任务）
   * - 本月任务视图
   * - 实时切换任务完成状态
   */

  import { onMount } from 'svelte';
  import { taskStore, taskCount, highPriorityTasks } from '$stores/taskStore.js';

  let activeView = 'today'; // 'today' | 'month'
  let refreshing = false;

  // Load tasks on mount
  onMount(async () => {
    await loadData();
  });

  /**
   * Load all task data
   */
  async function loadData() {
    if (activeView === 'today') {
      await taskStore.loadTodaysTasks(true);
    } else {
      await taskStore.loadMonthTasks(true);
    }
    await taskStore.loadStats();
  }

  /**
   * Handle view change
   */
  async function changeView(view) {
    activeView = view;
    await loadData();
  }

  /**
   * Refresh task data
   */
  async function handleRefresh() {
    refreshing = true;
    try {
      await taskStore.refresh();
    } finally {
      refreshing = false;
    }
  }

  /**
   * Toggle task completion
   */
  async function toggleTask(taskId, currentStatus) {
    try {
      await taskStore.toggleTask(taskId, !currentStatus, activeView);
    } catch (error) {
      alert('更新任务失败: ' + error.message);
    }
  }

  /**
   * Format date for display
   */
  function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (dateStr === formatDateStr(today)) return '今天';
    if (dateStr === formatDateStr(tomorrow)) return '明天';

    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  }

  function formatDateStr(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
</script>

<svelte:head>
  <title>任务 - Quick Capture</title>
</svelte:head>

<div class="min-h-screen bg-background-primary p-4 pb-28">
  <!-- Header -->
  <header class="mb-6 animate-fade-in">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-large-title text-text-primary flex items-center gap-2">
          📋 任务管理
        </h1>
        <p class="text-subhead text-text-secondary mt-1">
          从工作日志中自动提取和管理任务
        </p>
      </div>

      <button
        on:click={handleRefresh}
        disabled={refreshing || $taskStore.loading}
        class="px-4 py-2 bg-background-secondary rounded-lg hover:bg-background-tertiary transition-colors disabled:opacity-50"
      >
        {refreshing ? '🔄 刷新中...' : '🔄 刷新'}
      </button>
    </div>

    <!-- View Toggle -->
    <div class="flex gap-2">
      <button
        on:click={() => changeView('today')}
        class="px-4 py-2 rounded-lg transition-colors font-medium"
        class:bg-accent={activeView === 'today'}
        class:text-white={activeView === 'today'}
        class:bg-background-secondary={activeView !== 'today'}
        class:text-text-secondary={activeView !== 'today'}
      >
        今日任务
      </button>
      <button
        on:click={() => changeView('month')}
        class="px-4 py-2 rounded-lg transition-colors font-medium"
        class:bg-accent={activeView === 'month'}
        class:text-white={activeView === 'month'}
        class:bg-background-secondary={activeView !== 'month'}
        class:text-text-secondary={activeView !== 'month'}
      >
        本月任务
      </button>
    </div>
  </header>

  <!-- Stats Cards -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <div class="bg-background-secondary rounded-lg p-4">
      <div class="text-caption text-text-secondary mb-1">完成率</div>
      <div class="text-title text-text-primary font-semibold">
        {$taskStore.stats.completionRate}%
      </div>
    </div>

    <div class="bg-background-secondary rounded-lg p-4">
      <div class="text-caption text-text-secondary mb-1">逾期任务</div>
      <div class="text-title text-text-primary font-semibold">
        {$taskStore.stats.overdueCount}
      </div>
    </div>

    <div class="bg-background-secondary rounded-lg p-4">
      <div class="text-caption text-text-secondary mb-1">今日任务</div>
      <div class="text-title text-text-primary font-semibold">
        {$taskStore.stats.todayTotal}
      </div>
    </div>

    <div class="bg-background-secondary rounded-lg p-4">
      <div class="text-caption text-text-secondary mb-1">本月任务</div>
      <div class="text-title text-text-primary font-semibold">
        {$taskStore.stats.monthTotal}
      </div>
    </div>
  </div>

  <!-- Task Lists -->
  {#if $taskStore.loading}
    <div class="text-center py-12">
      <div class="animate-spin text-4xl mb-4">⏳</div>
      <p class="text-text-secondary">加载任务中...</p>
    </div>

  {:else if $taskStore.error}
    <div class="text-center py-12">
      <div class="text-4xl mb-4">❌</div>
      <p class="text-text-primary mb-2">加载失败</p>
      <p class="text-sm text-text-secondary">{$taskStore.error}</p>
      <button
        on:click={handleRefresh}
        class="mt-4 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
      >
        重试
      </button>
    </div>

  {:else if activeView === 'today'}
    <!-- Today's Tasks View -->
    <div class="space-y-6">
      <!-- Overdue Tasks -->
      {#if $taskStore.overdueTasks.length > 0}
        <div>
          <h2 class="text-headline text-text-primary font-semibold mb-3 flex items-center gap-2">
            <span class="text-red-500">⚠️</span> 逾期任务 ({$taskStore.overdueTasks.length})
          </h2>
          <div class="space-y-2">
            {#each $taskStore.overdueTasks as task}
              <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 hover:shadow-md transition-shadow">
                <label class="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    on:change={() => toggleTask(task.id, task.isCompleted)}
                    class="mt-1 w-5 h-5 rounded border-2 cursor-pointer"
                  />
                  <div class="flex-1">
                    <div class="text-body text-text-primary" class:line-through={task.isCompleted} class:opacity-60={task.isCompleted}>
                      {#if task.priority === 'high'}
                        <span class="text-red-500">⏫</span>
                      {/if}
                      {task.content}
                    </div>
                    <div class="flex gap-3 mt-1 text-caption text-text-tertiary">
                      {#if task.dueDate}
                        <span>📅 {formatDate(task.dueDate)}</span>
                      {/if}
                      {#if task.tags.length > 0}
                        <span>{task.tags.map(t => `#${t}`).join(' ')}</span>
                      {/if}
                    </div>
                  </div>
                </label>
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <!-- Today's Tasks -->
      <div>
        <h2 class="text-headline text-text-primary font-semibold mb-3">
          今日任务 ({$taskStore.todayTasks.length})
        </h2>
        {#if $taskStore.todayTasks.length === 0}
          <div class="text-center py-8 bg-background-secondary rounded-lg">
            <div class="text-4xl mb-2">✨</div>
            <p class="text-text-secondary">暂无今日任务</p>
          </div>
        {:else}
          <div class="space-y-2">
            {#each $taskStore.todayTasks as task}
              <div class="bg-background-secondary rounded-lg p-4 hover:shadow-md transition-shadow">
                <label class="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    on:change={() => toggleTask(task.id, task.isCompleted)}
                    class="mt-1 w-5 h-5 rounded border-2 cursor-pointer"
                  />
                  <div class="flex-1">
                    <div class="text-body text-text-primary" class:line-through={task.isCompleted} class:opacity-60={task.isCompleted}>
                      {#if task.priority === 'high'}
                        <span class="text-accent">⏫</span>
                      {/if}
                      {task.content}
                    </div>
                    <div class="flex gap-3 mt-1 text-caption text-text-tertiary">
                      {#if task.dueDate}
                        <span>📅 {formatDate(task.dueDate)}</span>
                      {/if}
                      {#if task.tags.length > 0}
                        <span>{task.tags.map(t => `#${t}`).join(' ')}</span>
                      {/if}
                    </div>
                  </div>
                </label>
              </div>
            {/each}
          </div>
        {/if}
      </div>
    </div>

  {:else}
    <!-- Month's Tasks View -->
    <div>
      <h2 class="text-headline text-text-primary font-semibold mb-3">
        本月任务 ({$taskStore.monthTasks.length})
      </h2>
      {#if $taskStore.monthTasks.length === 0}
        <div class="text-center py-12 bg-background-secondary rounded-lg">
          <div class="text-4xl mb-2">📭</div>
          <p class="text-text-secondary">暂无本月任务</p>
        </div>
      {:else}
        <div class="space-y-2">
          {#each $taskStore.monthTasks as task}
            <div class="bg-background-secondary rounded-lg p-4 hover:shadow-md transition-shadow">
              <label class="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  on:change={() => toggleTask(task.id, task.isCompleted)}
                  class="mt-1 w-5 h-5 rounded border-2 cursor-pointer"
                />
                <div class="flex-1">
                  <div class="text-body text-text-primary" class:line-through={task.isCompleted} class:opacity-60={task.isCompleted}>
                    {#if task.priority === 'high'}
                      <span class="text-accent">⏫</span>
                    {/if}
                    {task.content}
                  </div>
                  <div class="flex gap-3 mt-1 text-caption text-text-tertiary">
                    {#if task.dueDate}
                      <span>📅 {formatDate(task.dueDate)}</span>
                    {/if}
                    {#if task.tags.length > 0}
                      <span>{task.tags.map(t => `#${t}`).join(' ')}</span>
                    {/if}
                    <span>来源: {task.sourceDate}</span>
                  </div>
                </div>
              </label>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  /* 动画效果 */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }
</style>
