/**
 * Text Component Stories
 * Demonstrates typography for body text
 */

import Text from './Text.svelte';
import Stack from './Stack.svelte';
import Box from './Box.svelte';

export default {
  title: 'Primitives/Text',
  component: Text,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl'],
      description: 'Text size',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'accent', 'success', 'warning', 'error', 'inverse'],
      description: 'Text color',
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    lineHeight: {
      control: 'select',
      options: ['tight', 'normal', 'relaxed', 'loose'],
      description: 'Line height',
    },
    truncate: {
      control: 'boolean',
      description: 'Truncate with ellipsis',
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'label'],
      description: 'HTML element',
    },
  },
};

// Default
export const Default = {
  args: {
    size: 'base',
    color: 'primary',
  },
  render: (args) => ({
    Component: Text,
    props: args,
    slots: { default: 'This is default text content with normal styling.' },
  }),
};

// Sizes
export const Sizes = {
  render: () => ({
    Component: Stack,
    props: { gap: '3' },
    slots: {
      default: `
        <Text size="xs">Extra small text (xs)</Text>
        <Text size="sm">Small text (sm)</Text>
        <Text size="base">Base text (base)</Text>
        <Text size="lg">Large text (lg)</Text>
        <Text size="xl">Extra large text (xl)</Text>
      `,
    },
  }),
};

// Colors
export const Colors = {
  render: () => ({
    Component: Stack,
    props: { gap: '2' },
    slots: {
      default: `
        <Text color="primary">Primary text color</Text>
        <Text color="secondary">Secondary text color</Text>
        <Text color="tertiary">Tertiary text color</Text>
        <Text color="accent">Accent text color</Text>
        <Text color="success">Success text color</Text>
        <Text color="warning">Warning text color</Text>
        <Text color="error">Error text color</Text>
        <Box background="surface" padding="2">
          <Text color="inverse">Inverse text color</Text>
        </Box>
      `,
    },
  }),
};

// Weights
export const Weights = {
  render: () => ({
    Component: Stack,
    props: { gap: '2' },
    slots: {
      default: `
        <Text weight="light">Light weight</Text>
        <Text weight="normal">Normal weight</Text>
        <Text weight="medium">Medium weight</Text>
        <Text weight="semibold">Semibold weight</Text>
        <Text weight="bold">Bold weight</Text>
      `,
    },
  }),
};

// Alignment
export const Alignment = {
  render: () => ({
    Component: Stack,
    props: { gap: '4' },
    slots: {
      default: `
        <Box padding="4" background="surface" borderRadius="md">
          <Text align="left">Left aligned text content</Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text align="center">Center aligned text content</Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text align="right">Right aligned text content</Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text align="justify">
            Justified text will stretch to fill the full width of the container.
            This is particularly useful for long paragraphs where you want even spacing.
          </Text>
        </Box>
      `,
    },
  }),
};

// Line Heights
export const LineHeights = {
  render: () => ({
    Component: Stack,
    props: { gap: '4' },
    slots: {
      default: `
        <Box padding="4" background="surface" borderRadius="md">
          <Text lineHeight="tight">
            Tight line height creates compact text. Good for headings and labels.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text lineHeight="normal">
            Normal line height is the default. Balanced for most content.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text lineHeight="relaxed">
            Relaxed line height creates more breathing room. Good for readability.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Text lineHeight="loose">
            Loose line height creates maximum spacing. Best for poetry or emphasis.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Box>
      `,
    },
  }),
};

// Truncate
export const Truncate = {
  render: () => ({
    Component: Box,
    props: { padding: '4', background: 'surface', borderRadius: 'md' },
    slots: {
      default: `
        <Text truncate>
          This is a very long text that will be truncated with an ellipsis when it exceeds the container width. You won't see the full content.
        </Text>
      `,
    },
  }),
};

// Paragraph Example
export const ParagraphExample = {
  render: () => ({
    Component: Stack,
    props: { gap: '4' },
    slots: {
      default: `
        <Text size="lg" weight="semibold" color="primary">
          Article Title
        </Text>
        <Text size="base" color="secondary" lineHeight="relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </Text>
        <Text size="base" color="secondary" lineHeight="relaxed">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
        </Text>
      `,
    },
  }),
};

// Label Example
export const LabelExample = {
  render: () => ({
    Component: Stack,
    props: { gap: '2' },
    slots: {
      default: `
        <Text as="label" size="sm" weight="medium" color="primary">
          Email Address
        </Text>
        <input
          type="email"
          style="width: 100%; padding: 0.5rem; background: var(--color-neutral-200); border: 1px solid var(--surface-border-default); border-radius: 0.5rem; color: var(--text-primary);"
          placeholder="Enter your email"
        />
        <Text as="span" size="xs" color="tertiary">
          We'll never share your email with anyone else.
        </Text>
      `,
    },
  }),
};
