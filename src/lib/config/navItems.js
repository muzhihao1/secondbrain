/**
 * Navigation Items Configuration
 *
 * 统一的导航菜单数据，供Sidebar和BottomNav共享
 * 使用Lucide Icons组件替代Emoji
 */

import {
  Home,
  Zap,
  Grid3x3,
  FolderOpen,
  Settings
} from 'lucide-svelte';

export const navItems = [
  {
    href: '/',
    label: 'Home',
    icon: Home,
    id: 'home'
  },
  {
    href: '/capture',
    label: '捕获',
    icon: Zap,
    id: 'capture'
  },
  {
    href: '/workflows-gallery',
    label: '工作流',
    icon: Grid3x3,
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
