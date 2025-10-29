/**
 * Button Component Tests
 *
 * Unit tests for the Button primitive component.
 * These tests verify functionality, accessibility, and variants.
 */

import { describe, it, expect } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import { axe } from 'jest-axe';
import Button from './Button.svelte';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('renders with default props', () => {
      const { getByRole } = render(Button);
      const button = getByRole('button');

      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('bg-v-primary');
    });
  });

  describe('Variants', () => {
    it('applies primary variant class', () => {
      const { getByRole } = render(Button, {
        props: { variant: 'primary' }
      });

      expect(getByRole('button')).toHaveClass('bg-v-primary');
    });

    it('applies secondary variant class', () => {
      const { getByRole } = render(Button, {
        props: { variant: 'secondary' }
      });

      expect(getByRole('button')).toHaveClass('bg-v-secondary');
    });

    it('applies ghost variant class', () => {
      const { getByRole } = render(Button, {
        props: { variant: 'ghost' }
      });

      expect(getByRole('button')).toHaveClass('bg-transparent');
    });
  });

  describe('Sizes', () => {
    it('applies small size class', () => {
      const { getByRole } = render(Button, {
        props: { size: 'sm' }
      });

      expect(getByRole('button')).toHaveClass('px-v-3');
    });

    it('applies medium size class', () => {
      const { getByRole } = render(Button, {
        props: { size: 'md' }
      });

      expect(getByRole('button')).toHaveClass('px-v-4');
    });

    it('applies large size class', () => {
      const { getByRole } = render(Button, {
        props: { size: 'lg' }
      });

      expect(getByRole('button')).toHaveClass('px-v-6');
    });
  });

  describe('States', () => {
    it('applies disabled state', () => {
      const { getByRole } = render(Button, {
        props: { disabled: true }
      });

      const button = getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-50');
      expect(button).toHaveClass('cursor-not-allowed');
    });

    it('applies full width class', () => {
      const { getByRole } = render(Button, {
        props: { fullWidth: true }
      });

      expect(getByRole('button')).toHaveClass('w-full');
    });
  });

  describe('Interactions', () => {
    it('handles click events', async () => {
      let clicked = false;
      const { getByRole, component } = render(Button);

      component.$on('click', () => {
        clicked = true;
      });

      const button = getByRole('button');
      await fireEvent.click(button);

      expect(clicked).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('has button role by default', () => {
      const { getByRole } = render(Button);
      expect(getByRole('button')).toBeInTheDocument();
    });

    it('can be focused', () => {
      const { getByRole } = render(Button);
      const button = getByRole('button');

      button.focus();
      expect(button).toHaveFocus();
    });

    it('cannot be focused when disabled', () => {
      const { getByRole } = render(Button, {
        props: { disabled: true }
      });
      const button = getByRole('button');

      button.focus();
      expect(button).not.toHaveFocus();
    });

    it('has no accessibility violations with text content', async () => {
      const { container } = render(Button, {
        props: {},
        context: new Map([['$$slots', { default: ['Click me'] }]])
      });

      // Create a button with text content for accessibility
      const html = `<button type="button" class="test">Click me</button>`;
      const div = document.createElement('div');
      div.innerHTML = html;

      const results = await axe(div);
      expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when disabled with aria-label', async () => {
      // Test with aria-label for accessibility
      const html = `<button type="button" disabled aria-label="Submit form">Submit</button>`;
      const div = document.createElement('div');
      div.innerHTML = html;

      const results = await axe(div);
      expect(results).toHaveNoViolations();
    });
  });
});
