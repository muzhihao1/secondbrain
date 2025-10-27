/**
 * Stack Component Stories
 * Demonstrates vertical layout patterns
 */

import Stack from './Stack.svelte';
import Box from './Box.svelte';

export default {
  title: 'Primitives/Stack',
  component: Stack,
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12'],
      description: 'Gap between items',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Horizontal alignment',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Vertical distribution',
    },
    wrap: {
      control: 'boolean',
      description: 'Allow wrapping',
    },
    as: {
      control: 'select',
      options: ['div', 'section', 'ul', 'ol'],
      description: 'HTML element',
    },
  },
};

// Default
export const Default = {
  args: {
    gap: '4',
    align: 'stretch',
  },
  render: (args) => ({
    Component: Stack,
    props: args,
    slots: {
      default: `
        <Box padding="4" background="surface" borderRadius="md">Item 1</Box>
        <Box padding="4" background="surface" borderRadius="md">Item 2</Box>
        <Box padding="4" background="surface" borderRadius="md">Item 3</Box>
      `,
    },
  }),
};

// Different Gaps
export const Gaps = {
  render: () => ({
    Component: Stack,
    props: {},
    slots: {
      default: `
        <div style="display: flex; gap: 2rem;">
          <Stack gap="2">
            <Box padding="2" background="surface" borderRadius="md">gap-2</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-2</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-2</Box>
          </Stack>
          <Stack gap="4">
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
          </Stack>
          <Stack gap="8">
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
          </Stack>
        </div>
      `,
    },
  }),
};

// Horizontal Alignment
export const Alignment = {
  render: () => ({
    Component: Stack,
    props: {},
    slots: {
      default: `
        <div style="display: flex; gap: 2rem;">
          <Stack gap="4" align="start" style="width: 200px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="3" background="surface" borderRadius="md">Start</Box>
            <Box padding="3" background="surface" borderRadius="md">Aligned</Box>
          </Stack>
          <Stack gap="4" align="center" style="width: 200px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="3" background="surface" borderRadius="md">Center</Box>
            <Box padding="3" background="surface" borderRadius="md">Aligned</Box>
          </Stack>
          <Stack gap="4" align="end" style="width: 200px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="3" background="surface" borderRadius="md">End</Box>
            <Box padding="3" background="surface" borderRadius="md">Aligned</Box>
          </Stack>
        </div>
      `,
    },
  }),
};

// Vertical Distribution
export const Distribution = {
  render: () => ({
    Component: Stack,
    props: {},
    slots: {
      default: `
        <div style="display: flex; gap: 2rem;">
          <Stack gap="0" justify="space-between" style="height: 200px; width: 150px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">Top</Box>
            <Box padding="2" background="surface" borderRadius="md">Bottom</Box>
          </Stack>
          <Stack gap="0" justify="space-around" style="height: 200px; width: 150px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">Around</Box>
            <Box padding="2" background="surface" borderRadius="md">Around</Box>
          </Stack>
          <Stack gap="0" justify="space-evenly" style="height: 200px; width: 150px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">Evenly</Box>
            <Box padding="2" background="surface" borderRadius="md">Evenly</Box>
          </Stack>
        </div>
      `,
    },
  }),
};

// Form Example
export const FormExample = {
  render: () => ({
    Component: Stack,
    props: {
      gap: '4',
      as: 'div',
    },
    slots: {
      default: `
        <div>
          <label style="display: block; margin-bottom: 0.5rem; color: var(--text-primary);">Name</label>
          <input type="text" style="width: 100%; padding: 0.5rem; background: var(--color-neutral-200); border: 1px solid var(--surface-border-default); border-radius: 0.5rem; color: var(--text-primary);" placeholder="Enter name" />
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem; color: var(--text-primary);">Email</label>
          <input type="email" style="width: 100%; padding: 0.5rem; background: var(--color-neutral-200); border: 1px solid var(--surface-border-default); border-radius: 0.5rem; color: var(--text-primary);" placeholder="Enter email" />
        </div>
        <div>
          <label style="display: block; margin-bottom: 0.5rem; color: var(--text-primary);">Message</label>
          <textarea style="width: 100%; padding: 0.5rem; background: var(--color-neutral-200); border: 1px solid var(--surface-border-default); border-radius: 0.5rem; color: var(--text-primary); min-height: 100px;" placeholder="Enter message"></textarea>
        </div>
      `,
    },
  }),
};
