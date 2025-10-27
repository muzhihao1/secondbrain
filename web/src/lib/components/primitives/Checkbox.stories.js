/**
 * Checkbox Component Stories
 */

import Checkbox from './Checkbox.svelte';
import Stack from './Stack.svelte';

export default {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    label: 'Accept terms and conditions',
    checked: false,
  },
};

export const Checked = {
  args: {
    label: 'I agree',
    checked: true,
  },
};

export const Disabled = {
  render: () => ({
    Component: Stack,
    props: { gap: '2' },
    slots: {
      default: `
        <Checkbox label="Disabled unchecked" disabled />
        <Checkbox label="Disabled checked" checked disabled />
      `,
    },
  }),
};

export const Group = {
  render: () => ({
    Component: Stack,
    props: { gap: '2' },
    slots: {
      default: `
        <Checkbox label="Option 1" />
        <Checkbox label="Option 2" />
        <Checkbox label="Option 3" checked />
      `,
    },
  }),
};
