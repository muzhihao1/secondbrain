<script>
	import { onMount } from 'svelte';
	import { dbService } from '$services/dbService.js';
	import { syncStore } from '$stores/syncStore.js';
	import { captureStore } from '$stores/captureStore.js';

	let stats = {
		total: 0,
		synced: 0,
		unsynced: 0
	};

	let loading = true;
	let error = null;

	// Load database statistics
	async function loadStats() {
		loading = true;
		error = null;

		try {
			stats = await dbService.getStats();
		} catch (err) {
			console.error('Failed to load stats:', err);
			error = err.message;
		} finally {
			loading = false;
		}
	}

	// Sync offline captures
	async function handleSync() {
		await captureStore.syncOfflineCaptures();
		await loadStats();
	}

	// Clear all data
	async function handleClearAll() {
		if (!confirm('确定要清除所有本地数据吗？此操作不可恢复。')) {
			return;
		}

		try {
			await dbService.clearAll();
			await loadStats();
		} catch (err) {
			console.error('Failed to clear data:', err);
			error = err.message;
		}
	}

	onMount(() => {
		loadStats();

		// Refresh stats every 30 seconds
		const interval = setInterval(loadStats, 30000);
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Dashboard - Quick Capture</title>
</svelte:head>

<div class="min-h-screen bg-background-base flex flex-col p-4 pb-24">
	<!-- Header -->
	<header class="flex justify-between items-center mb-6">
		<h1 class="text-2xl font-bold text-text-base">📊 Dashboard</h1>

		<button
			on:click={loadStats}
			class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
			disabled={loading}
		>
			🔄 {loading ? '刷新中...' : '刷新'}
		</button>
	</header>

	<!-- Error Message -->
	{#if error}
		<div class="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-lg">
			<p class="text-red-300">❌ {error}</p>
		</div>
	{/if}

	<!-- Statistics Cards -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
		<!-- Total Captures -->
		<div class="bg-background-secondary border border-gray-700 rounded-lg p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-gray-400 text-sm">总记录数</p>
					<p class="text-3xl font-bold text-white mt-2">
						{loading ? '...' : stats.total}
					</p>
				</div>
				<span class="text-4xl">📝</span>
			</div>
		</div>

		<!-- Synced Captures -->
		<div class="bg-background-secondary border border-gray-700 rounded-lg p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-gray-400 text-sm">已同步</p>
					<p class="text-3xl font-bold text-green-400 mt-2">
						{loading ? '...' : stats.synced}
					</p>
				</div>
				<span class="text-4xl">✅</span>
			</div>
		</div>

		<!-- Unsynced Captures -->
		<div class="bg-background-secondary border border-gray-700 rounded-lg p-6">
			<div class="flex items-center justify-between">
				<div>
					<p class="text-gray-400 text-sm">待同步</p>
					<p class="text-3xl font-bold text-yellow-400 mt-2">
						{loading ? '...' : stats.unsynced}
					</p>
				</div>
				<span class="text-4xl">⏳</span>
			</div>
		</div>
	</div>

	<!-- Online/Offline Status -->
	<div class="mb-6 p-4 bg-background-secondary border border-gray-700 rounded-lg">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-3">
				<span class="text-2xl">{$syncStore.online ? '🌐' : '📵'}</span>
				<div>
					<p class="font-semibold">
						{$syncStore.online ? '在线模式' : '离线模式'}
					</p>
					<p class="text-sm text-gray-400">
						{$syncStore.online
							? '已连接到Obsidian API'
							: '无法连接，数据将保存到本地'}
					</p>
				</div>
			</div>

			{#if stats.unsynced > 0}
				<button
					on:click={handleSync}
					class="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold transition-colors"
					disabled={!$syncStore.online || $captureStore.loading}
				>
					🔄 同步 ({stats.unsynced})
				</button>
			{/if}
		</div>
	</div>

	<!-- System Information -->
	<div class="mb-6 p-4 bg-background-secondary border border-gray-700 rounded-lg">
		<h2 class="text-lg font-semibold mb-3">系统信息</h2>
		<div class="space-y-2 text-sm">
			<div class="flex justify-between">
				<span class="text-gray-400">浏览器存储</span>
				<span class="text-white">IndexedDB</span>
			</div>
			<div class="flex justify-between">
				<span class="text-gray-400">同步状态</span>
				<span class="text-white">
					{$syncStore.syncing ? '同步中...' : '空闲'}
				</span>
			</div>
			<div class="flex justify-between">
				<span class="text-gray-400">PWA</span>
				<span class="text-white">已启用</span>
			</div>
		</div>
	</div>

	<!-- Actions -->
	<div class="flex gap-3">
		<a
			href="/timeline"
			class="flex-1 py-3 bg-primary-700 hover:bg-primary-600 text-white rounded-lg font-semibold text-center transition-colors"
		>
			📅 查看时间线
		</a>

		<button
			on:click={handleClearAll}
			class="px-6 py-3 bg-red-900 hover:bg-red-800 text-red-300 rounded-lg font-semibold transition-colors"
		>
			🗑️ 清除数据
		</button>
	</div>
</div>
