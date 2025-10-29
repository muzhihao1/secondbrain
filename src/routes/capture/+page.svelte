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
        class="px-3 py-1.5 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 text-yellow-400 rounded-lg text-sm font-medium hover:bg-yellow-500/30 transition-all duration-200 active:scale-95"
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
      class="flex-1 w-full p-4 bg-white/5 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 resize-none transition-all duration-200"
      style="border-color: var(--surface-border-default); min-height: 300px;"
      rows="10"
    />

    <!-- Actions -->
    <div class="mt-4 flex gap-3">
      <!-- Primary Save Button -->
      <button
        on:click={handleCapture}
        disabled={!content.trim() || $captureStore.loading}
        class="flex-1 py-4 px-6 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 active:scale-95 focus-visible:ring-2 focus-visible:ring-cyan-500"
      >
        {$captureStore.loading ? '保存中...' : '💾 保存'}
      </button>

      <!-- Voice Recording Button -->
      <button
        on:click={toggleRecording}
        class="px-6 py-4 rounded-lg font-semibold transition-all duration-200 active:scale-95 focus-visible:ring-2 {isRecording
          ? 'bg-red-500 hover:bg-red-600 text-white focus-visible:ring-red-500'
          : 'bg-white/5 border text-white hover:bg-white/10 focus-visible:ring-cyan-500'}"
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
        class="mt-4 p-4 bg-green-500/10 backdrop-blur-sm border border-green-500/20 rounded-lg text-center"
      >
        <p class="text-green-400 font-medium">✅ 已保存到 Obsidian</p>
      </div>
    {/if}
  </div>
</PageLayout>
