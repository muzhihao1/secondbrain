<script>
  import { onMount } from 'svelte';
  import StatsOverview from '$lib/components/dashboard/StatsOverview.svelte';
  import QuickActions from '$lib/components/dashboard/QuickActions.svelte';
  import SearchFilterBar from '$lib/components/dashboard/SearchFilterBar.svelte';
  import RecentWorkflows from '$lib/components/dashboard/RecentWorkflows.svelte';
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

  // Computed
  $: filteredWorkflows = sortWorkflows(
    filterWorkflows(workflows, searchQuery, statusFilter),
    sortBy
  );

  onMount(async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    workflows = getMockWorkflows();
    stats = calculateStats(workflows);
    loading = false;
  });

  function handleSearch(event) {
    searchQuery = event.detail.query;
  }

  function handleFilter(event) {
    statusFilter = event.detail.status;
  }

  function handleSort(event) {
    sortBy = event.detail.sortBy;
  }

  function handleCreate() {
    alert('Create New Workflow');
  }

  function handleImport() {
    alert('Import Workflow');
  }

  function handleTemplates() {
    alert('Browse Templates');
  }

  function handleSettings() {
    alert('Settings');
  }

  function handleRun(event) {
    const workflow = event.detail.workflow;
    alert(`Running workflow: ${workflow.name}`);
  }

  function handleEdit(event) {
    const workflow = event.detail.workflow;
    alert(`Edit workflow: ${workflow.name}`);
  }

  function handleDelete(event) {
    const workflow = event.detail.workflow;
    if (confirm(`Delete ${workflow.name}?`)) {
      workflows = workflows.filter(w => w.id !== workflow.id);
      stats = calculateStats(workflows);
    }
  }

  function handleViewAll() {
    alert('View All Workflows');
  }
</script>

<svelte:head>
  <title>Dashboard - VNext</title>
</svelte:head>

<main class="dashboard-page min-h-screen bg-v-background p-v-4 md:p-v-6 lg:p-v-8">
  <div class="dashboard-container max-w-7xl mx-auto">
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

    <div class="top-section grid grid-cols-1 lg:grid-cols-3 gap-v-6 mb-v-8">
      <div class="lg:col-span-2">
        <StatsOverview {stats} {loading} />
      </div>

      <div class="lg:col-span-1">
        <QuickActions
          on:create={handleCreate}
          on:import={handleImport}
          on:templates={handleTemplates}
          on:settings={handleSettings}
        />
      </div>
    </div>

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
