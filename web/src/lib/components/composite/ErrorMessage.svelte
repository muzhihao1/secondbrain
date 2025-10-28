<script>
  /**
   * ErrorMessage - Error display component for form validation
   *
   * Displays validation error messages with proper styling and
   * accessibility attributes. Used by FormField to show field errors.
   *
   * @component
   * @example
   * <ErrorMessage id="email-error">
   *   Please enter a valid email address
   * </ErrorMessage>
   */

  import Text from '../primitives/Text.svelte';

  /**
   * Unique ID for aria-describedby
   * @type {string}
   */
  export let id = '';

  /**
   * Error message variant
   * @type {'error' | 'warning'}
   */
  export let variant = 'error';

  $: colorClass = variant === 'error' ? 'text-v-error' : 'text-v-warning';
</script>

{#if $$slots.default}
  <div
    {id}
    class="error-message {colorClass}"
    role="alert"
    aria-live="polite"
  >
    <Text size="sm" color="inherit">
      <slot />
    </Text>
  </div>
{/if}

<style>
  .error-message {
    margin-top: var(--spacing-v-2, 0.5rem);
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-v-2, 0.5rem);
  }

  .error-message :global(svg) {
    flex-shrink: 0;
    margin-top: 0.125rem;
  }
</style>
