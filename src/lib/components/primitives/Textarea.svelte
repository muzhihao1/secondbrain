<script>
  /**
   * Textarea - Multi-line text input
   *
   * @component
   */

  /** @type {string} */
  export let value = '';

  /** @type {string} */
  export let placeholder = '';

  /** @type {number} */
  export let rows = 4;

  /** @type {boolean} */
  export let disabled = false;

  /** @type {boolean} */
  export let readonly = false;

  /** @type {boolean} */
  export let required = false;

  /** @type {string} */
  export let error = '';

  /** @type {boolean} */
  export let fullWidth = true;

  $: stateClass = error
    ? 'border-v-error focus:ring-v-error'
    : 'border-v-border focus:ring-v-primary';
</script>

<textarea
  {placeholder}
  {disabled}
  {readonly}
  {required}
  {rows}
  bind:value
  class="
    bg-v-bg-elevated
    text-v-text-primary
    border
    rounded-v-md
    px-v-4 py-v-3
    text-v-base
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:opacity-50 disabled:cursor-not-allowed
    resize-y
    {stateClass}
    {fullWidth ? 'w-full' : ''}
  "
  {...$$restProps}
  on:input
  on:change
  on:focus
  on:blur
/>
