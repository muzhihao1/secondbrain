<script>
  /**
   * Home Dashboard - 真正的卡片式设计
   *
   * 使用Card组件创建2x2网格布局，完全匹配mockup
   */

  import { goto } from '$app/navigation';
  import PageLayout from '$lib/components/layout/PageLayout.svelte';
  import Card from '$lib/components/composite/Card.svelte';
  import Heading from '$lib/components/primitives/Heading.svelte';
  import Text from '$lib/components/primitives/Text.svelte';
  import Button from '$lib/components/primitives/Button.svelte';
  import Inline from '$lib/components/primitives/Inline.svelte';
  import Stack from '$lib/components/primitives/Stack.svelte';

  // Recent notes data
  let recentNotes = [
    'Meeting summary',
    'Research ideas',
    'Todo list',
    'Project requirements'
  ];

  // Workflow shortcuts
  let workflowShortcuts = [
    { id: 'document', icon: '📄', label: 'Documents' },
    { id: 'upload', icon: '⬆️', label: 'Upload' },
    { id: 'checklist', icon: '📋', label: 'Checklist' },
    { id: 'grid', icon: '⊞', label: 'Grid View' }
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

  // Handlers
  function handleAddCapture() {
    goto('/capture');
  }

  function handleAddTask() {
    console.log('Add task clicked');
  }

  function handleWorkflowClick(id) {
    console.log('Workflow clicked:', id);
    if (id === 'checklist') {
      goto('/workflows-gallery');
    }
  }

  function handleNoteClick(note) {
    console.log('Note clicked:', note);
  }
</script>

<svelte:head>
  <title>Home - VNext</title>
</svelte:head>

<PageLayout title="Home" maxWidth="7xl" padding="md">
  <!-- 2x2 Card Grid - Using CSS Grid with proper constraints -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 auto-rows-fr">

      <!-- 1. Smart Capture Card (Top Left) -->
      <Card variant="elevated" size="lg" interactive>
        <svelte:fragment slot="header">
          <Heading level={2} size="xl" class="text-white">Smart capture</Heading>
        </svelte:fragment>

        <Stack spacing="4">
          <Inline spacing="3">
            <input
              type="text"
              placeholder="Search"
              class="flex-1 px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <Button
              variant="primary"
              size="md"
              on:click={handleAddCapture}
            >
              Add
            </Button>
          </Inline>
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
          {#each recentNotes as note}
            <button
              on:click={() => handleNoteClick(note)}
              class="w-full text-left px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all text-sm"
            >
              • {note}
            </button>
          {/each}
        </Stack>
      </Card>

      <!-- 4. Workflow Shortcuts Card (Bottom Right) -->
      <Card variant="elevated" size="lg">
        <svelte:fragment slot="header">
          <Heading level={2} size="xl" class="text-white">Workflow shortcuts</Heading>
        </svelte:fragment>

        <div class="grid grid-cols-2 gap-4">
          {#each workflowShortcuts as workflow}
            <button
              on:click={() => handleWorkflowClick(workflow.id)}
              class="aspect-square rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-v-primary/50 flex items-center justify-center text-4xl transition-all hover:scale-105 active:scale-95"
              aria-label={workflow.label}
            >
              {workflow.icon}
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
