<script>
  /**
   * Vault (知识库) Page - Complete Three-Column Knowledge Management System
   *
   * 实现完整的三栏式笔记管理界面:
   * - 左栏: 文件夹树 (FolderTree)
   * - 中栏: 笔记列表 (NoteList)
   * - 右栏: 笔记编辑器 (NoteEditor)
   */

  import FolderTree from '$lib/components/vault/FolderTree.svelte';
  import NoteList from '$lib/components/vault/NoteList.svelte';
  import NoteEditor from '$lib/components/vault/NoteEditor.svelte';
  import { vaultActions } from '$lib/stores/vault';
  import { onMount } from 'svelte';

  onMount(async () => {
    // Load notes from IndexedDB on mount
    await vaultActions.loadNotes();
  });
</script>

<svelte:head>
  <title>知识库 - VNext</title>
</svelte:head>

<div class="vault-container" style="background: var(--surface-bg-primary);">
  <!-- Three-Column Layout -->
  <div class="vault-grid">
    <!-- Left Column: Folder Tree -->
    <div class="vault-column vault-column-left">
      <FolderTree />
    </div>

    <!-- Middle Column: Note List -->
    <div class="vault-column vault-column-middle">
      <NoteList />
    </div>

    <!-- Right Column: Note Editor -->
    <div class="vault-column vault-column-right">
      <NoteEditor />
    </div>
  </div>
</div>

<style>
  .vault-container {
    width: 100%;
    height: calc(100vh - var(--bottomnav-height, 0px));
    overflow: hidden;
    position: relative;
  }

  .vault-grid {
    display: grid;
    grid-template-columns: 240px 320px 1fr;
    grid-template-rows: 100vh;
    width: 100%;
    height: 100%;
  }

  .vault-column {
    height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .vault-column-left {
    border-right: 1px solid var(--surface-border-default);
  }

  .vault-column-middle {
    border-right: 1px solid var(--surface-border-default);
  }

  .vault-column-right {
    /* No border - rightmost column */
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .vault-grid {
      grid-template-columns: 200px 280px 1fr;
    }
  }

  @media (max-width: 768px) {
    .vault-grid {
      grid-template-columns: 1fr;
      grid-template-rows: 30vh 40vh 1fr;
    }

    .vault-column {
      height: 100%;
      min-height: 0;
    }

    .vault-column-left {
      border-right: none;
      border-bottom: 1px solid var(--surface-border-default);
      max-height: 30vh;
    }

    .vault-column-middle {
      border-right: none;
      border-bottom: 1px solid var(--surface-border-default);
      max-height: 40vh;
    }

    .vault-column-right {
      height: 100%;
      flex: 1;
    }
  }

  /* Ensure content doesn't overflow */
  :global(.vault-column > *) {
    height: 100%;
    overflow: hidden;
  }
</style>
