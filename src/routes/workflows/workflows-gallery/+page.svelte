<script>
  /**
   * Workflows Gallery Page
   *
   * Displays all available workflows in a card-based gallery layout.
   * Implements the "聚合信息，聚焦行动" (Aggregate Information, Focus Action) principle.
   *
   * Features:
   * - Grid layout of workflow cards
   * - Filter by status and tags
   * - Search functionality
   * - Quick actions on each workflow
   */

  import { goto } from '$app/navigation';
  import PageLayout from '$lib/components/layout/PageLayout.svelte';
  import Container from '$lib/components/primitives/Container.svelte';
  import Stack from '$lib/components/primitives/Stack.svelte';
  import Heading from '$lib/components/primitives/Heading.svelte';
  import Text from '$lib/components/primitives/Text.svelte';
  import Input from '$lib/components/primitives/Input.svelte';
  import Grid from '$lib/components/primitives/Grid.svelte';
  import Inline from '$lib/components/primitives/Inline.svelte';
  import Button from '$lib/components/primitives/Button.svelte';
  import WorkflowCard from '$lib/components/composite/WorkflowCard.svelte';

  // Sample workflow data
  let workflows = [
    {
      id: 1,
      title: 'Daily Reflection',
      description: 'Evening reflection and next-day planning workflow',
      status: 'active',
      lastUsed: '2025-10-27',
      tags: ['daily', 'reflection', 'planning'],
      icon: '🌙'
    },
    {
      id: 2,
      title: 'Weekly Review',
      description: 'Comprehensive weekly retrospective and goal setting',
      status: 'active',
      lastUsed: '2025-10-20',
      tags: ['weekly', 'review'],
      icon: '📊'
    },
    {
      id: 3,
      title: 'PARA Organization',
      description: 'Organize notes into Projects, Areas, Resources, Archives',
      status: 'active',
      lastUsed: '2025-10-27',
      tags: ['para', 'organization', 'obsidian'],
      icon: '📚'
    },
    {
      id: 4,
      title: 'Zettelkasten Processing',
      description: 'Convert fleeting notes into permanent knowledge',
      status: 'active',
      lastUsed: '2025-10-26',
      tags: ['zettelkasten', 'processing'],
      icon: '🗂️'
    },
    {
      id: 5,
      title: 'GTD Weekly Review',
      description: 'Get clear, get current, get creative',
      status: 'inactive',
      lastUsed: '2025-10-20',
      tags: ['gtd', 'productivity'],
      icon: '✅'
    },
    {
      id: 6,
      title: 'Project Kickoff',
      description: 'Template for starting new projects',
      status: 'draft',
      lastUsed: '',
      tags: ['template', 'projects'],
      icon: '🚀'
    },
    {
      id: 7,
      title: 'Morning Routine',
      description: 'Start your day with clarity and intention',
      status: 'active',
      lastUsed: '2025-10-27',
      tags: ['morning', 'routine'],
      icon: '☀️'
    },
    {
      id: 8,
      title: 'Evening Wind-Down',
      description: 'Prepare for restful sleep and tomorrow',
      status: 'active',
      lastUsed: '2025-10-26',
      tags: ['evening', 'sleep'],
      icon: '🌜'
    },
    {
      id: 9,
      title: 'Monthly Review',
      description: 'Deep dive into monthly progress and adjustments',
      status: 'active',
      lastUsed: '2025-09-30',
      tags: ['monthly', 'review'],
      icon: '📅'
    }
  ];

  // Filter states
  let searchQuery = '';
  let statusFilter = 'all'; // 'all' | 'active' | 'inactive' | 'draft'

  // Filtered workflows
  $: filteredWorkflows = workflows.filter((workflow) => {
    // Status filter
    if (statusFilter !== 'all' && workflow.status !== statusFilter) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = workflow.title.toLowerCase().includes(query);
      const matchesDescription = workflow.description.toLowerCase().includes(query);
      const matchesTags = workflow.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesTitle || matchesDescription || matchesTags;
    }

    return true;
  });

  // Event handlers
  function handleWorkflowClick(workflow) {
    console.log('Workflow clicked:', workflow.title);
    // Navigate to workflow detail page (for now go to workflows-gallery)
    // TODO: Create individual workflow detail pages
    goto(`/workflows-gallery`);
  }

  function handleQuickAction(workflow) {
    console.log('Quick action for:', workflow.title);
    // Execute workflow - for now show console message
    // TODO: Implement workflow execution logic
    alert(`Starting workflow: ${workflow.title}`);
  }

  function setStatusFilter(status) {
    statusFilter = status;
  }
</script>

<svelte:head>
  <title>Workflows Gallery - VNext</title>
</svelte:head>

<PageLayout title="Workflows Gallery" maxWidth="7xl" padding="md">
  <Stack spacing="8">
    <!-- Page Description -->
    <Text size="lg" color="secondary" class="max-w-3xl">
      Discover and manage your knowledge workflows. Click any card to view details or use quick
      actions to start immediately.
    </Text>

    <!-- Filters and Search -->
    <Stack spacing="4">
      <Input
        type="text"
        placeholder="Search workflows by name, description, or tags..."
        bind:value={searchQuery}
        fullWidth
        size="lg"
      />

      <Inline spacing="2" wrap>
        <Button
          variant={statusFilter === 'all' ? 'primary' : 'ghost'}
          size="sm"
          on:click={() => setStatusFilter('all')}
        >
          All ({workflows.length})
        </Button>
        <Button
          variant={statusFilter === 'active' ? 'primary' : 'ghost'}
          size="sm"
          on:click={() => setStatusFilter('active')}
        >
          Active ({workflows.filter((w) => w.status === 'active').length})
        </Button>
        <Button
          variant={statusFilter === 'inactive' ? 'primary' : 'ghost'}
          size="sm"
          on:click={() => setStatusFilter('inactive')}
        >
          Inactive ({workflows.filter((w) => w.status === 'inactive').length})
        </Button>
        <Button
          variant={statusFilter === 'draft' ? 'primary' : 'ghost'}
          size="sm"
          on:click={() => setStatusFilter('draft')}
        >
          Drafts ({workflows.filter((w) => w.status === 'draft').length})
        </Button>
      </Inline>
    </Stack>

    <!-- Workflows Grid -->
    {#if filteredWorkflows.length > 0}
      <Grid columns={{ base: 1, sm: 1, md: 2, lg: 2, xl: 3 }} gap="8">
        {#each filteredWorkflows as workflow (workflow.id)}
          <WorkflowCard
            title={workflow.title}
            description={workflow.description}
            status={workflow.status}
            lastUsed={workflow.lastUsed}
            tags={workflow.tags}
            icon={workflow.icon}
            variant="elevated"
            on:click={() => handleWorkflowClick(workflow)}
            on:action={() => handleQuickAction(workflow)}
          />
        {/each}
      </Grid>
    {:else}
      <div
        class="flex items-center justify-center py-v-12 bg-v-surface rounded-v-lg border border-v-border"
      >
        <Stack spacing="3" class="text-center">
          <Text size="lg" color="tertiary">No workflows found</Text>
          <Text size="sm" color="tertiary">
            Try adjusting your filters or search query
          </Text>
        </Stack>
      </div>
    {/if}

    <!-- Results Summary -->
    <Text size="sm" color="tertiary" class="text-center">
      Showing {filteredWorkflows.length} of {workflows.length} workflows
    </Text>
  </Stack>
</PageLayout>

<style>
  /* Additional page-specific styles */
</style>
