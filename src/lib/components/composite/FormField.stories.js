/**
 * FormField Component Stories
 *
 * Demonstrates the FormField wrapper component which bridges
 * Form state management with individual input primitives.
 */

import FormField from './FormField.svelte';
import Form from './Form.svelte';

export default {
  title: 'Composite/FormField',
  component: FormField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
FormField is a wrapper component that:
- Connects inputs to Form state via Svelte Context
- Handles labeling with proper accessibility
- Displays validation errors
- Shows required field indicators
- Provides help text for user guidance

**Note**: FormField must be used within a Form component to access form state.

## Usage

\`\`\`svelte
<Form onSubmit={handleSubmit}>
  <FormField name="email" label="Email Address" required>
    <input type="email" />
  </FormField>
</Form>
\`\`\`
        `
      }
    }
  }
};

/**
 * Basic FormField
 *
 * Simple FormField with a text input and label.
 */
export const Basic = {
  render: () => ({
    Component: Form,
    props: {
      onSubmit: (values) => console.log(values)
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Basic FormField with label and input. The label is properly associated with the input via htmlFor.'
      },
      source: {
        code: `
<Form onSubmit={handleSubmit}>
  <FormField name="firstName" label="First Name">
    <input type="text" placeholder="Enter your first name" />
  </FormField>
</Form>
        `
      }
    }
  }
};

/**
 * Required Field
 *
 * FormField with required indicator (*) and validation.
 */
export const Required = {
  render: () => ({
    Component: Form,
    props: {
      onSubmit: (values) => console.log(values)
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Required fields show an asterisk (*) and validate on blur. Try leaving the field empty and clicking elsewhere.'
      },
      source: {
        code: `
<Form onSubmit={handleSubmit}>
  <FormField name="email" label="Email Address" required>
    <input type="email" placeholder="you@example.com" />
  </FormField>
</Form>
        `
      }
    }
  }
};

/**
 * With Help Text
 *
 * FormField with helpful description text below the input.
 */
export const WithHelpText = {
  render: () => ({
    Component: Form,
    props: {
      onSubmit: (values) => console.log(values)
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Help text provides guidance to users. It is hidden when error messages are displayed.'
      },
      source: {
        code: `
<Form onSubmit={handleSubmit}>
  <FormField
    name="username"
    label="Username"
    helpText="Choose a unique username (3-20 characters)"
  >
    <input type="text" placeholder="johndoe" />
  </FormField>
</Form>
        `
      }
    }
  }
};

/**
 * With Custom Validation
 *
 * FormField with a custom validation function.
 */
export const CustomValidation = {
  render: () => ({
    Component: Form,
    props: {
      onSubmit: (values) => console.log(values)
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Custom validation functions run on blur. Try entering an invalid email address.'
      },
      source: {
        code: `
<script>
  function validateEmail(value) {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  }
</script>

<Form onSubmit={handleSubmit}>
  <FormField
    name="email"
    label="Email"
    required
    validate={validateEmail}
  >
    <input type="email" placeholder="you@example.com" />
  </FormField>
</Form>
        `
      }
    }
  }
};

/**
 * With Textarea
 *
 * FormField works with any input type, including textarea.
 */
export const WithTextarea = {
  render: () => ({
    Component: Form,
    props: {
      onSubmit: (values) => console.log(values)
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'FormField supports textarea inputs with the same validation and error handling.'
      },
      source: {
        code: `
<Form onSubmit={handleSubmit}>
  <FormField
    name="bio"
    label="Biography"
    helpText="Tell us about yourself (max 500 characters)"
  >
    <textarea
      rows="4"
      placeholder="I am a..."
      maxlength="500"
    ></textarea>
  </FormField>
</Form>
        `
      }
    }
  }
};

/**
 * With Select
 *
 * FormField with a select dropdown input.
 */
export const WithSelect = {
  render: () => ({
    Component: Form,
    props: {
      onSubmit: (values) => console.log(values)
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'FormField supports select elements for dropdown choices.'
      },
      source: {
        code: `
<Form onSubmit={handleSubmit}>
  <FormField name="country" label="Country" required>
    <select>
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
      <option value="au">Australia</option>
    </select>
  </FormField>
</Form>
        `
      }
    }
  }
};

/**
 * Disabled State
 *
 * FormField in disabled state, non-interactive.
 */
export const Disabled = {
  render: () => ({
    Component: Form,
    props: {
      onSubmit: (values) => console.log(values),
      disabled: true
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Disabled FormField is non-interactive and visually dimmed.'
      },
      source: {
        code: `
<Form disabled onSubmit={handleSubmit}>
  <FormField name="email" label="Email Address" disabled>
    <input type="email" value="user@example.com" />
  </FormField>
</Form>
        `
      }
    }
  }
};

/**
 * Error State
 *
 * FormField displaying a validation error.
 */
export const ErrorState = {
  render: () => ({
    Component: Form,
    props: {
      onSubmit: (values) => console.log(values)
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'When validation fails, errors are displayed with proper ARIA attributes for screen readers.'
      },
      source: {
        code: `
<Form onSubmit={handleSubmit}>
  <FormField
    name="password"
    label="Password"
    required
    validate={(value) => {
      if (value.length < 8) return 'Password must be at least 8 characters';
      return '';
    }}
  >
    <input type="password" />
  </FormField>
</Form>
        `
      }
    }
  }
};

/**
 * Multiple FormFields
 *
 * Demonstrates multiple FormFields working together in a form.
 */
export const MultipleFields = {
  render: () => ({
    Component: Form,
    props: {
      onSubmit: (values) => {
        console.log('Form values:', values);
        alert(`Form submitted with:\n${JSON.stringify(values, null, 2)}`);
      }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Multiple FormFields in a single form, each managing its own state through the Form context.'
      },
      source: {
        code: `
<Form onSubmit={handleSubmit}>
  <FormField name="firstName" label="First Name" required>
    <input type="text" placeholder="John" />
  </FormField>

  <FormField name="lastName" label="Last Name" required>
    <input type="text" placeholder="Doe" />
  </FormField>

  <FormField name="email" label="Email Address" required>
    <input type="email" placeholder="john.doe@example.com" />
  </FormField>

  <FormField
    name="phone"
    label="Phone Number"
    helpText="Optional - for account recovery"
  >
    <input type="tel" placeholder="+1 (555) 123-4567" />
  </FormField>

  <Button type="submit">Create Account</Button>
</Form>
        `
      }
    }
  }
};
