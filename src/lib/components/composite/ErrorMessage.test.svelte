<script>
  /**
   * Test wrapper for ErrorMessage component
   * Allows passing message as a prop instead of slot
   */
  import ErrorMessage from './ErrorMessage.svelte';

  export let id = '';
  export let variant = 'error';
  export let message = '';
</script>

{#if message}
  <ErrorMessage {id} {variant}>
    {message}
  </ErrorMessage>
{/if}
