/**
 * Switch Component Stories
 */

import Switch from './Switch.svelte';
import Stack from './Stack.svelte';
import Inline from './Inline.svelte';

export default {
  title: 'Primitives/Switch',
  component: Switch,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    label: 'Enable notifications',
    checked: false,
  },
};

export const Checked = {
  args: {
    label: 'Enabled',
    checked: true,
  },
};

export const Sizes = {
  render: () => ({
    Component: Stack,
    props: { gap: '3' },
    slots: {
      default: `
        <Switch size="sm" label="Small switch" />
        <Switch size="md" label="Medium switch" />
        <Switch size="lg" label="Large switch" />
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
        <Switch label="Disabled off" disabled />
        <Switch label="Disabled on" checked disabled />
      `,
    },
  }),
};

export const SettingsExample = {
  render: () => ({
    Component: Stack,
    props: { gap: '4' },
    slots: {
      default: `
        <Switch label="Push notifications" checked />
        <Switch label="Email notifications" />
        <Switch label="SMS notifications" disabled />
      `,
    },
  }),
};
