import Card from './Card.svelte';
import Button from '../primitives/Button.svelte';
import Text from '../primitives/Text.svelte';
import Heading from '../primitives/Heading.svelte';
import Stack from '../primitives/Stack.svelte';
import Inline from '../primitives/Inline.svelte';

export default {
  title: 'Composite/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Card visual style variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Card size (padding)'
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the card is clickable/interactive'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state (for interactive cards)'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width card'
    },
    onClick: { action: 'clicked' }
  }
};

/**
 * Basic card with just body content
 */
export const Basic = {
  args: {
    variant: 'elevated',
    size: 'md'
  },
  render: (args) => ({
    Component: Card,
    props: args,
    slots: {
      default: `
        <Text>This is a basic card with some content inside. Cards are used to group related information and actions.</Text>
      `
    }
  })
};

/**
 * Card with header and footer
 */
export const WithHeaderAndFooter = {
  args: {
    variant: 'elevated',
    size: 'md'
  }
};

/**
 * Elevated variant (default) - has shadow and subtle border
 */
export const Elevated = {
  args: {
    variant: 'elevated',
    size: 'md'
  }
};

/**
 * Outlined variant - has visible border, no shadow
 */
export const Outlined = {
  args: {
    variant: 'outlined',
    size: 'md'
  }
};

/**
 * Filled variant - has background, subtle border
 */
export const Filled = {
  args: {
    variant: 'filled',
    size: 'md'
  }
};

/**
 * Interactive card - clickable with hover effects
 */
export const Interactive = {
  args: {
    variant: 'elevated',
    size: 'md',
    interactive: true
  },
  render: (args) => ({
    Component: Card,
    props: args,
    on: {
      click: () => alert('Card clicked!')
    }
  })
};

/**
 * Disabled interactive card
 */
export const Disabled = {
  args: {
    variant: 'elevated',
    size: 'md',
    interactive: true,
    disabled: true
  }
};

/**
 * Small card
 */
export const Small = {
  args: {
    variant: 'elevated',
    size: 'sm'
  }
};

/**
 * Large card
 */
export const Large = {
  args: {
    variant: 'elevated',
    size: 'lg'
  }
};

/**
 * Full width card
 */
export const FullWidth = {
  args: {
    variant: 'elevated',
    size: 'md',
    fullWidth: true
  }
};

/**
 * Profile card example - real-world use case
 */
export const ProfileCard = {
  args: {
    variant: 'elevated',
    size: 'md'
  }
};

/**
 * Action card example - clickable card with CTA
 */
export const ActionCard = {
  args: {
    variant: 'outlined',
    size: 'md',
    interactive: true
  }
};

/**
 * Info card example - informational content
 */
export const InfoCard = {
  args: {
    variant: 'filled',
    size: 'md'
  }
};

/**
 * Workflow card example - matches design from evaluation doc
 */
export const WorkflowCard = {
  args: {
    variant: 'elevated',
    size: 'md',
    interactive: true
  }
};

/**
 * All variants showcase
 */
export const AllVariants = {
  render: () => ({
    Component: Card
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all card variants side by side'
      }
    }
  }
};

/**
 * All sizes showcase
 */
export const AllSizes = {
  render: () => ({
    Component: Card
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all card sizes'
      }
    }
  }
};
