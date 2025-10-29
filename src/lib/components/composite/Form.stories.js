/**
 * Form Component Stories
 *
 * Demonstrates the Form component system including Form wrapper,
 * FormField wrapper, and validation patterns.
 */

import Form from './Form.svelte';
import FormField from './FormField.svelte';
import Button from '../primitives/Button.svelte';

export default {
  title: 'Composite/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Form component provides a comprehensive form state management solution with:
- Built-in validation (required fields, custom validators)
- Error handling and display
- Touch tracking for better UX
- Accessible form controls with proper ARIA attributes

The Form uses Svelte Context API to share state with FormField children,
eliminating the need for prop drilling.

## Usage

\`\`\`svelte
<Form onSubmit={handleSubmit}>
  <FormField name="email" label="Email Address" required>
    <input type="email" />
  </FormField>
  <Button type="submit">Submit</Button>
</Form>
\`\`\`
        `
      }
    }
  }
};

/**
 * Basic Form Example
 *
 * A simple form with text inputs demonstrating the basic usage pattern.
 */
export const Basic = {
  render: () => ({
    Component: Form,
    props: {
      onSubmit: (values) => {
        console.log('Form submitted:', values);
        alert(`Form submitted with values:\n${JSON.stringify(values, null, 2)}`);
      }
    }
  }),
  args: {},
  play: async ({ canvasElement }) => {
    // You can add interactive tests here using @storybook/test
  },
  parameters: {
    docs: {
      source: {
        code: `
<Form onSubmit={handleSubmit}>
  <FormField name="firstName" label="First Name">
    <input type="text" placeholder="John" />
  </FormField>

  <FormField name="lastName" label="Last Name">
    <input type="text" placeholder="Doe" />
  </FormField>

  <Button type="submit">Submit</Button>
</Form>
        `
      }
    }
  }
};

/**
 * Form with Required Fields
 *
 * Demonstrates required field validation. Try submitting without filling
 * the required fields to see validation errors.
 */
export const RequiredFields = {
  render: () => ({
    Component: Form,
    props: {
      onSubmit: (values) => {
        console.log('Form submitted:', values);
        alert(`Success! Form submitted with:\n${JSON.stringify(values, null, 2)}`);
      }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Form with required field validation. Fields marked with * must be filled before submission.'
      },
      source: {
        code: `
<Form onSubmit={handleSubmit}>
  <FormField name="email" label="Email Address" required>
    <input type="email" placeholder="you@example.com" />
  </FormField>

  <FormField name="password" label="Password" required>
    <input type="password" placeholder="Enter password" />
  </FormField>

  <FormField name="bio" label="Bio" helpText="Optional field">
    <textarea placeholder="Tell us about yourself..."></textarea>
  </FormField>

  <Button type="submit">Create Account</Button>
</Form>
        `
      }
    }
  }
};

/**
 * Form with Custom Validation
 *
 * Demonstrates custom field-level validation functions.
 * The email field validates the format, and the password field checks length.
 */
export const CustomValidation = {
  render: () => ({
    Component: Form,
    props: {
      onSubmit: (values) => {
        console.log('Form submitted:', values);
        alert(`Success! Form submitted with:\n${JSON.stringify(values, null, 2)}`);
      }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Form with custom validation functions. Try entering invalid email or short password.'
      },
      source: {
        code: `
<script>
  function validateEmail(value) {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return '';
  }

  function validatePassword(value) {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
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

  <FormField
    name="password"
    label="Password"
    required
    validate={validatePassword}
    helpText="Must be at least 8 characters"
  >
    <input type="password" />
  </FormField>

  <Button type="submit">Sign Up</Button>
</Form>
        `
      }
    }
  }
};

/**
 * Form with Form-Level Validation
 *
 * Demonstrates form-level validation that can validate across multiple fields.
 * This example checks that password and confirm password match.
 */
export const FormLevelValidation = {
  render: () => ({
    Component: Form,
    props: {
      onSubmit: (values) => {
        console.log('Form submitted:', values);
        alert(`Success! Passwords match:\n${JSON.stringify(values, null, 2)}`);
      },
      validate: (values) => {
        const errors = {};

        // Check if passwords match
        if (values.password !== values.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }

        // Additional form-level validations
        if (values.password && values.password.length < 8) {
          errors.password = 'Password must be at least 8 characters';
        }

        return errors;
      }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Form-level validation can validate across multiple fields. Try entering mismatched passwords.'
      },
      source: {
        code: `
<script>
  function validateForm(values) {
    const errors = {};

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (values.password && values.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    return errors;
  }
</script>

<Form onSubmit={handleSubmit} validate={validateForm}>
  <FormField name="password" label="Password" required>
    <input type="password" />
  </FormField>

  <FormField name="confirmPassword" label="Confirm Password" required>
    <input type="password" />
  </FormField>

  <Button type="submit">Set Password</Button>
</Form>
        `
      }
    }
  }
};

/**
 * Disabled Form State
 *
 * Demonstrates a form in disabled state where all inputs are non-interactive.
 */
export const DisabledState = {
  render: () => ({
    Component: Form,
    props: {
      disabled: true,
      onSubmit: (values) => {
        console.log('This should not fire when disabled');
      }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Form in disabled state. All fields and submit button are non-interactive.'
      },
      source: {
        code: `
<Form disabled onSubmit={handleSubmit}>
  <FormField name="email" label="Email Address" required>
    <input type="email" value="user@example.com" />
  </FormField>

  <FormField name="status" label="Status">
    <select>
      <option>Active</option>
      <option>Pending</option>
    </select>
  </FormField>

  <Button type="submit" disabled>Submit (Disabled)</Button>
</Form>
        `
      }
    }
  }
};

/**
 * Form with Different Input Types
 *
 * Demonstrates FormField working with various input types including
 * text, email, password, textarea, select, and checkbox.
 */
export const DifferentInputTypes = {
  render: () => ({
    Component: Form,
    props: {
      onSubmit: (values) => {
        console.log('Form submitted:', values);
        alert(`Form submitted with:\n${JSON.stringify(values, null, 2)}`);
      }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'FormField supports various HTML input types with consistent styling and validation.'
      },
      source: {
        code: `
<Form onSubmit={handleSubmit}>
  <FormField name="username" label="Username" required>
    <input type="text" placeholder="johndoe" />
  </FormField>

  <FormField name="email" label="Email" required>
    <input type="email" placeholder="john@example.com" />
  </FormField>

  <FormField name="password" label="Password" required>
    <input type="password" />
  </FormField>

  <FormField name="bio" label="Biography" helpText="Tell us about yourself">
    <textarea rows="4" placeholder="I am a..."></textarea>
  </FormField>

  <FormField name="country" label="Country" required>
    <select>
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
    </select>
  </FormField>

  <FormField name="newsletter" label="Subscribe to newsletter">
    <input type="checkbox" />
  </FormField>

  <Button type="submit">Complete Profile</Button>
</Form>
        `
      }
    }
  }
};

/**
 * Form with Help Text
 *
 * Demonstrates FormField with helpful descriptions and guidance.
 */
export const WithHelpText = {
  render: () => ({
    Component: Form,
    props: {
      onSubmit: (values) => {
        console.log('Form submitted:', values);
        alert(`Form submitted successfully!`);
      }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'FormField can display help text to guide users. Help text is hidden when errors are shown.'
      },
      source: {
        code: `
<Form onSubmit={handleSubmit}>
  <FormField
    name="username"
    label="Username"
    required
    helpText="Choose a unique username (3-20 characters, alphanumeric only)"
  >
    <input type="text" placeholder="johndoe123" />
  </FormField>

  <FormField
    name="email"
    label="Email Address"
    required
    helpText="We'll send a confirmation email to this address"
  >
    <input type="email" placeholder="you@example.com" />
  </FormField>

  <FormField
    name="phone"
    label="Phone Number"
    helpText="Optional - for account recovery only"
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

/**
 * Async Validation Example
 *
 * Demonstrates asynchronous validation (e.g., checking username availability).
 */
export const AsyncValidation = {
  render: () => ({
    Component: Form,
    props: {
      onSubmit: (values) => {
        console.log('Form submitted:', values);
        alert(`Success! Username "${values.username}" is available!`);
      }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'FormField supports async validation functions for server-side checks like username availability.'
      },
      source: {
        code: `
<script>
  async function validateUsername(value) {
    if (!value) return 'Username is required';
    if (value.length < 3) return 'Username must be at least 3 characters';

    // Simulate API call to check username availability
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulate some taken usernames
    const takenUsernames = ['admin', 'user', 'test'];
    if (takenUsernames.includes(value.toLowerCase())) {
      return 'This username is already taken';
    }

    return '';
  }
</script>

<Form onSubmit={handleSubmit}>
  <FormField
    name="username"
    label="Username"
    required
    validate={validateUsername}
    helpText="Checking availability..."
  >
    <input type="text" placeholder="Choose a username" />
  </FormField>

  <FormField name="email" label="Email" required>
    <input type="email" placeholder="you@example.com" />
  </FormField>

  <Button type="submit">Sign Up</Button>
</Form>
        `
      }
    }
  }
};

/**
 * Compact Form Layout
 *
 * Demonstrates a compact form layout for space-constrained UIs.
 */
export const CompactLayout = {
  render: () => ({
    Component: Form,
    props: {
      onSubmit: (values) => {
        console.log('Login:', values);
        alert(`Logging in as ${values.email}...`);
      }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Compact form layout suitable for modals, sidebars, or space-constrained interfaces.'
      },
      source: {
        code: `
<div style="max-width: 320px;">
  <Form onSubmit={handleLogin}>
    <FormField name="email" label="Email" required>
      <input type="email" placeholder="you@example.com" />
    </FormField>

    <FormField name="password" label="Password" required>
      <input type="password" placeholder="••••••••" />
    </FormField>

    <FormField name="remember" label="Remember me">
      <input type="checkbox" />
    </FormField>

    <Button type="submit" fullWidth>Sign In</Button>
  </Form>
</div>
        `
      }
    }
  }
};
