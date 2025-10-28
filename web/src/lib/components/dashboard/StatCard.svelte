<script>
  /**
   * StatCard - Statistics card component for dashboard metrics
   *
   * Displays a metric value with label, optional trend indicator,
   * and icon in a card layout.
   *
   * @component
   * @example
   * <StatCard
   *   label="Total Workflows"
   *   value="24"
   *   trend="+12%"
   *   trendUp={true}
   *   icon="workflows"
   * />
   */

  import Card from '../composite/Card.svelte';
  import Text from '../primitives/Text.svelte';

  /**
   * Metric label
   * @type {string}
   */
  export let label = '';

  /**
   * Metric value (displayed large)
   * @type {string | number}
   */
  export let value = '';

  /**
   * Optional trend text (e.g., "+12%" or "-5%")
   * @type {string}
   */
  export let trend = '';

  /**
   * Whether trend is positive (green) or negative (red)
   * @type {boolean}
   */
  export let trendUp = true;

  /**
   * Optional icon identifier
   * @type {'workflows' | 'active' | 'recent' | 'success'}
   */
  export let icon = undefined;

  /**
   * Loading state
   * @type {boolean}
   */
  export let loading = false;

  // Icon definitions
  const icons = {
    workflows: 'M4 4h16v2H4V4zm0 6h16v2H4v-2zm0 6h16v2H4v-2z',
    active: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    recent: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z',
    success: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'
  };

  const trendColor = trendUp ? 'text-green-600' : 'text-red-600';
</script>

<Card padding="6" hover={false}>
  <div class="stat-card flex items-start justify-between">
    <!-- Main Content -->
    <div class="stat-content flex-1">
      {#if loading}
        <!-- Loading Skeleton -->
        <div class="animate-pulse">
          <div class="h-4 bg-v-surface-hover rounded w-24 mb-v-2"></div>
          <div class="h-8 bg-v-surface-hover rounded w-16 mb-v-2"></div>
          {#if trend}
            <div class="h-3 bg-v-surface-hover rounded w-12"></div>
          {/if}
        </div>
      {:else}
        <!-- Label -->
        <Text size="sm" color="secondary" class="mb-v-1">
          {label}
        </Text>

        <!-- Value -->
        <Text size="3xl" weight="bold" color="primary" class="mb-v-2">
          {value}
        </Text>

        <!-- Trend -->
        {#if trend}
          <Text size="sm" class="{trendColor} font-medium">
            {trend}
          </Text>
        {/if}
      {/if}
    </div>

    <!-- Icon -->
    {#if icon && !loading}
      <div class="stat-icon p-v-3 rounded-v-lg bg-v-primary bg-opacity-10">
        <svg
          class="w-6 h-6 text-v-primary"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d={icons[icon]} />
        </svg>
      </div>
    {/if}
  </div>
</Card>

<style>
  .stat-card {
    min-height: 100px;
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
</style>
