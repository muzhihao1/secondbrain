<script>
  /**
   * Sidebar - Left navigation sidebar matching mockup design
   *
   * Features:
   * - Fixed width (72px) vertical icon navigation
   * - Deep black background (#000000)
   * - Icon-only navigation items
   * - Active state with cyan indicator
   * - Clean, minimal design
   */

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { navItems } from '$lib/config/navItems.js';

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
</script>

<!-- Sidebar Container -->
<aside
  class="fixed left-0 top-0 h-screen w-18 bg-black border-r border-white/5 flex flex-col items-center py-4 z-50"
>
  <!-- Logo / Menu -->
  <div class="mb-8">
    <button
      class="w-10 h-10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
      aria-label="Menu"
    >
      <span class="text-xl">☰</span>
    </button>
  </div>

  <!-- Navigation Items -->
  <nav class="flex-1 flex flex-col gap-2 w-full px-3">
    {#each navItems as item (item.id)}
      <button
        on:click={() => navigate(item.href)}
        class="relative w-full h-12 rounded-lg flex items-center justify-center text-2xl transition-all duration-200 {isActive(item.href)
          ? 'text-white bg-white/5'
          : 'text-white/40 hover:text-white/80 hover:bg-white/5'}"
        aria-label={item.label}
        aria-current={isActive(item.href) ? 'page' : undefined}
      >
        <span>{item.icon}</span>

        <!-- Active Indicator -->
        {#if isActive(item.href)}
          <div
            class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-500 rounded-r-full"
            style="background-color: var(--color-brand-teal-500, #00A9A5);"
          ></div>
        {/if}
      </button>
    {/each}
  </nav>

  <!-- Bottom Actions -->
  <div class="mt-auto">
    <button
      class="w-10 h-10 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/5 transition-all duration-200"
      aria-label="Settings"
    >
      <span class="text-xl">⚙️</span>
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
