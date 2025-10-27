/**
 * Storybook PostCSS Configuration
 * Uses the Storybook-specific Tailwind config with vnext preset
 */

export default {
  plugins: {
    tailwindcss: {
      config: './.storybook/tailwind.config.js',
    },
    autoprefixer: {},
  },
};
