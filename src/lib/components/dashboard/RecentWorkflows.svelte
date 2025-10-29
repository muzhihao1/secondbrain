<script>
  /**
   * RecentWorkflows - Recent workflows list section
   *
   * Displays a list of recent workflows with quick actions.
   * Shows empty state when no workflows exist or match filters.
   *
   * @component
   * @example
   * <RecentWorkflows
   *   workflows={filteredWorkflows}
   *   loading={false}
   *   on:run={handleRun}
   *   on:edit={handleEdit}
   *   on:delete={handleDelete}
   * />
   */

  import { createEventDispatcher } from 'svelte';
  import WorkflowCard from '../composite/WorkflowCard.svelte';
  import EmptyState from '../common/EmptyState.svelte';
  import Text from '../primitives/Text.svelte';
  import Button from '../primitives/Button.svelte';
  import Stack from '../primitives/Stack.svelte';

  const dispatch = createEventDispatcher();

  /**
   * List of workflows to display
   * @type {Array<{
   *   id: string;
   *   name: string;
   *   status: 'active' | 'inactive';
   *   lastRunAt: string | null;
   *   tags?: string[];
   * }>}
   */
  export let workflows = [];

  /**
   * Loading state
   * @type {boolean}
   */
  export let loading = false;

  /**
   * Maximum number of workflows to show
   * @type {number}
   */
  export let maxCount = 8;

  /**
   * Handle workflow action
   * @param {string} action - Action type
   * @param {object} workflow - Workflow data
   */
  function handleAction(action, workflow) {
    dispatch(action, { workflow });
  }

  // Get workflows to display (limit to maxCount)
  $: displayWorkflows = workflows.slice(0, maxCount);
  $: hasMore = workflows.length > maxCount;
</script>

<section class="recent-workflows" aria-label="Recent Workflows">
  <div class="section-header mb-v-4">
    <div class="flex items-center justify-between">
      <div>
        <Text size="lg" weight="semibold" color="primary">
          Recent Workflows
        </Text>
        <Text size="sm" color="secondary" class="mt-v-1">
          {workflows.length} workflow{workflows.length !== 1 ? 's' : ''} found
        </Text>
      </div>

      {#if hasMore}
        <Button
          variant="ghost"
          size="sm"
          on:click={() => dispatch('viewAll')}
        >
          View All ({workflows.length})
        </Button>
      {/if}
    </div>
  </div>

  {#if loading}
    <!-- Loading Skeletons -->
    <div class="workflows-loading space-y-v-3">
      {#each Array(3) as _, i}
        <div class="skeleton-card animate-pulse bg-v-surface border border-v-border rounded-v-lg p-v-4">
          <div class="h-5 bg-v-surface-hover rounded w-3/4 mb-v-3"></div>
          <div class="h-4 bg-v-surface-hover rounded w-1/2 mb-v-2"></div>
          <div class="h-4 bg-v-surface-hover rounded w-1/4"></div>
        </div>
      {/each}
    </div>
  {:else if displayWorkflows.length === 0}
    <!-- Empty State -->
    <EmptyState
      icon="inbox"
      title="No workflows found"
      description="Get started by creating your first workflow or adjust your filters."
    >
      <Button
        variant="primary"
        on:click={() => dispatch('create')}
      >
        Create New Workflow
      </Button>
      <Button
        variant="secondary"
        on:click={() => dispatch('import')}
      >
        Import Workflow
      </Button>
    </EmptyState>
  {:else}
    <!-- Workflows List -->
    <div class="workflows-list space-y-v-3">
      {#each displayWorkflows as workflow (workflow.id)}
        <div class="workflow-item">
          <WorkflowCard
            name={workflow.name}
            status={workflow.status}
            lastRun={workflow.lastRunAt}
            tags={workflow.tags || []}
          >
            <!-- Quick Actions -->
            <svelte:fragment slot="actions">
              <Stack direction="row" spacing="2">
                <Button
                  variant="ghost"
                  size="sm"
                  on:click={() => handleAction('run', workflow)}
                  aria-label="Run {workflow.name}"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Run
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  on:click={() => handleAction('edit', workflow)}
                  aria-label="Edit {workflow.name}"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Edit
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  on:click={() => handleAction('delete', workflow)}
                  aria-label="Delete {workflow.name}"
                  class="text-v-error hover:text-v-error hover:bg-red-50"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete
                </Button>
              </Stack>
            </svelte:fragment>
          </WorkflowCard>
        </div>
      {/each}
    </div>
  {/if}
</section>

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

  .workflow-item {
    transition: transform 0.2s ease;
  }

  .workflow-item:hover {
    transform: translateX(4px);
  }

  /* Ensure proper spacing in list */
  .workflows-list {
    min-height: 200px;
  }
</style>
