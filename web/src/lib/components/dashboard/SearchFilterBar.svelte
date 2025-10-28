<script>
  /**
   * SearchFilterBar - Search and filter controls for workflow lists
   *
   * Provides search input, status filter, and sort options.
   * Emits events when filters change.
   *
   * @component
   * @example
   * <SearchFilterBar
   *   searchQuery=""
   *   statusFilter="all"
   *   sortBy="recent"
   *   on:search={handleSearch}
   *   on:filter={handleFilter}
   *   on:sort={handleSort}
   * />
   */

  import { createEventDispatcher } from 'svelte';
  import Input from '../primitives/Input.svelte';
  import Stack from '../primitives/Stack.svelte';

  const dispatch = createEventDispatcher();

  /**
   * Current search query
   * @type {string}
   */
  export let searchQuery = '';

  /**
   * Current status filter
   * @type {'all' | 'active' | 'inactive'}
   */
  export let statusFilter = 'all';

  /**
   * Current sort option
   * @type {'recent' | 'name' | 'status'}
   */
  export let sortBy = 'recent';

  /**
   * Handle search input
   * @param {Event} event
   */
  function handleSearch(event) {
    searchQuery = event.target.value;
    dispatch('search', { query: searchQuery });
  }

  /**
   * Handle status filter change
   * @param {Event} event
   */
  function handleStatusChange(event) {
    statusFilter = event.target.value;
    dispatch('filter', { status: statusFilter });
  }

  /**
   * Handle sort change
   * @param {Event} event
   */
  function handleSortChange(event) {
    sortBy = event.target.value;
    dispatch('sort', { sortBy });
  }
</script>

<div class="search-filter-bar">
  <Stack direction="row" spacing="4" wrap class="items-end">
    <!-- Search Input -->
    <div class="search-input flex-1 min-w-[250px]">
      <label for="workflow-search" class="block text-sm font-medium text-v-text-primary mb-v-2">
        Search Workflows
      </label>
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            class="h-5 w-5 text-v-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <Input
          id="workflow-search"
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          on:input={handleSearch}
          class="pl-10"
        />
      </div>
    </div>

    <!-- Status Filter -->
    <div class="status-filter min-w-[150px]">
      <label for="status-filter" class="block text-sm font-medium text-v-text-primary mb-v-2">
        Status
      </label>
      <select
        id="status-filter"
        bind:value={statusFilter}
        on:change={handleStatusChange}
        class="select-input w-full px-v-3 py-v-2 border border-v-border rounded-v-md bg-v-surface text-v-text-primary focus:outline-none focus:ring-2 focus:ring-v-primary focus:border-transparent"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>

    <!-- Sort Options -->
    <div class="sort-options min-w-[150px]">
      <label for="sort-by" class="block text-sm font-medium text-v-text-primary mb-v-2">
        Sort By
      </label>
      <select
        id="sort-by"
        bind:value={sortBy}
        on:change={handleSortChange}
        class="select-input w-full px-v-3 py-v-2 border border-v-border rounded-v-md bg-v-surface text-v-text-primary focus:outline-none focus:ring-2 focus:ring-v-primary focus:border-transparent"
      >
        <option value="recent">Recent</option>
        <option value="name">Name (A-Z)</option>
        <option value="status">Status</option>
      </select>
    </div>
  </Stack>
</div>

<style>
  .select-input {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
  }

  .select-input:hover {
    border-color: var(--color-v-border-hover, #d1d5db);
  }

  .select-input:focus {
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  /* Responsive: Stack vertically on mobile */
  @media (max-width: 640px) {
    .search-filter-bar :global(.stack) {
      flex-direction: column;
      align-items: stretch !important;
    }

    .search-input,
    .status-filter,
    .sort-options {
      width: 100%;
      min-width: 100%;
    }
  }
</style>
