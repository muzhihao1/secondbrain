/**
 * Heading Component Stories
 * Demonstrates heading typography
 */

import Heading from './Heading.svelte';
import Text from './Text.svelte';
import Stack from './Stack.svelte';
import Box from './Box.svelte';
import Separator from './Separator.svelte';

export default {
  title: 'Primitives/Heading',
  component: Heading,
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: ['1', '2', '3', '4', '5', '6'],
      description: 'Semantic HTML level',
    },
    size: {
      control: 'select',
      options: ['xl', '2xl', '3xl', '4xl', '5xl'],
      description: 'Visual size (overrides default)',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'accent'],
      description: 'Text color',
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    marginBottom: {
      control: 'select',
      options: ['0', '2', '4', '6', '8'],
      description: 'Bottom margin',
    },
  },
};

// Default
export const Default = {
  args: {
    level: '2',
    color: 'primary',
  },
  render: (args) => ({
    Component: Heading,
    props: args,
    slots: { default: 'Heading Text' },
  }),
};

// All Levels
export const AllLevels = {
  render: () => ({
    Component: Stack,
    props: { gap: '4' },
    slots: {
      default: `
        <Heading level="1">Heading 1 - 5xl (Page Title)</Heading>
        <Heading level="2">Heading 2 - 4xl (Section Title)</Heading>
        <Heading level="3">Heading 3 - 3xl (Subsection)</Heading>
        <Heading level="4">Heading 4 - 2xl (Minor Heading)</Heading>
        <Heading level="5">Heading 5 - xl (Small Heading)</Heading>
        <Heading level="6">Heading 6 - xl (Smallest Heading)</Heading>
      `,
    },
  }),
};

// Custom Sizes
export const CustomSizes = {
  render: () => ({
    Component: Stack,
    props: { gap: '4' },
    slots: {
      default: `
        <Heading level="3" size="5xl">H3 styled as 5xl</Heading>
        <Heading level="2" size="2xl">H2 styled as 2xl</Heading>
        <Heading level="1" size="xl">H1 styled as xl</Heading>
      `,
    },
  }),
};

// Colors
export const Colors = {
  render: () => ({
    Component: Stack,
    props: { gap: '3' },
    slots: {
      default: `
        <Heading level="2" color="primary">Primary Heading</Heading>
        <Heading level="2" color="secondary">Secondary Heading</Heading>
        <Heading level="2" color="accent">Accent Heading</Heading>
      `,
    },
  }),
};

// Weights
export const Weights = {
  render: () => ({
    Component: Stack,
    props: { gap: '3' },
    slots: {
      default: `
        <Heading level="2" weight="normal">Normal Weight</Heading>
        <Heading level="2" weight="medium">Medium Weight</Heading>
        <Heading level="2" weight="semibold">Semibold Weight</Heading>
        <Heading level="2" weight="bold">Bold Weight</Heading>
      `,
    },
  }),
};

// Alignment
export const Alignment = {
  render: () => ({
    Component: Stack,
    props: { gap: '4' },
    slots: {
      default: `
        <Box padding="4" background="surface" borderRadius="md">
          <Heading level="2" align="left">Left Aligned</Heading>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Heading level="2" align="center">Center Aligned</Heading>
        </Box>
        <Box padding="4" background="surface" borderRadius="md">
          <Heading level="2" align="right">Right Aligned</Heading>
        </Box>
      `,
    },
  }),
};

// With Margin
export const WithMargin = {
  render: () => ({
    Component: Stack,
    props: { gap: '0' },
    slots: {
      default: `
        <Heading level="2" marginBottom="2">Small Margin</Heading>
        <Text>Content immediately follows...</Text>

        <Heading level="2" marginBottom="6" style="margin-top: 2rem;">Large Margin</Heading>
        <Text>More space above this content...</Text>
      `,
    },
  }),
};

// Article Example
export const ArticleExample = {
  render: () => ({
    Component: Stack,
    props: { gap: '0' },
    slots: {
      default: `
        <Heading level="1" marginBottom="4">Article Title</Heading>
        <Text size="sm" color="tertiary" style="margin-bottom: 2rem;">
          Published on January 15, 2025 · 5 min read
        </Text>

        <Heading level="2" marginBottom="4">Introduction</Heading>
        <Text color="secondary" lineHeight="relaxed" style="margin-bottom: 1.5rem;">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>

        <Heading level="3" marginBottom="4">Key Concepts</Heading>
        <Text color="secondary" lineHeight="relaxed" style="margin-bottom: 1.5rem;">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>

        <Heading level="4" marginBottom="2">Implementation Details</Heading>
        <Text color="secondary" lineHeight="relaxed">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Text>
      `,
    },
  }),
};

// Card Header Example
export const CardHeaderExample = {
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
            <Heading level="3" marginBottom="2">Dashboard Overview</Heading>
            <Text size="sm" color="secondary">
              Monitor your key metrics and performance
            </Text>
          </Box>

          <Separator />

          <Box padding="6">
            <Text>Card content goes here...</Text>
          </Box>
        </Stack>
      `,
    },
  }),
};

// Hero Section Example
export const HeroSectionExample = {
  render: () => ({
    Component: Box,
    props: {
      padding: '12',
      background: 'surface',
      borderRadius: 'xl',
    },
    slots: {
      default: `
        <Stack gap="6">
          <Heading level="1" size="5xl" align="center" color="primary">
            Welcome to the Future
          </Heading>
          <Text size="lg" align="center" color="secondary" lineHeight="relaxed">
            Build amazing experiences with our comprehensive design system
          </Text>
          <div style="display: flex; justify-content: center; gap: 1rem;">
            <button style="padding: 0.75rem 1.5rem; background: var(--interactive-primary-default); color: white; border: none; border-radius: 0.5rem; font-weight: 600;">
              Get Started
            </button>
            <button style="padding: 0.75rem 1.5rem; background: var(--interactive-secondary-default); border: none; border-radius: 0.5rem; font-weight: 600;">
              Learn More
            </button>
          </div>
        </Stack>
      `,
    },
  }),
};
