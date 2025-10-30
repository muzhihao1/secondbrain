<script>
  /**
   * Home Dashboard - 真正的卡片式设计
   *
   * 使用Card组件创建2x2网格布局，完全匹配mockup
   * 使用 Lucide Icons 替代 Emoji
   */

  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import PageLayout from '$lib/components/layout/PageLayout.svelte';
  import Card from '$lib/components/composite/Card.svelte';
  import Heading from '$lib/components/primitives/Heading.svelte';
  import Text from '$lib/components/primitives/Text.svelte';
  import Button from '$lib/components/primitives/Button.svelte';
  import Inline from '$lib/components/primitives/Inline.svelte';
  import Stack from '$lib/components/primitives/Stack.svelte';
  import { documentIcons, workflowIcons } from '$lib/config/iconMap';
  import { obsidianApiClient } from '$lib/services/obsidianApiClient.js';

  // Recent notes data (will be loaded from vault)
  let recentNotes = [];
  let loadingNotes = true;

  // Workflow shortcuts with Lucide icons
  let workflowShortcuts = [
    { id: 'document', icon: documentIcons.text, label: 'Documents' },
    { id: 'upload', icon: documentIcons.upload, label: 'Upload' },
    { id: 'checklist', icon: workflowIcons.checklist, label: 'Checklist' },
    { id: 'grid', icon: workflowIcons.grid, label: 'Grid View' }
  ];

  // Today's dates
  let dates = [];
  const today = new Date();
  for (let i = -2; i <= 2; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    dates.push({
      day: date.getDate(),
      isToday: i === 0
    });
  }

  /**
   * Load recent notes from Obsidian vault on mount
   */
  async function loadRecentNotes() {
    try {
      loadingNotes = true;
      const timeline = await obsidianApiClient.getTimeline({ limit: 4 });

      if (timeline && Array.isArray(timeline.items)) {
        recentNotes = timeline.items.map(item => ({
          title: item.title,
          path: item.file_path,
          created: item.created,
          location: item.location
        }));
      }
    } catch (error) {
      console.error('Failed to load recent notes:', error);
      // Fallback to empty array on error
      recentNotes = [];
    } finally {
      loadingNotes = false;
    }
  }

  // Handlers
  function handleAddCapture() {
    goto('/capture');
  }

  function handleAddTask() {
    console.log('Add task clicked');
    // TODO: Implement task creation
  }

  function handleWorkflowClick(id) {
    console.log('Workflow clicked:', id);
    // Navigate to appropriate workflow pages
    switch (id) {
      case 'document':
        goto('/vault');
        break;
      case 'upload':
        goto('/capture');
        break;
      case 'checklist':
      case 'grid':
        goto('/workflows-gallery');
        break;
      default:
        goto('/workflows-gallery');
    }
  }

  function handleNoteClick(note) {
    console.log('Note clicked:', note);
    // Navigate to timeline or vault to view note
    goto('/timeline');
  }

  // Load data on mount
  onMount(() => {
    loadRecentNotes();
  });
</script>

<svelte:head>
  <title>Home - VNext</title>
</svelte:head>

<PageLayout title="Home" maxWidth="7xl" padding="md">
  <!-- 2x2 Card Grid - Using CSS Grid with proper constraints -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr">

      <!-- 1. Quick Capture Card (Top Left) -->
      <Card variant="elevated" size="lg" interactive on:click={handleAddCapture}>
        <svelte:fragment slot="header">
          <Heading level={2} size="xl" class="text-white">Quick Capture</Heading>
        </svelte:fragment>

        <Stack spacing="4">
          <Text size="md" class="text-white/60">
            Capture your thoughts, ideas, and notes instantly
          </Text>

          <div class="flex items-center justify-between pt-4 border-t border-white/10">
            <Text size="sm" class="text-white/40">
              Press <kbd class="px-2 py-1 bg-white/10 rounded text-xs font-mono">⌘N</kbd> or click to start
            </Text>
            <svelte:component
              this={documentIcons.text}
              size={32}
              stroke-width={1.5}
              class="text-brand-primary-500 opacity-60"
            />
          </div>
        </Stack>
      </Card>

      <!-- 2. Today's Focus Card (Top Right) -->
      <Card variant="elevated" size="lg">
        <svelte:fragment slot="header">
          <Heading level={2} size="xl" class="text-white">Today's focus</Heading>
        </svelte:fragment>

        <Stack spacing="4">
          <!-- Date Timeline -->
          <Inline spacing="3">
            {#each dates as date}
              <button
                class="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all {date.isToday
                  ? 'bg-v-primary text-white'
                  : 'bg-white/5 text-white/40 hover:bg-white/10'}"
              >
                {date.day}
              </button>
            {/each}
          </Inline>

          <!-- Add Task Button -->
          <Button
            variant="ghost"
            size="sm"
            on:click={handleAddTask}
            class="text-v-primary hover:text-v-primary-hover self-start"
          >
            <Inline spacing="2" align="center">
              <span class="text-lg">+</span>
              <span>Add task</span>
            </Inline>
          </Button>
        </Stack>
      </Card>

      <!-- 3. Recent Notes Card (Bottom Left) -->
      <Card variant="elevated" size="lg">
        <svelte:fragment slot="header">
          <Heading level={2} size="xl" class="text-white">Recent notes</Heading>
        </svelte:fragment>

        <Stack spacing="2">
          {#if loadingNotes}
            <div class="text-center py-4">
              <p class="text-white/40 text-sm">Loading...</p>
            </div>
          {:else if recentNotes.length === 0}
            <div class="text-center py-4">
              <p class="text-white/40 text-sm">No notes yet</p>
              <button
                on:click={handleAddCapture}
                class="mt-2 text-v-primary hover:text-v-primary-hover text-sm"
              >
                Start capturing →
              </button>
            </div>
          {:else}
            {#each recentNotes as note}
              <button
                on:click={() => handleNoteClick(note)}
                class="w-full text-left px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm flex items-center gap-2"
              >
                <span class="text-xs">
                  {#if note.location === '00_Capture/Inbox'}
                    📥
                  {:else if note.location === '01_Periodic/Daily'}
                    📅
                  {:else}
                    •
                  {/if}
                </span>
                <span class="flex-1 truncate">{note.title}</span>
              </button>
            {/each}
          {/if}
        </Stack>
      </Card>

      <!-- 4. Workflow Shortcuts Card (Bottom Right) -->
      <Card variant="elevated" size="lg">
        <svelte:fragment slot="header">
          <Heading level={2} size="xl" class="text-white">Workflow shortcuts</Heading>
        </svelte:fragment>

        <div class="grid grid-cols-2 gap-4">
          {#each workflowShortcuts as workflow}
            {@const IconComponent = workflow.icon}
            <button
              on:click={() => handleWorkflowClick(workflow.id)}
              class="aspect-square rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-v-primary/50 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              aria-label={workflow.label}
            >
              <svelte:component
                this={IconComponent}
                size={32}
                stroke-width={1.5}
                class="text-white/70 hover:text-white shrink-0"
              />
            </button>
          {/each}
        </div>
      </Card>

  </div>
</PageLayout>

<style>
  /* Ensure no layout overflow/cut-off */
  :global(body) {
    overflow-x: hidden;
  }
</style>
