<script>
	import { captureStore } from '$stores/captureStore.js';
	import { audioService } from '$services/audioService.js';
	import { syncStore, hasPendingSync } from '$stores/syncStore.js';
	import BottomNav from '$lib/components/BottomNav.svelte';

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
	<title>快速捕获 - Quick Capture</title>
</svelte:head>

<div class="min-h-screen bg-background-primary flex flex-col p-4 pb-28">
	<!-- Header -->
	<header class="flex justify-between items-center mb-6 animate-fade-in">
		<div>
			<h1 class="text-large-title text-text-primary">⚡ 快速捕获</h1>
			<p class="text-subhead text-text-secondary mt-1">记录你的想法和灵感</p>
		</div>

		<div class="flex gap-2">
			{#if $hasPendingSync}
				<button
					on:click={() => captureStore.syncOfflineCaptures()}
					class="px-3 py-1.5 bg-status-warning/20 backdrop-blur-sm border border-status-warning/30 text-status-warning rounded-lg text-caption font-medium hover:bg-status-warning/30 transition-all duration-200 ease-apple active:scale-95"
				>
					🔄 {$syncStore.pendingCount}
				</button>
			{/if}

			{#if !$syncStore.online}
				<span class="px-3 py-1.5 bg-fill-primary backdrop-blur-sm border border-white/5 text-text-secondary rounded-lg text-caption font-medium">
					📵 离线
				</span>
			{/if}
		</div>
	</header>

	<!-- Main Capture Area -->
	<div class="flex-1 flex flex-col animate-scale-in">
		<textarea
			bind:value={content}
			on:keydown={handleKeydown}
			placeholder="记录你的想法...&#10;&#10;⌘ + Enter 快速提交"
			class="
				flex-1 w-full p-4
				bg-background-secondary/70 backdrop-blur-lg
				border border-white/5
				rounded-lg
				text-text-primary text-body
				placeholder-text-tertiary
				focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20
				resize-none
				shadow-subtle
				transition-all duration-200 ease-apple
			"
			rows="10"
		/>

		<!-- Actions -->
		<div class="mt-4 flex gap-3">
			<!-- Primary Save Button -->
			<button
				on:click={handleCapture}
				disabled={!content.trim() || $captureStore.loading}
				class="
					flex-1 py-4 px-6
					bg-accent hover:bg-accent-light
					disabled:bg-fill-primary disabled:text-text-tertiary disabled:cursor-not-allowed
					text-white font-semibold text-headline
					rounded-md
					shadow-medium
					transition-all duration-200 ease-apple
					active:scale-95
					focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary
				"
			>
				{$captureStore.loading ? '保存中...' : '💾 保存'}
			</button>

			<!-- Voice Recording Button -->
			<button
				on:click={toggleRecording}
				class="
					px-6 py-4
					rounded-md
					font-semibold text-headline
					transition-all duration-200 ease-apple
					active:scale-95
					focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary
					{isRecording
						? 'bg-status-error hover:bg-status-error/90 text-white shadow-medium focus-visible:ring-status-error'
						: 'bg-background-secondary/70 backdrop-blur-lg border border-white/5 text-text-primary hover:bg-background-tertiary/70 shadow-subtle focus-visible:ring-accent'}
				"
			>
				{#if isRecording}
					⏹ {recordingDuration}s
				{:else}
					🎤
				{/if}
			</button>
		</div>

		<!-- Tips -->
		<p class="mt-4 text-footnote text-text-secondary text-center leading-relaxed">
			{#if isRecording}
				正在录音... 最长60秒
			{:else}
				点击麦克风录音，或直接输入文字 · ⌘ + Enter 提交
			{/if}
		</p>

		<!-- Success Message -->
		{#if $captureStore.lastCapture}
			<div
				class="mt-4 p-4 bg-status-success/10 backdrop-blur-sm border border-status-success/20 rounded-lg text-center animate-scale-in shadow-subtle"
			>
				<p class="text-callout text-status-success font-medium">✅ 已保存到 Obsidian</p>
			</div>
		{/if}
	</div>

	<BottomNav currentPage="capture" />
</div>
