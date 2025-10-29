/**
 * ErrorMessage Component Stories
 *
 * Demonstrates the ErrorMessage component used for displaying
 * validation errors and warnings in forms.
 */

import ErrorMessage from './ErrorMessage.svelte';

export default {
  title: 'Composite/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
ErrorMessage is a specialized component for displaying validation errors and warnings.

**Features:**
- Accessible error display with \`role="alert"\` and \`aria-live="polite"\`
- Consistent styling and spacing
- Support for error and warning variants
- Proper color contrast for WCAG compliance

ErrorMessage is typically used within FormField but can be used standalone for custom error displays.

## Usage

\`\`\`svelte
<ErrorMessage id="email-error">
  Please enter a valid email address
</ErrorMessage>
\`\`\`
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['error', 'warning'],
      description: 'Visual variant of the error message',
      table: {
        defaultValue: { summary: 'error' }
      }
    },
    id: {
      control: 'text',
      description: 'Unique ID for aria-describedby association',
      table: {
        defaultValue: { summary: '' }
      }
    }
  }
};

/**
 * Default Error
 *
 * Standard error message in red color.
 */
export const Default = {
  args: {
    id: 'error-1',
    variant: 'error'
  },
  render: (args) => ({
    Component: ErrorMessage,
    props: args,
    slot: 'This field is required'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Default error variant displays in red for validation errors.'
      },
      source: {
        code: `
<ErrorMessage id="email-error">
  This field is required
</ErrorMessage>
        `
      }
    }
  }
};

/**
 * Warning Variant
 *
 * Warning message in amber/yellow color for non-critical issues.
 */
export const Warning = {
  args: {
    id: 'warning-1',
    variant: 'warning'
  },
  render: (args) => ({
    Component: ErrorMessage,
    props: args,
    slot: 'This password is commonly used and may not be secure'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Warning variant for non-critical validation messages.'
      },
      source: {
        code: `
<ErrorMessage id="password-warning" variant="warning">
  This password is commonly used and may not be secure
</ErrorMessage>
        `
      }
    }
  }
};

/**
 * Email Validation Error
 *
 * Real-world example: Email format validation error.
 */
export const EmailValidation = {
  args: {
    id: 'email-error',
    variant: 'error'
  },
  render: (args) => ({
    Component: ErrorMessage,
    props: args,
    slot: 'Please enter a valid email address (e.g., user@example.com)'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Example error message for email validation.'
      }
    }
  }
};

/**
 * Password Requirements Error
 *
 * Real-world example: Password strength validation.
 */
export const PasswordRequirements = {
  args: {
    id: 'password-error',
    variant: 'error'
  },
  render: (args) => ({
    Component: ErrorMessage,
    props: args,
    slot: 'Password must be at least 8 characters and include a number'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Error message explaining password requirements.'
      }
    }
  }
};

/**
 * Username Taken Error
 *
 * Real-world example: Async validation failure (username already exists).
 */
export const UsernameTaken = {
  args: {
    id: 'username-error',
    variant: 'error'
  },
  render: (args) => ({
    Component: ErrorMessage,
    props: args,
    slot: 'This username is already taken. Please choose another.'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Error message for async validation (e.g., checking username availability).'
      }
    }
  }
};

/**
 * Required Field Error
 *
 * Real-world example: Simple required field validation.
 */
export const RequiredField = {
  args: {
    id: 'required-error',
    variant: 'error'
  },
  render: (args) => ({
    Component: ErrorMessage,
    props: args,
    slot: 'Email Address is required'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Standard required field error message.'
      }
    }
  }
};

/**
 * Multiple Errors Example
 *
 * Demonstrates multiple error messages stacked.
 */
export const MultipleErrors = {
  render: () => ({
    Component: 'div',
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <label for="username" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">
            Username
          </label>
          <input
            id="username"
            type="text"
            style="width: 100%; padding: 0.5rem; border: 2px solid #dc2626; border-radius: 0.375rem;"
            aria-invalid="true"
            aria-describedby="username-error"
          />
          <div id="username-error" role="alert" aria-live="polite" style="margin-top: 0.5rem; color: #dc2626; font-size: 0.875rem;">
            Username must be at least 3 characters
          </div>
        </div>

        <div>
          <label for="email" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">
            Email
          </label>
          <input
            id="email"
            type="email"
            style="width: 100%; padding: 0.5rem; border: 2px solid #dc2626; border-radius: 0.375rem;"
            aria-invalid="true"
            aria-describedby="email-error"
          />
          <div id="email-error" role="alert" aria-live="polite" style="margin-top: 0.5rem; color: #dc2626; font-size: 0.875rem;">
            Please enter a valid email address
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Example showing multiple error messages in a form with proper ARIA associations.'
      }
    }
  }
};

/**
 * Long Error Message
 *
 * Tests how the component handles longer error messages.
 */
export const LongErrorMessage = {
  args: {
    id: 'long-error',
    variant: 'error'
  },
  render: (args) => ({
    Component: ErrorMessage,
    props: args,
    slot: 'Your password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character. Please update your password to meet these requirements.'
  }),
  parameters: {
    docs: {
      description: {
        story: 'Error message component handles long text gracefully with proper wrapping.'
      }
    }
  }
};

/**
 * With Accessible Input Example
 *
 * Complete example showing ErrorMessage with proper ARIA associations.
 */
export const AccessibleExample = {
  render: () => ({
    Component: 'div',
    template: `
      <div>
        <label for="accessible-email" style="display: block; margin-bottom: 0.5rem; font-weight: 500;">
          Email Address
          <span style="color: #dc2626;" aria-label="required">*</span>
        </label>
        <input
          id="accessible-email"
          type="email"
          style="width: 100%; padding: 0.5rem; border: 2px solid #dc2626; border-radius: 0.375rem;"
          aria-invalid="true"
          aria-describedby="accessible-email-error"
        />
        <div id="accessible-email-error" role="alert" aria-live="polite" style="margin-top: 0.5rem; color: #dc2626; font-size: 0.875rem;">
          Please enter a valid email address
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Complete accessible example showing proper label, input, and error association using aria-describedby.'
      },
      source: {
        code: `
<script>
  const errorId = 'email-error';
</script>

<div>
  <label for="email">
    Email Address
    <span class="text-v-error" aria-label="required">*</span>
  </label>

  <input
    id="email"
    type="email"
    aria-invalid="true"
    aria-describedby={errorId}
  />

  <ErrorMessage id={errorId}>
    Please enter a valid email address
  </ErrorMessage>
</div>
        `
      }
    }
  }
};
