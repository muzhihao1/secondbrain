<script>
  /**
   * NoteList - 笔记列表组件
   *
   * 显示选中文件夹中的所有笔记
   */

  import { filteredNotes, currentNote, selectedFolder, vaultActions } from '$lib/stores/vault';

  let searchQuery = '';
  let hoveredId = null;

  $: displayNotes = searchQuery
    ? $filteredNotes.filter(note =>
        note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.content?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : $filteredNotes;

  function handleNoteClick(note) {
    vaultActions.selectNote(note);
  }

  function handleCreateNote() {
    if (!$selectedFolder) {
      alert('请先选择一个文件夹');
      return;
    }

    vaultActions.createNote({
      title: '无标题笔记',
      content: '',
      folderId: $selectedFolder.id,
      tags: []
    });
  }

  function formatRelativeTime(timestamp) {
    if (!timestamp) return '刚刚';

    const now = Date.now();
    const diff = now - timestamp;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days === 1) return '昨天';
    if (days < 7) return `${days}天前`;

    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  }

  function getSnippet(content) {
    if (!content) return '空笔记';

    // Remove markdown syntax
    let text = content
      .replace(/^#+\s+/gm, '') // Headers
      .replace(/\*\*(.+?)\*\*/g, '$1') // Bold
      .replace(/\*(.+?)\*/g, '$1') // Italic
      .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Links
      .trim();

    // Truncate to 100 characters
    return text.length > 100 ? text.substring(0, 100) + '...' : text;
  }
</script>

<div class="note-list h-full flex flex-col" style="background: var(--surface-bg-secondary); border-right: 1px solid var(--surface-border-default);">
  <!-- Header -->
  <header class="p-4" style="border-bottom: 1px solid var(--surface-border-default);">
    <!-- Search Input -->
    <div class="relative mb-3">
      <input
        type="search"
        bind:value={searchQuery}
        placeholder="搜索笔记..."
        class="w-full px-3 py-2 pl-9 rounded-lg text-sm border-0 focus:outline-none focus:ring-2 transition-all"
        style="
          background: var(--surface-bg-primary);
          color: var(--text-primary);
          --tw-ring-color: var(--color-brand-primary-500);
        "
      />
      <svg
        class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
        style="color: var(--text-disabled);"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <!-- Create Note Button -->
    <button
      on:click={handleCreateNote}
      class="w-full py-2 px-3 rounded-lg text-sm font-medium transition-all duration-150 flex items-center justify-center gap-2"
      style="
        background: var(--color-brand-primary-500);
        color: white;
      "
      disabled={!$selectedFolder}
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      新建笔记
    </button>
  </header>

  <!-- Notes List -->
  <div class="flex-1 overflow-y-auto">
    {#if displayNotes.length === 0}
      <div class="p-8 text-center">
        {#if $selectedFolder}
          <div style="color: var(--text-disabled); font-size: 14px;">
            <div class="text-4xl mb-3">📝</div>
            <p class="mb-2">还没有笔记</p>
            <p class="text-xs">点击上方按钮创建第一篇笔记</p>
          </div>
        {:else}
          <div style="color: var(--text-disabled); font-size: 14px;">
            <div class="text-4xl mb-3">📂</div>
            <p>请先选择一个文件夹</p>
          </div>
        {/if}
      </div>
    {:else}
      {#each displayNotes as note (note.id)}
        <article
          class="note-item px-4 py-3 cursor-pointer transition-all duration-150"
          class:active={$currentNote && $currentNote.id === note.id}
          on:click={() => handleNoteClick(note)}
          on:mouseenter={() => hoveredId = note.id}
          on:mouseleave={() => hoveredId = null}
          style="border-bottom: 1px solid var(--surface-border-subtle);"
        >
          <!-- Title -->
          <h3 class="note-title text-sm font-semibold mb-1" style="color: var(--text-primary);">
            {note.title || '无标题笔记'}
          </h3>

          <!-- Snippet -->
          <p class="note-snippet text-xs mb-2 line-clamp-2" style="color: var(--text-secondary);">
            {getSnippet(note.content)}
          </p>

          <!-- Meta -->
          <footer class="note-meta flex items-center gap-3 text-xs" style="color: var(--text-disabled);">
            <!-- Time -->
            <span class="flex items-center gap-1">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatRelativeTime(note.updatedAt)}
            </span>

            <!-- Tags -->
            {#if note.tags && note.tags.length > 0}
              <div class="flex items-center gap-1 flex-wrap">
                {#each note.tags.slice(0, 2) as tag}
                  <span
                    class="px-2 py-0.5 rounded text-xs"
                    style="
                      background: var(--surface-bg-elevated);
                      color: var(--text-tertiary);
                    "
                  >
                    {tag}
                  </span>
                {/each}
              </div>
            {/if}
          </footer>
        </article>
      {/each}
    {/if}
  </div>

  <!-- Footer Stats -->
  {#if $selectedFolder}
    <footer class="p-3 text-xs text-center" style="color: var(--text-disabled); border-top: 1px solid var(--surface-border-subtle);">
      共 {displayNotes.length} 篇笔记
      {#if searchQuery}
        （搜索中）
      {/if}
    </footer>
  {/if}
</div>

<style>
  .note-list {
    min-width: 280px;
    max-width: 400px;
  }

  .note-item:hover {
    background: var(--surface-bg-hover);
  }

  .note-item.active {
    background: var(--surface-bg-elevated);
    border-left: 3px solid var(--color-brand-primary-500);
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Custom scrollbar */
  div::-webkit-scrollbar {
    width: 6px;
  }

  div::-webkit-scrollbar-track {
    background: transparent;
  }

  div::-webkit-scrollbar-thumb {
    background: var(--surface-border-default);
    border-radius: 3px;
  }

  div::-webkit-scrollbar-thumb:hover {
    background: var(--surface-border-strong);
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  button:not(:disabled):hover {
    background: var(--color-brand-primary-600) !important;
  }

  button:not(:disabled):active {
    transform: scale(0.98);
  }
</style>
