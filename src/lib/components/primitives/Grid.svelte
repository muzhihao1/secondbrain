<script>
  /**
   * Grid - CSS Grid layout primitive
   *
   * Creates responsive grid layouts with configurable columns and gaps.
   * Ideal for dashboards, image galleries, and card layouts.
   *
   * @component
   * @example
   * <Grid columns="3" gap="4">
   *   <Card>Item 1</Card>
   *   <Card>Item 2</Card>
   *   <Card>Item 3</Card>
   * </Grid>
   */

  /**
   * Number of columns (responsive breakpoint format: mobile/tablet/desktop)
   * @type {'1' | '2' | '3' | '4' | '6' | '12' | 'auto-fit' | 'auto-fill'}
   */
  export let columns = '3';

  /**
   * Gap between items
   * @type {'0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12'}
   */
  export let gap = '4';

  /**
   * Minimum column width (for auto-fit/auto-fill)
   * @type {string}
   */
  export let minColWidth = '250px';

  /**
   * Horizontal alignment of items
   * @type {'start' | 'center' | 'end' | 'stretch'}
   */
  export let alignItems = 'stretch';

  /**
   * Vertical alignment of items
   * @type {'start' | 'center' | 'end' | 'stretch'}
   */
  export let justifyItems = 'stretch';

  /**
   * HTML element to render
   * @type {'div' | 'section' | 'ul' | 'ol'}
   */
  export let as = 'div';

  // Compute classes and styles
  $: gapClass = `gap-v-${gap}`;

  $: gridTemplateColumns = (() => {
    if (columns === 'auto-fit') {
      return `repeat(auto-fit, minmax(${minColWidth}, 1fr))`;
    }
    if (columns === 'auto-fill') {
      return `repeat(auto-fill, minmax(${minColWidth}, 1fr))`;
    }
    return `repeat(${columns}, minmax(0, 1fr))`;
  })();

  $: alignClass = {
    'start': 'items-start',
    'center': 'items-center',
    'end': 'items-end',
    'stretch': 'items-stretch'
  }[alignItems];

  $: justifyClass = {
    'start': 'justify-items-start',
    'center': 'justify-items-center',
    'end': 'justify-items-end',
    'stretch': 'justify-items-stretch'
  }[justifyItems];
</script>

<svelte:element
  this={as}
  class="
    grid
    {gapClass}
    {alignClass}
    {justifyClass}
  "
  style="grid-template-columns: {gridTemplateColumns};"
  {...$$restProps}
>
  <slot />
</svelte:element>
