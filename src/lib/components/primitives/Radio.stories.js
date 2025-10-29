/**
 * Radio Component Stories
 */

import Radio from './Radio.svelte';
import Stack from './Stack.svelte';

export default {
  title: 'Primitives/Radio',
  component: Radio,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    name: 'option',
    value: '1',
    label: 'Option 1',
  },
};

export const Group = {
  render: () => ({
    Component: Stack,
    props: { gap: '2' },
    slots: {
      default: `
        <Radio name="size" value="small" label="Small" />
        <Radio name="size" value="medium" label="Medium" />
        <Radio name="size" value="large" label="Large" />
      `,
    },
  }),
};

export const Disabled = {
  render: () => ({
    Component: Stack,
    props: { gap: '2' },
    slots: {
      default: `
        <Radio name="option" value="1" label="Disabled option" disabled />
        <Radio name="option" value="2" label="Available option" />
      `,
    },
  }),
};
