<script>
  /**
   * Modal - Accessible dialog component with focus trap and backdrop
   *
   * A fully accessible modal dialog that follows WCAG guidelines.
   * Features include focus trapping, keyboard navigation, backdrop click handling,
   * body scroll locking, and smooth animations.
   *
   * @component
   * @example
   * // In your component:
   * let isOpen = false;
   *
   * <Button on:click={() => isOpen = true}>Open Modal</Button>
   *
   * <Modal bind:open={isOpen} title="Confirm Action">
   *   <p>Are you sure you want to proceed?</p>
   *   <svelte:fragment slot="footer">
   *     <Button variant="secondary" on:click={() => isOpen = false}>Cancel</Button>
   *     <Button on:click={handleConfirm}>Confirm</Button>
   *   </svelte:fragment>
   * </Modal>
   */

  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { fade, scale } from 'svelte/transition';
  import Portal from '../utilities/Portal.svelte';

  const dispatch = createEventDispatcher();

  /**
   * Controls whether the modal is open
   * @type {boolean}
   */
  export let open = false;

  /**
   * Modal size variant
   * @type {'sm' | 'md' | 'lg' | 'full'}
   */
  export let size = 'md';

  /**
   * Modal title (displayed in header)
   * @type {string}
   */
  export let title = '';

  /**
   * Whether to disable closing on backdrop click
   * @type {boolean}
   */
  export let disableBackdropClick = false;

  /**
   * Whether to disable closing on ESC key
   * @type {boolean}
   */
  export let closeOnEsc = true;

  /**
   * ARIA label for the dialog (used if no title provided)
   * @type {string}
   */
  export let ariaLabel = '';

  /**
   * Dialog role (dialog or alertdialog)
   * @type {'dialog' | 'alertdialog'}
   */
  export let role = 'dialog';

  // Internal state
  let dialogElement;
  let previousActiveElement;
  let isMouseDownOnBackdrop = false;

  // Generate unique IDs for ARIA
  const dialogId = `modal-${Math.random().toString(36).substr(2, 9)}`;
  const titleId = `${dialogId}-title`;
  const descId = `${dialogId}-desc`;

  // Size class mapping
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    full: 'max-w-full mx-4'
  };

  /**
   * Get all focusable elements within the dialog
   * @returns {HTMLElement[]}
   */
  function getFocusableElements() {
    if (!dialogElement) return [];

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ');

    return Array.from(dialogElement.querySelectorAll(focusableSelectors));
  }

  /**
   * Trap focus within the modal
   * @param {KeyboardEvent} event
   */
  function handleKeyDown(event) {
    if (!open) return;

    // Handle ESC key
    if (event.key === 'Escape' && closeOnEsc) {
      event.preventDefault();
      handleClose('escape');
      return;
    }

    // Handle Tab key for focus trap
    if (event.key === 'Tab') {
      const focusableElements = getFocusableElements();

      if (focusableElements.length === 0) {
        // If no focusable elements, prevent default to trap focus on dialog
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab (backward)
        if (document.activeElement === firstElement || document.activeElement === dialogElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab (forward)
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  }

  /**
   * Lock body scroll when modal is open
   */
  function lockBodyScroll() {
    // Save current scroll position
    const scrollY = window.scrollY;
    document.body.style.top = `-${scrollY}px`;

    // Lock scroll
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  }

  /**
   * Unlock body scroll when modal is closed
   */
  function unlockBodyScroll() {
    // Restore scroll position
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  /**
   * Set initial focus when modal opens
   */
  function setInitialFocus() {
    if (!dialogElement) return;

    const focusableElements = getFocusableElements();

    if (focusableElements.length > 0) {
      // Focus first focusable element
      focusableElements[0].focus();
    } else {
      // Focus dialog itself if no focusable elements
      dialogElement.focus();
    }
  }

  /**
   * Handle modal close
   * @param {'backdrop' | 'escape' | 'close-button' | 'programmatic'} reason
   */
  function handleClose(reason = 'programmatic') {
    dispatch('close', { reason });
    open = false;
  }

  /**
   * Handle backdrop mousedown
   * @param {MouseEvent} event
   */
  function handleBackdropMouseDown(event) {
    // Track if mousedown started on backdrop
    if (event.target === event.currentTarget) {
      isMouseDownOnBackdrop = true;
    }
  }

  /**
   * Handle backdrop click (mouseup)
   * @param {MouseEvent} event
   */
  function handleBackdropClick(event) {
    // Only close if both mousedown and mouseup were on backdrop
    if (
      !disableBackdropClick &&
      isMouseDownOnBackdrop &&
      event.target === event.currentTarget
    ) {
      handleClose('backdrop');
    }
    isMouseDownOnBackdrop = false;
  }

  // Lifecycle: Manage modal open/close state
  $: if (open) {
    // Save current focus
    previousActiveElement = document.activeElement;

    // Lock body scroll
    lockBodyScroll();

    // Set initial focus after transition
    setTimeout(() => {
      setInitialFocus();
    }, 100);

    // Dispatch open event
    dispatch('open');
  } else if (previousActiveElement) {
    // Restore focus
    unlockBodyScroll();

    // Restore focus to previous element
    if (previousActiveElement && previousActiveElement.focus) {
      previousActiveElement.focus();
    }
  }

  // Add global keydown listener
  onMount(() => {
    document.addEventListener('keydown', handleKeyDown);
  });

  onDestroy(() => {
    document.removeEventListener('keydown', handleKeyDown);

    // Cleanup: unlock scroll if modal was open
    if (open) {
      unlockBodyScroll();
    }
  });
</script>

{#if open}
  <Portal>
    <!-- Backdrop -->
    <div
      class="modal-backdrop fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      on:mousedown={handleBackdropMouseDown}
      on:click={handleBackdropClick}
      transition:fade={{ duration: 200 }}
      role="presentation"
    >
      <!-- Dialog -->
      <div
        bind:this={dialogElement}
        {role}
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={descId}
        aria-label={ariaLabel || undefined}
        tabindex="-1"
        class="modal-dialog bg-v-surface rounded-v-lg shadow-v-lg w-full {sizeClasses[size]} max-h-[90vh] flex flex-col overflow-hidden"
        transition:scale={{ duration: 200, start: 0.95 }}
        on:click|stopPropagation
      >
        <!-- Header -->
        {#if title || $$slots.header}
          <div class="modal-header flex items-center justify-between px-v-6 py-v-4 border-b border-v-border">
            {#if $$slots.header}
              <slot name="header" />
            {:else if title}
              <h2 id={titleId} class="text-v-lg font-v-semibold text-v-text-primary">
                {title}
              </h2>
            {/if}

            <button
              type="button"
              class="ml-auto p-v-2 rounded-v-md hover:bg-v-surface-hover focus:outline-none focus:ring-2 focus:ring-v-primary text-v-text-secondary"
              on:click={() => handleClose('close-button')}
              aria-label="Close dialog"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        {/if}

        <!-- Body -->
        <div
          id={descId}
          class="modal-body flex-1 overflow-y-auto px-v-6 py-v-4"
        >
          <slot />
        </div>

        <!-- Footer -->
        {#if $$slots.footer}
          <div class="modal-footer px-v-6 py-v-4 border-t border-v-border flex gap-v-3 justify-end">
            <slot name="footer" />
          </div>
        {/if}
      </div>
    </div>
  </Portal>
{/if}

<style>
  .modal-backdrop {
    /* Ensure backdrop is above other content */
    z-index: 9998;
  }

  .modal-dialog {
    /* Ensure dialog is above backdrop */
    z-index: 9999;
  }

  /* Smooth scrolling for modal body */
  .modal-body {
    -webkit-overflow-scrolling: touch;
  }

  /* Focus visible styling */
  .modal-dialog:focus {
    outline: none;
  }

  .modal-dialog:focus-visible {
    outline: 2px solid var(--color-v-primary, #3b82f6);
    outline-offset: 2px;
  }
</style>
