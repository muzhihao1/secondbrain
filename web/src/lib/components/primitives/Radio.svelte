<script>
  /**
   * Radio - Single selection from group
   *
   * @component
   */

  /** @type {string} */
  export let name = '';

  /** @type {string} */
  export let value = '';

  /** @type {string} */
  export let group = '';

  /** @type {boolean} */
  export let disabled = false;

  /** @type {string} */
  export let label = '';

  /** @type {string} */
  export let ariaLabel = '';
</script>

<label class="inline-flex items-center gap-v-2 cursor-pointer {disabled ? 'opacity-50 cursor-not-allowed' : ''}">
  <input
    type="radio"
    {name}
    {value}
    {disabled}
    bind:group
    aria-label={ariaLabel || label}
    class="
      w-v-5 h-v-5
      rounded-v-full
      border-2 border-v-border
      bg-v-bg-elevated
      text-v-primary
      focus:ring-2 focus:ring-v-primary focus:ring-offset-0
      disabled:cursor-not-allowed
      transition-colors duration-200
    "
    {...$$restProps}
    on:change
    on:focus
    on:blur
  />
  {#if label}
    <span class="text-v-base text-v-text-primary select-none">{label}</span>
  {/if}
  <slot />
</label>
