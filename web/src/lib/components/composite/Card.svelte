<script>
  /**
   * Card - Composite component for displaying content in a card layout
   *
   * A flexible card component that combines Box, Stack, and other primitives
   * to create a cohesive content container. Supports multiple variants and
   * interactive states for different use cases.
   *
   * Based on the "聚合信息，聚焦行动" (Aggregate Information, Focus Action) principle.
   *
   * @component
   * @example
   * <Card variant="elevated" interactive>
   *   <svelte:fragment slot="header">
   *     <Heading level={3}>Card Title</Heading>
   *   </svelte:fragment>
   *   <Text>Card content goes here...</Text>
   *   <svelte:fragment slot="footer">
   *     <Button size="sm">Action</Button>
   *   </svelte:fragment>
   * </Card>
   */

  import Box from '../primitives/Box.svelte';
  import Stack from '../primitives/Stack.svelte';

  /**
   * Card visual variant
   * @type {'elevated' | 'outlined' | 'filled'}
   */
  export let variant = 'elevated';

  /**
   * Card size (affects padding)
   * @type {'sm' | 'md' | 'lg'}
   */
  export let size = 'md';

  /**
   * Whether the card is interactive (clickable/hoverable)
   * @type {boolean}
   */
  export let interactive = false;

  /**
   * Whether the card is disabled (for interactive cards)
   * @type {boolean}
   */
  export let disabled = false;

  /**
   * Full width card
   * @type {boolean}
   */
  export let fullWidth = false;

  /**
   * ARIA role for the card
   * @type {string}
   */
  export let role = interactive ? 'button' : 'article';

  /**
   * Tab index for keyboard navigation (interactive cards)
   * @type {number}
   */
  export let tabindex = interactive && !disabled ? 0 : undefined;

  // Compute variant classes
  $: variantClass = {
    elevated: 'bg-v-surface shadow-v-card border-v-border-subtle',
    outlined: 'bg-v-surface border-v-border',
    filled: 'bg-v-bg-elevated border-v-border-subtle'
  }[variant];

  // Compute size classes (padding)
  $: sizeClass = {
    sm: 'p-v-4',
    md: 'p-v-6',
    lg: 'p-v-8'
  }[size];

  // Compute interactive classes
  $: interactiveClass = interactive
    ? disabled
      ? 'opacity-50 cursor-not-allowed'
      : 'cursor-pointer hover:shadow-v-card-hover hover:border-v-border-accent transition-all duration-200'
    : '';

  $: widthClass = fullWidth ? 'w-full' : '';

  // Keyboard event handler for interactive cards
  function handleKeyDown(event) {
    if (interactive && !disabled && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      event.currentTarget.click();
    }
  }
</script>

<Box
  class="
    rounded-v-lg
    border
    overflow-hidden
    {variantClass}
    {sizeClass}
    {interactiveClass}
    {widthClass}
  "
  {role}
  {tabindex}
  aria-disabled={interactive && disabled ? 'true' : undefined}
  on:click
  on:mouseenter
  on:mouseleave
  on:focus
  on:blur
  on:keydown={handleKeyDown}
  {...$$restProps}
>
  <Stack spacing="4">
    {#if $$slots.header}
      <div class="card-header">
        <slot name="header" />
      </div>
    {/if}

    <div class="card-body">
      <slot />
    </div>

    {#if $$slots.footer}
      <div class="card-footer">
        <slot name="footer" />
      </div>
    {/if}
  </Stack>
</Box>

<style>
  /* Card-specific styles */
  .card-header {
    /* Header styling can be enhanced here if needed */
  }

  .card-body {
    flex: 1;
    /* Body takes remaining space */
  }

  .card-footer {
    /* Footer styling can be enhanced here if needed */
  }
</style>
