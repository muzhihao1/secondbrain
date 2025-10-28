<script>
  /**
   * QuickActions - Quick action buttons section for dashboard
   *
   * Displays common actions like creating workflows, importing,
   * browsing templates, and accessing settings.
   *
   * @component
   * @example
   * <QuickActions
   *   on:create={handleCreate}
   *   on:import={handleImport}
   *   on:templates={handleTemplates}
   *   on:settings={handleSettings}
   * />
   */

  import { createEventDispatcher } from 'svelte';
  import Card from '../composite/Card.svelte';
  import Button from '../primitives/Button.svelte';
  import Text from '../primitives/Text.svelte';
  import Stack from '../primitives/Stack.svelte';

  const dispatch = createEventDispatcher();

  /**
   * Handle action clicks
   * @param {string} action - Action type
   */
  function handleAction(action) {
    dispatch(action);
  }
</script>

<section class="quick-actions" aria-label="Quick Actions">
  <Card padding="6">
    <Stack direction="column" spacing="4">
      <!-- Section Title -->
      <div>
        <Text size="lg" weight="semibold" color="primary">
          Quick Actions
        </Text>
        <Text size="sm" color="secondary" class="mt-v-1">
          Common tasks and shortcuts
        </Text>
      </div>

      <!-- Action Buttons Grid -->
      <div class="actions-grid grid grid-cols-1 sm:grid-cols-2 gap-v-3">
        <!-- Create New Workflow -->
        <Button
          variant="primary"
          size="md"
          fullWidth
          on:click={() => handleAction('create')}
        >
          <svg
            class="w-5 h-5 mr-v-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create New Workflow
        </Button>

        <!-- Import Workflow -->
        <Button
          variant="secondary"
          size="md"
          fullWidth
          on:click={() => handleAction('import')}
        >
          <svg
            class="w-5 h-5 mr-v-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          Import Workflow
        </Button>

        <!-- Browse Templates -->
        <Button
          variant="secondary"
          size="md"
          fullWidth
          on:click={() => handleAction('templates')}
        >
          <svg
            class="w-5 h-5 mr-v-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
            />
          </svg>
          Browse Templates
        </Button>

        <!-- Settings -->
        <Button
          variant="ghost"
          size="md"
          fullWidth
          on:click={() => handleAction('settings')}
        >
          <svg
            class="w-5 h-5 mr-v-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Settings
        </Button>
      </div>
    </Stack>
  </Card>
</section>

<style>
  .actions-grid {
    /* Ensure buttons align nicely */
  }

  /* Mobile: Stack buttons vertically */
  @media (max-width: 640px) {
    .actions-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
