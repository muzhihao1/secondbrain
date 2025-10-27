/**
 * VNext TailwindCSS Preset
 * Provides design tokens with `v` namespace for gradual adoption
 *
 * Usage in tailwind.config.js:
 * import vnextPreset from './tailwind.preset.js';
 * export default {
 *   presets: [vnextPreset],
 *   // ... rest of config
 * }
 */

export default {
  theme: {
    extend: {
      // Colors with v namespace
      colors: {
        v: {
          // Backgrounds
          'bg-default': 'var(--color-neutral-100)',
          'bg-elevated': 'var(--color-neutral-200)',
          'bg-overlay': 'var(--color-neutral-0)',

          // Surfaces
          'surface': 'var(--surface-surface-default)',
          'surface-hover': 'var(--surface-surface-hover)',
          'surface-active': 'var(--surface-surface-active)',
          'surface-selected': 'var(--surface-surface-selected)',

          // Borders
          'border': 'var(--surface-border-default)',
          'border-strong': 'var(--surface-border-strong)',
          'border-subtle': 'var(--surface-border-subtle)',
          'border-accent': 'var(--surface-border-accent)',

          // Text colors
          'text-primary': 'var(--text-primary)',
          'text-secondary': 'var(--text-secondary)',
          'text-tertiary': 'var(--text-tertiary)',
          'text-disabled': 'var(--text-disabled)',
          'text-inverse': 'var(--text-inverse)',
          'text-accent': 'var(--text-accent)',
          'text-accent-hover': 'var(--text-accentHover)',

          // Interactive colors
          'primary': 'var(--interactive-primary-default)',
          'primary-hover': 'var(--interactive-primary-hover)',
          'primary-active': 'var(--interactive-primary-active)',
          'primary-disabled': 'var(--interactive-primary-disabled)',

          'secondary': 'var(--interactive-secondary-default)',
          'secondary-hover': 'var(--interactive-secondary-hover)',
          'secondary-active': 'var(--interactive-secondary-active)',

          // Semantic colors
          'success': 'var(--color-semantic-success-500)',
          'success-light': 'var(--color-semantic-success-50)',
          'success-dark': 'var(--color-semantic-success-700)',

          'warning': 'var(--color-semantic-warning-500)',
          'warning-light': 'var(--color-semantic-warning-50)',
          'warning-dark': 'var(--color-semantic-warning-700)',

          'error': 'var(--color-semantic-error-500)',
          'error-light': 'var(--color-semantic-error-50)',
          'error-dark': 'var(--color-semantic-error-700)',

          'info': 'var(--color-semantic-info-500)',
          'info-light': 'var(--color-semantic-info-50)',
          'info-dark': 'var(--color-semantic-info-700)',

          // Brand colors (direct access if needed)
          'teal': 'var(--color-brand-teal-500)',
          'purple': 'var(--color-brand-purple-500)',
        },
      },

      // Spacing with v namespace
      spacing: {
        v: {
          '0': 'var(--space-0)',
          '1': 'var(--space-1)',
          '2': 'var(--space-2)',
          '3': 'var(--space-3)',
          '4': 'var(--space-4)',
          '5': 'var(--space-5)',
          '6': 'var(--space-6)',
          '8': 'var(--space-8)',
          '10': 'var(--space-10)',
          '12': 'var(--space-12)',
          '16': 'var(--space-16)',
          '20': 'var(--space-20)',
          '24': 'var(--space-24)',
        },
      },

      // Typography
      fontFamily: {
        v: {
          sans: 'var(--font-family-sans)',
          cjk: 'var(--font-family-cjk)',
          mono: 'var(--font-family-mono)',
        },
      },

      fontSize: {
        v: {
          'xs': 'var(--font-size-xs)',
          'sm': 'var(--font-size-sm)',
          'base': 'var(--font-size-base)',
          'lg': 'var(--font-size-lg)',
          'xl': 'var(--font-size-xl)',
          '2xl': 'var(--font-size-2xl)',
          '3xl': 'var(--font-size-3xl)',
          '4xl': 'var(--font-size-4xl)',
          '5xl': 'var(--font-size-5xl)',
        },
      },

      fontWeight: {
        v: {
          light: 'var(--font-weight-light)',
          normal: 'var(--font-weight-normal)',
          medium: 'var(--font-weight-medium)',
          semibold: 'var(--font-weight-semibold)',
          bold: 'var(--font-weight-bold)',
        },
      },

      lineHeight: {
        v: {
          tight: 'var(--font-lineHeight-tight)',
          normal: 'var(--font-lineHeight-normal)',
          relaxed: 'var(--font-lineHeight-relaxed)',
          loose: 'var(--font-lineHeight-loose)',
        },
      },

      letterSpacing: {
        v: {
          tighter: 'var(--font-letterSpacing-tighter)',
          tight: 'var(--font-letterSpacing-tight)',
          normal: 'var(--font-letterSpacing-normal)',
          wide: 'var(--font-letterSpacing-wide)',
          wider: 'var(--font-letterSpacing-wider)',
        },
      },

      // Shadows
      boxShadow: {
        v: {
          'none': 'var(--shadow-none)',
          'sm': 'var(--shadow-sm)',
          'DEFAULT': 'var(--shadow-base)',
          'md': 'var(--shadow-md)',
          'lg': 'var(--shadow-lg)',
          'xl': 'var(--shadow-xl)',
          '2xl': 'var(--shadow-2xl)',
          'inner': 'var(--shadow-inner)',
          'card': 'var(--shadow-card)',
          'card-hover': 'var(--shadow-cardHover)',
        },
      },

      // Border radius
      borderRadius: {
        v: {
          'none': 'var(--radius-none)',
          'sm': 'var(--radius-sm)',
          'DEFAULT': 'var(--radius-base)',
          'md': 'var(--radius-md)',
          'lg': 'var(--radius-lg)',
          'xl': 'var(--radius-xl)',
          'full': 'var(--radius-full)',
        },
      },
    },
  },
};
