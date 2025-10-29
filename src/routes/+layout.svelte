<script>
	/**
	 * Root Layout - 响应式导航架构
	 *
	 * 桌面端（≥1024px）：显示左侧边栏（Sidebar）带展开/收起功能
	 * 移动端（<1024px）：显示底部导航栏（BottomNav）
	 */

	import '../app.css';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';
	import Toast from '$components/shared/Toast.svelte';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { dbService } from '$services/dbService.js';
	import { syncStore } from '$stores/syncStore.js';
	import { screenWidth, BREAKPOINT_DESKTOP } from '$lib/stores/screen.js';
	import { sidebarExpanded, toggleSidebar } from '$lib/stores/sidebarStore.js';

	// 判断是否为桌面端
	$: isDesktop = $screenWidth >= BREAKPOINT_DESKTOP;

	// 根据 sidebar 状态动态调整左边距
	$: mainMarginClass = isDesktop
		? ($sidebarExpanded ? 'pl-60' : 'pl-18')
		: '';

	// 处理SSR/CSR不匹配，避免闪烁
	let mounted = false;

	// Initialize app
	onMount(async () => {
		// 立即设置mounted以显示导航
		mounted = true;

		// 然后异步初始化其他服务
		try {
			await dbService.init();
			await syncStore.refreshPendingCount();
			console.log('App initialized successfully');
		} catch (error) {
			console.error('App initialization error:', error);
			// 不影响导航显示
		}

		// Keyboard shortcuts
		function handleKeydown(event) {
			// Cmd/Ctrl+B - Toggle sidebar (desktop only)
			if ((event.metaKey || event.ctrlKey) && event.key === 'b') {
				const currentWidth = get(screenWidth);
				if (currentWidth >= BREAKPOINT_DESKTOP) {
					event.preventDefault(); // Prevent browser bookmark dialog
					toggleSidebar();
				}
			}

			// Cmd/Ctrl+N - Quick capture (all platforms)
			if ((event.metaKey || event.ctrlKey) && event.key === 'n') {
				event.preventDefault(); // Prevent browser new window dialog
				goto('/capture');
			}
		}

		window.addEventListener('keydown', handleKeydown);

		// Cleanup
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<!-- App Container -->
<div class="min-h-screen bg-background-primary">
	{#if mounted}
		<!-- 桌面端：显示左侧边栏 -->
		{#if isDesktop}
			<Sidebar />
		{/if}

		<!-- 主内容区域 - 动态左边距匹配 sidebar 宽度 -->
		<main class="{mainMarginClass} transition-all duration-200 ease-out">
			<slot />
		</main>

		<!-- 移动端：显示底部导航栏 -->
		{#if !isDesktop}
			<BottomNav />
		{/if}
	{:else}
		<!-- SSR / 初始加载：显示主内容 -->
		<main>
			<slot />
		</main>
	{/if}
</div>

<Toast />
