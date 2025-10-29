<script>
	import { onMount } from 'svelte';
	import { dbService } from '$services/dbService.js';
	import BottomNav from '$lib/components/BottomNav.svelte';

	let captures = [];
	let loading = true;
	let error = null;
	let selectedCapture = null;

	// Load all captures
	async function loadCaptures() {
		loading = true;
		error = null;

		try {
			captures = await dbService.getAllCaptures(100);
		} catch (err) {
			console.error('Failed to load captures:', err);
			error = err.message;
		} finally {
			loading = false;
		}
	}

	// Delete a capture
	async function handleDelete(id) {
		if (!confirm('确定要删除这条记录吗？')) {
			return;
		}

		try {
			await dbService.deleteCapture(id);
			captures = captures.filter((c) => c.id !== id);
			selectedCapture = null;
		} catch (err) {
			console.error('Failed to delete capture:', err);
			error = err.message;
		}
	}

	// Format timestamp
	function formatTime(timestamp) {
		const date = new Date(timestamp);
		const now = new Date();
		const diff = now - date;

		// If within last 24 hours, show relative time
		if (diff < 24 * 60 * 60 * 1000) {
			const hours = Math.floor(diff / (60 * 60 * 1000));
			const minutes = Math.floor(diff / (60 * 1000));

			if (hours > 0) {
				return `${hours}小时前`;
			} else if (minutes > 0) {
				return `${minutes}分钟前`;
			} else {
				return '刚刚';
			}
		}

		// Otherwise show date and time
		return date.toLocaleString('zh-CN', {
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	// Get preview of content (first 100 chars)
	function getPreview(content) {
		if (!content) return '';
		const text = content.replace(/^---[\s\S]*?---\n/, ''); // Remove frontmatter
		const preview = text.trim().substring(0, 100);
		return preview.length < text.trim().length ? preview + '...' : preview;
	}

	onMount(() => {
		loadCaptures();
	});
</script>

<svelte:head>
	<title>Timeline - Quick Capture</title>
</svelte:head>

<div class="min-h-screen bg-background-base flex flex-col p-4 pb-24">
	<!-- Header -->
	<header class="flex justify-between items-center mb-6">
		<h1 class="text-2xl font-bold text-text-base">📅 时间线</h1>

		<button
			on:click={loadCaptures}
			class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
			disabled={loading}
		>
			🔄 {loading ? '加载中...' : '刷新'}
		</button>
	</header>

	<!-- Error Message -->
	{#if error}
		<div class="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg">
			<p class="text-red-300">❌ {error}</p>
		</div>
	{/if}

	<!-- Loading State -->
	{#if loading && captures.length === 0}
		<div class="flex-1 flex items-center justify-center">
			<div class="text-center">
				<div class="text-4xl mb-4 animate-pulse">⏳</div>
				<p class="text-gray-400">加载中...</p>
			</div>
		</div>
	{:else if captures.length === 0}
		<!-- Empty State -->
		<div class="flex-1 flex items-center justify-center">
			<div class="text-center">
				<div class="text-6xl mb-4">📝</div>
				<p class="text-xl text-gray-400 mb-2">还没有记录</p>
				<p class="text-sm text-gray-500 mb-6">开始捕获你的想法吧</p>
				<a
					href="/"
					class="inline-block px-6 py-3 bg-primary-700 hover:bg-primary-600 rounded-lg font-semibold transition-colors"
				>
					⚡ 开始捕获
				</a>
			</div>
		</div>
	{:else}
		<!-- Timeline List -->
		<div class="flex-1 overflow-y-auto mb-4">
			<div class="space-y-3">
				{#each captures as capture (capture.id)}
					<div
						class="bg-background-secondary border border-gray-700 rounded-lg p-4 hover:border-primary-700 transition-colors cursor-pointer"
						on:click={() => (selectedCapture = capture)}
						on:keydown={(e) => e.key === 'Enter' && (selectedCapture = capture)}
						role="button"
						tabindex="0"
					>
						<div class="flex items-start justify-between mb-2">
							<div class="flex items-center gap-2">
								<span class="text-lg">
									{#if capture.input_type === 'voice'}
										🎤
									{:else if capture.content?.toLowerCase().includes('idea')}
										💡
									{:else if capture.content?.toLowerCase().includes('project')}
										🚀
									{:else}
										📝
									{/if}
								</span>
								<span class="text-sm text-gray-400">
									{formatTime(capture.timestamp)}
								</span>
							</div>

							<div class="flex items-center gap-2">
								{#if capture.synced}
									<span class="text-xs bg-green-900/50 text-green-300 px-2 py-1 rounded">
										✅ 已同步
									</span>
								{:else}
									<span class="text-xs bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded">
										⏳ 待同步
									</span>
								{/if}

								{#if capture.offline}
									<span class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
										📵 离线
									</span>
								{/if}
							</div>
						</div>

						<p class="text-white text-sm line-clamp-2">
							{getPreview(capture.content)}
						</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<BottomNav currentPage="timeline" />
</div>

<!-- Detail Modal -->
{#if selectedCapture}
	<div
		class="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
		on:click={() => (selectedCapture = null)}
		on:keydown={(e) => e.key === 'Escape' && (selectedCapture = null)}
		role="button"
		tabindex="0"
	>
		<div
			class="bg-background-secondary border border-gray-700 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
			on:click|stopPropagation
			on:keydown|stopPropagation
			role="dialog"
		>
			<!-- Modal Header -->
			<div class="flex justify-between items-start mb-4">
				<div>
					<div class="flex items-center gap-2 mb-2">
						<span class="text-2xl">
							{#if selectedCapture.input_type === 'voice'}
								🎤
							{:else if selectedCapture.content?.toLowerCase().includes('idea')}
								💡
							{:else if selectedCapture.content?.toLowerCase().includes('project')}
								🚀
							{:else}
								📝
							{/if}
						</span>
						<span class="text-sm text-gray-400">
							{formatTime(selectedCapture.timestamp)}
						</span>
					</div>

					<div class="flex gap-2">
						{#if selectedCapture.synced}
							<span class="text-xs bg-green-900/50 text-green-300 px-2 py-1 rounded">
								✅ 已同步
							</span>
						{:else}
							<span class="text-xs bg-yellow-900/50 text-yellow-300 px-2 py-1 rounded">
								⏳ 待同步
							</span>
						{/if}

						{#if selectedCapture.offline}
							<span class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
								📵 离线创建
							</span>
						{/if}
					</div>
				</div>

				<button
					on:click={() => (selectedCapture = null)}
					class="text-gray-400 hover:text-white text-2xl"
				>
					×
				</button>
			</div>

			<!-- Modal Content -->
			<div class="prose prose-invert max-w-none mb-6">
				<pre class="whitespace-pre-wrap text-sm bg-background-tertiary p-4 rounded-lg">{selectedCapture.content}</pre>
			</div>

			<!-- Modal Actions -->
			<div class="flex gap-3">
				<button
					on:click={() => (selectedCapture = null)}
					class="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
				>
					关闭
				</button>

				<button
					on:click={() => handleDelete(selectedCapture.id)}
					class="px-6 py-2 bg-red-900 hover:bg-red-800 text-red-300 rounded-lg transition-colors"
				>
					🗑️ 删除
				</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
