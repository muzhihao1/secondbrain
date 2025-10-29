/**
 * Sidebar State Management
 *
 * Manages sidebar expansion state with localStorage persistence
 */

import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * Get initial state from localStorage
 * Default to collapsed (false) for cleaner initial UI
 */
function getInitialState() {
  if (!browser) return false;

  const stored = localStorage.getItem('sidebarExpanded');
  return stored === 'true';
}

/**
 * Sidebar expanded state
 * true = expanded (shows labels)
 * false = collapsed (icon-only)
 */
export const sidebarExpanded = writable(getInitialState());

/**
 * Toggle sidebar expansion
 */
export function toggleSidebar() {
  sidebarExpanded.update(value => !value);
}

// Persist state changes to localStorage
if (browser) {
  sidebarExpanded.subscribe(value => {
    localStorage.setItem('sidebarExpanded', value.toString());
  });
}
