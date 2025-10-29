<script>
  /**
   * Workflows Vault Card View Page
   *
   * Enhanced workflow browsing experience with:
   * - Responsive grid layout (1/2/3 columns)
   * - Advanced search and filtering (SearchFilterBar)
   * - Sort options (recent, name, status)
   * - Pagination with Load More
   * - Loading and empty states
   * - Click cards to view details
   */

  import { onMount } from 'svelte';
  import WorkflowCard from '$lib/components/composite/WorkflowCard.svelte';
  import SearchFilterBar from '$lib/components/dashboard/SearchFilterBar.svelte';
  import EmptyState from '$lib/components/common/EmptyState.svelte';
  import Button from '$lib/components/primitives/Button.svelte';
  import Stack from '$lib/components/primitives/Stack.svelte';
  import Text from '$lib/components/primitives/Text.svelte';
  import {
    getMockWorkflows,
    filterWorkflows,
    sortWorkflows
  } from '$lib/data/mockWorkflows.js';

  // State
  let workflows = [];
  let loading = true;
  let searchQuery = '';
  let statusFilter = 'all';
  let sortBy = 'recent';

  // Pagination state
  let pageSize = 9; // 3x3 grid on desktop
  let visibleCount = pageSize;

  // Computed values
  $: filteredWorkflows = sortWorkflows(
    filterWorkflows(workflows, searchQuery, statusFilter),
    sortBy
  );
  $: displayedWorkflows = filteredWorkflows.slice(0, visibleCount);
  $: hasMore = visibleCount < filteredWorkflows.length;
  $: totalCount = filteredWorkflows.length;

  /**
   * Load workflows on mount
   */
  onMount(async () => {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 800));

    workflows = getMockWorkflows();
    loading = false;
  });

  /**
   * Handle search query change
   * @param {CustomEvent} event
   */
  function handleSearch(event) {
    searchQuery = event.detail.query;
    resetPagination();
  }

  /**
   * Handle status filter change
   * @param {CustomEvent} event
   */
  function handleFilter(event) {
    statusFilter = event.detail.status;
    resetPagination();
  }

  /**
   * Handle sort change
   * @param {CustomEvent} event
   */
  function handleSort(event) {
    sortBy = event.detail.sortBy;
    resetPagination();
  }

  /**
   * Reset pagination to first page
   */
  function resetPagination() {
    visibleCount = pageSize;
  }

  /**
   * Load more workflows
   */
  function handleLoadMore() {
    visibleCount = Math.min(visibleCount + pageSize, filteredWorkflows.length);
  }

  /**
   * Handle workflow card click
   * @param {object} workflow
   */
  function handleCardClick(workflow) {
    alert(`Workflow Details\n\nID: ${workflow.id}\nName: ${workflow.name}\nStatus: ${workflow.status}\n\nThis would navigate to /workflows/${workflow.id}`);
    // In real app: goto(`/workflows/${workflow.id}`)
  }

  /**
   * Handle create new workflow
   */
  function handleCreate() {
    alert('Create New Workflow\n\nThis would navigate to /workflows/new');
    // In real app: goto('/workflows/new')
  }
</script>

<svelte:head>
  <title>Workflows Vault - VNext</title>
  <meta name="description" content="Browse and manage all your workflows in the VNext vault" />
</svelte:head>

<main class="vault-page min-h-screen bg-v-background p-v-4 md:p-v-6 lg:p-v-8">
  <div class="vault-container max-w-7xl mx-auto">
    <!-- Page Header -->
    <header class="page-header mb-v-8">
      <Stack direction="column" spacing="2">
        <Text size="3xl" weight="bold" color="primary">
          Workflows Vault
        </Text>
        <Text size="md" color="secondary" aria-live="polite">
          {#if loading}
            Loading workflows...
          {:else}
            {totalCount} workflow{totalCount !== 1 ? 's' : ''} {searchQuery || statusFilter !== 'all' ? 'found' : 'available'}
          {/if}
        </Text>
      </Stack>
    </header>

    <!-- Search and Filters -->
    <div class="search-section mb-v-6">
      <SearchFilterBar
        {searchQuery}
        {statusFilter}
        {sortBy}
        on:search={handleSearch}
        on:filter={handleFilter}
        on:sort={handleSort}
      />
    </div>

    {#if loading}
      <!-- Loading Skeletons -->
      <div class="workflows-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-v-4">
        {#each Array(pageSize) as _, i}
          <div class="skeleton-card animate-pulse bg-v-surface border border-v-border rounded-v-lg p-v-4">
            <div class="h-6 bg-v-surface-hover rounded w-3/4 mb-v-3"></div>
            <div class="h-4 bg-v-surface-hover rounded w-1/2 mb-v-2"></div>
            <div class="h-4 bg-v-surface-hover rounded w-2/3 mb-v-2"></div>
            <div class="flex gap-2 mt-v-3">
              <div class="h-6 bg-v-surface-hover rounded w-16"></div>
              <div class="h-6 bg-v-surface-hover rounded w-16"></div>
            </div>
          </div>
        {/each}
      </div>
    {:else if displayedWorkflows.length === 0}
      <!-- Empty State -->
      <EmptyState
        icon={searchQuery || statusFilter !== 'all' ? 'search' : 'inbox'}
        title="No workflows found"
        description={searchQuery || statusFilter !== 'all'
          ? 'Try adjusting your search or filters to find what you\'re looking for.'
          : 'Get started by creating your first workflow.'}
      >
        {#if searchQuery || statusFilter !== 'all'}
          <Button
            variant="secondary"
            on:click={() => { searchQuery = ''; statusFilter = 'all'; }}
          >
            Clear Filters
          </Button>
        {:else}
          <Button
            variant="primary"
            on:click={handleCreate}
          >
            Create New Workflow
          </Button>
        {/if}
      </EmptyState>
    {:else}
      <!-- Workflows Grid -->
      <div class="workflows-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-v-4 mb-v-8">
        {#each displayedWorkflows as workflow (workflow.id)}
          <button
            class="workflow-card-button text-left focus:outline-none focus:ring-2 focus:ring-v-primary focus:ring-offset-2 rounded-v-lg transition-transform hover:scale-105"
            on:click={() => handleCardClick(workflow)}
            on:keydown={(e) => e.key === 'Enter' && handleCardClick(workflow)}
            aria-label="View {workflow.name} details"
            tabindex="0"
          >
            <WorkflowCard
              name={workflow.name}
              status={workflow.status}
              lastRun={workflow.lastRunAt}
              tags={workflow.tags || []}
            />
          </button>
        {/each}
      </div>

      <!-- Load More Section -->
      {#if hasMore || displayedWorkflows.length > 0}
        <div class="load-more-section text-center mt-v-8">
          <Stack direction="column" spacing="3" align="center">
            <Text size="sm" color="secondary">
              Showing {displayedWorkflows.length} of {totalCount} workflow{totalCount !== 1 ? 's' : ''}
            </Text>

            {#if hasMore}
              <Button
                variant="secondary"
                size="md"
                on:click={handleLoadMore}
              >
                Load More ({Math.min(pageSize, filteredWorkflows.length - visibleCount)} more)
              </Button>
            {/if}
          </Stack>
        </div>
      {/if}
    {/if}
  </div>
</main>

<style>
  .vault-page {
    min-height: 100vh;
  }

  .vault-container {
    animation: fadeIn 0.3s ease-in;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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

  /* Responsive grid adjustments */
  .workflows-grid {
    min-height: 300px;
  }

  /* Card button styling */
  .workflow-card-button {
    display: block;
    width: 100%;
    cursor: pointer;
    border: none;
    background: transparent;
    padding: 0;
  }

  .workflow-card-button:focus {
    outline: 2px solid var(--color-v-primary, #3b82f6);
    outline-offset: 2px;
  }

  /* Hover animation for cards */
  .workflow-card-button:hover {
    transform: translateY(-4px);
  }

  .workflow-card-button:active {
    transform: translateY(-2px);
  }

  /* Ensure cards maintain consistent height */
  .workflows-grid > * {
    height: 100%;
  }

  /* Mobile optimizations */
  @media (max-width: 768px) {
    .workflows-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Tablet optimizations */
  @media (min-width: 768px) and (max-width: 1024px) {
    .workflows-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  /* Desktop optimizations */
  @media (min-width: 1024px) {
    .workflows-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
