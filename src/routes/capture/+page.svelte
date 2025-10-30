<script>
  /**
   * Capture (快速捕获) Page - Unified Save Flow
   *
   * 统一保存流程：语音录音 → 转写到输入框 → 用户编辑 → 点击保存
   */

  import PageLayout from '$lib/components/layout/PageLayout.svelte';
  import { captureStore } from '$stores/captureStore.js';
  import { audioService } from '$services/audioService.js';
  import { syncStore, hasPendingSync } from '$stores/syncStore.js';
  import { obsidianApiClient } from '$services/obsidianApiClient.js';

	let content = '';
	let isRecording = false;
	let isTranscribing = false;
	let recordingDuration = 0;
	let recordingInterval;
	let transcriptionError = null;

	// Handle unified text capture (for both text and voice)
	async function handleCapture() {
		if (!content.trim()) return;

		await captureStore.capture(content);
		content = '';
		transcriptionError = null;
	}

	// Handle voice recording
	async function toggleRecording() {
		if (isRecording) {
			// Stop recording and transcribe
			clearInterval(recordingInterval);
			isRecording = false;
			recordingDuration = 0;

			const audioBlob = await audioService.stopRecording();
			if (audioBlob) {
				// Transcribe audio without saving
				isTranscribing = true;
				transcriptionError = null;

				try {
					const result = await obsidianApiClient.transcribeAudio(audioBlob);

					// Append transcribed text to input (or replace if empty)
					if (content.trim()) {
						content = content + '\n\n' + result.text;
					} else {
						content = result.text;
					}

					console.log('[Capture] Transcription successful:', result);
				} catch (error) {
					console.error('[Capture] Transcription failed:', error);
					transcriptionError = error.message;
				} finally {
					isTranscribing = false;
				}
			}
		} else {
			// Start recording
			try {
				await audioService.startRecording();
				isRecording = true;
				recordingDuration = 0;
				transcriptionError = null;

				recordingInterval = setInterval(() => {
					recordingDuration = audioService.getRecordingDuration();
				}, 1000);
			} catch (error) {
				console.error('Recording error:', error);
				isRecording = false;
				transcriptionError = error.message;
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
      disabled={isTranscribing}
      placeholder="记录你的想法...&#10;&#10;⌘ + Enter 快速提交"
      class="flex-1 w-full p-4 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[var(--color-brand-primary-500)] focus:ring-2 focus:ring-[var(--color-brand-primary-500)]/20 resize-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      style="border-color: var(--surface-border-default); min-height: 300px;"
      rows="10"
    />

    <!-- Actions -->
    <div class="mt-4 flex gap-3">
      <!-- Primary Save Button -->
      <button
        on:click={handleCapture}
        disabled={!content.trim() || $captureStore.loading || isTranscribing}
        class="flex-1 py-4 px-6 bg-[var(--color-brand-primary-500)] hover:bg-[var(--color-brand-primary-600)] disabled:bg-[var(--color-neutral-600)] disabled:text-[var(--color-neutral-400)] disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary-500)]"
      >
        {#if $captureStore.loading}
          💾 保存中...
        {:else if isTranscribing}
          🎤 转写中...
        {:else}
          💾 保存
        {/if}
      </button>

      <!-- Voice Recording Button -->
      <button
        on:click={toggleRecording}
        disabled={isTranscribing}
        class="px-6 py-4 rounded-lg font-semibold transition-all duration-200 active:scale-95 focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed {isRecording
          ? 'bg-[var(--color-semantic-error-500)] hover:bg-[var(--color-semantic-error-700)] text-white focus-visible:ring-[var(--color-semantic-error-500)]'
          : 'bg-white/5 border text-white hover:bg-white/10 focus-visible:ring-[var(--color-brand-primary-500)]'}"
        style={!isRecording ? 'border-color: var(--surface-border-default);' : ''}
      >
        {#if isRecording}
          ⏹ {recordingDuration}s
        {:else if isTranscribing}
          ⏳
        {:else}
          🎤
        {/if}
      </button>
    </div>

    <!-- Status Messages -->
    <div class="mt-4">
      <!-- Transcribing Status -->
      {#if isTranscribing}
        <div
          class="p-4 bg-[var(--color-brand-primary-500)]/10 backdrop-blur-sm border border-[var(--color-brand-primary-500)]/20 rounded-lg text-center animate-pulse"
        >
          <p class="text-[var(--color-brand-primary-500)] font-medium">🎤 正在转写录音...</p>
        </div>
      {/if}

      <!-- Recording Tips -->
      {#if isRecording}
        <p class="text-sm text-white/60 text-center">
          正在录音... 最长60秒，点击停止后自动转写
        </p>
      {:else if !isTranscribing && !$captureStore.lastCapture && !transcriptionError}
        <p class="text-sm text-white/60 text-center">
          点击麦克风录音，转写结果会自动填入输入框 · 可编辑后保存 · ⌘ + Enter 提交
        </p>
      {/if}

      <!-- Success Message -->
      {#if $captureStore.lastCapture}
        <div
          class="p-4 bg-[var(--color-semantic-success-500)]/10 backdrop-blur-sm border border-[var(--color-semantic-success-500)]/20 rounded-lg text-center"
        >
          <p class="text-[var(--color-semantic-success-500)] font-medium">✅ 已保存到 Obsidian</p>
        </div>
      {/if}

      <!-- Transcription Error -->
      {#if transcriptionError}
        <div
          class="p-4 bg-[var(--color-semantic-error-500)]/10 backdrop-blur-sm border border-[var(--color-semantic-error-500)]/20 rounded-lg text-center"
        >
          <p class="text-[var(--color-semantic-error-500)] font-medium">❌ 转写失败: {transcriptionError}</p>
          <p class="text-sm text-white/60 mt-2">请重试或手动输入</p>
        </div>
      {/if}
    </div>
  </div>
</PageLayout>
