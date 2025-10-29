/**
 * Input Component Stories
 */

import Input from './Input.svelte';
import Stack from './Stack.svelte';
import Text from './Text.svelte';

export default {
  title: 'Primitives/Input',
  component: Input,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    placeholder: 'Enter text...',
    size: 'md',
  },
};

export const Sizes = {
  render: () => ({
    Component: Stack,
    props: { gap: '3' },
    slots: {
      default: `
        <Input size="sm" placeholder="Small input" />
        <Input size="md" placeholder="Medium input" />
        <Input size="lg" placeholder="Large input" />
      `,
    },
  }),
};

export const Types = {
  render: () => ({
    Component: Stack,
    props: { gap: '3' },
    slots: {
      default: `
        <Input type="text" placeholder="Text" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="number" placeholder="Number" />
        <Input type="tel" placeholder="Phone" />
        <Input type="url" placeholder="URL" />
      `,
    },
  }),
};

export const WithError = {
  render: () => ({
    Component: Stack,
    props: { gap: '2' },
    slots: {
      default: `
        <Input placeholder="Email" error="Invalid email address" />
        <Text size="sm" color="error">Invalid email address</Text>
      `,
    },
  }),
};

export const Disabled = {
  render: () => ({
    Component: Input,
    props: {
      placeholder: 'Disabled input',
      disabled: true,
    },
  }),
};

export const FullWidth = {
  render: () => ({
    Component: Input,
    props: {
      placeholder: 'Full width input',
      fullWidth: true,
    },
  }),
};
