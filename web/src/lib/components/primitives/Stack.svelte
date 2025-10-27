<script>
  /**
   * Stack - Vertical layout primitive
   *
   * Arranges children vertically with consistent spacing using flexbox.
   * Ideal for creating vertical layouts with controlled gaps.
   *
   * @component
   * @example
   * <Stack gap="4" align="center">
   *   <div>Item 1</div>
   *   <div>Item 2</div>
   *   <div>Item 3</div>
   * </Stack>
   */

  /**
   * Gap between items (using design token scale)
   * @type {'0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12'}
   */
  export let gap = '4';

  /**
   * Horizontal alignment of items
   * @type {'start' | 'center' | 'end' | 'stretch'}
   */
  export let align = 'stretch';

  /**
   * Vertical distribution of items
   * @type {'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'}
   */
  export let justify = 'start';

  /**
   * HTML element to render
   * @type {'div' | 'section' | 'article' | 'aside' | 'main' | 'header' | 'footer' | 'nav' | 'ul' | 'ol'}
   */
  export let as = 'div';

  /**
   * Whether items can wrap to next line
   * @type {boolean}
   */
  export let wrap = false;

  // Compute classes
  $: gapClass = `gap-v-${gap}`;

  $: alignClass = {
    'start': 'items-start',
    'center': 'items-center',
    'end': 'items-end',
    'stretch': 'items-stretch'
  }[align];

  $: justifyClass = {
    'start': 'justify-start',
    'center': 'justify-center',
    'end': 'justify-end',
    'space-between': 'justify-between',
    'space-around': 'justify-around',
    'space-evenly': 'justify-evenly'
  }[justify];

  $: wrapClass = wrap ? 'flex-wrap' : '';
</script>

<svelte:element
  this={as}
  class="
    flex flex-col
    {gapClass}
    {alignClass}
    {justifyClass}
    {wrapClass}
  "
  {...$$restProps}
>
  <slot />
</svelte:element>
