<script>
  /**
   * Vault (知识库) Page - Unified Design
   *
   * 重构为使用统一的Card设计系统，移除渐变色，采用深色主题+青色accent
   */

  import PageLayout from '$lib/components/layout/PageLayout.svelte';
  import Card from '$lib/components/composite/Card.svelte';
  import Heading from '$lib/components/primitives/Heading.svelte';
  import Text from '$lib/components/primitives/Text.svelte';
  import Stack from '$lib/components/primitives/Stack.svelte';
  import Inline from '$lib/components/primitives/Inline.svelte';
  import Button from '$lib/components/primitives/Button.svelte';
  import { obsidianApiClient } from '$services/obsidianApiClient.js';
  import { onMount } from 'svelte';

  let searchQuery = '';
  let recentNotes = [];
  let loading = true;
  let error = null;

  const quickLinks = [
    {
      title: '今日日志',
      icon: '📅',
      path: getTodayJournalPath(),
      description: '查看或编辑今天的工作日志'
    },
    {
      title: '项目文件夹',
      icon: '🚀',
      path: '01_Execution/Projects',
      description: '浏览所有活跃项目'
    },
    {
      title: '想法收集',
      icon: '💡',
      path: '01_Execution/Ideas',
      description: '灵感和创意笔记'
    },
    {
      title: '知识库',
      icon: '📚',
      path: '00_Foundation/Knowledge_Base',
      description: '核心参考资料和学习内容'
    }
  ];

  const upcomingFeatures = [
    '文件夹浏览器',
    'Markdown查看和编辑',
    '全文搜索',
    '最近访问记录',
    '标签过滤',
    '笔记链接图谱'
  ];

  function getTodayJournalPath() {
    const today = new Date().toISOString().split('T')[0];
    const year = today.substring(0, 4);
    return `01_Execution/Daily_Operations/Logs/Journal_Entries/${year}/${today}-工作日志.md`;
  }

  onMount(async () => {
    try {
      // TODO: Implement recent notes fetching
      recentNotes = [];
      loading = false;
    } catch (err) {
      error = err.message;
      loading = false;
    }
  });

  async function openNote(path) {
    try {
      const content = await obsidianApiClient.readNote(path);
      // TODO: Navigate to note viewer page
      alert(`功能开发中\n\n路径: ${path}\n\n内容长度: ${content.length} 字符`);
    } catch (err) {
      alert(`无法打开笔记: ${err.message}`);
    }
  }
</script>

<svelte:head>
  <title>知识库 - VNext</title>
</svelte:head>

<PageLayout title="知识库" maxWidth="7xl" padding="md">
  <Stack spacing="8">
    <!-- Page Description -->
    <Text size="lg" color="secondary">
      浏览和管理您的Obsidian Vault
    </Text>

    <!-- Search Bar -->
    <div class="relative">
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="搜索笔记..."
        class="w-full px-4 py-3 pl-12 rounded-lg border bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 transition-colors"
        style="border-color: var(--surface-border-default);"
      />
      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-xl">
        🔍
      </span>
    </div>

    <!-- Quick Links - 2x2 Grid -->
    <div>
      <Heading level={2} size="xl" class="text-white mb-4">快速访问</Heading>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each quickLinks as link}
          <Card variant="elevated" size="md" interactive on:click={() => openNote(link.path)}>
            <Stack spacing="3">
              <div class="text-4xl">{link.icon}</div>
              <div>
                <Heading level={3} size="lg" class="text-white mb-1">
                  {link.title}
                </Heading>
                <Text size="sm" color="secondary">
                  {link.description}
                </Text>
              </div>
            </Stack>
          </Card>
        {/each}
      </div>
    </div>

    <!-- Features Coming Soon -->
    <Card variant="outlined" size="lg">
      <Stack spacing="4">
        <Inline spacing="2" align="center">
          <span class="text-2xl">🚧</span>
          <Heading level={3} size="lg" class="text-white">开发中的功能</Heading>
        </Inline>
        <ul class="space-y-2">
          {#each upcomingFeatures as feature}
            <li class="text-white/70 text-sm">• {feature}</li>
          {/each}
        </ul>
      </Stack>
    </Card>

    <!-- Help Info -->
    <Card variant="filled" size="md">
      <Stack spacing="3">
        <Inline spacing="2" align="center">
          <span class="text-xl">💡</span>
          <Heading level={4} size="md" class="text-white">提示</Heading>
        </Inline>
        <Text size="sm" color="secondary">
          知识库功能正在开发中。目前您可以通过工作流创建和更新笔记，完整的浏览和编辑功能即将推出。
        </Text>
      </Stack>
    </Card>

  </Stack>
</PageLayout>

<style>
  /* Custom scrollbar for inputs if needed */
  input::-webkit-scrollbar {
    display: none;
  }
</style>
