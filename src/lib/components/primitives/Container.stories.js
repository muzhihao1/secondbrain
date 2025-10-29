/**
 * Container Component Stories
 * Demonstrates content width constraints
 */

import Container from './Container.svelte';
import Box from './Box.svelte';
import Stack from './Stack.svelte';

export default {
  title: 'Primitives/Container',
  component: Container,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Max width constraint',
    },
    padding: {
      control: 'select',
      options: ['0', '2', '4', '6', '8'],
      description: 'Horizontal padding',
    },
    as: {
      control: 'select',
      options: ['div', 'main', 'section', 'article'],
      description: 'HTML element',
    },
  },
};

// Default
export const Default = {
  args: {
    size: 'lg',
    padding: '4',
  },
  render: (args) => ({
    Component: Container,
    props: args,
    slots: {
      default: `
        <Box padding="6" background="surface" borderRadius="lg">
          <h2 style="margin: 0 0 1rem 0; color: var(--text-primary);">Contained Content</h2>
          <p style="margin: 0; color: var(--text-secondary);">
            This content is constrained to a maximum width and centered horizontally.
            It provides a consistent, readable layout across different screen sizes.
          </p>
        </Box>
      `,
    },
  }),
};

// Different Sizes
export const Sizes = {
  render: () => ({
    Component: Stack,
    props: { gap: '6' },
    slots: {
      default: `
        <Container size="sm" padding="4">
          <Box padding="4" background="surface" borderRadius="md">
            <strong>SM (640px)</strong> - Narrow content
          </Box>
        </Container>
        <Container size="md" padding="4">
          <Box padding="4" background="surface" borderRadius="md">
            <strong>MD (768px)</strong> - Medium content
          </Box>
        </Container>
        <Container size="lg" padding="4">
          <Box padding="4" background="surface" borderRadius="md">
            <strong>LG (1024px)</strong> - Default width
          </Box>
        </Container>
        <Container size="xl" padding="4">
          <Box padding="4" background="surface" borderRadius="md">
            <strong>XL (1280px)</strong> - Wide content
          </Box>
        </Container>
        <Container size="2xl" padding="4">
          <Box padding="4" background="surface" borderRadius="md">
            <strong>2XL (1536px)</strong> - Extra wide
          </Box>
        </Container>
      `,
    },
  }),
};

// Page Layout Example
export const PageLayoutExample = {
  render: () => ({
    Component: Container,
    props: {
      size: 'lg',
      padding: '6',
      as: 'main',
    },
    slots: {
      default: `
        <Stack gap="8">
          <Box as="header">
            <h1 style="margin: 0; color: var(--text-primary); font-size: 2.5rem;">
              Page Title
            </h1>
            <p style="margin: 0.5rem 0 0 0; color: var(--text-secondary);">
              Subtitle or description goes here
            </p>
          </Box>

          <Stack gap="4">
            <Box padding="6" background="surface" borderRadius="lg">
              <h2 style="margin: 0 0 1rem 0; color: var(--text-primary);">Section 1</h2>
              <p style="margin: 0; color: var(--text-secondary);">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Box>

            <Box padding="6" background="surface" borderRadius="lg">
              <h2 style="margin: 0 0 1rem 0; color: var(--text-primary);">Section 2</h2>
              <p style="margin: 0; color: var(--text-secondary);">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </Box>
          </Stack>
        </Stack>
      `,
    },
  }),
};

// No Padding
export const NoPadding = {
  render: () => ({
    Component: Container,
    props: {
      size: 'md',
      padding: '0',
    },
    slots: {
      default: `
        <Box padding="4" background="surface" borderRadius="none" style="border: 2px solid var(--surface-border-accent);">
          Container with no padding - content touches edges on mobile
        </Box>
      `,
    },
  }),
};
