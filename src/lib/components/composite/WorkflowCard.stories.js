import WorkflowCard from './WorkflowCard.svelte';

export default {
  title: 'Composite/WorkflowCard',
  component: WorkflowCard,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Workflow title'
    },
    description: {
      control: 'text',
      description: 'Workflow description'
    },
    status: {
      control: 'select',
      options: ['active', 'inactive', 'draft'],
      description: 'Workflow status'
    },
    lastUsed: {
      control: 'text',
      description: 'Last used date (ISO string)'
    },
    tags: {
      control: 'object',
      description: 'Workflow tags/categories'
    },
    icon: {
      control: 'text',
      description: 'Workflow icon (emoji)'
    },
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Card variant'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    onClick: { action: 'clicked' },
    onAction: { action: 'quick-action' }
  }
};

/**
 * Active workflow card
 */
export const Active = {
  args: {
    title: 'Daily Reflection',
    description: 'Evening reflection and next-day planning workflow',
    status: 'active',
    lastUsed: '2025-10-27',
    tags: ['daily', 'reflection', 'planning'],
    icon: '🌙',
    variant: 'elevated'
  }
};

/**
 * Inactive workflow card
 */
export const Inactive = {
  args: {
    title: 'Weekly Review',
    description: 'Comprehensive weekly retrospective and goal setting',
    status: 'inactive',
    lastUsed: '2025-10-20',
    tags: ['weekly', 'review'],
    icon: '📊',
    variant: 'elevated'
  }
};

/**
 * Draft workflow card
 */
export const Draft = {
  args: {
    title: 'Project Kickoff',
    description: 'Template for starting new projects',
    status: 'draft',
    lastUsed: '',
    tags: ['template', 'projects'],
    icon: '🚀',
    variant: 'elevated'
  }
};

/**
 * Disabled workflow card
 */
export const Disabled = {
  args: {
    title: 'Monthly Review',
    description: 'Deep dive into monthly progress and adjustments',
    status: 'active',
    lastUsed: '2025-09-30',
    tags: ['monthly', 'review'],
    icon: '📅',
    variant: 'elevated',
    disabled: true
  }
};

/**
 * Minimal workflow card (no tags, no icon)
 */
export const Minimal = {
  args: {
    title: 'Quick Capture',
    description: 'Rapid idea and thought capture',
    status: 'active',
    lastUsed: '2025-10-27',
    tags: [],
    icon: '',
    variant: 'elevated'
  }
};

/**
 * Outlined variant
 */
export const Outlined = {
  args: {
    title: 'Morning Routine',
    description: 'Start your day with clarity and intention',
    status: 'active',
    lastUsed: '2025-10-27',
    tags: ['morning', 'routine'],
    icon: '☀️',
    variant: 'outlined'
  }
};

/**
 * Filled variant
 */
export const Filled = {
  args: {
    title: 'Evening Wind-Down',
    description: 'Prepare for restful sleep and tomorrow',
    status: 'active',
    lastUsed: '2025-10-26',
    tags: ['evening', 'sleep'],
    icon: '🌜',
    variant: 'filled'
  }
};

/**
 * Real-world example: Obsidian PARA workflow
 */
export const PARAWorkflow = {
  args: {
    title: 'PARA Organization',
    description: 'Organize notes into Projects, Areas, Resources, Archives',
    status: 'active',
    lastUsed: '2025-10-27',
    tags: ['para', 'organization', 'obsidian'],
    icon: '📚',
    variant: 'elevated'
  }
};

/**
 * Real-world example: Zettelkasten workflow
 */
export const ZettelkastenWorkflow = {
  args: {
    title: 'Zettelkasten Processing',
    description: 'Convert fleeting notes into permanent knowledge',
    status: 'active',
    lastUsed: '2025-10-26',
    tags: ['zettelkasten', 'processing'],
    icon: '🗂️',
    variant: 'elevated'
  }
};

/**
 * Real-world example: GTD workflow
 */
export const GTDWorkflow = {
  args: {
    title: 'GTD Weekly Review',
    description: 'Get clear, get current, get creative',
    status: 'inactive',
    lastUsed: '2025-10-20',
    tags: ['gtd', 'productivity'],
    icon: '✅',
    variant: 'elevated'
  }
};

/**
 * Gallery view - multiple workflow cards
 */
export const WorkflowGallery = {
  render: () => ({
    Component: WorkflowCard
  }),
  parameters: {
    docs: {
      description: {
        story: 'Example of how workflow cards appear in a gallery view'
      }
    }
  }
};
