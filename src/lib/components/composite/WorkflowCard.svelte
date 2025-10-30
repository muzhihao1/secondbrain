<script>
  /**
   * WorkflowCard - Specialized card for displaying workflow information
   *
   * Implements the "聚合信息，聚焦行动" (Aggregate Information, Focus Action) principle
   * by presenting workflow details in a scannable format with clear action buttons.
   *
   * @component
   * @example
   * <WorkflowCard
   *   title="Daily Reflection"
   *   description="Evening reflection and planning workflow"
   *   status="active"
   *   lastUsed="2025-10-27"
   *   tags={['daily', 'reflection']}
   *   on:click={handleWorkflowClick}
   *   on:action={handleQuickAction}
   * />
   */

  import { createEventDispatcher } from 'svelte';
  import Card from './Card.svelte';
  import Heading from '../primitives/Heading.svelte';
  import Text from '../primitives/Text.svelte';
  import Button from '../primitives/Button.svelte';
  import Stack from '../primitives/Stack.svelte';
  import Inline from '../primitives/Inline.svelte';

  /**
   * Workflow title
   * @type {string}
   */
  export let title = '';

  /**
   * Workflow description
   * @type {string}
   */
  export let description = '';

  /**
   * Workflow status
   * @type {'active' | 'inactive' | 'draft'}
   */
  export let status = 'active';

  /**
   * Last used timestamp (ISO string or formatted)
   * @type {string}
   */
  export let lastUsed = '';

  /**
   * Workflow tags/categories
   * @type {string[]}
   */
  export let tags = [];

  /**
   * Icon for the workflow (optional)
   * @type {string}
   */
  export let icon = '';

  /**
   * Card variant
   * @type {'elevated' | 'outlined' | 'filled'}
   */
  export let variant = 'elevated';

  /**
   * Whether the card is disabled
   * @type {boolean}
   */
  export let disabled = false;

  // Status colors
  $: statusColor = {
    active: 'text-v-success bg-v-success/10',
    inactive: 'text-v-text-tertiary bg-v-surface',
    draft: 'text-v-warning bg-v-warning/10'
  }[status];

  // Status labels
  $: statusLabel = {
    active: 'Active',
    inactive: 'Inactive',
    draft: 'Draft'
  }[status];

  // Format last used date
  $: formattedLastUsed = lastUsed
    ? new Date(lastUsed).toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    : '';

  const dispatch = createEventDispatcher();

  // Click handler
  function handleCardClick(event) {
    if (!disabled) {
      // Dispatch click event to parent
      dispatch('click', { title, status, tags });
    }
  }

  // Quick action handler
  function handleQuickAction(event) {
    event.stopPropagation(); // Prevent card click
    if (!disabled) {
      // Dispatch custom event
      dispatch('action', { title, status, tags });
    }
  }
</script>

<Card
  {variant}
  size="lg"
  interactive={!disabled}
  {disabled}
  on:click={handleCardClick}
>
  <svelte:fragment slot="header">
    <Stack spacing="4">
      <Inline spacing="3" align="center" justify="space-between">
        <Inline spacing="2" align="center">
          {#if icon}
            <span class="text-v-2xl">{icon}</span>
          {/if}
          <Heading level={3} size="lg">{title}</Heading>
        </Inline>

        <span
          class="px-v-3 py-v-1 rounded-v-full text-v-sm font-v-medium {statusColor}"
        >
          {statusLabel}
        </span>
      </Inline>

      {#if description}
        <Text size="sm" color="secondary">{description}</Text>
      {/if}
    </Stack>
  </svelte:fragment>

  <Stack spacing="4">
    {#if tags.length > 0}
      <Inline spacing="2" wrap>
        {#each tags as tag}
          <span
            class="px-v-3 py-v-1.5 rounded-v-base bg-v-surface text-v-text-tertiary text-v-xs font-v-medium"
          >
            #{tag}
          </span>
        {/each}
      </Inline>
    {/if}

    {#if lastUsed}
      <Text size="xs" color="tertiary">
        Last used: {formattedLastUsed}
      </Text>
    {/if}
  </Stack>

  <svelte:fragment slot="footer">
    <Inline spacing="2" justify="end">
      <Button
        variant="ghost"
        size="sm"
        on:click={handleQuickAction}
        disabled={disabled}
      >
        Quick Start
      </Button>
      <Button
        variant="primary"
        size="sm"
        on:click
        disabled={disabled}
      >
        View Details
      </Button>
    </Inline>
  </svelte:fragment>
</Card>

<style>
  /* Additional workflow card specific styles */
</style>
