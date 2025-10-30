<script>
  /**
   * Tasks Page - 任务管理
   *
   * 从工作日志 (01_Periodic/Daily/*.md) 中提取和管理任务
   * - 今日任务视图（包括逾期任务）
   * - 本月任务视图
   * - 实时切换任务完成状态
   */

  import { onMount } from 'svelte';

  let loading = true;
  let error = null;
  let tasks = [];
  let activeView = 'today'; // 'today' | 'month'

  // Placeholder - 将在 Phase 3 实现完整功能
  onMount(async () => {
    loading = false;
    // TODO: Load tasks from daily logs
  });
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
          从工作日志中提取和管理任务
        </p>
      </div>

      <button
        class="px-4 py-2 bg-background-secondary rounded-lg hover:bg-background-tertiary transition-colors"
        disabled={loading}
      >
        {loading ? '🔄 加载中...' : '🔄 刷新'}
      </button>
    </div>

    <!-- View Toggle -->
    <div class="flex gap-2">
      <button
        on:click={() => activeView = 'today'}
        class="px-4 py-2 rounded-lg transition-colors"
        class:bg-accent={activeView === 'today'}
        class:text-white={activeView === 'today'}
        class:bg-background-secondary={activeView !== 'today'}
        class:text-text-secondary={activeView !== 'today'}
      >
        今日任务
      </button>
      <button
        on:click={() => activeView = 'month'}
        class="px-4 py-2 rounded-lg transition-colors"
        class:bg-accent={activeView === 'month'}
        class:text-white={activeView === 'month'}
        class:bg-background-secondary={activeView !== 'month'}
        class:text-text-secondary={activeView !== 'month'}
      >
        本月任务
      </button>
    </div>
  </header>

  <!-- Placeholder Content -->
  <div class="text-center py-12">
    <div class="text-6xl mb-4">🚧</div>
    <p class="text-xl text-text-secondary mb-2">任务系统开发中</p>
    <p class="text-sm text-text-tertiary mb-6">
      将在 Phase 3 实现从工作日志提取任务的完整功能
    </p>

    <!-- Feature Preview -->
    <div class="max-w-md mx-auto bg-background-secondary rounded-lg p-6 text-left">
      <h3 class="text-headline text-text-primary font-semibold mb-3">
        ✨ 即将推出的功能
      </h3>
      <ul class="text-subhead text-text-secondary space-y-2">
        <li>• 从 01_Periodic/Daily/*.md 自动提取任务</li>
        <li>• 识别任务状态、截止日期、优先级</li>
        <li>• 今日任务和本月任务视图</li>
        <li>• 实时切换任务完成状态</li>
        <li>• 任务统计和数据分析</li>
      </ul>
    </div>
  </div>
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
