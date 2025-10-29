/**
 * Lighthouse CI Configuration for VNext Design System
 *
 * This configuration audits Storybook for:
 * - Performance metrics (FCP, LCP, TTI, TBT, CLS)
 * - Accessibility compliance
 * - Best practices
 * - SEO basics
 *
 * @see https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md
 */

module.exports = {
  ci: {
    collect: {
      // Build Storybook static files before audit
      staticDistDir: './storybook-static',

      // Number of runs per URL (median values used)
      numberOfRuns: 3,

      // URLs to audit (Storybook pages)
      url: [
        'http://localhost:6006/iframe.html?id=primitives-button--primary',
        'http://localhost:6006/iframe.html?id=primitives-input--default',
        'http://localhost:6006/iframe.html?id=primitives-text--default',
      ],

      // Lighthouse settings
      settings: {
        // Emulate mobile device
        preset: 'desktop',

        // Only run these categories
        onlyCategories: ['performance', 'accessibility', 'best-practices'],

        // Skip certain audits not relevant to component library
        skipAudits: [
          'is-crawlable',
          'robots-txt',
          'canonical',
        ],
      },
    },

    assert: {
      // Performance budgets (Phase 0 baseline - will tighten in Phase 1)
      assertions: {
        // Performance metrics
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],

        // Core Web Vitals
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],

        // Accessibility
        'color-contrast': 'error',
        'aria-allowed-attr': 'error',
        'aria-required-attr': 'error',
        'button-name': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',
      },
    },

    upload: {
      // Store results locally for now (can add LHCI server later)
      target: 'filesystem',
      outputDir: './lighthouse-results',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%',
    },
  },
};
