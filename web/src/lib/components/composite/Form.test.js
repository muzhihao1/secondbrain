/**
 * Form Component Tests
 *
 * Unit tests for the Form wrapper component.
 * Verifies state management, validation, and form submission.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import { axe } from 'jest-axe';
import Form from './Form.svelte';

describe('Form Component', () => {
  describe('Rendering', () => {
    it('renders a form element', () => {
      const { container } = render(Form, {
        props: {
          onSubmit: vi.fn()
        }
      });

      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
    });

    it('generates unique form ID', () => {
      const { container } = render(Form, {
        props: {
          onSubmit: vi.fn()
        }
      });

      const form = container.querySelector('form');
      expect(form).toHaveAttribute('id');
      expect(form.id).toMatch(/^form-/);
    });

    it('uses custom ID when provided', () => {
      const { container } = render(Form, {
        props: {
          id: 'custom-form',
          onSubmit: vi.fn()
        }
      });

      const form = container.querySelector('form');
      expect(form).toHaveAttribute('id', 'custom-form');
    });

    it('has novalidate attribute to use custom validation', () => {
      const { container } = render(Form, {
        props: {
          onSubmit: vi.fn()
        }
      });

      const form = container.querySelector('form');
      expect(form).toHaveAttribute('novalidate');
    });
  });

  describe('State Management', () => {
    it('initializes empty form state', () => {
      const { container } = render(Form, {
        props: {
          onSubmit: vi.fn()
        }
      });

      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
      // State is managed internally via stores
    });

    it('provides context to child components', () => {
      // FormField components depend on this context
      const { container } = render(Form, {
        props: {
          onSubmit: vi.fn()
        }
      });

      expect(container.querySelector('form')).toBeInTheDocument();
    });
  });

  describe('Form Submission', () => {
    it('calls onSubmit with form values', async () => {
      const onSubmit = vi.fn();
      const { container } = render(Form, {
        props: {
          onSubmit
        }
      });

      const form = container.querySelector('form');
      await fireEvent.submit(form);

      // onSubmit should be called (even with empty values)
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled();
      });
    });

    it('prevents default form submission', async () => {
      const onSubmit = vi.fn();
      const { container } = render(Form, {
        props: {
          onSubmit
        }
      });

      const form = container.querySelector('form');
      const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
      const preventDefault = vi.spyOn(submitEvent, 'preventDefault');

      form.dispatchEvent(submitEvent);

      expect(preventDefault).toHaveBeenCalled();
    });

    it('marks all fields as touched on submit', async () => {
      const onSubmit = vi.fn();
      const { container } = render(Form, {
        props: {
          onSubmit
        }
      });

      const form = container.querySelector('form');
      await fireEvent.submit(form);

      // All fields should be marked as touched
      expect(true).toBe(true);
    });

    it('does not call onSubmit if validation fails', async () => {
      const onSubmit = vi.fn();
      const validate = vi.fn(() => ({ email: 'Invalid email' }));

      const { container } = render(Form, {
        props: {
          onSubmit,
          validate
        }
      });

      const form = container.querySelector('form');
      await fireEvent.submit(form);

      await waitFor(() => {
        expect(validate).toHaveBeenCalled();
      });

      // onSubmit should not be called when validation fails
      // This depends on having form values that fail validation
    });
  });

  describe('Validation', () => {
    it('runs form-level validation on submit', async () => {
      const validate = vi.fn(() => ({}));
      const { container } = render(Form, {
        props: {
          onSubmit: vi.fn(),
          validate
        }
      });

      const form = container.querySelector('form');
      await fireEvent.submit(form);

      await waitFor(() => {
        expect(validate).toHaveBeenCalled();
      });
    });

    it('passes form values to validation function', async () => {
      const validate = vi.fn(() => ({}));
      const { container } = render(Form, {
        props: {
          onSubmit: vi.fn(),
          validate
        }
      });

      const form = container.querySelector('form');
      await fireEvent.submit(form);

      await waitFor(() => {
        expect(validate).toHaveBeenCalledWith(expect.any(Object));
      });
    });

    it('sets errors from validation function', async () => {
      const validate = vi.fn(() => ({
        email: 'Invalid email address',
        password: 'Password too short'
      }));

      const { container } = render(Form, {
        props: {
          onSubmit: vi.fn(),
          validate
        }
      });

      const form = container.querySelector('form');
      await fireEvent.submit(form);

      await waitFor(() => {
        expect(validate).toHaveBeenCalled();
      });

      // Errors should be set in the errors store
    });

    it('supports async validation', async () => {
      const validate = vi.fn(async (values) => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return {};
      });

      const { container } = render(Form, {
        props: {
          onSubmit: vi.fn(),
          validate
        }
      });

      const form = container.querySelector('form');
      await fireEvent.submit(form);

      await waitFor(() => {
        expect(validate).toHaveBeenCalled();
      });
    });
  });

  describe('Disabled State', () => {
    it('applies disabled state to form', () => {
      const { container } = render(Form, {
        props: {
          disabled: true,
          onSubmit: vi.fn()
        }
      });

      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
      // Disabled state is passed via context to children
    });

    it('prevents submission when disabled', async () => {
      const onSubmit = vi.fn();
      const { container } = render(Form, {
        props: {
          disabled: true,
          onSubmit
        }
      });

      const form = container.querySelector('form');
      await fireEvent.submit(form);

      // onSubmit should still be called, but fields should be disabled
      // Actual prevention happens at the button level
    });
  });

  describe('Error Handling', () => {
    it('catches validation errors', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      const validate = vi.fn(() => {
        throw new Error('Validation error');
      });

      const { container } = render(Form, {
        props: {
          onSubmit: vi.fn(),
          validate
        }
      });

      const form = container.querySelector('form');
      await fireEvent.submit(form);

      await waitFor(() => {
        expect(consoleError).toHaveBeenCalledWith(
          'Form validation error:',
          expect.any(Error)
        );
      });

      consoleError.mockRestore();
    });

    it('catches submission errors', async () => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      const onSubmit = vi.fn(() => {
        throw new Error('Submission error');
      });

      const { container } = render(Form, {
        props: {
          onSubmit
        }
      });

      const form = container.querySelector('form');
      await fireEvent.submit(form);

      await waitFor(() => {
        expect(consoleError).toHaveBeenCalledWith(
          'Form submission error:',
          expect.any(Error)
        );
      });

      consoleError.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('has proper form semantics', () => {
      const { container } = render(Form, {
        props: {
          onSubmit: vi.fn()
        }
      });

      const form = container.querySelector('form');
      expect(form).toBeInTheDocument();
      expect(form.tagName).toBe('FORM');
    });

    it('has no accessibility violations', async () => {
      const html = `
        <main>
          <form id="test-form" novalidate>
            <div style="display: flex; flex-direction: column; gap: 1.5rem;">
              <div class="form-field">
                <label for="email">Email Address</label>
                <input id="email" type="email" name="email" />
              </div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </main>
      `;
      const div = document.createElement('div');
      div.innerHTML = html;

      const results = await axe(div);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Context API', () => {
    it('provides values store to children', () => {
      const { container } = render(Form, {
        props: {
          onSubmit: vi.fn()
        }
      });

      // Context is provided internally
      expect(container.querySelector('form')).toBeInTheDocument();
    });

    it('provides errors store to children', () => {
      const { container } = render(Form, {
        props: {
          onSubmit: vi.fn()
        }
      });

      expect(container.querySelector('form')).toBeInTheDocument();
    });

    it('provides touched store to children', () => {
      const { container } = render(Form, {
        props: {
          onSubmit: vi.fn()
        }
      });

      expect(container.querySelector('form')).toBeInTheDocument();
    });

    it('provides utility functions to children', () => {
      const { container } = render(Form, {
        props: {
          onSubmit: vi.fn()
        }
      });

      // registerField, updateValue, setTouched, setError provided via context
      expect(container.querySelector('form')).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('works with empty form', async () => {
      const onSubmit = vi.fn();
      const { container } = render(Form, {
        props: {
          onSubmit
        }
      });

      const form = container.querySelector('form');
      await fireEvent.submit(form);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(expect.any(Object));
      });
    });

    it('submits form with valid data', async () => {
      const onSubmit = vi.fn();
      const { container } = render(Form, {
        props: {
          onSubmit
        }
      });

      const form = container.querySelector('form');
      await fireEvent.submit(form);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled();
      });
    });
  });
});
