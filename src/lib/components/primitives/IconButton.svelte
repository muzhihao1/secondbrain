<script>
  /**
   * IconButton - Button with icon only
   *
   * Interactive button that displays only an icon without text.
   * Provides accessible alternative text through aria-label.
   *
   * @component
   * @example
   * <IconButton
   *   aria-label="Close dialog"
   *   variant="ghost"
   *   size="md"
   *   on:click={handleClose}
   * >
   *   <CloseIcon />
   * </IconButton>
   */

  /**
   * Button variant
   * @type {'primary' | 'secondary' | 'ghost'}
   */
  export let variant = 'ghost';

  /**
   * Button size
   * @type {'sm' | 'md' | 'lg'}
   */
  export let size = 'md';

  /**
   * Disabled state
   * @type {boolean}
   */
  export let disabled = false;

  /**
   * Shape of the button
   * @type {'square' | 'circle'}
   */
  export let shape = 'square';

  /**
   * HTML button type
   * @type {'button' | 'submit' | 'reset'}
   */
  export let type = 'button';

  /**
   * Accessible label (required)
   * @type {string}
   */
  export let ariaLabel = '';

  // Compute classes based on props
  $: variantClass = {
    primary: 'bg-v-primary hover:bg-v-primary-hover active:bg-v-primary-active text-white',
    secondary: 'bg-v-secondary hover:bg-v-secondary-hover active:bg-v-secondary-active text-v-text-primary',
    ghost: 'bg-transparent hover:bg-v-surface active:bg-v-surface-active text-v-text-primary'
  }[variant];

  $: sizeClass = {
    sm: 'p-v-1 text-v-sm',
    md: 'p-v-2 text-v-base',
    lg: 'p-v-3 text-v-lg'
  }[size];

  $: shapeClass = shape === 'circle' ? 'rounded-v-full' : 'rounded-v-md';
  $: disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
</script>

<button
  {type}
  {disabled}
  aria-label={ariaLabel}
  class="
    inline-flex items-center justify-center
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-v-primary focus:ring-offset-2
    {variantClass}
    {sizeClass}
    {shapeClass}
    {disabledClass}
  "
  on:click
  on:mouseenter
  on:mouseleave
  on:focus
  on:blur
>
  <slot />
</button>

<style>
  button {
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    aspect-ratio: 1;
  }
</style>
