/**
 * Navigation Items Configuration
 *
 * 统一的导航菜单数据，供Sidebar和BottomNav共享
 * 使用Lucide Icons组件替代Emoji
 */

import {
  Zap,
  ListTodo,
  Workflow,
  FolderOpen,
  Settings
} from 'lucide-svelte';

export const navItems = [
  {
    href: '/capture',
    label: '捕获',
    icon: Zap,
    id: 'capture'
  },
  {
    href: '/tasks',
    label: '任务',
    icon: ListTodo,
    id: 'tasks'
  },
  {
    href: '/workflows',
    label: '工作流',
    icon: Workflow,
    id: 'workflows'
  },
  {
    href: '/vault',
    label: '知识库',
    icon: FolderOpen,
    id: 'vault'
  }
];

// Settings icon for sidebar
export const settingsIcon = Settings;
