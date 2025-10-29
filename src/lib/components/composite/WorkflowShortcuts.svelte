<script>
  /**
   * WorkflowShortcuts - Display core workflow shortcuts on Dashboard
   *
   * Shows 3-5 most important workflows for quick access.
   * Implements the "聚焦行动" (Focus Action) principle by highlighting
   * the most frequently used workflows without overwhelming the user.
   *
   * This is different from the Workflows Gallery which shows ALL workflows.
   * Think of this as "favorites" or "pinned workflows".
   *
   * @component
   * @example
   * <WorkflowShortcuts />
   */

  import { goto } from '$app/navigation';
  import Stack from '../primitives/Stack.svelte';
  import Grid from '../primitives/Grid.svelte';
  import Inline from '../primitives/Inline.svelte';
  import Heading from '../primitives/Heading.svelte';
  import Text from '../primitives/Text.svelte';
  import Button from '../primitives/Button.svelte';
  import WorkflowCard from './WorkflowCard.svelte';

  /**
   * Core workflows to display (most important ones)
   * In production, this could be user-configurable or based on usage patterns
   */
  const coreWorkflows = [
    {
      id: 'task-management',
      title: 'Task Management',
      description: 'Organize and track your daily tasks',
      status: 'active',
      lastUsed: new Date().toISOString(),
      tags: ['productivity', 'gtd', 'tasks'],
      icon: '🎯'
    },
    {
      id: 'daily-reflection',
      title: 'Daily Reflection & Planning',
      description: 'Evening reflection and next-day planning',
      status: 'active',
      lastUsed: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      tags: ['daily', 'reflection', 'planning'],
      icon: '🌙'
    },
    {
      id: 'writing-workflow',
      title: 'Start Writing',
      description: 'Structured writing and content creation',
      status: 'active',
      lastUsed: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      tags: ['writing', 'content', 'creativity'],
      icon: '✍️'
    },
    {
      id: 'weekly-review',
      title: 'Weekly Review',
      description: 'Comprehensive weekly retrospective',
      status: 'active',
      lastUsed: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
      tags: ['weekly', 'review', 'planning'],
      icon: '📊'
    }
  ];

  /**
   * Handle workflow click - navigate to workflow execution page
   */
  function handleWorkflowClick(workflow) {
    console.log('Starting workflow:', workflow.title);
    // TODO: Navigate to workflow execution page when implemented
    // goto(`/workflow/${workflow.id}`);
    alert(`Starting workflow: ${workflow.title}\n\nThis will navigate to the workflow execution page.`);
  }

  /**
   * Handle quick action - execute workflow immediately
   */
  function handleQuickAction(workflow) {
    console.log('Quick action for:', workflow.title);
    // TODO: Execute workflow logic
    alert(`Executing workflow: ${workflow.title}\n\nThis would run the workflow immediately.`);
  }

  /**
   * Navigate to workflows gallery
   */
  function viewAllWorkflows() {
    goto('/workflows-gallery');
  }
</script>

<Stack spacing="4">
  <!-- Section Header -->
  <Inline spacing="3" align="center" justify="space-between">
    <Inline spacing="2" align="center">
      <span class="text-v-2xl">⚡</span>
      <Heading level={2} size="2xl">Core Workflows</Heading>
    </Inline>

    <Button
      variant="ghost"
      size="sm"
      on:click={viewAllWorkflows}
      class="text-v-text-secondary hover:text-v-primary"
    >
      View all →
    </Button>
  </Inline>

  <Text size="sm" color="secondary">
    Quick access to your most frequently used workflows
  </Text>

  <!-- Workflows Grid -->
  <Grid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
    {#each coreWorkflows as workflow (workflow.id)}
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

  <!-- View All Workflows Link -->
  <div class="text-center mt-v-2">
    <Button
      variant="outline"
      size="md"
      on:click={viewAllWorkflows}
      class="w-full md:w-auto"
    >
      <Inline spacing="2" align="center">
        <span>Explore All Workflows</span>
        <span class="text-v-text-tertiary text-v-sm">({coreWorkflows.length + 8} total)</span>
      </Inline>
    </Button>
  </div>
</Stack>

<style>
  /* Additional component-specific styles if needed */
</style>
