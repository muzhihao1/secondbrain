<script>
  /**
   * Heading - Typography primitive for headings
   *
   * Provides semantic heading levels (h1-h6) with consistent styling.
   * Maintains accessibility through proper HTML elements while allowing visual customization.
   *
   * @component
   * @example
   * <Heading level="1" size="4xl">
   *   Page Title
   * </Heading>
   */

  /**
   * Semantic heading level (affects HTML element)
   * @type {'1' | '2' | '3' | '4' | '5' | '6'}
   */
  export let level = '2';

  /**
   * Visual size (can differ from semantic level)
   * @type {'xl' | '2xl' | '3xl' | '4xl' | '5xl'}
   */
  export let size = undefined;

  /**
   * Text color
   * @type {'primary' | 'secondary' | 'accent'}
   */
  export let color = 'primary';

  /**
   * Font weight
   * @type {'normal' | 'medium' | 'semibold' | 'bold'}
   */
  export let weight = 'bold';

  /**
   * Text alignment
   * @type {'left' | 'center' | 'right'}
   */
  export let align = 'left';

  /**
   * Bottom margin spacing
   * @type {'0' | '2' | '4' | '6' | '8'}
   */
  export let marginBottom = '0';

  // Default size based on level if not specified
  $: defaultSize = {
    '1': '5xl',
    '2': '4xl',
    '3': '3xl',
    '4': '2xl',
    '5': 'xl',
    '6': 'xl'
  }[level];

  $: actualSize = size || defaultSize;

  // Compute classes
  $: element = `h${level}`;
  $: sizeClass = `text-v-${actualSize}`;

  $: colorClass = {
    'primary': 'text-v-text-primary',
    'secondary': 'text-v-text-secondary',
    'accent': 'text-v-text-accent'
  }[color];

  $: weightClass = `font-v-${weight}`;
  $: alignClass = `text-${align}`;
  $: marginClass = marginBottom !== '0' ? `mb-v-${marginBottom}` : '';
</script>

<svelte:element
  this={element}
  class="
    {sizeClass}
    {colorClass}
    {weightClass}
    {alignClass}
    {marginClass}
    leading-v-tight
  "
  {...$$restProps}
>
  <slot />
</svelte:element>
