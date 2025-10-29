<script>
  /**
   * FolderTree - 文件夹树组件
   *
   * 显示所有文件夹和笔记数量统计
   * 使用 Lucide Icons 替代 Emoji
   */

  import { folders, selectedFolder, vaultActions } from '$lib/stores/vault';
  import { folderIcons, actionIcons } from '$lib/config/iconMap';

  let hoveredId = null;

  function handleFolderClick(folder) {
    vaultActions.selectFolder(folder);
  }

  function handleAddFolder() {
    // TODO: Implement add folder functionality
    console.log('Add folder clicked');
  }

  // Get icon component for folder
  function getFolderIcon(iconName) {
    return folderIcons[iconName] || folderIcons.default;
  }
</script>

<div class="folder-tree h-full flex flex-col" style="background: var(--surface-bg-primary);">
  <!-- Header -->
  <header class="flex items-center justify-between p-4" style="border-bottom: 1px solid var(--surface-border-default);">
    <h2 class="text-sm font-semibold" style="color: var(--text-primary);">文件夹</h2>
    <button
      class="p-2 rounded-md hover:bg-[var(--surface-bg-hover)] transition-colors"
      on:click={handleAddFolder}
      aria-label="新建文件夹"
      title="新建文件夹"
    >
      <svelte:component
        this={actionIcons.plus}
        size={16}
        stroke-width={2}
        class="shrink-0"
        style="color: var(--text-secondary);"
      />
    </button>
  </header>

  <!-- Folder List -->
  <nav class="flex-1 overflow-y-auto p-2">
    {#each $folders as folder (folder.id)}
      {@const IconComponent = getFolderIcon(folder.icon)}
      <button
        class="folder-item w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150"
        class:active={$selectedFolder && $selectedFolder.id === folder.id}
        on:click={() => handleFolderClick(folder)}
        on:mouseenter={() => hoveredId = folder.id}
        on:mouseleave={() => hoveredId = null}
      >
        <!-- Icon -->
        <svelte:component
          this={IconComponent}
          size={18}
          stroke-width={2}
          class="folder-icon shrink-0"
        />

        <!-- Name -->
        <span class="folder-name flex-1 text-sm font-medium text-left" style="color: var(--text-secondary);">
          {folder.name}
        </span>

        <!-- Count Badge -->
        {#if folder.count > 0}
          <span
            class="count-badge px-2 py-0.5 rounded-full text-xs font-medium"
            style="
              background: var(--surface-bg-elevated);
              color: var(--text-tertiary);
            "
          >
            {folder.count}
          </span>
        {/if}
      </button>
    {/each}
  </nav>

  <!-- Footer Tips -->
  <footer class="p-4 text-xs" style="color: var(--text-disabled); border-top: 1px solid var(--surface-border-subtle);">
    点击文件夹查看笔记
  </footer>
</div>

<style>
  .folder-item {
    position: relative;
    cursor: pointer;
  }

  .folder-item:hover {
    background: var(--surface-bg-hover);
  }

  .folder-item:hover .folder-name {
    color: var(--text-primary);
  }

  .folder-item.active {
    background: var(--surface-bg-elevated);
    border-left: 3px solid var(--color-brand-primary-500);
  }

  .folder-item.active .folder-name {
    color: var(--text-primary);
    font-weight: 600;
  }

  .folder-tree {
    min-width: 200px;
    max-width: 300px;
  }

  /* Custom scrollbar */
  nav::-webkit-scrollbar {
    width: 6px;
  }

  nav::-webkit-scrollbar-track {
    background: transparent;
  }

  nav::-webkit-scrollbar-thumb {
    background: var(--surface-border-default);
    border-radius: 3px;
  }

  nav::-webkit-scrollbar-thumb:hover {
    background: var(--surface-border-strong);
  }
</style>
