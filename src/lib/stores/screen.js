/**
 * Screen Width Store
 *
 * 响应式屏幕宽度监控，用于实现桌面/移动端导航切换
 */

import { readable } from 'svelte/store';
import { browser } from '$app/environment';

// 获取初始宽度，SSR环境下返回undefined
const getInitialWidth = () => browser ? window.innerWidth : undefined;

// Debounce函数，减少resize事件触发频率
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 响应式屏幕宽度 Store
 * 自动监听窗口resize事件并更新
 */
export const screenWidth = readable(getInitialWidth(), (set) => {
  if (!browser) {
    return; // SSR环境不执行
  }

  // 立即设置当前窗口宽度，确保初始值正确
  set(window.innerWidth);

  const debouncedSet = debounce((width) => set(width), 150);

  const handleResize = () => {
    debouncedSet(window.innerWidth);
  };

  // 监听resize事件
  window.addEventListener('resize', handleResize);

  // Cleanup函数
  return () => {
    window.removeEventListener('resize', handleResize);
  };
});

/**
 * 导航断点常量
 * 桌面端 >= 1024px 显示侧边栏
 * 移动端 < 1024px 显示底部导航
 */
export const BREAKPOINT_DESKTOP = 1024;
