<script>
	/**
	 * BottomNav - 移动端底部导航栏
	 * 使用统一的navItems配置，通过page store判断当前页面
	 * 使用Lucide Icons替代Emoji
	 */

	import { page } from '$app/stores';
	import { navItems } from '$lib/config/navItems.js';

	// 判断路径是否激活
	$: currentPath = $page.url.pathname;
	function isActive(href) {
		if (href === '/') {
			return currentPath === '/';
		}
		return currentPath.startsWith(href);
	}
</script>

<!-- Apple-style Floating Navigation Bar -->
<nav
	class="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-md bg-background-tertiary/70 backdrop-blur-xl rounded-xl border border-white/10 shadow-strong z-50"
>
	<div class="flex justify-around items-center h-16 px-2">
		{#each navItems as item (item.id)}
			{@const IconComponent = item.icon}
			<a
				href={item.href}
				class="flex flex-col items-center justify-center gap-0.5 min-w-[60px] py-2 px-3 rounded-lg transition-all duration-200 ease-apple"
				class:text-accent={isActive(item.href)}
				class:bg-fill-primary={isActive(item.href)}
				class:text-text-secondary={!isActive(item.href)}
				class:hover:text-text-primary={!isActive(item.href)}
				class:hover:bg-fill-secondary={!isActive(item.href)}
				class:active:scale-95={true}
				aria-current={isActive(item.href) ? 'page' : undefined}
			>
				<svelte:component this={IconComponent} size={20} strokeWidth={2} class="shrink-0" />
				<span class="text-caption font-medium leading-tight">{item.label}</span>
			</a>
		{/each}
	</div>
</nav>

<!-- Spacer to prevent content from being hidden behind fixed nav -->
<div class="h-24"></div>

<style>
	a {
		-webkit-tap-highlight-color: transparent;
	}
</style>
