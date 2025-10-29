<script>
  /**
   * Container - Content width constrainer
   *
   * Limits content width to standard breakpoints and centers horizontally.
   * Ideal for creating consistent page layouts with controlled content width.
   *
   * @component
   * @example
   * <Container size="lg">
   *   <h1>Page Title</h1>
   *   <p>Content constrained to readable width...</p>
   * </Container>
   */

  /**
   * Maximum width constraint
   * @type {'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'}
   */
  export let size = 'lg';

  /**
   * Horizontal padding
   * @type {'0' | '2' | '4' | '6' | '8'}
   */
  export let padding = '4';

  /**
   * HTML element to render
   * @type {'div' | 'main' | 'section' | 'article'}
   */
  export let as = 'div';

  // Compute classes
  $: sizeClass = {
    'sm': 'max-w-v-sm',
    'md': 'max-w-v-md',
    'lg': 'max-w-v-lg',
    'xl': 'max-w-v-xl',
    '2xl': 'max-w-v-2xl',
    'full': 'max-w-full'
  }[size];

  $: paddingClass = padding !== '0' ? `px-v-${padding}` : '';
</script>

<svelte:element
  this={as}
  class="
    mx-auto
    w-full
    {sizeClass}
    {paddingClass}
  "
  {...$$restProps}
>
  <slot />
</svelte:element>
