/**
 * Inline Component Stories
 * Demonstrates horizontal layout patterns
 */

import Inline from './Inline.svelte';
import Box from './Box.svelte';
import Button from './Button.svelte';

export default {
  title: 'Primitives/Inline',
  component: Inline,
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12'],
      description: 'Gap between items',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Vertical alignment',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'space-between', 'space-around', 'space-evenly'],
      description: 'Horizontal distribution',
    },
    wrap: {
      control: 'boolean',
      description: 'Allow wrapping',
    },
    as: {
      control: 'select',
      options: ['div', 'span', 'nav', 'ul'],
      description: 'HTML element',
    },
  },
};

// Default
export const Default = {
  args: {
    gap: '2',
    align: 'center',
  },
  render: (args) => ({
    Component: Inline,
    props: args,
    slots: {
      default: `
        <Box padding="3" background="surface" borderRadius="md">Item 1</Box>
        <Box padding="3" background="surface" borderRadius="md">Item 2</Box>
        <Box padding="3" background="surface" borderRadius="md">Item 3</Box>
      `,
    },
  }),
};

// Different Gaps
export const Gaps = {
  render: () => ({
    Component: Inline,
    props: {},
    slots: {
      default: `
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <Inline gap="1">
            <Box padding="2" background="surface" borderRadius="md">gap-1</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-1</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-1</Box>
          </Inline>
          <Inline gap="4">
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-4</Box>
          </Inline>
          <Inline gap="8">
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
            <Box padding="2" background="surface" borderRadius="md">gap-8</Box>
          </Inline>
        </div>
      `,
    },
  }),
};

// Vertical Alignment
export const Alignment = {
  render: () => ({
    Component: Inline,
    props: {},
    slots: {
      default: `
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <Inline gap="4" align="start" style="height: 100px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">Start</Box>
            <Box padding="4" background="surface" borderRadius="md">Aligned</Box>
          </Inline>
          <Inline gap="4" align="center" style="height: 100px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">Center</Box>
            <Box padding="4" background="surface" borderRadius="md">Aligned</Box>
          </Inline>
          <Inline gap="4" align="end" style="height: 100px; border: 1px solid var(--surface-border-subtle);">
            <Box padding="2" background="surface" borderRadius="md">End</Box>
            <Box padding="4" background="surface" borderRadius="md">Aligned</Box>
          </Inline>
        </div>
      `,
    },
  }),
};

// Horizontal Distribution
export const Distribution = {
  render: () => ({
    Component: Inline,
    props: {},
    slots: {
      default: `
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <Inline gap="0" justify="space-between" style="width: 100%; border: 1px solid var(--surface-border-subtle); padding: 1rem;">
            <Box padding="2" background="surface" borderRadius="md">Left</Box>
            <Box padding="2" background="surface" borderRadius="md">Right</Box>
          </Inline>
          <Inline gap="0" justify="space-around" style="width: 100%; border: 1px solid var(--surface-border-subtle); padding: 1rem;">
            <Box padding="2" background="surface" borderRadius="md">Around</Box>
            <Box padding="2" background="surface" borderRadius="md">Around</Box>
          </Inline>
          <Inline gap="0" justify="center" style="width: 100%; border: 1px solid var(--surface-border-subtle); padding: 1rem;">
            <Box padding="2" background="surface" borderRadius="md">Centered</Box>
            <Box padding="2" background="surface" borderRadius="md">Items</Box>
          </Inline>
        </div>
      `,
    },
  }),
};

// Button Group
export const ButtonGroup = {
  render: () => ({
    Component: Inline,
    props: {
      gap: '2',
      align: 'center',
    },
    slots: {
      default: `
        <Button variant="primary">Save</Button>
        <Button variant="secondary">Cancel</Button>
        <Button variant="ghost">More Options</Button>
      `,
    },
  }),
};

// With Wrapping
export const WithWrapping = {
  render: () => ({
    Component: Inline,
    props: {
      gap: '2',
      wrap: true,
    },
    slots: {
      default: `
        <Box padding="2" background="surface" borderRadius="md">Tag 1</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 2</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 3</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 4</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 5</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 6</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 7</Box>
        <Box padding="2" background="surface" borderRadius="md">Tag 8</Box>
      `,
    },
  }),
};

// Navbar Example
export const NavbarExample = {
  render: () => ({
    Component: Inline,
    props: {
      gap: '6',
      align: 'center',
      justify: 'space-between',
      as: 'nav',
    },
    slots: {
      default: `
        <Box padding="2" background="surface" borderRadius="md" style="font-weight: 600;">Logo</Box>
        <Inline gap="4">
          <Box padding="2">Home</Box>
          <Box padding="2">About</Box>
          <Box padding="2">Contact</Box>
        </Inline>
        <Button size="sm">Sign In</Button>
      `,
    },
  }),
};
