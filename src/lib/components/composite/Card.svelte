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

  // Compute variant styles (using CSS custom properties directly)
  $: variantStyle = {
    elevated: 'background-color: var(--surface-surface-default); box-shadow: var(--shadow-card); border-color: var(--surface-border-subtle);',
    outlined: 'background-color: var(--surface-surface-default); border-color: var(--surface-border-default);',
    filled: 'background-color: var(--surface-bg-elevated); border-color: var(--surface-border-subtle);'
  }[variant];

  // Compute size styles (padding using CSS custom properties)
  $: sizeStyle = {
    sm: 'padding: var(--space-4);',
    md: 'padding: var(--space-6);',
    lg: 'padding: var(--space-8);'
  }[size];

  // Compute interactive classes (keep as classes for transitions)
  $: interactiveClass = interactive
    ? disabled
      ? 'opacity-50 cursor-not-allowed'
      : 'cursor-pointer transition-all duration-200'
    : '';

  $: widthClass = fullWidth ? 'w-full' : '';

  // Combined inline style
  $: inlineStyle = `${variantStyle} ${sizeStyle} border-radius: var(--radius-lg);`;

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
    border
    overflow-hidden
    {interactiveClass}
    {widthClass}
    card-component
  "
  style={inlineStyle}
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
  .card-component {
    border-width: 1px;
    border-style: solid;
  }

  /* Interactive hover effects */
  .card-component.cursor-pointer:hover {
    box-shadow: var(--shadow-card-hover) !important;
    border-color: var(--surface-border-accent) !important;
  }

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
