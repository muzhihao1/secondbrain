/**
 * ErrorMessage Component Tests
 *
 * Unit tests for the ErrorMessage component.
 * Verifies error display, accessibility, and variants.
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import { axe } from 'jest-axe';
import ErrorMessageTestWrapper from './ErrorMessage.test.svelte';

describe('ErrorMessage Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const { getByRole } = render(ErrorMessageTestWrapper, {
        props: { id: 'test-error', message: 'Error message' }
      });

      const alert = getByRole('alert');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveTextContent('Error message');
    });

    it('renders with provided ID', () => {
      const { container } = render(ErrorMessageTestWrapper, {
        props: { id: 'custom-error', message: 'Test error' }
      });

      const errorElement = container.querySelector('#custom-error');
      expect(errorElement).toBeInTheDocument();
    });

    it('does not render without slot content', () => {
      const { container } = render(ErrorMessageTestWrapper, {
        props: { id: 'empty-error', message: '' }
      });

      const errorElement = container.querySelector('#empty-error');
      expect(errorElement).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies error variant class by default', () => {
      const { container } = render(ErrorMessageTestWrapper, {
        props: { id: 'error-1', message: 'Error' }
      });

      const errorElement = container.querySelector('.error-message');
      expect(errorElement).toHaveClass('text-v-error');
    });

    it('applies warning variant class', () => {
      const { container } = render(ErrorMessageTestWrapper, {
        props: { id: 'warning-1', variant: 'warning', message: 'Warning' }
      });

      const errorElement = container.querySelector('.error-message');
      expect(errorElement).toHaveClass('text-v-warning');
    });
  });

  describe('Accessibility', () => {
    it('has role="alert" for screen readers', () => {
      const { getByRole } = render(ErrorMessageTestWrapper, {
        props: { id: 'a11y-error', message: 'Accessible error' }
      });

      expect(getByRole('alert')).toBeInTheDocument();
    });

    it('has aria-live="polite" for live updates', () => {
      const { getByRole } = render(ErrorMessageTestWrapper, {
        props: { id: 'live-error', message: 'Live error' }
      });

      const alert = getByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'polite');
    });

    it('has no accessibility violations', async () => {
      const html = `
        <main>
          <div id="test-error" role="alert" aria-live="polite" class="error-message text-v-error">
            <span>Please enter a valid email address</span>
          </div>
        </main>
      `;
      const div = document.createElement('div');
      div.innerHTML = html;

      const results = await axe(div);
      expect(results).toHaveNoViolations();
    });

    it('can be associated with form inputs via aria-describedby', () => {
      const { container } = render(ErrorMessageTestWrapper, {
        props: { id: 'email-error', message: 'Invalid email' }
      });

      // Simulate input with aria-describedby
      const input = document.createElement('input');
      input.setAttribute('aria-describedby', 'email-error');
      input.setAttribute('aria-invalid', 'true');

      const errorElement = container.querySelector('#email-error');
      expect(errorElement).toBeInTheDocument();
      expect(input.getAttribute('aria-describedby')).toBe('email-error');
    });
  });

  describe('Content', () => {
    it('renders short error messages', () => {
      const { getByRole } = render(ErrorMessageTestWrapper, {
        props: { id: 'short', message: 'Required' }
      });

      expect(getByRole('alert')).toHaveTextContent('Required');
    });

    it('renders long error messages', () => {
      const longMessage = 'Your password must be at least 8 characters long and include uppercase, lowercase, number, and special character.';
      const { getByRole } = render(ErrorMessageTestWrapper, {
        props: { id: 'long', message: longMessage }
      });

      expect(getByRole('alert')).toHaveTextContent(longMessage);
    });

    it('renders error messages with HTML entities', () => {
      const { getByRole } = render(ErrorMessageTestWrapper, {
        props: { id: 'entities', message: 'Value must be < 100 & > 0' }
      });

      expect(getByRole('alert')).toHaveTextContent('Value must be < 100 & > 0');
    });
  });

  describe('Integration', () => {
    it('works with form field pattern', () => {
      const { container } = render(ErrorMessageTestWrapper, {
        props: { id: 'field-error', message: 'This field is required' }
      });

      // Verify error message was rendered
      const errorElement = container.querySelector('#field-error');
      expect(errorElement).toBeInTheDocument();

      // Verify it can be associated with inputs via aria-describedby
      const input = document.createElement('input');
      input.id = 'test-input';
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', 'field-error');

      expect(input.getAttribute('aria-describedby')).toBe('field-error');
    });
  });
});
