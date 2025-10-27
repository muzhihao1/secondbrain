/**
 * Separator Component Stories
 * Demonstrates visual dividers
 */

import Separator from './Separator.svelte';
import Stack from './Stack.svelte';
import Inline from './Inline.svelte';
import Box from './Box.svelte';

export default {
  title: 'Primitives/Separator',
  component: Separator,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Separator orientation',
    },
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'strong'],
      description: 'Visual style',
    },
    spacing: {
      control: 'select',
      options: ['0', '2', '4', '6', '8'],
      description: 'Spacing around separator',
    },
    label: {
      control: 'text',
      description: 'ARIA label',
    },
  },
};

// Default Horizontal
export const Default = {
  args: {
    orientation: 'horizontal',
    variant: 'default',
    spacing: '0',
  },
  render: (args) => ({
    Component: Stack,
    props: { gap: '0' },
    slots: {
      default: `
        <Box padding="4" background="surface">Section 1</Box>
        <Separator {...args} />
        <Box padding="4" background="surface">Section 2</Box>
      `,
    },
  }),
};

// Variants
export const Variants = {
  render: () => ({
    Component: Stack,
    props: { gap: '6' },
    slots: {
      default: `
        <div>
          <p style="margin-bottom: 1rem; color: var(--text-primary);">Subtle</p>
          <Separator variant="subtle" />
        </div>

        <div>
          <p style="margin-bottom: 1rem; color: var(--text-primary);">Default</p>
          <Separator variant="default" />
        </div>

        <div>
          <p style="margin-bottom: 1rem; color: var(--text-primary);">Strong</p>
          <Separator variant="strong" />
        </div>
      `,
    },
  }),
};

// With Spacing
export const WithSpacing = {
  render: () => ({
    Component: Stack,
    props: { gap: '0' },
    slots: {
      default: `
        <Box padding="4" background="surface">Content Above</Box>
        <Separator spacing="4" />
        <Box padding="4" background="surface">Content Below</Box>

        <Separator spacing="8" />

        <Box padding="4" background="surface">More Content</Box>
      `,
    },
  }),
};

// Vertical Separator
export const Vertical = {
  render: () => ({
    Component: Inline,
    props: { gap: '0', align: 'stretch' },
    slots: {
      default: `
        <Box padding="4" background="surface" style="height: 100px; display: flex; align-items: center; justify-content: center;">
          Left Content
        </Box>
        <Separator orientation="vertical" />
        <Box padding="4" background="surface" style="height: 100px; display: flex; align-items: center; justify-content: center;">
          Right Content
        </Box>
      `,
    },
  }),
};

// Vertical with Spacing
export const VerticalWithSpacing = {
  render: () => ({
    Component: Inline,
    props: { gap: '0', align: 'stretch' },
    slots: {
      default: `
        <Box padding="4" background="surface" style="height: 100px; display: flex; align-items: center; justify-content: center;">
          Left
        </Box>
        <Separator orientation="vertical" spacing="4" />
        <Box padding="4" background="surface" style="height: 100px; display: flex; align-items: center; justify-content: center;">
          Middle
        </Box>
        <Separator orientation="vertical" spacing="4" />
        <Box padding="4" background="surface" style="height: 100px; display: flex; align-items: center; justify-content: center;">
          Right
        </Box>
      `,
    },
  }),
};

// Card with Sections
export const CardSections = {
  render: () => ({
    Component: Box,
    props: {
      padding: '0',
      background: 'surface',
      borderRadius: 'lg',
      border: 'default',
    },
    slots: {
      default: `
        <Stack gap="0">
          <Box padding="6">
            <h3 style="margin: 0; color: var(--text-primary);">Card Header</h3>
            <p style="margin: 0.5rem 0 0 0; color: var(--text-secondary);">Card subtitle</p>
          </Box>

          <Separator />

          <Box padding="6">
            <p style="margin: 0; color: var(--text-primary);">Main content goes here...</p>
          </Box>

          <Separator />

          <Box padding="6">
            <Inline gap="2">
              <button style="padding: 0.5rem 1rem; background: var(--interactive-primary-default); color: white; border: none; border-radius: 0.5rem;">Action</button>
              <button style="padding: 0.5rem 1rem; background: var(--interactive-secondary-default); border: none; border-radius: 0.5rem;">Cancel</button>
            </Inline>
          </Box>
        </Stack>
      `,
    },
  }),
};

// Menu Example
export const MenuExample = {
  render: () => ({
    Component: Box,
    props: {
      padding: '2',
      background: 'surface',
      borderRadius: 'md',
      border: 'default',
    },
    slots: {
      default: `
        <Stack gap="0">
          <button style="width: 100%; text-align: left; padding: 0.75rem; background: transparent; border: none; color: var(--text-primary); cursor: pointer;">
            Profile Settings
          </button>
          <button style="width: 100%; text-align: left; padding: 0.75rem; background: transparent; border: none; color: var(--text-primary); cursor: pointer;">
            Account
          </button>

          <Separator variant="subtle" spacing="2" />

          <button style="width: 100%; text-align: left; padding: 0.75rem; background: transparent; border: none; color: var(--text-primary); cursor: pointer;">
            Help & Support
          </button>

          <Separator variant="subtle" spacing="2" />

          <button style="width: 100%; text-align: left; padding: 0.75rem; background: transparent; border: none; color: var(--color-semantic-error-500); cursor: pointer;">
            Sign Out
          </button>
        </Stack>
      `,
    },
  }),
};
