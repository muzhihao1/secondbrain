<script>
  /**
   * EmptyState - Reusable component for displaying empty/no-data states
   *
   * Shows an icon, message, and optional call-to-action buttons
   * when there's no content to display.
   *
   * @component
   * @example
   * <EmptyState
   *   icon="inbox"
   *   title="No workflows yet"
   *   description="Get started by creating your first workflow"
   * >
   *   <Button on:click={handleCreate}>Create Workflow</Button>
   * </EmptyState>
   */

  import Text from '../primitives/Text.svelte';
  import Stack from '../primitives/Stack.svelte';

  /**
   * Icon type to display
   * @type {'inbox' | 'search' | 'alert' | 'info'}
   */
  export let icon = 'inbox';

  /**
   * Main title text
   * @type {string}
   */
  export let title = '';

  /**
   * Optional description text
   * @type {string}
   */
  export let description = '';

  // Icon SVG paths
  const icons = {
    inbox: 'M3 3h18v18H3V3zm2 2v14h14V5H5zm2 10h10v-2H7v2zm0-4h10V9H7v2z',
    search: 'M15.5 14h-.79l-.28-.27a6.5 6.5 0 10-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
    alert: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
    info: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'
  };
</script>

<div class="empty-state py-v-12 px-v-6 text-center">
  <Stack direction="column" spacing="4" align="center">
    <!-- Icon -->
    <div class="empty-state-icon w-16 h-16 rounded-full bg-v-surface-hover flex items-center justify-center">
      <svg
        class="w-8 h-8 text-v-text-secondary"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d={icons[icon]} />
      </svg>
    </div>

    <!-- Text Content -->
    <div class="empty-state-content max-w-md">
      {#if title}
        <Text size="lg" weight="semibold" color="primary" class="mb-v-2">
          {title}
        </Text>
      {/if}

      {#if description}
        <Text size="sm" color="secondary">
          {description}
        </Text>
      {/if}
    </div>

    <!-- Action Buttons (slot) -->
    {#if $$slots.default}
      <div class="empty-state-actions flex gap-v-3 mt-v-4">
        <slot />
      </div>
    {/if}
  </Stack>
</div>

<style>
  .empty-state {
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .empty-state-icon {
    transition: background-color 0.2s ease;
  }

  .empty-state:hover .empty-state-icon {
    background-color: var(--color-v-surface-active, #f3f4f6);
  }
</style>
