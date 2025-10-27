/**
 * Grid Component Stories
 * Demonstrates CSS Grid layout patterns
 */

import Grid from './Grid.svelte';
import Box from './Box.svelte';

export default {
  title: 'Primitives/Grid',
  component: Grid,
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: 'select',
      options: ['1', '2', '3', '4', '6', '12', 'auto-fit', 'auto-fill'],
      description: 'Number of columns',
    },
    gap: {
      control: 'select',
      options: ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12'],
      description: 'Gap between items',
    },
    minColWidth: {
      control: 'text',
      description: 'Min column width for auto layouts',
    },
    alignItems: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Horizontal alignment',
    },
    justifyItems: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Vertical alignment',
    },
    as: {
      control: 'select',
      options: ['div', 'section', 'ul'],
      description: 'HTML element',
    },
  },
};

// Default
export const Default = {
  args: {
    columns: '3',
    gap: '4',
  },
  render: (args) => ({
    Component: Grid,
    props: args,
    slots: {
      default: `
        ${Array.from({ length: 6 }, (_, i) => `
          <Box padding="6" background="surface" borderRadius="md" border="subtle">
            <div style="color: var(--text-primary);">Item ${i + 1}</div>
          </Box>
        `).join('')}
      `,
    },
  }),
};

// Different Column Counts
export const ColumnCounts = {
  render: () => ({
    Component: Grid,
    props: {},
    slots: {
      default: `
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">2 Columns</h3>
            <Grid columns="2" gap="4">
              ${Array.from({ length: 4 }, (_, i) => `
                <Box padding="4" background="surface" borderRadius="md">Item ${i + 1}</Box>
              `).join('')}
            </Grid>
          </div>

          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">3 Columns</h3>
            <Grid columns="3" gap="4">
              ${Array.from({ length: 6 }, (_, i) => `
                <Box padding="4" background="surface" borderRadius="md">Item ${i + 1}</Box>
              `).join('')}
            </Grid>
          </div>

          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">4 Columns</h3>
            <Grid columns="4" gap="4">
              ${Array.from({ length: 8 }, (_, i) => `
                <Box padding="4" background="surface" borderRadius="md">Item ${i + 1}</Box>
              `).join('')}
            </Grid>
          </div>
        </div>
      `,
    },
  }),
};

// Auto Fit (responsive)
export const AutoFit = {
  args: {
    columns: 'auto-fit',
    gap: '4',
    minColWidth: '200px',
  },
  render: (args) => ({
    Component: Grid,
    props: args,
    slots: {
      default: `
        ${Array.from({ length: 8 }, (_, i) => `
          <Box padding="6" background="surface" borderRadius="md" border="default">
            <div style="color: var(--text-primary); font-weight: 600; margin-bottom: 0.5rem;">Card ${i + 1}</div>
            <div style="color: var(--text-secondary); font-size: 0.875rem;">Auto-fit resizes columns</div>
          </Box>
        `).join('')}
      `,
    },
  }),
};

// Different Gaps
export const Gaps = {
  render: () => ({
    Component: Grid,
    props: {},
    slots: {
      default: `
        <div style="display: flex; flex-direction: column; gap: 2rem;">
          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Gap 2</h3>
            <Grid columns="3" gap="2">
              ${Array.from({ length: 3 }, (_, i) => `
                <Box padding="3" background="surface" borderRadius="md">Item ${i + 1}</Box>
              `).join('')}
            </Grid>
          </div>

          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Gap 6</h3>
            <Grid columns="3" gap="6">
              ${Array.from({ length: 3 }, (_, i) => `
                <Box padding="3" background="surface" borderRadius="md">Item ${i + 1}</Box>
              `).join('')}
            </Grid>
          </div>

          <div>
            <h3 style="color: var(--text-primary); margin-bottom: 1rem;">Gap 10</h3>
            <Grid columns="3" gap="10">
              ${Array.from({ length: 3 }, (_, i) => `
                <Box padding="3" background="surface" borderRadius="md">Item ${i + 1}</Box>
              `).join('')}
            </Grid>
          </div>
        </div>
      `,
    },
  }),
};

// Dashboard Layout
export const DashboardLayout = {
  render: () => ({
    Component: Grid,
    props: {
      columns: '3',
      gap: '6',
    },
    slots: {
      default: `
        <Box padding="6" background="surface" borderRadius="lg" border="default" style="grid-column: span 2;">
          <h3 style="margin: 0 0 1rem 0; color: var(--text-primary);">Main Content</h3>
          <p style="margin: 0; color: var(--text-secondary);">Spans 2 columns</p>
        </Box>

        <Box padding="6" background="surface" borderRadius="lg" border="default">
          <h3 style="margin: 0 0 0.5rem 0; color: var(--text-primary);">Sidebar</h3>
          <p style="margin: 0; color: var(--text-secondary); font-size: 0.875rem;">Stats or info</p>
        </Box>

        ${Array.from({ length: 3 }, (_, i) => `
          <Box padding="6" background="surface" borderRadius="lg" border="subtle">
            <div style="color: var(--text-primary); font-weight: 600;">Metric ${i + 1}</div>
            <div style="color: var(--text-accent); font-size: 1.5rem; margin-top: 0.5rem;">${(i + 1) * 123}</div>
          </Box>
        `).join('')}
      `,
    },
  }),
};

// Image Gallery
export const ImageGallery = {
  render: () => ({
    Component: Grid,
    props: {
      columns: 'auto-fill',
      gap: '3',
      minColWidth: '150px',
    },
    slots: {
      default: `
        ${Array.from({ length: 12 }, (_, i) => `
          <Box
            background="surface"
            borderRadius="md"
            style="aspect-ratio: 1; display: flex; align-items: center; justify-content: center; border: 1px solid var(--surface-border-subtle);"
          >
            <div style="color: var(--text-tertiary); font-size: 0.75rem;">IMG ${i + 1}</div>
          </Box>
        `).join('')}
      `,
    },
  }),
};
