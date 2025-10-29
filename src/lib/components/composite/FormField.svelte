<script>
  /**
   * FormField - Field wrapper with label, validation, and error display
   *
   * Connects form inputs to the parent Form component's state management.
   * Handles labeling, error display, required indicators, and accessibility.
   *
   * @component
   * @example
   * <Form onSubmit={handleSubmit}>
   *   <FormField name="email" label="Email Address" required>
   *     <Input type="email" placeholder="you@example.com" />
   *   </FormField>
   * </Form>
   */

  import { getContext, onMount } from 'svelte';
  import { FORM_CONTEXT_KEY } from './Form.svelte';
  import Stack from '../primitives/Stack.svelte';
  import ErrorMessage from './ErrorMessage.svelte';

  /**
   * Field name (must be unique within form)
   * @type {string}
   */
  export let name;

  /**
   * Field label
   * @type {string}
   */
  export let label = '';

  /**
   * Required field indicator
   * @type {boolean}
   */
  export let required = false;

  /**
   * Field-level validation function
   * @type {(value: any) => string | Promise<string>}
   */
  export let validate = undefined;

  /**
   * Help text displayed below input
   * @type {string}
   */
  export let helpText = '';

  /**
   * Disabled state
   * @type {boolean}
   */
  export let disabled = false;

  // Get form context
  const formContext = getContext(FORM_CONTEXT_KEY);

  if (!formContext) {
    throw new Error('FormField must be used within a Form component');
  }

  const { values, errors, touched, registerField, updateValue, setTouched, setError } = formContext;

  // Generate unique IDs for accessibility
  const fieldId = `field-${name}-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${fieldId}-error`;
  const helpId = `${fieldId}-help`;

  // Register field on mount
  onMount(() => {
    registerField(name);
  });

  // Get current field state
  $: fieldValue = $values[name] || '';
  $: fieldError = $errors[name] || '';
  $: isTouched = $touched[name] || false;
  $: showError = isTouched && fieldError;

  // Handle input change
  function handleChange(event) {
    const value = event.target.value;
    updateValue(name, value);
  }

  // Handle input blur
  async function handleBlur() {
    setTouched(name, true);

    // Run field-level validation
    if (validate) {
      try {
        const error = await validate(fieldValue);
        if (error) {
          setError(name, error);
        }
      } catch (err) {
        console.error(`Validation error for field ${name}:`, err);
      }
    }

    // Check required
    if (required && !fieldValue) {
      setError(name, `${label || name} is required`);
    }
  }

  // Build aria-describedby
  $: ariaDescribedBy = [
    showError ? errorId : null,
    helpText ? helpId : null
  ].filter(Boolean).join(' ') || undefined;
</script>

<div class="form-field">
  <Stack spacing="2">
    {#if label}
      <label for={fieldId} class="form-label">
        <span class="text-v-sm font-v-medium text-v-text-primary">
          {label}
          {#if required}
            <span class="text-v-error" aria-label="required">*</span>
          {/if}
        </span>
      </label>
    {/if}

    <div class="form-input-wrapper">
      <!-- Slot with props exposed via let: directive -->
      <slot
        id={fieldId}
        value={fieldValue}
        onChange={handleChange}
        onBlur={handleBlur}
        {disabled}
        {required}
        isInvalid={showError}
        ariaDescribedBy={ariaDescribedBy}
      >
        <!-- Fallback: basic input if no slot provided -->
        <input
          id={fieldId}
          {name}
          value={fieldValue}
          on:input={handleChange}
          on:blur={handleBlur}
          {disabled}
          {required}
          aria-invalid={showError}
          aria-describedby={ariaDescribedBy}
          class="px-v-4 py-v-3 rounded-v-md border border-v-border bg-v-surface text-v-text-primary focus:outline-none focus:ring-2 focus:ring-v-primary"
        />
      </slot>
    </div>

    {#if showError}
      <ErrorMessage id={errorId}>
        {fieldError}
      </ErrorMessage>
    {/if}

    {#if helpText && !showError}
      <p id={helpId} class="text-v-sm text-v-text-tertiary">
        {helpText}
      </p>
    {/if}
  </Stack>
</div>

<style>
  .form-field {
    width: 100%;
  }

  .form-label {
    display: block;
    cursor: pointer;
  }

  .form-input-wrapper :global(input),
  .form-input-wrapper :global(select),
  .form-input-wrapper :global(textarea) {
    width: 100%;
  }

  .form-input-wrapper :global([aria-invalid="true"]) {
    border-color: var(--color-v-error, #dc2626);
  }
</style>
