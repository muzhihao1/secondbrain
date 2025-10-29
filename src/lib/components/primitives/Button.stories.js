/**
 * Button Component Stories
 * Demonstrates all Button variants, sizes, and states
 */

import Button from './Button.svelte';

export default {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Button visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type',
    },
    onClick: { action: 'clicked' },
  },
};

// Default story
export const Default = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
  },
  render: (args) => ({
    Component: Button,
    props: args,
    slots: { default: 'Button' },
  }),
};

// Primary Button
export const Primary = {
  args: {
    variant: 'primary',
    size: 'md',
  },
  render: (args) => ({
    Component: Button,
    props: args,
    slots: { default: 'Primary Button' },
  }),
};

// Secondary Button
export const Secondary = {
  args: {
    variant: 'secondary',
    size: 'md',
  },
  render: (args) => ({
    Component: Button,
    props: args,
    slots: { default: 'Secondary Button' },
  }),
};

// Ghost Button
export const Ghost = {
  args: {
    variant: 'ghost',
    size: 'md',
  },
  render: (args) => ({
    Component: Button,
    props: args,
    slots: { default: 'Ghost Button' },
  }),
};

// Small Size
export const Small = {
  args: {
    variant: 'primary',
    size: 'sm',
  },
  render: (args) => ({
    Component: Button,
    props: args,
    slots: { default: 'Small Button' },
  }),
};

// Large Size
export const Large = {
  args: {
    variant: 'primary',
    size: 'lg',
  },
  render: (args) => ({
    Component: Button,
    props: args,
    slots: { default: 'Large Button' },
  }),
};

// Disabled State
export const Disabled = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
  render: (args) => ({
    Component: Button,
    props: args,
    slots: { default: 'Disabled Button' },
  }),
};

// Full Width
export const FullWidth = {
  args: {
    variant: 'primary',
    size: 'md',
    fullWidth: true,
  },
  render: (args) => ({
    Component: Button,
    props: args,
    slots: { default: 'Full Width Button' },
  }),
};

// All Variants
export const AllVariants = {
  render: () => ({
    Component: Button,
    props: {},
    slots: {
      default: `
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      `,
    },
  }),
};

// All Sizes
export const AllSizes = {
  render: () => ({
    Component: Button,
    props: {},
    slots: {
      default: `
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      `,
    },
  }),
};
