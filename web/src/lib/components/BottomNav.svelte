<script>
	export let currentPage = '';

	const navItems = [
		{ href: '/capture', icon: '⚡', label: '捕获', id: 'capture' },
		{ href: '/workflows', icon: '🔄', label: '工作流', id: 'workflows' },
		{ href: '/vault', icon: '📚', label: '知识库', id: 'vault' },
		{ href: '/dashboard', icon: '📊', label: 'Dashboard', id: 'dashboard' }
	];
</script>

<!-- Apple-style Floating Navigation Bar -->
<nav
	class="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-md bg-background-tertiary/70 backdrop-blur-xl rounded-xl border border-white/10 shadow-strong z-50"
>
	<div class="flex justify-around items-center h-16 px-2">
		{#each navItems as item}
			<a
				href={item.href}
				class="flex flex-col items-center justify-center gap-0.5 min-w-[60px] py-2 px-3 rounded-lg transition-all duration-200 ease-apple"
				class:text-accent={currentPage === item.id}
				class:bg-fill-primary={currentPage === item.id}
				class:text-text-secondary={currentPage !== item.id}
				class:hover:text-text-primary={currentPage !== item.id}
				class:hover:bg-fill-secondary={currentPage !== item.id}
				class:active:scale-95={true}
			>
				<span class="text-2xl leading-none">{item.icon}</span>
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
