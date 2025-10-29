/**
 * Select Component Stories
 */

import Select from './Select.svelte';
import Stack from './Stack.svelte';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export default {
  title: 'Primitives/Select',
  component: Select,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    options: mockOptions,
    placeholder: 'Choose an option',
    size: 'md',
  },
};

export const Sizes = {
  render: () => ({
    Component: Stack,
    props: { gap: '3' },
    slots: {
      default: `
        <Select size="sm" options=${JSON.stringify(mockOptions)} placeholder="Small" />
        <Select size="md" options=${JSON.stringify(mockOptions)} placeholder="Medium" />
        <Select size="lg" options=${JSON.stringify(mockOptions)} placeholder="Large" />
      `,
    },
  }),
};

export const WithError = {
  render: () => ({
    Component: Select,
    props: {
      options: mockOptions,
      error: 'Selection required',
    },
  }),
};

export const Disabled = {
  render: () => ({
    Component: Select,
    props: {
      options: mockOptions,
      disabled: true,
    },
  }),
};
