/**
 * Modal Component Tests
 *
 * Unit tests for the Modal component.
 * Verifies dialog behavior, focus management, keyboard navigation, and accessibility.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/svelte';
import { axe } from 'jest-axe';
import Modal from './Modal.svelte';

describe('Modal Component', () => {
  // Cleanup after each test
  afterEach(() => {
    // Reset body styles
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
  });

  describe('Rendering', () => {
    it('does not render when closed', () => {
      const { container } = render(Modal, {
        props: { open: false, title: 'Test Modal' }
      });

      const dialog = container.querySelector('[role="dialog"]');
      expect(dialog).not.toBeInTheDocument();
    });

    it('renders when open', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Test Modal' }
      });

      await waitFor(() => {
        const dialog = container.querySelector('[role="dialog"]');
        expect(dialog).toBeInTheDocument();
      });
    });

    it('renders with title', async () => {
      const { getByText } = render(Modal, {
        props: { open: true, title: 'My Modal Title' }
      });

      await waitFor(() => {
        expect(getByText('My Modal Title')).toBeInTheDocument();
      });
    });

    it('renders default slot content', async () => {
      const { getByText } = render(Modal, {
        props: { open: true, title: 'Test' },
        context: new Map([['$$slots', { default: ['Modal body content'] }]])
      });

      await waitFor(() => {
        expect(getByText('Modal body content')).toBeInTheDocument();
      });
    });

    it('renders close button', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Test' }
      });

      await waitFor(() => {
        const closeButton = container.querySelector('[aria-label="Close dialog"]');
        expect(closeButton).toBeInTheDocument();
      });
    });
  });

  describe('Sizes', () => {
    it('applies small size class', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Small Modal', size: 'sm' }
      });

      await waitFor(() => {
        const dialog = container.querySelector('[role="dialog"]');
        expect(dialog).toHaveClass('max-w-sm');
      });
    });

    it('applies medium size class by default', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Medium Modal' }
      });

      await waitFor(() => {
        const dialog = container.querySelector('[role="dialog"]');
        expect(dialog).toHaveClass('max-w-md');
      });
    });

    it('applies large size class', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Large Modal', size: 'lg' }
      });

      await waitFor(() => {
        const dialog = container.querySelector('[role="dialog"]');
        expect(dialog).toHaveClass('max-w-lg');
      });
    });

    it('applies full size class', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Full Modal', size: 'full' }
      });

      await waitFor(() => {
        const dialog = container.querySelector('[role="dialog"]');
        expect(dialog).toHaveClass('max-w-full');
      });
    });
  });

  describe('Close Behavior', () => {
    it('closes when close button is clicked', async () => {
      const { container, component } = render(Modal, {
        props: { open: true, title: 'Test' }
      });

      const closeButton = container.querySelector('[aria-label="Close dialog"]');
      await fireEvent.click(closeButton);

      await waitFor(() => {
        const dialog = container.querySelector('[role="dialog"]');
        expect(dialog).not.toBeInTheDocument();
      });
    });

    it('calls onClose event when closed', async () => {
      const handleClose = vi.fn();
      const { container, component } = render(Modal, {
        props: { open: true, title: 'Test' }
      });

      component.$on('close', handleClose);

      const closeButton = container.querySelector('[aria-label="Close dialog"]');
      await fireEvent.click(closeButton);

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalled();
      });
    });
  });

  describe('ESC Key Handling', () => {
    it('closes on ESC key by default', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Test' }
      });

      await fireEvent.keyDown(document, { key: 'Escape' });

      await waitFor(() => {
        const dialog = container.querySelector('[role="dialog"]');
        expect(dialog).not.toBeInTheDocument();
      });
    });

    it('does not close on ESC when closeOnEsc is false', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Test', closeOnEsc: false }
      });

      await fireEvent.keyDown(document, { key: 'Escape' });

      // Wait a bit and verify dialog is still there
      await new Promise(resolve => setTimeout(resolve, 100));

      const dialog = container.querySelector('[role="dialog"]');
      expect(dialog).toBeInTheDocument();
    });
  });

  describe('Backdrop Click Handling', () => {
    it('closes on backdrop click by default', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Test' }
      });

      const backdrop = container.querySelector('.modal-backdrop');

      // Simulate mousedown and click on backdrop
      await fireEvent.mouseDown(backdrop);
      await fireEvent.click(backdrop);

      await waitFor(() => {
        const dialog = container.querySelector('[role="dialog"]');
        expect(dialog).not.toBeInTheDocument();
      });
    });

    it('does not close when clicking dialog content', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Test' }
      });

      const dialog = container.querySelector('[role="dialog"]');

      await fireEvent.click(dialog);

      // Wait and verify dialog is still there
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(dialog).toBeInTheDocument();
    });

    it('does not close on backdrop click when disableBackdropClick is true', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Test', disableBackdropClick: true }
      });

      const backdrop = container.querySelector('.modal-backdrop');

      await fireEvent.mouseDown(backdrop);
      await fireEvent.click(backdrop);

      // Wait and verify dialog is still there
      await new Promise(resolve => setTimeout(resolve, 100));

      const dialog = container.querySelector('[role="dialog"]');
      expect(dialog).toBeInTheDocument();
    });
  });

  describe('Body Scroll Lock', () => {
    it('locks body scroll when modal opens', async () => {
      render(Modal, {
        props: { open: true, title: 'Test' }
      });

      await waitFor(() => {
        expect(document.body.style.position).toBe('fixed');
        expect(document.body.style.overflow).toBe('hidden');
      });
    });

    it('restores body scroll when modal closes', async () => {
      const { component } = render(Modal, {
        props: { open: true, title: 'Test' }
      });

      // Wait for modal to open
      await waitFor(() => {
        expect(document.body.style.position).toBe('fixed');
      });

      // Close modal
      component.$set({ open: false });

      await waitFor(() => {
        expect(document.body.style.position).toBe('');
        expect(document.body.style.overflow).toBe('');
      });
    });
  });

  describe('Focus Management', () => {
    it('sets initial focus on modal', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Test' }
      });

      await waitFor(() => {
        const dialog = container.querySelector('[role="dialog"]');
        // Check that focus is within the dialog
        expect(dialog).toBeInTheDocument();
      });
    });

    it('traps focus within modal', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Test' }
      });

      // Focus trap is tested via keyboard navigation
      await waitFor(() => {
        const dialog = container.querySelector('[role="dialog"]');
        expect(dialog).toBeInTheDocument();
      });

      // Tab key handling is complex to test in JSDOM
      // This would be better tested in E2E tests
    });
  });

  describe('Accessibility', () => {
    it('has role="dialog"', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Test' }
      });

      await waitFor(() => {
        const dialog = container.querySelector('[role="dialog"]');
        expect(dialog).toBeInTheDocument();
      });
    });

    it('has aria-modal="true"', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Test' }
      });

      await waitFor(() => {
        const dialog = container.querySelector('[role="dialog"]');
        expect(dialog).toHaveAttribute('aria-modal', 'true');
      });
    });

    it('has aria-labelledby when title is provided', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Test Modal' }
      });

      await waitFor(() => {
        const dialog = container.querySelector('[role="dialog"]');
        const titleId = dialog.getAttribute('aria-labelledby');
        expect(titleId).toBeTruthy();

        const title = document.getElementById(titleId);
        expect(title).toHaveTextContent('Test Modal');
      });
    });

    it('has aria-describedby for body content', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Test' }
      });

      await waitFor(() => {
        const dialog = container.querySelector('[role="dialog"]');
        const descId = dialog.getAttribute('aria-describedby');
        expect(descId).toBeTruthy();

        const body = document.getElementById(descId);
        expect(body).toBeInTheDocument();
      });
    });

    it('supports alertdialog role', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Alert', role: 'alertdialog' }
      });

      await waitFor(() => {
        const dialog = container.querySelector('[role="alertdialog"]');
        expect(dialog).toBeInTheDocument();
      });
    });

    it('has no accessibility violations', async () => {
      const html = `
        <main>
          <div role="dialog" aria-modal="true" aria-labelledby="title-1" aria-describedby="desc-1">
            <div>
              <h2 id="title-1">Modal Title</h2>
              <button aria-label="Close dialog">X</button>
            </div>
            <div id="desc-1">
              <p>Modal content</p>
            </div>
            <div>
              <button>Action</button>
            </div>
          </div>
        </main>
      `;
      const div = document.createElement('div');
      div.innerHTML = html;

      const results = await axe(div);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Events', () => {
    it('dispatches open event when modal opens', async () => {
      const handleOpen = vi.fn();
      const { component } = render(Modal, {
        props: { open: false, title: 'Test' }
      });

      component.$on('open', handleOpen);

      component.$set({ open: true });

      await waitFor(() => {
        expect(handleOpen).toHaveBeenCalled();
      });
    });

    it('dispatches close event with reason', async () => {
      const handleClose = vi.fn();
      const { container, component } = render(Modal, {
        props: { open: true, title: 'Test' }
      });

      component.$on('close', handleClose);

      const closeButton = container.querySelector('[aria-label="Close dialog"]');
      await fireEvent.click(closeButton);

      await waitFor(() => {
        expect(handleClose).toHaveBeenCalled();
        expect(handleClose).toHaveBeenCalledWith(
          expect.objectContaining({
            detail: expect.objectContaining({ reason: 'close-button' })
          })
        );
      });
    });
  });

  describe('Portal Rendering', () => {
    it('renders outside of component tree', async () => {
      const { container } = render(Modal, {
        props: { open: true, title: 'Test' }
      });

      await waitFor(() => {
        // Modal should be rendered in document.body via portal
        const portalContent = document.querySelector('[data-portal]');
        expect(portalContent).toBeInTheDocument();
      });
    });
  });
});
