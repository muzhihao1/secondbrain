<script>
  /**
   * Input - Text input field
   *
   * Standard text input with consistent styling and validation states.
   *
   * @component
   * @example
   * <Input
   *   bind:value={email}
   *   type="email"
   *   placeholder="Enter email"
   *   error="Invalid email"
   * />
   */

  /** @type {string} */
  export let value = '';

  /** @type {'text' | 'email' | 'password' | 'number' | 'tel' | 'url'} */
  export let type = 'text';

  /** @type {string} */
  export let placeholder = '';

  /** @type {'sm' | 'md' | 'lg'} */
  export let size = 'md';

  /** @type {boolean} */
  export let disabled = false;

  /** @type {boolean} */
  export let readonly = false;

  /** @type {boolean} */
  export let required = false;

  /** @type {string} */
  export let error = '';

  /** @type {boolean} */
  export let fullWidth = false;

  $: sizeClass = {
    sm: 'px-v-3 py-v-2 text-v-sm',
    md: 'px-v-4 py-v-3 text-v-base',
    lg: 'px-v-5 py-v-4 text-v-lg'
  }[size];

  $: stateClass = error
    ? 'border-v-error focus:ring-v-error'
    : 'border-v-border focus:ring-v-primary';

  $: widthClass = fullWidth ? 'w-full' : '';
</script>

<input
  {type}
  {placeholder}
  {disabled}
  {readonly}
  {required}
  {value}
  on:input={(e) => { value = e.target.value; }}
  class="
    bg-v-bg-elevated
    text-v-text-primary
    border
    rounded-v-md
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:opacity-50 disabled:cursor-not-allowed
    {sizeClass}
    {stateClass}
    {widthClass}
  "
  {...$$restProps}
  on:input
  on:change
  on:focus
  on:blur
  on:keydown
  on:keyup
  on:keypress
/>
