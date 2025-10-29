<script>
  /**
   * QuickCaptureEntry - Compact quick capture entry point for Dashboard
   *
   * A streamlined capture interface that provides immediate access to the full
   * capture page. Implements the "聚焦行动" (Focus Action) principle by making
   * capture functionality highly visible and easily accessible.
   *
   * @component
   * @example
   * <QuickCaptureEntry />
   */

  import { goto } from '$app/navigation';
  import Card from './Card.svelte';
  import Inline from '../primitives/Inline.svelte';
  import Button from '../primitives/Button.svelte';

  /**
   * Placeholder text for the input field
   * @type {string}
   */
  export let placeholder = '💭 记录你的想法... 点击展开完整输入';

  /**
   * Whether to show the voice recording button
   * @type {boolean}
   */
  export let showVoiceButton = true;

  /**
   * Navigate to full capture page
   */
  function handleClick() {
    goto('/capture');
  }

  /**
   * Navigate to capture page with focus on voice
   */
  function handleVoiceClick(event) {
    event.stopPropagation();
    goto('/capture?voice=true');
  }

  /**
   * Handle keyboard interaction
   */
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      goto('/capture');
    }
  }
</script>

<Card
  variant="outlined"
  size="sm"
  interactive={true}
  class="hover:border-v-primary transition-all duration-200 bg-gradient-to-r from-v-surface/50 to-v-surface/30 backdrop-blur-sm"
  on:click={handleClick}
>
  <Inline spacing="3" align="center" justify="space-between" class="w-full">
    <!-- Capture Input Area -->
    <button
      class="flex-1 text-left px-v-4 py-v-3 rounded-v-base bg-v-surface-secondary/30 border border-v-border/50 text-v-text-secondary hover:text-v-text-primary hover:border-v-primary/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-v-primary/20"
      on:click={handleClick}
      on:keypress={handleKeyPress}
      aria-label="Open quick capture"
    >
      <span class="text-v-base">{placeholder}</span>
    </button>

    <!-- Voice Recording Button -->
    {#if showVoiceButton}
      <Button
        variant="ghost"
        size="md"
        on:click={handleVoiceClick}
        aria-label="Start voice recording"
        class="shrink-0 hover:bg-v-primary/10 hover:text-v-primary"
      >
        <span class="text-v-xl">🎤</span>
      </Button>
    {/if}

    <!-- Keyboard Shortcut Hint -->
    <div class="hidden md:flex items-center gap-v-2 text-v-text-tertiary text-v-xs shrink-0">
      <kbd class="px-v-2 py-v-1 bg-v-surface-secondary rounded-v-sm border border-v-border font-v-mono">
        ⌘K
      </kbd>
    </div>
  </Inline>
</Card>

<style>
  kbd {
    font-family: var(--font-mono, 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace);
    font-size: 0.75rem;
    line-height: 1;
  }

  button:active {
    transform: scale(0.98);
  }
</style>
