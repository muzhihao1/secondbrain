<script>
  /**
   * StatsOverview - Dashboard statistics overview section
   *
   * Displays multiple statistics cards in a responsive grid layout.
   * Shows key metrics like total workflows, active count, recent usage, etc.
   *
   * @component
   * @example
   * <StatsOverview
   *   stats={{
   *     total: 24,
   *     active: 18,
   *     recent: 5,
   *     successRate: 0.92
   *   }}
   *   loading={false}
   * />
   */

  import StatCard from './StatCard.svelte';

  /**
   * Dashboard statistics data
   * @type {{
   *   total: number;
   *   active: number;
   *   recent: number;
   *   successRate?: number;
   * }}
   */
  export let stats = {
    total: 0,
    active: 0,
    recent: 0,
    successRate: 0
  };

  /**
   * Loading state
   * @type {boolean}
   */
  export let loading = false;

  /**
   * Format success rate as percentage
   * @param {number} rate - Success rate (0-1)
   * @returns {string}
   */
  function formatSuccessRate(rate) {
    return `${Math.round(rate * 100)}%`;
  }

  /**
   * Calculate trend (mock for now)
   * In real implementation, this would compare with previous period
   * @param {string} metric
   * @returns {string}
   */
  function getTrend(metric) {
    // Mock trends
    const trends = {
      total: '+12%',
      active: '+5%',
      recent: '+8%',
      successRate: '+2%'
    };
    return trends[metric] || '';
  }
</script>

<section class="stats-overview" aria-label="Dashboard Statistics">
  <div class="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-v-4">
    <!-- Total Workflows -->
    <StatCard
      label="Total Workflows"
      value={loading ? '—' : stats.total.toString()}
      trend={loading ? '' : getTrend('total')}
      trendUp={true}
      icon="workflows"
      {loading}
    />

    <!-- Active Workflows -->
    <StatCard
      label="Active Workflows"
      value={loading ? '—' : stats.active.toString()}
      trend={loading ? '' : getTrend('active')}
      trendUp={true}
      icon="active"
      {loading}
    />

    <!-- Recent Usage -->
    <StatCard
      label="Recent Usage"
      value={loading ? '—' : stats.recent.toString()}
      trend={loading ? '' : getTrend('recent')}
      trendUp={true}
      icon="recent"
      {loading}
    />

    <!-- Success Rate -->
    {#if stats.successRate !== undefined}
      <StatCard
        label="Success Rate"
        value={loading ? '—' : formatSuccessRate(stats.successRate)}
        trend={loading ? '' : getTrend('successRate')}
        trendUp={true}
        icon="success"
        {loading}
      />
    {/if}
  </div>
</section>

<style>
  .stats-grid {
    /* Ensure consistent card heights */
    grid-auto-rows: 1fr;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .stats-grid {
      gap: var(--spacing-v-3, 0.75rem);
    }
  }
</style>
