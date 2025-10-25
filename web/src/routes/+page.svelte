<script>
	import { captureStore } from '$stores/captureStore.js';
	import { audioService } from '$services/audioService.js';
	import { syncStore, hasPendingSync } from '$stores/syncStore.js';

	let content = '';
	let isRecording = false;
	let recordingDuration = 0;
	let recordingInterval;

	// Handle text capture
	async function handleCapture() {
		if (!content.trim()) return;

		await captureStore.capture(content);
		content = '';
	}

	// Handle voice recording
	async function toggleRecording() {
		if (isRecording) {
			// Stop recording
			clearInterval(recordingInterval);
			const audioBlob = await audioService.stopRecording();
			if (audioBlob) {
				await captureStore.captureVoice(audioBlob);
			}
			isRecording = false;
			recordingDuration = 0;
		} else {
			// Start recording
			try {
				await audioService.startRecording();
				isRecording = true;
				recordingDuration = 0;

				recordingInterval = setInterval(() => {
					recordingDuration = audioService.getRecordingDuration();
				}, 1000);
			} catch (error) {
				console.error('Recording error:', error);
				isRecording = false;
			}
		}
	}

	// Keyboard shortcut: Ctrl/Cmd + Enter to submit
	function handleKeydown(e) {
		if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
			handleCapture();
		}
	}
</script>

<svelte:head>
	<title>Quick Capture</title>
</svelte:head>

<div class="min-h-screen flex flex-col p-4">
	<!-- Header -->
	<header class="flex justify-between items-center mb-6">
		<h1 class="text-2xl font-bold text-primary-700">⚡ Quick Capture</h1>

		<div class="flex gap-2">
			{#if $hasPendingSync}
				<button
					on:click={() => captureStore.syncOfflineCaptures()}
					class="px-3 py-1 bg-yellow-500 text-white rounded-lg text-sm"
				>
					🔄 {$syncStore.pendingCount} 待同步
				</button>
			{/if}

			{#if !$syncStore.online}
				<span class="px-3 py-1 bg-gray-600 rounded-lg text-sm">📵 离线模式</span>
			{/if}
		</div>
	</header>

	<!-- Main Capture Area -->
	<div class="flex-1 flex flex-col">
		<textarea
			bind:value={content}
			on:keydown={handleKeydown}
			placeholder="记录你的想法...&#10;&#10;Ctrl+Enter 快速提交"
			class="flex-1 w-full p-4 bg-dark-200 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-700 resize-none text-lg"
			rows="10"
		/>

		<!-- Actions -->
		<div class="mt-4 flex gap-3">
			<button
				on:click={handleCapture}
				disabled={!content.trim() || $captureStore.loading}
				class="flex-1 py-4 bg-primary-700 hover:bg-primary-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold text-lg transition-colors touch-target"
			>
				{$captureStore.loading ? '保存中...' : '💾 保存'}
			</button>

			<button
				on:click={toggleRecording}
				class="px-6 py-4 rounded-lg font-semibold text-lg transition-colors touch-target"
				class:bg-red-500={isRecording}
				class:hover:bg-red-600={isRecording}
				class:bg-gray-700={!isRecording}
				class:hover:bg-gray-600={!isRecording}
			>
				{#if isRecording}
					⏹ {recordingDuration}s
				{:else}
					🎤
				{/if}
			</button>
		</div>

		<!-- Tips -->
		<p class="mt-4 text-sm text-gray-400 text-center">
			{#if isRecording}
				正在录音... 最长60秒
			{:else}
				点击麦克风录音，或直接输入文字
			{/if}
		</p>
	</div>

	<!-- Bottom Navigation -->
	<nav class="mt-6 flex justify-around border-t border-gray-700 pt-4">
		<a href="/" class="flex flex-col items-center text-primary-700">
			<span class="text-2xl">⚡</span>
			<span class="text-xs mt-1">捕获</span>
		</a>
		<a href="/dashboard" class="flex flex-col items-center text-gray-400 hover:text-white">
			<span class="text-2xl">📊</span>
			<span class="text-xs mt-1">Dashboard</span>
		</a>
		<a href="/timeline" class="flex flex-col items-center text-gray-400 hover:text-white">
			<span class="text-2xl">📅</span>
			<span class="text-xs mt-1">时间线</span>
		</a>
	</nav>
</div>
