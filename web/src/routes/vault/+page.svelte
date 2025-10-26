<script>
	import BottomNav from '$lib/components/BottomNav.svelte';
	import { obsidianApiClient } from '$services/obsidianApiClient.js';
	import { onMount } from 'svelte';

	let searchQuery = '';
	let recentNotes = [];
	let loading = true;
	let error = null;

	const quickLinks = [
		{
			title: '今日日志',
			icon: '📅',
			path: getTodayJournalPath(),
			color: 'from-workflow-daily to-workflow-orange'
		},
		{
			title: '项目文件夹',
			icon: '🚀',
			path: '01_Execution/Projects',
			color: 'from-workflow-purple to-workflow-blue'
		},
		{
			title: '想法收集',
			icon: '💡',
			path: '01_Execution/Ideas',
			color: 'from-workflow-creative to-workflow-purple'
		},
		{
			title: '知识库',
			icon: '📚',
			path: '00_Foundation/Knowledge_Base',
			color: 'from-workflow-green to-workflow-reflection'
		}
	];

	function getTodayJournalPath() {
		const today = new Date().toISOString().split('T')[0];
		const year = today.substring(0, 4);
		return `01_Execution/Daily_Operations/Logs/Journal_Entries/${year}/${today}-工作日志.md`;
	}

	onMount(async () => {
		// Load recent notes (placeholder for now)
		try {
			// TODO: Implement recent notes fetching
			recentNotes = [];
			loading = false;
		} catch (err) {
			error = err.message;
			loading = false;
		}
	});

	async function openNote(path) {
		try {
			const content = await obsidianApiClient.readNote(path);
			// TODO: Navigate to note viewer page
			alert(`功能开发中\n\n路径: ${path}\n\n内容长度: ${content.length} 字符`);
		} catch (err) {
			alert(`无法打开笔记: ${err.message}`);
		}
	}
</script>

<svelte:head>
	<title>知识库 - Quick Capture</title>
</svelte:head>

<div class="min-h-screen bg-background-base flex flex-col p-4 pb-24">
	<!-- Header -->
	<header class="mb-6">
		<h1 class="text-3xl font-bold text-text-base mb-2">📚 知识库</h1>
		<p class="text-text-muted text-sm">浏览和管理您的Obsidian Vault</p>
	</header>

	<!-- Search Bar -->
	<div class="mb-6">
		<div class="relative">
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="搜索笔记..."
				class="w-full bg-background-surface border border-background-muted rounded-lg px-4 py-3 pl-12 text-text-base placeholder-text-subtle focus:outline-none focus:border-primary transition-colors"
			/>
			<span class="absolute left-4 top-1/2 -translate-y-1/2 text-text-subtle text-xl">
				🔍
			</span>
		</div>
	</div>

	<!-- Quick Links -->
	<section class="mb-8">
		<h2 class="text-lg font-semibold text-text-base mb-4">快速访问</h2>
		<div class="grid grid-cols-2 gap-3">
			{#each quickLinks as link}
				<button
					on:click={() => openNote(link.path)}
					class="bg-gradient-to-br {link.color} rounded-xl p-4 text-left hover:scale-105 transition-transform duration-200 shadow-card"
				>
					<div class="text-3xl mb-2">{link.icon}</div>
					<h3 class="text-white font-semibold text-sm">{link.title}</h3>
				</button>
			{/each}
		</div>
	</section>

	<!-- Features Coming Soon -->
	<section class="mb-6">
		<div class="bg-background-surface rounded-lg p-6 border border-background-muted">
			<h3 class="font-semibold text-text-base mb-3">🚧 开发中的功能</h3>
			<ul class="space-y-2 text-sm text-text-muted">
				<li>• 文件夹浏览器</li>
				<li>• Markdown查看和编辑</li>
				<li>• 全文搜索</li>
				<li>• 最近访问记录</li>
				<li>• 标签过滤</li>
				<li>• 笔记链接图谱</li>
			</ul>
		</div>
	</section>

	<!-- Help Info -->
	<section class="bg-primary/10 border border-primary/30 rounded-lg p-4">
		<h4 class="font-semibold text-text-base mb-2">💡 提示</h4>
		<p class="text-sm text-text-muted">
			知识库功能正在开发中。目前您可以通过工作流创建和更新笔记，完整的浏览和编辑功能即将推出。
		</p>
	</section>

	<BottomNav currentPage="vault" />
</div>
