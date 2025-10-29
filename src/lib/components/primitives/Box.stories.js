/**
 * Box Component Stories
 * Demonstrates the fundamental layout primitive
 */

import Box from './Box.svelte';

export default {
  title: 'Primitives/Box',
  component: Box,
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12'],
      description: 'Internal spacing',
    },
    margin: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12'],
      description: 'External spacing',
    },
    background: {
      control: 'select',
      options: ['transparent', 'bg-default', 'bg-elevated', 'surface', 'surface-hover'],
      description: 'Background color',
    },
    borderRadius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Corner rounding',
    },
    border: {
      control: 'select',
      options: ['none', 'default', 'subtle', 'strong'],
      description: 'Border style',
    },
    display: {
      control: 'select',
      options: ['block', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid'],
      description: 'CSS display property',
    },
    as: {
      control: 'select',
      options: ['div', 'section', 'article', 'aside', 'main', 'header', 'footer', 'nav'],
      description: 'HTML element to render',
    },
  },
};

// Default
export const Default = {
  args: {
    padding: '4',
    background: 'surface',
    borderRadius: 'md',
  },
  render: (args) => ({
    Component: Box,
    props: args,
    slots: { default: 'Box content' },
  }),
};

// With Padding
export const WithPadding = {
  render: () => ({
    Component: Box,
    props: {},
    slots: {
      default: `
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <Box padding="2" background="surface" borderRadius="md">p-2</Box>
          <Box padding="4" background="surface" borderRadius="md">p-4</Box>
          <Box padding="6" background="surface" borderRadius="md">p-6</Box>
          <Box padding="8" background="surface" borderRadius="md">p-8</Box>
        </div>
      `,
    },
  }),
};

// Background Variants
export const Backgrounds = {
  render: () => ({
    Component: Box,
    props: {},
    slots: {
      default: `
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <Box padding="4" background="bg-default" borderRadius="md">bg-default</Box>
          <Box padding="4" background="bg-elevated" borderRadius="md">bg-elevated</Box>
          <Box padding="4" background="surface" borderRadius="md">surface</Box>
          <Box padding="4" background="surface-hover" borderRadius="md">surface-hover</Box>
        </div>
      `,
    },
  }),
};

// Border Radius
export const BorderRadius = {
  render: () => ({
    Component: Box,
    props: {},
    slots: {
      default: `
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
          <Box padding="4" background="surface" borderRadius="none">none</Box>
          <Box padding="4" background="surface" borderRadius="sm">sm</Box>
          <Box padding="4" background="surface" borderRadius="md">md</Box>
          <Box padding="4" background="surface" borderRadius="lg">lg</Box>
          <Box padding="4" background="surface" borderRadius="xl">xl</Box>
        </div>
      `,
    },
  }),
};

// Borders
export const Borders = {
  render: () => ({
    Component: Box,
    props: {},
    slots: {
      default: `
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <Box padding="4" background="surface" borderRadius="md" border="subtle">subtle</Box>
          <Box padding="4" background="surface" borderRadius="md" border="default">default</Box>
          <Box padding="4" background="surface" borderRadius="md" border="strong">strong</Box>
        </div>
      `,
    },
  }),
};

// Semantic Elements
export const SemanticElements = {
  render: () => ({
    Component: Box,
    props: {},
    slots: {
      default: `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <Box as="header" padding="4" background="surface" borderRadius="md">Header Element</Box>
          <Box as="main" padding="4" background="surface" borderRadius="md">Main Content</Box>
          <Box as="aside" padding="4" background="surface" borderRadius="md">Aside Element</Box>
          <Box as="footer" padding="4" background="surface" borderRadius="md">Footer Element</Box>
        </div>
      `,
    },
  }),
};

// Card Example
export const CardExample = {
  render: () => ({
    Component: Box,
    props: {
      padding: '6',
      background: 'surface',
      borderRadius: 'lg',
      border: 'subtle',
    },
    slots: {
      default: `
        <div>
          <h3 style="margin: 0 0 0.5rem 0; color: var(--text-primary);">Card Title</h3>
          <p style="margin: 0; color: var(--text-secondary);">
            This is an example of using Box as a card component with padding,
            background, border radius, and border.
          </p>
        </div>
      `,
    },
  }),
};
