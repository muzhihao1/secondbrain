<script>
  /**
   * Switch - Toggle control
   *
   * @component
   */

  /** @type {boolean} */
  export let checked = false;

  /** @type {boolean} */
  export let disabled = false;

  /** @type {string} */
  export let label = '';

  /** @type {string} */
  export let ariaLabel = '';

  /** @type {'sm' | 'md' | 'lg'} */
  export let size = 'md';

  $: sizeClasses = {
    sm: { container: 'w-8 h-5', thumb: 'w-3 h-3', translate: 'translate-x-3' },
    md: { container: 'w-11 h-6', thumb: 'w-5 h-5', translate: 'translate-x-5' },
    lg: { container: 'w-14 h-7', thumb: 'w-6 h-6', translate: 'translate-x-7' }
  }[size];
</script>

<label class="inline-flex items-center gap-v-3 cursor-pointer {disabled ? 'opacity-50 cursor-not-allowed' : ''}">
  <input
    type="checkbox"
    {disabled}
    bind:checked
    aria-label={ariaLabel || label}
    class="sr-only peer"
    {...$$restProps}
    on:change
    on:focus
    on:blur
  />
  <div
    class="
      relative
      {sizeClasses.container}
      bg-v-secondary
      rounded-v-full
      transition-colors duration-200
      peer-checked:bg-v-primary
      peer-focus:ring-2 peer-focus:ring-v-primary peer-focus:ring-offset-2
    "
  >
    <div
      class="
        absolute
        top-0.5 left-0.5
        {sizeClasses.thumb}
        bg-white
        rounded-v-full
        transition-transform duration-200
        {checked ? sizeClasses.translate : ''}
      "
    />
  </div>
  {#if label}
    <span class="text-v-base text-v-text-primary select-none">{label}</span>
  {/if}
  <slot />
</label>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>
