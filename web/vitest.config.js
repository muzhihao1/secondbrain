import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    // Test environment
    environment: 'jsdom',

    // Global setup
    globals: true,

    // Setup files to run before tests
    setupFiles: ['./src/tests/setup.js'],

    // Include test files
    include: ['src/**/*.{test,spec}.{js,ts}'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/',
        '**/*.spec.js',
        '**/*.test.js',
        '**/*.stories.js',
        '.storybook/',
        'storybook-static/'
      ]
    },

    // Watch options
    watch: false,

    // Reporter
    reporter: ['verbose']
  },

  resolve: {
    alias: {
      '$lib': path.resolve('./src/lib'),
      '$app': path.resolve('./node_modules/@sveltejs/kit/src/runtime/app')
    }
  }
});
