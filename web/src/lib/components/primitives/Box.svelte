<script>
  /**
   * Box - The fundamental layout primitive
   *
   * Box is the most basic layout component, providing a styled container
   * with flexible padding, margin, and display properties.
   *
   * @component
   * @example
   * <Box padding="4" background="surface">
   *   Content here
   * </Box>
   */

  /**
   * Padding size (using design token scale)
   * @type {'0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12'}
   */
  export let padding = '0';

  /**
   * Margin size (using design token scale)
   * @type {'0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12'}
   */
  export let margin = '0';

  /**
   * Background color
   * @type {'transparent' | 'bg-default' | 'bg-elevated' | 'surface' | 'surface-hover'}
   */
  export let background = 'transparent';

  /**
   * Border radius
   * @type {'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'}
   */
  export let borderRadius = 'none';

  /**
   * Display type
   * @type {'block' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid'}
   */
  export let display = 'block';

  /**
   * Border style
   * @type {'none' | 'default' | 'subtle' | 'strong'}
   */
  export let border = 'none';

  /**
   * HTML element to render
   * @type {'div' | 'section' | 'article' | 'aside' | 'main' | 'header' | 'footer' | 'nav'}
   */
  export let as = 'div';

  // Compute classes
  $: paddingClass = padding !== '0' ? `p-v-${padding}` : '';
  $: marginClass = margin !== '0' ? `m-v-${margin}` : '';

  $: bgClass = {
    'transparent': '',
    'bg-default': 'bg-v-bg-default',
    'bg-elevated': 'bg-v-bg-elevated',
    'surface': 'bg-v-surface',
    'surface-hover': 'bg-v-surface-hover'
  }[background];

  $: radiusClass = borderRadius !== 'none' ? `rounded-v-${borderRadius}` : '';

  $: borderClass = {
    'none': '',
    'default': 'border border-v-border',
    'subtle': 'border border-v-border-subtle',
    'strong': 'border border-v-border-strong'
  }[border];
</script>

<svelte:element
  this={as}
  class="
    {display}
    {paddingClass}
    {marginClass}
    {bgClass}
    {radiusClass}
    {borderClass}
  "
  {...$$restProps}
>
  <slot />
</svelte:element>
