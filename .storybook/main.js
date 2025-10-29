/**
 * Storybook Main Configuration
 * VNext Design System
 */

/** @type { import('@storybook/sveltekit').StorybookConfig } */
const config = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx|svelte)',
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],

  framework: {
    name: '@storybook/sveltekit',
    options: {},
  },

  docs: {
    autodocs: 'tag',
  },

  core: {
    builder: '@storybook/builder-vite',
  },

  async viteFinal(config) {
    // Import our Tailwind preset
    return config;
  },
};

export default config;
