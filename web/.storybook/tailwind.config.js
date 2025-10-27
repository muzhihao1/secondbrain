/**
 * Storybook-specific Tailwind Configuration
 * Uses VNext preset with `v` namespace
 */

import vnextPreset from '../tailwind.preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [vnextPreset],
  content: [
    '../src/**/*.{html,js,svelte,ts}',
    '../.storybook/**/*.{js,jsx,ts,tsx}',
  ],
};
