<script>
  /**
   * Separator - Visual divider
   *
   * Creates horizontal or vertical separators to divide content sections.
   * Useful for creating visual hierarchy and structure.
   *
   * @component
   * @example
   * <Separator />
   * <Separator orientation="vertical" />
   */

  /**
   * Orientation of the separator
   * @type {'horizontal' | 'vertical'}
   */
  export let orientation = 'horizontal';

  /**
   * Visual style
   * @type {'default' | 'subtle' | 'strong'}
   */
  export let variant = 'default';

  /**
   * Spacing around separator
   * @type {'0' | '2' | '4' | '6' | '8'}
   */
  export let spacing = '0';

  /**
   * ARIA label for accessibility
   * @type {string}
   */
  export let label = 'Separator';

  // Compute classes
  $: orientationClasses = orientation === 'horizontal'
    ? `w-full h-px ${spacing !== '0' ? `my-v-${spacing}` : ''}`
    : `h-full w-px ${spacing !== '0' ? `mx-v-${spacing}` : ''}`;

  $: variantClass = {
    'default': 'bg-v-border',
    'subtle': 'bg-v-border-subtle',
    'strong': 'bg-v-border-strong'
  }[variant];
</script>

<div
  role="separator"
  aria-label={label}
  aria-orientation={orientation}
  class="
    {orientationClasses}
    {variantClass}
  "
  {...$$restProps}
/>
