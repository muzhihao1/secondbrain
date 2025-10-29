/**
 * Testing Utilities
 *
 * Custom render functions and helpers for testing Svelte components.
 * Extends @testing-library/svelte with project-specific functionality.
 */

import { render } from '@testing-library/svelte';

/**
 * Custom render function with common providers and options
 *
 * @param {import('svelte').SvelteComponent} component - Component to render
 * @param {object} options - Render options
 * @param {object} options.props - Component props
 * @param {object} options.context - Svelte context
 * @returns {import('@testing-library/svelte').RenderResult}
 *
 * @example
 * import { renderWithProviders } from '$tests/test-utils';
 * import Button from '$lib/components/primitives/Button.svelte';
 *
 * const { getByText } = renderWithProviders(Button, {
 *   props: { variant: 'primary' }
 * });
 */
export function renderWithProviders(component, options = {}) {
  const { props = {}, ...renderOptions } = options;

  return render(component, {
    props,
    ...renderOptions
  });
}

/**
 * Wait for a condition to be true
 *
 * @param {Function} callback - Callback to check condition
 * @param {object} options - Wait options
 * @param {number} options.timeout - Maximum wait time in ms
 * @param {number} options.interval - Check interval in ms
 * @returns {Promise<void>}
 *
 * @example
 * await waitFor(() => {
 *   expect(element).toBeInTheDocument();
 * });
 */
export async function waitFor(callback, options = {}) {
  const { timeout = 1000, interval = 50 } = options;
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const check = () => {
      try {
        callback();
        resolve();
      } catch (error) {
        if (Date.now() - startTime > timeout) {
          reject(error);
        } else {
          setTimeout(check, interval);
        }
      }
    };
    check();
  });
}

/**
 * Create mock function
 *
 * @returns {Function} Mock function with tracking
 *
 * @example
 * const onClick = createMock();
 * button.addEventListener('click', onClick);
 * expect(onClick).toHaveBeenCalled();
 */
export function createMock() {
  const calls = [];
  const fn = (...args) => {
    calls.push(args);
  };
  fn.calls = calls;
  fn.toHaveBeenCalled = () => calls.length > 0;
  fn.toHaveBeenCalledWith = (...expectedArgs) => {
    return calls.some((args) =>
      args.every((arg, index) => arg === expectedArgs[index])
    );
  };
  fn.mockClear = () => {
    calls.length = 0;
  };
  return fn;
}

/**
 * Re-export all testing library utilities
 */
export * from '@testing-library/svelte';
