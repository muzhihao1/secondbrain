<script>
  /**
   * NoteEditor - Markdown编辑器组件
   *
   * 支持编辑和预览模式切换
   */

  import { marked } from 'marked';
  import { currentNote, vaultActions } from '$lib/stores/vault';
  import { onMount } from 'svelte';

  let isEditing = false;
  let title = '';
  let content = '';
  let isSaving = false;
  let hasUnsavedChanges = false;
  let showDeleteConfirm = false;
  let currentNoteId = null;

  // Configure marked
  marked.setOptions({
    breaks: true,
    gfm: true
  });

  // Watch for note changes - only reset when note ID changes
  $: if ($currentNote && $currentNote.id !== currentNoteId) {
    currentNoteId = $currentNote.id;
    title = $currentNote.title || '';
    content = $currentNote.content || '';
    isEditing = false;
    hasUnsavedChanges = false;
  } else if (!$currentNote) {
    currentNoteId = null;
    title = '';
    content = '';
    isEditing = false;
    hasUnsavedChanges = false;
  }

  // Watch for content changes
  $: if ($currentNote) {
    hasUnsavedChanges =
      title !== $currentNote.title || content !== $currentNote.content;
  }

  // Parse markdown
  $: previewHtml = content ? marked.parse(content) : '<p style="color: var(--text-disabled);">空笔记</p>';

  async function handleSave() {
    if (!$currentNote || !hasUnsavedChanges) return;

    isSaving = true;

    try {
      await vaultActions.updateNote($currentNote.id, {
        title,
        content
      });

      hasUnsavedChanges = false;
      isEditing = false;
    } catch (err) {
      alert(`保存失败: ${err.message}`);
    } finally {
      isSaving = false;
    }
  }

  async function handleDelete() {
    if (!$currentNote) return;

    showDeleteConfirm = true;
  }

  async function confirmDelete() {
    if (!$currentNote) return;

    try {
      await vaultActions.deleteNote($currentNote.id);
      showDeleteConfirm = false;
    } catch (err) {
      alert(`删除失败: ${err.message}`);
    }
  }

  function handleKeydown(e) {
    // Cmd/Ctrl + S to save
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }

    // Cmd/Ctrl + E to toggle edit mode
    if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
      e.preventDefault();
      isEditing = !isEditing;
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });
</script>

<div class="note-editor h-full flex flex-col" style="background: var(--surface-bg-primary);">
  {#if $currentNote}
    <!-- Header -->
    <header class="flex items-center justify-between p-4 gap-4" style="border-bottom: 1px solid var(--surface-border-default);">
      <!-- Title Input -->
      <input
        type="text"
        bind:value={title}
        placeholder="无标题笔记"
        class="flex-1 text-xl font-bold bg-transparent border-0 focus:outline-none"
        style="color: var(--text-primary);"
      />

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <!-- Edit/Preview Toggle -->
        {#if isEditing}
          <button
            class="px-3 py-1.5 rounded-md text-sm font-medium transition-all"
            style="background: var(--surface-bg-secondary); color: var(--text-primary);"
            on:click={() => isEditing = false}
            title="预览 (Cmd+E)"
          >
            <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            预览
          </button>
        {:else}
          <button
            class="px-3 py-1.5 rounded-md text-sm font-medium transition-all"
            style="background: var(--surface-bg-secondary); color: var(--text-primary);"
            on:click={() => isEditing = true}
            title="编辑 (Cmd+E)"
          >
            <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            编辑
          </button>
        {/if}

        <!-- Save Button -->
        <button
          class="px-3 py-1.5 rounded-md text-sm font-medium transition-all"
          style="background: var(--color-brand-primary-500); color: white;"
          on:click={handleSave}
          disabled={!hasUnsavedChanges || isSaving}
          title="保存 (Cmd+S)"
        >
          {#if isSaving}
            保存中...
          {:else}
            <svg class="w-4 h-4 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            保存
          {/if}
        </button>

        <!-- Delete Button -->
        <button
          class="p-2 rounded-md transition-all"
          style="color: var(--color-semantic-error-500); hover:background: var(--surface-bg-secondary);"
          on:click={handleDelete}
          title="删除笔记"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </header>

    <!-- Content Area -->
    <div class="flex-1 overflow-hidden">
      {#if isEditing}
        <!-- Edit Mode -->
        <textarea
          bind:value={content}
          placeholder="开始写作..."
          class="w-full h-full p-6 bg-transparent border-0 focus:outline-none resize-none"
          style="
            color: var(--text-primary);
            font-family: 'JetBrains Mono', 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.6;
          "
        />
      {:else}
        <!-- Preview Mode -->
        <article class="markdown-preview h-full overflow-y-auto p-6">
          {@html previewHtml}
        </article>
      {/if}
    </div>

    <!-- Status Bar -->
    <footer class="flex items-center justify-between px-4 py-2 text-xs" style="background: var(--surface-bg-secondary); color: var(--text-disabled); border-top: 1px solid var(--surface-border-subtle);">
      <div class="flex items-center gap-4">
        <span>{content.length} 字符</span>
        <span>{content.split(/\n/).length} 行</span>
        {#if hasUnsavedChanges}
          <span style="color: var(--color-semantic-warning-500);">• 未保存</span>
        {/if}
      </div>
      <div>
        {#if $currentNote.updatedAt}
          最后编辑: {new Date($currentNote.updatedAt).toLocaleString('zh-CN')}
        {/if}
      </div>
    </footer>

  {:else}
    <!-- Empty State -->
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <div class="text-6xl mb-4">📝</div>
        <p style="color: var(--text-secondary); font-size: 16px;">选择一个笔记开始编辑</p>
        <p style="color: var(--text-disabled); font-size: 14px; margin-top: 8px;">或创建一个新笔记</p>
      </div>
    </div>
  {/if}
</div>

<!-- Delete Confirmation Modal -->
{#if showDeleteConfirm && $currentNote}
  <div class="modal-overlay" on:click={() => showDeleteConfirm = false}>
    <div class="modal-content" on:click|stopPropagation>
      <h3 class="text-lg font-semibold mb-3" style="color: var(--text-primary);">确认删除</h3>
      <p class="mb-6" style="color: var(--text-secondary);">确定要删除笔记 "{$currentNote.title || '无标题笔记'}"吗？此操作无法撤销。</p>
      <div class="flex gap-3 justify-end">
        <button
          class="px-4 py-2 rounded-md text-sm font-medium"
          style="background: var(--surface-bg-secondary); color: var(--text-primary);"
          on:click={() => showDeleteConfirm = false}
        >
          取消
        </button>
        <button
          class="px-4 py-2 rounded-md text-sm font-medium"
          style="background: var(--color-semantic-error-500); color: white;"
          on:click={confirmDelete}
        >
          删除
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Markdown Preview Styles */
  :global(.markdown-preview) {
    line-height: 1.8;
    color: var(--text-primary);
  }

  :global(.markdown-preview h1) {
    font-size: 2em;
    font-weight: 700;
    margin: 0.67em 0;
    color: var(--text-primary);
  }

  :global(.markdown-preview h2) {
    font-size: 1.5em;
    font-weight: 600;
    margin: 0.75em 0;
    color: var(--text-primary);
  }

  :global(.markdown-preview h3) {
    font-size: 1.17em;
    font-weight: 600;
    margin: 0.83em 0;
    color: var(--text-primary);
  }

  :global(.markdown-preview p) {
    margin: 1em 0;
    color: var(--text-secondary);
  }

  :global(.markdown-preview code) {
    background: var(--surface-bg-secondary);
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.9em;
    color: var(--color-brand-primary-500);
  }

  :global(.markdown-preview pre) {
    background: var(--surface-bg-secondary);
    padding: 1em;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1em 0;
  }

  :global(.markdown-preview pre code) {
    background: none;
    padding: 0;
    color: var(--text-primary);
  }

  :global(.markdown-preview ul, .markdown-preview ol) {
    margin: 1em 0;
    padding-left: 2em;
    color: var(--text-secondary);
  }

  :global(.markdown-preview blockquote) {
    border-left: 4px solid var(--color-brand-primary-500);
    padding-left: 1em;
    margin: 1em 0;
    color: var(--text-tertiary);
    font-style: italic;
  }

  :global(.markdown-preview a) {
    color: var(--color-brand-primary-500);
    text-decoration: none;
  }

  :global(.markdown-preview a:hover) {
    text-decoration: underline;
  }

  /* Button Styles */
  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:not(:disabled):hover {
    opacity: 0.9;
  }

  button:not(:disabled):active {
    transform: scale(0.98);
  }

  /* Modal Styles */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: var(--surface-bg-secondary);
    border: 1px solid var(--surface-border-default);
    border-radius: 12px;
    padding: 24px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
  }

  /* Custom scrollbar */
  .markdown-preview::-webkit-scrollbar,
  textarea::-webkit-scrollbar {
    width: 8px;
  }

  .markdown-preview::-webkit-scrollbar-track,
  textarea::-webkit-scrollbar-track {
    background: transparent;
  }

  .markdown-preview::-webkit-scrollbar-thumb,
  textarea::-webkit-scrollbar-thumb {
    background: var(--surface-border-default);
    border-radius: 4px;
  }

  .markdown-preview::-webkit-scrollbar-thumb:hover,
  textarea::-webkit-scrollbar-thumb:hover {
    background: var(--surface-border-strong);
  }
</style>
