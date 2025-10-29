<script>
  /**
   * Capture (快速捕获) Page - Unified Design
   *
   * 应用统一的PageLayout和设计token
   */

  import PageLayout from '$lib/components/layout/PageLayout.svelte';
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
  <title>快速捕获 - VNext</title>
</svelte:head>

<PageLayout title="快速捕获" maxWidth="2xl" padding="md">
  <!-- Status Bar -->
  <div class="flex gap-2 justify-end mb-6">
    {#if $hasPendingSync}
      <button
        on:click={() => captureStore.syncOfflineCaptures()}
        class="px-3 py-1.5 bg-[var(--color-semantic-warning-500)]/20 backdrop-blur-sm border border-[var(--color-semantic-warning-500)]/30 text-[var(--color-semantic-warning-500)] rounded-lg text-sm font-medium hover:bg-[var(--color-semantic-warning-500)]/30 transition-all duration-200 active:scale-95"
      >
        🔄 {$syncStore.pendingCount}
      </button>
    {/if}

    {#if !$syncStore.online}
      <span class="px-3 py-1.5 bg-white/5 backdrop-blur-sm border border-white/5 text-white/60 rounded-lg text-sm font-medium">
        📵 离线
      </span>
    {/if}
  </div>

  <!-- Main Capture Area -->
  <div class="flex-1 flex flex-col">
    <textarea
      bind:value={content}
      on:keydown={handleKeydown}
      placeholder="记录你的想法...&#10;&#10;⌘ + Enter 快速提交"
      class="flex-1 w-full p-4 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[var(--color-brand-primary-500)] focus:ring-2 focus:ring-[var(--color-brand-primary-500)]/20 resize-none transition-all duration-200"
      style="border-color: var(--surface-border-default); min-height: 300px;"
      rows="10"
    />

    <!-- Actions -->
    <div class="mt-4 flex gap-3">
      <!-- Primary Save Button -->
      <button
        on:click={handleCapture}
        disabled={!content.trim() || $captureStore.loading}
        class="flex-1 py-4 px-6 bg-[var(--color-brand-primary-500)] hover:bg-[var(--color-brand-primary-600)] disabled:bg-[var(--color-neutral-600)] disabled:text-[var(--color-neutral-400)] disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary-500)]"
      >
        {$captureStore.loading ? '保存中...' : '💾 保存'}
      </button>

      <!-- Voice Recording Button -->
      <button
        on:click={toggleRecording}
        class="px-6 py-4 rounded-lg font-semibold transition-all duration-200 active:scale-95 focus-visible:ring-2 {isRecording
          ? 'bg-[var(--color-semantic-error-500)] hover:bg-[var(--color-semantic-error-700)] text-white focus-visible:ring-[var(--color-semantic-error-500)]'
          : 'bg-white/5 border text-white hover:bg-white/10 focus-visible:ring-[var(--color-brand-primary-500)]'}"
        style={!isRecording ? 'border-color: var(--surface-border-default);' : ''}
      >
        {#if isRecording}
          ⏹ {recordingDuration}s
        {:else}
          🎤
        {/if}
      </button>
    </div>

    <!-- Tips -->
    <p class="mt-4 text-sm text-white/60 text-center">
      {#if isRecording}
        正在录音... 最长60秒
      {:else}
        点击麦克风录音，或直接输入文字 · ⌘ + Enter 提交
      {/if}
    </p>

    <!-- Success Message -->
    {#if $captureStore.lastCapture}
      <div
        class="mt-4 p-4 bg-[var(--color-semantic-success-500)]/10 backdrop-blur-sm border border-[var(--color-semantic-success-500)]/20 rounded-lg text-center"
      >
        <p class="text-[var(--color-semantic-success-500)] font-medium">✅ 已保存到 Obsidian</p>
      </div>
    {/if}
  </div>
</PageLayout>
