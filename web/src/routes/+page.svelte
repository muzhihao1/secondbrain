<script>
  /**
   * Home Dashboard Page
   *
   * Main landing page for the VNext application.
   * Displays workflow statistics, quick actions, and recent workflows list.
   */

  import { onMount } from 'svelte';
  import StatsOverview from '$lib/components/dashboard/StatsOverview.svelte';
  import QuickActions from '$lib/components/dashboard/QuickActions.svelte';
  import SearchFilterBar from '$lib/components/dashboard/SearchFilterBar.svelte';
  import RecentWorkflows from '$lib/components/dashboard/RecentWorkflows.svelte';
  import Modal from '$lib/components/composite/Modal.svelte';
  import Button from '$lib/components/primitives/Button.svelte';
  import Stack from '$lib/components/primitives/Stack.svelte';
  import Text from '$lib/components/primitives/Text.svelte';
  import {
    getMockWorkflows,
    calculateStats,
    filterWorkflows,
    sortWorkflows
  } from '$lib/data/mockWorkflows.js';

  // State
  let workflows = [];
  let stats = { total: 0, active: 0, recent: 0, successRate: 0 };
  let loading = true;
  let searchQuery = '';
  let statusFilter = 'all';
  let sortBy = 'recent';
  let deleteModalOpen = false;
  let workflowToDelete = null;

  // Computed
  $: filteredWorkflows = sortWorkflows(
    filterWorkflows(workflows, searchQuery, statusFilter),
    sortBy
  );

  /**
   * Load workflows on mount
   */
  onMount(async () => {
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 800));

    workflows = getMockWorkflows();
    stats = calculateStats(workflows);
    loading = false;
  });

  /**
   * Handle search query change
   * @param {CustomEvent} event
   */
  function handleSearch(event) {
    searchQuery = event.detail.query;
  }

  /**
   * Handle status filter change
   * @param {CustomEvent} event
   */
  function handleFilter(event) {
    statusFilter = event.detail.status;
  }

  /**
   * Handle sort change
   * @param {CustomEvent} event
   */
  function handleSort(event) {
    sortBy = event.detail.sortBy;
  }

  /**
   * Handle create workflow action
   */
  function handleCreate() {
    alert('Create New Workflow\n\nThis would navigate to /workflows/new');
    // In real app: goto('/workflows/new')
  }

  /**
   * Handle import workflow action
   */
  function handleImport() {
    alert('Import Workflow\n\nThis would open an import dialog or navigate to /workflows/import');
    // In real app: goto('/workflows/import')
  }

  /**
   * Handle browse templates action
   */
  function handleTemplates() {
    alert('Browse Templates\n\nThis would navigate to /templates');
    // In real app: goto('/templates')
  }

  /**
   * Handle settings action
   */
  function handleSettings() {
    alert('Settings\n\nThis would navigate to /settings');
    // In real app: goto('/settings')
  }

  /**
   * Handle run workflow action
   * @param {CustomEvent} event
   */
  function handleRun(event) {
    const workflow = event.detail.workflow;
    alert(`Running workflow: ${workflow.name}\n\nThis would execute the workflow.`);
    // In real app: API call to run workflow
  }

  /**
   * Handle edit workflow action
   * @param {CustomEvent} event
   */
  function handleEdit(event) {
    const workflow = event.detail.workflow;
    alert(`Edit workflow: ${workflow.name}\n\nThis would navigate to /workflows/${workflow.id}/edit`);
    // In real app: goto(`/workflows/${workflow.id}/edit`)
  }

  /**
   * Handle delete workflow action
   * @param {CustomEvent} event
   */
  function handleDelete(event) {
    workflowToDelete = event.detail.workflow;
    deleteModalOpen = true;
  }

  /**
   * Confirm delete workflow
   */
  function confirmDelete() {
    if (workflowToDelete) {
      // Remove from workflows list
      workflows = workflows.filter(w => w.id !== workflowToDelete.id);

      // Recalculate stats
      stats = calculateStats(workflows);

      // Close modal
      deleteModalOpen = false;
      workflowToDelete = null;
    }
  }

  /**
   * Handle view all workflows
   */
  function handleViewAll() {
    alert('View All Workflows\n\nThis would navigate to /workflows or /vault');
    // In real app: goto('/workflows')
  }
</script>

<svelte:head>
  <title>Dashboard - VNext</title>
  <meta name="description" content="VNext workflow dashboard - manage and monitor your workflows" />
</svelte:head>

<main class="dashboard-page min-h-screen bg-v-background p-v-4 md:p-v-6 lg:p-v-8">
  <div class="dashboard-container max-w-7xl mx-auto">
    <!-- Page Header -->
    <header class="page-header mb-v-8">
      <Stack direction="column" spacing="2">
        <Text size="3xl" weight="bold" color="primary">
          Dashboard
        </Text>
        <Text size="md" color="secondary">
          Welcome back! Here's an overview of your workflows.
        </Text>
      </Stack>
    </header>

    <!-- Two Column Layout: Stats + Quick Actions -->
    <div class="top-section grid grid-cols-1 lg:grid-cols-3 gap-v-6 mb-v-8">
      <!-- Stats Overview (takes 2 columns) -->
      <div class="lg:col-span-2">
        <StatsOverview {stats} {loading} />
      </div>

      <!-- Quick Actions (takes 1 column) -->
      <div class="lg:col-span-1">
        <QuickActions
          on:create={handleCreate}
          on:import={handleImport}
          on:templates={handleTemplates}
          on:settings={handleSettings}
        />
      </div>
    </div>

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

    <!-- Recent Workflows List -->
    <div class="workflows-section">
      <RecentWorkflows
        workflows={filteredWorkflows}
        {loading}
        maxCount={8}
        on:run={handleRun}
        on:edit={handleEdit}
        on:delete={handleDelete}
        on:create={handleCreate}
        on:import={handleImport}
        on:viewAll={handleViewAll}
      />
    </div>
  </div>
</main>

<!-- Delete Confirmation Modal -->
<Modal
  bind:open={deleteModalOpen}
  title="Delete Workflow"
  size="sm"
  role="alertdialog"
>
  <Text color="primary" class="mb-v-3">
    Are you sure you want to delete <strong>{workflowToDelete?.name}</strong>?
  </Text>
  <Text size="sm" color="secondary">
    This action cannot be undone. All associated data will be permanently removed.
  </Text>

  <svelte:fragment slot="footer">
    <Button
      variant="secondary"
      on:click={() => { deleteModalOpen = false; workflowToDelete = null; }}
    >
      Cancel
    </Button>
    <Button
      variant="primary"
      on:click={confirmDelete}
      class="bg-red-600 hover:bg-red-700"
    >
      Delete
    </Button>
  </svelte:fragment>
</Modal>

<style>
  .dashboard-page {
    min-height: 100vh;
  }

  .dashboard-container {
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

  /* Responsive adjustments */
  @media (max-width: 1024px) {
    .top-section {
      grid-template-columns: 1fr;
    }
  }
</style>
