/**
 * Textarea Component Stories
 */

import Textarea from './Textarea.svelte';
import Stack from './Stack.svelte';

export default {
  title: 'Primitives/Textarea',
  component: Textarea,
  tags: ['autodocs'],
};

export const Default = {
  args: {
    placeholder: 'Enter your message...',
    rows: 4,
  },
};

export const Rows = {
  render: () => ({
    Component: Stack,
    props: { gap: '3' },
    slots: {
      default: `
        <Textarea rows="2" placeholder="2 rows" />
        <Textarea rows="6" placeholder="6 rows" />
        <Textarea rows="10" placeholder="10 rows" />
      `,
    },
  }),
};

export const WithError = {
  render: () => ({
    Component: Textarea,
    props: {
      placeholder: 'Message',
      error: 'Message is required',
    },
  }),
};

export const Disabled = {
  render: () => ({
    Component: Textarea,
    props: {
      placeholder: 'Disabled textarea',
      disabled: true,
    },
  }),
};
