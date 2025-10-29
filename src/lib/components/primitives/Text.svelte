<script>
  /**
   * Text - Typography primitive for body text
   *
   * Provides consistent text styling with semantic size and color variants.
   * Use for paragraphs, labels, and body content.
   *
   * @component
   * @example
   * <Text size="base" color="primary">
   *   Body text content
   * </Text>
   */

  /**
   * Text size
   * @type {'xs' | 'sm' | 'base' | 'lg' | 'xl'}
   */
  export let size = 'base';

  /**
   * Text color
   * @type {'primary' | 'secondary' | 'tertiary' | 'accent' | 'success' | 'warning' | 'error' | 'inverse'}
   */
  export let color = 'primary';

  /**
   * Font weight
   * @type {'light' | 'normal' | 'medium' | 'semibold' | 'bold'}
   */
  export let weight = 'normal';

  /**
   * Text alignment
   * @type {'left' | 'center' | 'right' | 'justify'}
   */
  export let align = 'left';

  /**
   * Line height
   * @type {'tight' | 'normal' | 'relaxed' | 'loose'}
   */
  export let lineHeight = 'normal';

  /**
   * Whether text should truncate with ellipsis
   * @type {boolean}
   */
  export let truncate = false;

  /**
   * HTML element to render
   * @type {'p' | 'span' | 'div' | 'label'}
   */
  export let as = 'p';

  // Compute classes
  $: sizeClass = `text-v-${size}`;

  $: colorClass = {
    'primary': 'text-v-text-primary',
    'secondary': 'text-v-text-secondary',
    'tertiary': 'text-v-text-tertiary',
    'accent': 'text-v-text-accent',
    'success': 'text-v-success',
    'warning': 'text-v-warning',
    'error': 'text-v-error',
    'inverse': 'text-v-text-inverse'
  }[color];

  $: weightClass = `font-v-${weight}`;
  $: alignClass = `text-${align}`;
  $: lineHeightClass = `leading-v-${lineHeight}`;
  $: truncateClass = truncate ? 'truncate' : '';
</script>

<svelte:element
  this={as}
  class="
    {sizeClass}
    {colorClass}
    {weightClass}
    {alignClass}
    {lineHeightClass}
    {truncateClass}
  "
  {...$$restProps}
>
  <slot />
</svelte:element>
