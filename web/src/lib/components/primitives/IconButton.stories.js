/**
 * IconButton Component Stories
 * Demonstrates icon-only interactive buttons
 */

import IconButton from './IconButton.svelte';
import Inline from './Inline.svelte';

// Mock icon component for stories
const MockIcon = ({ size = 20 }) => `
  <svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
  </svg>
`;

export default {
  title: 'Primitives/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Button visual style',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    shape: {
      control: 'select',
      options: ['square', 'circle'],
      description: 'Button shape',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'HTML button type',
    },
    onClick: { action: 'clicked' },
  },
};

// Default
export const Default = {
  args: {
    variant: 'ghost',
    size: 'md',
    shape: 'square',
    ariaLabel: 'Add item',
  },
  render: (args) => ({
    Component: IconButton,
    props: args,
    slots: { default: MockIcon({ size: 20 }) },
  }),
};

// Variants
export const Variants = {
  render: () => ({
    Component: Inline,
    props: { gap: '2', align: 'center' },
    slots: {
      default: `
        <IconButton variant="primary" ariaLabel="Primary action">
          ${MockIcon({ size: 20 })}
        </IconButton>
        <IconButton variant="secondary" ariaLabel="Secondary action">
          ${MockIcon({ size: 20 })}
        </IconButton>
        <IconButton variant="ghost" ariaLabel="Ghost action">
          ${MockIcon({ size: 20 })}
        </IconButton>
      `,
    },
  }),
};

// Sizes
export const Sizes = {
  render: () => ({
    Component: Inline,
    props: { gap: '2', align: 'center' },
    slots: {
      default: `
        <IconButton size="sm" ariaLabel="Small">
          ${MockIcon({ size: 16 })}
        </IconButton>
        <IconButton size="md" ariaLabel="Medium">
          ${MockIcon({ size: 20 })}
        </IconButton>
        <IconButton size="lg" ariaLabel="Large">
          ${MockIcon({ size: 24 })}
        </IconButton>
      `,
    },
  }),
};

// Shapes
export const Shapes = {
  render: () => ({
    Component: Inline,
    props: { gap: '2', align: 'center' },
    slots: {
      default: `
        <IconButton shape="square" ariaLabel="Square button">
          ${MockIcon({ size: 20 })}
        </IconButton>
        <IconButton shape="circle" ariaLabel="Circle button">
          ${MockIcon({ size: 20 })}
        </IconButton>
      `,
    },
  }),
};

// Disabled
export const Disabled = {
  render: () => ({
    Component: Inline,
    props: { gap: '2', align: 'center' },
    slots: {
      default: `
        <IconButton variant="primary" disabled ariaLabel="Disabled primary">
          ${MockIcon({ size: 20 })}
        </IconButton>
        <IconButton variant="secondary" disabled ariaLabel="Disabled secondary">
          ${MockIcon({ size: 20 })}
        </IconButton>
        <IconButton variant="ghost" disabled ariaLabel="Disabled ghost">
          ${MockIcon({ size: 20 })}
        </IconButton>
      `,
    },
  }),
};

// Common Icons
export const CommonIcons = {
  render: () => ({
    Component: Inline,
    props: { gap: '2', align: 'center' },
    slots: {
      default: `
        <IconButton ariaLabel="Close">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"/>
          </svg>
        </IconButton>

        <IconButton ariaLabel="Search">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd"/>
          </svg>
        </IconButton>

        <IconButton ariaLabel="Settings">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/>
          </svg>
        </IconButton>

        <IconButton ariaLabel="More options">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
          </svg>
        </IconButton>

        <IconButton ariaLabel="Favorite">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </IconButton>
      `,
    },
  }),
};

// Toolbar Example
export const ToolbarExample = {
  render: () => ({
    Component: Inline,
    props: { gap: '1', align: 'center' },
    slots: {
      default: `
        <IconButton variant="ghost" ariaLabel="Bold" shape="square">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2a1 1 0 00-1 1v10a1 1 0 001 1h5a4 4 0 001.606-7.652A3.5 3.5 0 009 2H4zm4.5 9H5V9h3.5a1.5 1.5 0 110 3zM5 7V5h3a1.5 1.5 0 110 3H5z"/>
          </svg>
        </IconButton>

        <IconButton variant="ghost" ariaLabel="Italic" shape="square">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5.5 2a.5.5 0 000 1h2.768l-2.736 10H3.5a.5.5 0 000 1h5a.5.5 0 000-1H5.732L8.468 3h1.532a.5.5 0 000-1h-5z"/>
          </svg>
        </IconButton>

        <IconButton variant="ghost" ariaLabel="Underline" shape="square">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3 2a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 013 2zm0 11a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9A.5.5 0 013 13zm5-9a3 3 0 00-3 3v2a3 3 0 106 0V7a3 3 0 00-3-3z"/>
          </svg>
        </IconButton>
      `,
    },
  }),
};
