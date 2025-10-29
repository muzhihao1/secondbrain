<script>
  /**
   * RecentJournalPreview - Display recent daily journal entries
   *
   * Shows 1-2 most recent journal entries to provide context and
   * continuity. Implements the "聚合信息" (Aggregate Information)
   * principle by surfacing recent reflections and progress.
   *
   * @component
   * @example
   * <RecentJournalPreview />
   */

  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import Card from './Card.svelte';
  import Stack from '../primitives/Stack.svelte';
  import Inline from '../primitives/Inline.svelte';
  import Heading from '../primitives/Heading.svelte';
  import Text from '../primitives/Text.svelte';
  import Button from '../primitives/Button.svelte';

  /**
   * Maximum number of journal entries to display
   * @type {number}
   */
  export let maxEntries = 2;

  // State
  let journals = [];
  let loading = true;

  // Load journals on mount
  onMount(async () => {
    await loadJournals();
  });

  /**
   * Load recent journal entries from Obsidian
   * TODO: Replace with actual Obsidian API call
   */
  async function loadJournals() {
    loading = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock data - replace with Obsidian API query
    // In production, query from 01_Execution/Daily_Operations/Logs/Journal_Entries/
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    journals = [
      {
        id: '1',
        date: today.toISOString().split('T')[0],
        title: 'Today\'s Progress',
        summary: 'Completed the Dashboard redesign with 4 core components. Made significant progress on the Timeline implementation. Feeling productive and focused on delivering value.',
        wordCount: 450,
        tags: ['development', 'progress', 'productive']
      },
      {
        id: '2',
        date: yesterday.toISOString().split('T')[0],
        title: 'System Architecture Analysis',
        summary: 'Deep dive into the system architecture using Ultra MCP. Identified key improvements needed for the Dashboard. Created comprehensive implementation plan.',
        wordCount: 380,
        tags: ['architecture', 'planning', 'analysis']
      }
    ].slice(0, maxEntries);

    loading = false;
  }

  /**
   * Format date for display
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  }

  /**
   * Navigate to journal detail
   */
  function viewJournal(journal) {
    // TODO: Navigate to timeline daily view when implemented
    // goto(`/timeline/daily/${journal.date}`);
    console.log('View journal:', journal.date);
    alert(`Opening journal: ${journal.date}\n\nThis will navigate to /timeline/daily/${journal.date}`);
  }

  /**
   * Navigate to timeline
   */
  function viewAllJournals() {
    // TODO: Navigate to timeline when implemented
    // goto('/timeline/daily');
    console.log('View all journals');
    alert('Opening timeline view\n\nThis will navigate to /timeline/daily');
  }
</script>

<Stack spacing="4">
  <!-- Section Header -->
  <Inline spacing="3" align="center" justify="space-between">
    <Inline spacing="2" align="center">
      <span class="text-v-2xl">📖</span>
      <Heading level={2} size="2xl">Recent Journals</Heading>
    </Inline>

    <Button
      variant="ghost"
      size="sm"
      on:click={viewAllJournals}
      class="text-v-text-secondary hover:text-v-primary"
    >
      Timeline →
    </Button>
  </Inline>

  <Text size="sm" color="secondary">
    Your latest reflections and daily progress
  </Text>

  <!-- Loading State -->
  {#if loading}
    <Stack spacing="3">
      {#each Array(maxEntries) as _}
        <div class="animate-pulse">
          <Card variant="outlined" size="md">
            <Stack spacing="3">
              <div class="h-6 bg-v-surface-secondary rounded-v-base w-1/3"></div>
              <div class="h-4 bg-v-surface-secondary rounded-v-base"></div>
              <div class="h-4 bg-v-surface-secondary rounded-v-base w-5/6"></div>
            </Stack>
          </Card>
        </div>
      {/each}
    </Stack>

  <!-- Empty State -->
  {:else if journals.length === 0}
    <Card variant="outlined" size="md" class="bg-v-surface/50">
      <div class="py-v-8 text-center">
        <Stack spacing="3">
          <span class="text-v-4xl">📝</span>
          <Text size="base" color="secondary">No journal entries yet</Text>
          <Text size="sm" color="tertiary">
            Start by completing your first daily reflection
          </Text>
          <Button
            variant="primary"
            size="sm"
            class="mx-auto mt-v-2"
          >
            Start Daily Reflection
          </Button>
        </Stack>
      </div>
    </Card>

  <!-- Journals List -->
  {:else}
    <Stack spacing="3">
      {#each journals as journal (journal.id)}
        <Card
          variant="outlined"
          size="md"
          interactive={true}
          class="hover:border-v-primary/50 transition-all duration-200 cursor-pointer"
          on:click={() => viewJournal(journal)}
        >
          <Stack spacing="3">
            <!-- Header -->
            <Inline spacing="3" align="center" justify="space-between">
              <Inline spacing="2" align="center">
                <span class="text-v-lg">📅</span>
                <Heading level={4} size="base">
                  {formatDate(journal.date)}
                </Heading>
              </Inline>

              <Text size="xs" color="tertiary">
                {journal.wordCount} words
              </Text>
            </Inline>

            <!-- Summary -->
            <Text size="sm" color="secondary" class="line-clamp-2">
              {journal.summary}
            </Text>

            <!-- Tags -->
            {#if journal.tags && journal.tags.length > 0}
              <Inline spacing="2" wrap>
                {#each journal.tags as tag}
                  <span
                    class="px-v-2 py-v-0.5 rounded-v-full bg-v-surface-secondary text-v-text-tertiary text-v-xs font-v-medium"
                  >
                    #{tag}
                  </span>
                {/each}
              </Inline>
            {/if}

            <!-- Read More -->
            <Text size="xs" color="primary" class="font-v-medium hover:underline">
              Read full entry →
            </Text>
          </Stack>
        </Card>
      {/each}

      <!-- View All Button -->
      <Button
        variant="outline"
        size="md"
        on:click={viewAllJournals}
        class="w-full"
      >
        View All Journal Entries
      </Button>
    </Stack>
  {/if}
</Stack>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

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
