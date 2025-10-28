<script context="module">
  /**
   * Form context key for sharing state between Form and FormField
   */
  export const FORM_CONTEXT_KEY = Symbol('form-context');
</script>

<script>
  /**
   * Form - Composite component for managing form state and validation
   *
   * Provides a wrapper for form inputs with built-in validation,
   * error handling, and submission logic. Uses Svelte context to
   * share state with FormField children.
   *
   * @component
   * @example
   * <Form onSubmit={handleSubmit}>
   *   <FormField name="email" label="Email" required>
   *     <Input type="email" />
   *   </FormField>
   *   <Button type="submit">Submit</Button>
   * </Form>
   */

  import { setContext, onMount } from 'svelte';
  import { writable } from 'svelte/store';
  import Stack from '../primitives/Stack.svelte';

  /**
   * Form submission callback
   * @type {(values: Record<string, any>) => void | Promise<void>}
   */
  export let onSubmit = () => {};

  /**
   * Form-level validation function
   * @type {(values: Record<string, any>) => Record<string, string> | Promise<Record<string, string>>}
   */
  export let validate = undefined;

  /**
   * Disable all form inputs
   * @type {boolean}
   */
  export let disabled = false;

  /**
   * Form ID for accessibility
   * @type {string}
   */
  export let id = `form-${Math.random().toString(36).substr(2, 9)}`;

  // Form state stores
  const values = writable({});
  const errors = writable({});
  const touched = writable({});
  const isSubmitting = writable(false);

  // Register a field with the form
  function registerField(name, initialValue = '') {
    values.update((v) => ({ ...v, [name]: initialValue }));
    errors.update((e) => ({ ...e, [name]: '' }));
    touched.update((t) => ({ ...t, [name]: false }));
  }

  // Update field value
  function updateValue(name, value) {
    values.update((v) => ({ ...v, [name]: value }));

    // Clear error when user starts typing (if field was touched)
    const currentTouched = $touched;
    if (currentTouched[name]) {
      errors.update((e) => ({ ...e, [name]: '' }));
    }
  }

  // Mark field as touched
  function setTouched(name, isTouched = true) {
    touched.update((t) => ({ ...t, [name]: isTouched }));
  }

  // Set field error
  function setError(name, error) {
    errors.update((e) => ({ ...e, [name]: error }));
  }

  // Validate a single field
  function validateField(name, value) {
    // Field-level validation will be handled by FormField
    // This is a placeholder for future enhancements
    return '';
  }

  // Validate entire form
  async function validateForm() {
    const currentValues = $values;
    let formErrors = {};

    // Run custom validation function if provided
    if (validate) {
      try {
        const validationResult = await validate(currentValues);
        formErrors = validationResult || {};
      } catch (error) {
        console.error('Form validation error:', error);
      }
    }

    // Update errors store
    errors.set(formErrors);

    // Return true if no errors
    return Object.keys(formErrors).length === 0;
  }

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();

    // Mark all fields as touched
    const currentValues = $values;
    const allTouched = Object.keys(currentValues).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    touched.set(allTouched);

    // Validate form
    isSubmitting.set(true);
    const isValid = await validateForm();

    if (isValid) {
      try {
        await onSubmit(currentValues);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }

    isSubmitting.set(false);
  }

  // Set context for child FormField components
  setContext(FORM_CONTEXT_KEY, {
    values,
    errors,
    touched,
    isSubmitting,
    disabled: () => disabled,
    registerField,
    updateValue,
    setTouched,
    setError,
    validateField
  });

  // Export values for testing
  $: formValues = $values;
  $: formErrors = $errors;
</script>

<form {id} on:submit={handleSubmit} novalidate>
  <Stack spacing="6">
    <slot />
  </Stack>
</form>

<style>
  form {
    /* Additional form-specific styles */
  }
</style>
