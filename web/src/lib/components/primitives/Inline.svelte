<script>
  /**
   * Inline - Horizontal layout primitive
   *
   * Arranges children horizontally with consistent spacing using flexbox.
   * Ideal for creating horizontal layouts, button groups, and inline elements.
   *
   * @component
   * @example
   * <Inline gap="2" align="center">
   *   <Button>Action 1</Button>
   *   <Button>Action 2</Button>
   * </Inline>
   */

  /**
   * Gap between items (using design token scale)
   * @type {'0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12'}
   */
  export let gap = '2';

  /**
   * Vertical alignment of items
   * @type {'start' | 'center' | 'end' | 'stretch' | 'baseline'}
   */
  export let align = 'center';

  /**
   * Horizontal distribution of items
   * @type {'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'}
   */
  export let justify = 'start';

  /**
   * HTML element to render
   * @type {'div' | 'span' | 'section' | 'nav' | 'ul' | 'ol'}
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
    'stretch': 'items-stretch',
    'baseline': 'items-baseline'
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
    flex flex-row
    {gapClass}
    {alignClass}
    {justifyClass}
    {wrapClass}
  "
  {...$$restProps}
>
  <slot />
</svelte:element>
