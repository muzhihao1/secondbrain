<script>
  /**
   * TodayTasks - Display today's tasks from Obsidian
   *
   * Aggregates and displays tasks due today from the Obsidian vault.
   * Implements the "聚合信息" (Aggregate Information) principle by
   * surfacing actionable items that require immediate attention.
   *
   * @component
   * @example
   * <TodayTasks />
   */

  import { onMount } from 'svelte';
  import Card from './Card.svelte';
  import Stack from '../primitives/Stack.svelte';
  import Inline from '../primitives/Inline.svelte';
  import Heading from '../primitives/Heading.svelte';
  import Text from '../primitives/Text.svelte';
  import Button from '../primitives/Button.svelte';

  /**
   * Maximum number of tasks to display
   * @type {number}
   */
  export let maxTasks = 7;

  /**
   * Whether to show completed tasks
   * @type {boolean}
   */
  export let showCompleted = false;

  // State
  let tasks = [];
  let loading = true;

  // Load tasks on mount
  onMount(async () => {
    await loadTasks();
  });

  /**
   * Load today's tasks from Obsidian
   * TODO: Replace with actual Obsidian API call
   */
  async function loadTasks() {
    loading = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock data - replace with Obsidian API query
    tasks = [
      {
        id: '1',
        text: 'Review pull requests',
        completed: false,
        project: 'Development',
        priority: 'high',
        dueDate: new Date().toISOString()
      },
      {
        id: '2',
        text: 'Write daily reflection',
        completed: false,
        project: 'Personal',
        priority: 'medium',
        dueDate: new Date().toISOString()
      },
      {
        id: '3',
        text: 'Update project documentation',
        completed: false,
        project: 'Development',
        priority: 'low',
        dueDate: new Date().toISOString()
      }
    ];

    loading = false;
  }

  /**
   * Toggle task completion status
   */
  async function toggleTask(taskId) {
    tasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    // TODO: Sync with Obsidian
    console.log('Task toggled:', taskId);
  }

  /**
   * Get priority color
   */
  function getPriorityColor(priority) {
    const colors = {
      high: 'text-v-error',
      medium: 'text-v-warning',
      low: 'text-v-text-tertiary'
    };
    return colors[priority] || colors.low;
  }

  /**
   * Get priority icon
   */
  function getPriorityIcon(priority) {
    const icons = {
      high: '🔴',
      medium: '🟡',
      low: '🟢'
    };
    return icons[priority] || icons.low;
  }

  // Filter tasks
  $: displayedTasks = (showCompleted ? tasks : tasks.filter(t => !t.completed)).slice(0, maxTasks);
  $: hasMoreTasks = tasks.length > maxTasks;
</script>

<Card variant="outlined" size="md" class="bg-v-surface/80 backdrop-blur-sm">
  <Stack spacing="4">
    <!-- Header -->
    <Inline spacing="3" align="center" justify="space-between">
      <Inline spacing="2" align="center">
        <span class="text-v-2xl">📋</span>
        <Heading level={3} size="xl">Today's Tasks</Heading>
      </Inline>

      <Text size="sm" color="tertiary">
        {tasks.filter(t => !t.completed).length} pending
      </Text>
    </Inline>

    <!-- Loading State -->
    {#if loading}
      <Stack spacing="3">
        {#each Array(3) as _}
          <div class="animate-pulse">
            <div class="h-12 bg-v-surface-secondary rounded-v-base"></div>
          </div>
        {/each}
      </Stack>

    <!-- Empty State -->
    {:else if tasks.length === 0}
      <div class="py-v-8 text-center">
        <Stack spacing="2">
          <span class="text-v-4xl">✨</span>
          <Text size="base" color="secondary">No tasks for today</Text>
          <Text size="sm" color="tertiary">You're all caught up!</Text>
        </Stack>
      </div>

    <!-- Tasks List -->
    {:else}
      <Stack spacing="2">
        {#each displayedTasks as task (task.id)}
          <button
            class="w-full text-left p-v-3 rounded-v-base border border-v-border hover:border-v-primary/50 hover:bg-v-surface-secondary/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-v-primary/20 active:scale-[0.98]"
            on:click={() => toggleTask(task.id)}
          >
            <Inline spacing="3" align="start">
              <!-- Checkbox -->
              <div class="shrink-0 mt-v-1">
                <div
                  class="w-5 h-5 rounded-v-sm border-2 flex items-center justify-center transition-all duration-200 {task.completed
                    ? 'bg-v-primary border-v-primary'
                    : 'border-v-border hover:border-v-primary'}"
                >
                  {#if task.completed}
                    <span class="text-white text-xs">✓</span>
                  {/if}
                </div>
              </div>

              <!-- Task Content -->
              <Stack spacing="1" class="flex-1 min-w-0">
                <Text
                  size="base"
                  class="{task.completed
                    ? 'line-through text-v-text-tertiary'
                    : 'text-v-text-primary'}"
                >
                  {task.text}
                </Text>

                <Inline spacing="2" align="center" wrap>
                  <!-- Priority -->
                  <span class="text-xs {getPriorityColor(task.priority)}">
                    {getPriorityIcon(task.priority)}
                  </span>

                  <!-- Project Tag -->
                  {#if task.project}
                    <span
                      class="px-v-2 py-v-0.5 rounded-v-full bg-v-surface-secondary text-v-text-tertiary text-v-xs font-v-medium"
                    >
                      {task.project}
                    </span>
                  {/if}
                </Inline>
              </Stack>
            </Inline>
          </button>
        {/each}

        <!-- View More Link -->
        {#if hasMoreTasks}
          <Button
            variant="ghost"
            size="sm"
            class="w-full mt-v-2 text-v-text-secondary hover:text-v-primary"
          >
            View all {tasks.length} tasks →
          </Button>
        {/if}
      </Stack>
    {/if}
  </Stack>
</Card>

<style>
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
</style>
