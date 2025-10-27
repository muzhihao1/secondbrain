/**
 * Storybook Preview Configuration
 * VNext Design System - Theme Switching & Global Styles
 */

import './preview.css'; // Import Storybook-specific styles with Tailwind

/** @type { import('@storybook/svelte').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'vnext-dark',
      values: [
        {
          name: 'vnext-dark',
          value: '#121212',
        },
        {
          name: 'vnext-light',
          value: '#FFFFFF',
        },
      ],
    },
  },

  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'vnext-dark',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'vnext-dark', title: 'Dark', icon: 'moon' },
          { value: 'vnext-light', title: 'Light', icon: 'sun' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'vnext-dark';

      // Apply theme to root element
      if (typeof document !== 'undefined') {
        document.documentElement.setAttribute('data-theme', theme);
      }

      return {
        Component: Story,
      };
    },
  ],
};

export default preview;
