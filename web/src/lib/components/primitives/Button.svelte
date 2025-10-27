<script>
  /**
   * Button - Primary interactive element
   *
   * A fundamental primitive component providing consistent button styles
   * across the VNext design system.
   *
   * @component
   * @example
   * <Button variant="primary" size="md" on:click={handleClick}>
   *   Click Me
   * </Button>
   */

  /**
   * Button variant
   * @type {'primary' | 'secondary' | 'ghost'}
   */
  export let variant = 'primary';

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
   * Full width button
   * @type {boolean}
   */
  export let fullWidth = false;

  /**
   * HTML button type
   * @type {'button' | 'submit' | 'reset'}
   */
  export let type = 'button';

  // Compute classes based on props
  $: variantClass = {
    primary: 'bg-v-primary hover:bg-v-primary-hover active:bg-v-primary-active text-white',
    secondary: 'bg-v-secondary hover:bg-v-secondary-hover active:bg-v-secondary-active text-v-text-primary',
    ghost: 'bg-transparent hover:bg-v-surface active:bg-v-surface-active text-v-text-primary'
  }[variant];

  $: sizeClass = {
    sm: 'px-v-3 py-v-2 text-v-sm',
    md: 'px-v-4 py-v-3 text-v-base',
    lg: 'px-v-6 py-v-4 text-v-lg'
  }[size];

  $: disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  $: widthClass = fullWidth ? 'w-full' : '';
</script>

<button
  {type}
  {disabled}
  class="
    inline-flex items-center justify-center
    font-v-medium
    rounded-v-md
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-v-primary focus:ring-offset-2
    {variantClass}
    {sizeClass}
    {disabledClass}
    {widthClass}
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
    /* Additional component-specific styles */
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
</style>
