<script>
  /**
   * Sidebar - Left navigation sidebar with expand/collapse
   *
   * Features:
   * - Expandable width (72px collapsed → 240px expanded)
   * - Deep black background (#000000)
   * - Lucide Icons for professional appearance
   * - Text labels in expanded state
   * - Active state with cyan indicator
   * - Smooth animations
   * - localStorage persistence
   */

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { navItems, settingsIcon } from '$lib/config/navItems.js';
  import { sidebarExpanded, toggleSidebar } from '$lib/stores/sidebarStore.js';
  import { Menu, ChevronLeft, ChevronRight } from 'lucide-svelte';

  // Check if path is active
  $: currentPath = $page.url.pathname;
  function isActive(href) {
    if (href === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(href);
  }

  // Navigate to path
  function navigate(href) {
    goto(href);
  }

  // Handle toggle
  function handleToggle() {
    toggleSidebar();
  }
</script>

<!-- Sidebar Container with dynamic width -->
<aside
  class="fixed left-0 top-0 h-screen bg-black border-r border-white/5 flex flex-col py-4 z-50 transition-all duration-200 ease-out"
  class:w-18={!$sidebarExpanded}
  class:w-60={$sidebarExpanded}
>
  <!-- Header with toggle -->
  <div class="mb-8 px-3 flex items-center justify-between w-full">
    <button
      class="w-10 h-10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
      aria-label="Menu"
    >
      <Menu size={20} stroke-width={2} />
    </button>

    <!-- Toggle Button (only visible when expanded) -->
    {#if $sidebarExpanded}
      <button
        on:click={handleToggle}
        class="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-200"
        aria-label="Collapse sidebar"
        title="Collapse sidebar"
      >
        <ChevronLeft size={18} stroke-width={2} />
      </button>
    {/if}
  </div>

  <!-- Navigation Items -->
  <nav class="flex-1 flex flex-col gap-2 w-full px-3">
    {#each navItems as item (item.id)}
      {@const IconComponent = item.icon}
      <button
        on:click={() => navigate(item.href)}
        class="relative w-full h-12 rounded-lg flex items-center gap-3 transition-all duration-200 {isActive(item.href)
          ? 'text-white bg-white/5'
          : 'text-white/40 hover:text-white/80 hover:bg-white/5'}"
        class:justify-center={!$sidebarExpanded}
        class:justify-start={$sidebarExpanded}
        class:px-3={$sidebarExpanded}
        aria-label={item.label}
        aria-current={isActive(item.href) ? 'page' : undefined}
      >
        <svelte:component this={IconComponent} size={20} stroke-width={2} class="shrink-0" />

        <!-- Text Label (only visible when expanded) -->
        {#if $sidebarExpanded}
          <span class="text-sm font-medium whitespace-nowrap transition-opacity duration-200">
            {item.label}
          </span>
        {/if}

        <!-- Active Indicator -->
        {#if isActive(item.href)}
          <div
            class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-500 rounded-r-full"
            style="background-color: var(--color-brand-primary-500, #00A9A5);"
          ></div>
        {/if}
      </button>
    {/each}
  </nav>

  <!-- Bottom Actions -->
  <div class="px-3 flex flex-col gap-2">
    <!-- Expand/Collapse Toggle (when collapsed) -->
    {#if !$sidebarExpanded}
      <button
        on:click={handleToggle}
        class="w-full h-10 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-200"
        aria-label="Expand sidebar"
        title="Expand sidebar"
      >
        <ChevronRight size={20} stroke-width={2} />
      </button>
    {/if}

    <!-- Settings Button -->
    <button
      class="w-full h-10 rounded-lg flex items-center gap-3 text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-200"
      class:justify-center={!$sidebarExpanded}
      class:justify-start={$sidebarExpanded}
      class:px-3={$sidebarExpanded}
      aria-label="Settings"
    >
      <svelte:component this={settingsIcon} size={20} stroke-width={2} class="shrink-0" />
      {#if $sidebarExpanded}
        <span class="text-sm font-medium whitespace-nowrap">Settings</span>
      {/if}
    </button>
  </div>
</aside>

<style>
  /* Ensure sidebar is always on top and has proper spacing */
  aside {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }

  /* Smooth hover transitions */
  button {
    cursor: pointer;
    user-select: none;
  }

  button:active {
    transform: scale(0.95);
  }
</style>
