<script>
  /**
   * PageLayout - 全局页面布局组件
   *
   * 提供统一的页面结构，确保所有页面拥有一致的：
   * - 内边距和间距
   * - 响应式布局
   * - 最大宽度和居中
   * - 背景色
   *
   * 这个组件解决了"页面显示不完整"的核心问题
   *
   * @component
   * @example
   * <PageLayout title="Page Title" maxWidth="7xl">
   *   <svelte:fragment slot="header">
   *     <!-- Optional header content -->
   *   </svelte:fragment>
   *
   *   <!-- Main content -->
   *   <YourContent />
   *
   *   <svelte:fragment slot="footer">
   *     <!-- Optional footer content -->
   *   </svelte:fragment>
   * </PageLayout>
   */

  import Heading from '../primitives/Heading.svelte';

  /**
   * 页面标题（可选）
   * @type {string}
   */
  export let title = '';

  /**
   * 页面最大宽度
   * @type {'full' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'}
   */
  export let maxWidth = '7xl';

  /**
   * 内边距大小
   * @type {'sm' | 'md' | 'lg'}
   */
  export let padding = 'md';

  /**
   * 是否显示标题
   * @type {boolean}
   */
  export let showTitle = true;

  // 计算最大宽度类
  $: maxWidthClass = maxWidth === 'full' ? 'max-w-full' : `max-w-${maxWidth}`;

  // 计算内边距类
  $: paddingClass = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }[padding];
</script>

<!-- 页面容器 - 确保完整显示，不被截断 -->
<div class="min-h-screen {paddingClass}">
  <!-- 内容容器 - 最大宽度和居中 -->
  <div class="{maxWidthClass} mx-auto">

    <!-- 可选的页面头部 -->
    {#if $$slots.header}
      <header class="mb-6">
        <slot name="header" />
      </header>
    {:else if title && showTitle}
      <header class="mb-8">
        <Heading level={1} size="4xl" class="text-white">{title}</Heading>
      </header>
    {/if}

    <!-- 主内容区域 -->
    <main class="page-content">
      <slot />
    </main>

    <!-- 可选的页面底部 -->
    {#if $$slots.footer}
      <footer class="mt-8">
        <slot name="footer" />
      </footer>
    {/if}

  </div>
</div>

<style>
  /* 确保页面内容不会溢出或被截断 */
  .page-content {
    width: 100%;
    overflow-x: hidden;
  }

  /* 平滑滚动 */
  :global(html) {
    scroll-behavior: smooth;
  }
</style>
