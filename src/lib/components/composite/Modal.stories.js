/**
 * Modal Component Stories
 *
 * Demonstrates the Modal component with various configurations,
 * sizes, and use cases including forms, confirmations, and content displays.
 */

import Modal from './Modal.svelte';
import Button from '../primitives/Button.svelte';

export default {
  title: 'Composite/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Modal component provides an accessible dialog overlay for displaying content above the main page.

## Features

- **Focus Management**: Automatically traps focus within the modal and restores it on close
- **Keyboard Navigation**: ESC to close, Tab/Shift+Tab to cycle through focusable elements
- **Backdrop Click**: Optionally close on backdrop click (enabled by default)
- **Body Scroll Lock**: Prevents background scrolling while modal is open
- **Smooth Animations**: Fade-in/out with scale effect
- **Accessible**: Full WCAG AA compliance with proper ARIA attributes
- **Responsive Sizes**: sm, md, lg, and full-width variants
- **Flexible Slots**: header, body (default), and footer for custom layouts

## Usage

\`\`\`svelte
<script>
  let isOpen = false;
</script>

<Button on:click={() => isOpen = true}>Open Modal</Button>

<Modal bind:open={isOpen} title="Modal Title">
  <p>Modal content goes here</p>
  <svelte:fragment slot="footer">
    <Button on:click={() => isOpen = false}>Close</Button>
  </svelte:fragment>
</Modal>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the modal is open',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'full'],
      description: 'Modal size variant',
      table: {
        defaultValue: { summary: 'md' }
      }
    },
    title: {
      control: 'text',
      description: 'Modal title displayed in header',
      table: {
        defaultValue: { summary: '' }
      }
    },
    disableBackdropClick: {
      control: 'boolean',
      description: 'Disable closing on backdrop click',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    closeOnEsc: {
      control: 'boolean',
      description: 'Enable closing with ESC key',
      table: {
        defaultValue: { summary: 'true' }
      }
    }
  }
};

/**
 * Basic Modal
 *
 * A simple modal with title and content.
 */
export const Basic = {
  render: () => ({
    Component: Modal,
    props: {
      open: false,
      title: 'Basic Modal',
      size: 'md'
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Basic modal with title, body content, and default close button. Click the button to open.'
      },
      source: {
        code: `
<script>
  let isOpen = false;
</script>

<Button on:click={() => isOpen = true}>Open Modal</Button>

<Modal bind:open={isOpen} title="Basic Modal">
  <p>This is a basic modal with some content.</p>
  <p>You can close it by clicking the X button, pressing ESC, or clicking outside.</p>
</Modal>
        `
      }
    }
  }
};

/**
 * With Footer Actions
 *
 * Modal with footer buttons for actions.
 */
export const WithFooter = {
  render: () => ({
    Component: Modal,
    props: {
      open: false,
      title: 'Confirm Action'
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Modal with footer slot for action buttons (Cancel/Confirm pattern).'
      },
      source: {
        code: `
<script>
  let isOpen = false;

  function handleConfirm() {
    console.log('Confirmed!');
    isOpen = false;
  }
</script>

<Button on:click={() => isOpen = true}>Open Confirmation</Button>

<Modal bind:open={isOpen} title="Confirm Action">
  <p>Are you sure you want to proceed with this action?</p>
  <p class="text-v-text-secondary text-v-sm mt-v-2">
    This action cannot be undone.
  </p>

  <svelte:fragment slot="footer">
    <Button variant="secondary" on:click={() => isOpen = false}>
      Cancel
    </Button>
    <Button on:click={handleConfirm}>
      Confirm
    </Button>
  </svelte:fragment>
</Modal>
        `
      }
    }
  }
};

/**
 * Small Size
 *
 * Compact modal for simple alerts or confirmations.
 */
export const SmallSize = {
  render: () => ({
    Component: Modal,
    props: {
      open: false,
      title: 'Delete Item',
      size: 'sm'
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Small modal (400px max-width) ideal for simple confirmations or alerts.'
      },
      source: {
        code: `
<Modal open={isOpen} size="sm" title="Delete Item">
  <p>Are you sure you want to delete this item?</p>
  <svelte:fragment slot="footer">
    <Button variant="secondary" size="sm" on:click={() => isOpen = false}>
      Cancel
    </Button>
    <Button variant="destructive" size="sm" on:click={handleDelete}>
      Delete
    </Button>
  </svelte:fragment>
</Modal>
        `
      }
    }
  }
};

/**
 * Large Size
 *
 * Larger modal for content-heavy displays.
 */
export const LargeSize = {
  render: () => ({
    Component: Modal,
    props: {
      open: false,
      title: 'Terms and Conditions',
      size: 'lg'
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Large modal (800px max-width) for displaying extensive content.'
      },
      source: {
        code: `
<Modal open={isOpen} size="lg" title="Terms and Conditions">
  <div class="space-y-v-4">
    <p>Please read our terms and conditions carefully...</p>
    <h3 class="font-v-semibold">1. Acceptance of Terms</h3>
    <p>By accessing this service, you agree to be bound by these terms...</p>
    <!-- More content -->
  </div>
  <svelte:fragment slot="footer">
    <Button on:click={() => isOpen = false}>I Agree</Button>
  </svelte:fragment>
</Modal>
        `
      }
    }
  }
};

/**
 * Full Width
 *
 * Full-width modal with minimal margins.
 */
export const FullWidth = {
  render: () => ({
    Component: Modal,
    props: {
      open: false,
      title: 'Full Width Modal',
      size: 'full'
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Full-width modal that spans nearly the entire viewport width.'
      },
      source: {
        code: `
<Modal open={isOpen} size="full" title="Full Width Modal">
  <p>This modal takes up almost the full width of the viewport.</p>
  <p>Useful for displaying wide content like tables or galleries.</p>
</Modal>
        `
      }
    }
  }
};

/**
 * With Form
 *
 * Modal containing a form with validation.
 */
export const WithForm = {
  render: () => ({
    Component: Modal,
    props: {
      open: false,
      title: 'Contact Us'
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Modal with an integrated form. Focus trap ensures proper tab navigation through form fields.'
      },
      source: {
        code: `
<script>
  import { Form, FormField, Modal, Button } from '$lib/components';

  let isOpen = false;

  function handleSubmit(values) {
    console.log('Form submitted:', values);
    isOpen = false;
  }
</script>

<Modal bind:open={isOpen} title="Contact Us">
  <Form onSubmit={handleSubmit}>
    <FormField name="name" label="Name" required>
      <input type="text" placeholder="Your name" />
    </FormField>

    <FormField name="email" label="Email" required>
      <input type="email" placeholder="you@example.com" />
    </FormField>

    <FormField name="message" label="Message" required>
      <textarea rows="4" placeholder="Your message"></textarea>
    </FormField>

    <svelte:fragment slot="footer">
      <Button type="button" variant="secondary" on:click={() => isOpen = false}>
        Cancel
      </Button>
      <Button type="submit">Send Message</Button>
    </svelte:fragment>
  </Form>
</Modal>
        `
      }
    }
  }
};

/**
 * Disable Backdrop Click
 *
 * Modal that only closes via button or ESC key.
 */
export const DisableBackdropClick = {
  render: () => ({
    Component: Modal,
    props: {
      open: false,
      title: 'Important Notice',
      disableBackdropClick: true
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Modal with backdrop click disabled. Users must use the close button or ESC key.'
      },
      source: {
        code: `
<Modal open={isOpen} title="Important Notice" disableBackdropClick>
  <p>Please read this important information carefully.</p>
  <p>You must acknowledge this message to continue.</p>

  <svelte:fragment slot="footer">
    <Button on:click={() => isOpen = false}>I Understand</Button>
  </svelte:fragment>
</Modal>
        `
      }
    }
  }
};

/**
 * Disable ESC Key
 *
 * Modal that requires explicit close action.
 */
export const DisableEscKey = {
  render: () => ({
    Component: Modal,
    props: {
      open: false,
      title: 'Unsaved Changes',
      closeOnEsc: false,
      disableBackdropClick: true
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Modal with both ESC and backdrop click disabled, forcing explicit choice.'
      },
      source: {
        code: `
<Modal
  open={isOpen}
  title="Unsaved Changes"
  closeOnEsc={false}
  disableBackdropClick={true}
>
  <p>You have unsaved changes. What would you like to do?</p>

  <svelte:fragment slot="footer">
    <Button variant="secondary" on:click={handleDiscard}>
      Discard Changes
    </Button>
    <Button on:click={handleSave}>
      Save Changes
    </Button>
  </svelte:fragment>
</Modal>
        `
      }
    }
  }
};

/**
 * Scrollable Content
 *
 * Modal with long content that scrolls.
 */
export const ScrollableContent = {
  render: () => ({
    Component: Modal,
    props: {
      open: false,
      title: 'Long Content',
      size: 'md'
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Modal with scrollable body content. Header and footer remain fixed while body scrolls.'
      },
      source: {
        code: `
<Modal open={isOpen} title="Long Content">
  <div class="space-y-v-4">
    {#each Array(20) as _, i}
      <p>Paragraph {i + 1}: This is example content to demonstrate scrolling...</p>
    {/each}
  </div>

  <svelte:fragment slot="footer">
    <Button on:click={() => isOpen = false}>Close</Button>
  </svelte:fragment>
</Modal>
        `
      }
    }
  }
};

/**
 * Custom Header
 *
 * Modal with custom header content using slot.
 */
export const CustomHeader = {
  render: () => ({
    Component: Modal,
    props: {
      open: false
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Modal with custom header slot for complex header layouts.'
      },
      source: {
        code: `
<Modal open={isOpen}>
  <svelte:fragment slot="header">
    <div class="flex items-center gap-v-3">
      <div class="w-10 h-10 rounded-full bg-v-primary flex items-center justify-center">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h2 class="font-v-semibold text-v-lg">Success!</h2>
        <p class="text-v-sm text-v-text-secondary">Your changes have been saved</p>
      </div>
    </div>
  </svelte:fragment>

  <p>All your changes have been successfully saved to the server.</p>

  <svelte:fragment slot="footer">
    <Button on:click={() => isOpen = false}>Continue</Button>
  </svelte:fragment>
</Modal>
        `
      }
    }
  }
};

/**
 * Alert Dialog
 *
 * Modal with alertdialog role for urgent messages.
 */
export const AlertDialog = {
  render: () => ({
    Component: Modal,
    props: {
      open: false,
      title: 'Delete Account',
      role: 'alertdialog',
      size: 'sm',
      disableBackdropClick: true,
      closeOnEsc: false
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Alert dialog for critical actions requiring user attention and explicit choice.'
      },
      source: {
        code: `
<Modal
  open={isOpen}
  title="Delete Account"
  role="alertdialog"
  size="sm"
  disableBackdropClick={true}
  closeOnEsc={false}
>
  <p class="text-v-error">This action cannot be undone!</p>
  <p class="mt-v-2">Are you absolutely sure you want to delete your account?</p>

  <svelte:fragment slot="footer">
    <Button variant="secondary" on:click={() => isOpen = false}>
      Cancel
    </Button>
    <Button variant="destructive" on:click={handleDeleteAccount}>
      Delete Account
    </Button>
  </svelte:fragment>
</Modal>
        `
      }
    }
  }
};
