/**
 * Icon Mapping Configuration
 *
 * 统一的图标映射，供各个组件使用
 * 使用 Lucide Icons 替代 Emoji
 */

import {
  // Folder/Category Icons
  Calendar,
  Folder,
  Lightbulb,
  BookOpen,
  Archive,
  Inbox,
  FileCheck,

  // Action Icons
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  Check,
  Search,

  // Document Icons
  FileText,
  File,
  Upload,
  Download,

  // UI Icons
  CheckSquare,
  Square,
  Grid3x3,
  MoreVertical,
  ChevronRight,
  ChevronLeft,

  // Workflow Icons
  Repeat,
  Target,
  Sparkles,
  Clock,
  TrendingUp,
  Workflow
} from 'lucide-svelte';

/**
 * Folder type icon mapping
 * Used in FolderTree component
 */
export const folderIcons = {
  calendar: Calendar,
  folder: Folder,
  lightbulb: Lightbulb,
  book: BookOpen,
  archive: Archive,
  inbox: Inbox,
  'file-check': FileCheck,
  default: Folder
};

/**
 * Action icon mapping
 * Used for buttons and operations
 */
export const actionIcons = {
  plus: Plus,
  trash: Trash2,
  edit: Edit3,
  save: Save,
  close: X,
  check: Check,
  search: Search
};

/**
 * Document type icon mapping
 */
export const documentIcons = {
  text: FileText,
  file: File,
  upload: Upload,
  download: Download
};

/**
 * Workflow icon mapping
 * Used in workflow cards and shortcuts
 */
export const workflowIcons = {
  repeat: Repeat,
  target: Target,
  sparkles: Sparkles,
  clock: Clock,
  trending: TrendingUp,
  workflow: Workflow,
  grid: Grid3x3,
  checklist: CheckSquare
};

/**
 * UI element icon mapping
 */
export const uiIcons = {
  checkboxChecked: CheckSquare,
  checkboxUnchecked: Square,
  grid: Grid3x3,
  more: MoreVertical,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft
};

/**
 * Get icon component by category and name
 * @param {string} category - Icon category (folder, action, document, workflow, ui)
 * @param {string} name - Icon name
 * @returns {Component} Lucide icon component
 */
export function getIcon(category, name) {
  const maps = {
    folder: folderIcons,
    action: actionIcons,
    document: documentIcons,
    workflow: workflowIcons,
    ui: uiIcons
  };

  const categoryMap = maps[category];
  if (!categoryMap) {
    console.warn(`Unknown icon category: ${category}`);
    return File; // Default fallback
  }

  const icon = categoryMap[name] || categoryMap.default || File;
  return icon;
}

/**
 * Icon size presets
 */
export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
};

/**
 * Default icon props
 */
export const defaultIconProps = {
  size: iconSizes.md,
  strokeWidth: 2,
  class: 'shrink-0'
};
