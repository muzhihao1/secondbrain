<script>
  /**
   * Vault (知识库) Page - Complete Three-Column Knowledge Management System
   *
   * 实现完整的三栏式笔记管理界面:
   * - 左栏: 文件夹树 (FolderTree) - Responsive to sidebar state
   * - 中栏: 笔记列表 (NoteList)
   * - 右栏: 笔记编辑器 (NoteEditor)
   *
   * Layout strategy:
   * - Maintains constant 240px total left offset for content alignment
   * - When sidebar expanded (240px): Left column = 0px (hidden)
   * - When sidebar collapsed (72px): Left column = 168px (visible)
   */

  import FolderTree from '$lib/components/vault/FolderTree.svelte';
  import NoteList from '$lib/components/vault/NoteList.svelte';
  import NoteEditor from '$lib/components/vault/NoteEditor.svelte';
  import { vaultActions } from '$lib/stores/vault';
  import { sidebarExpanded } from '$lib/stores/sidebarStore.js';
  import { onMount } from 'svelte';

  // Layout constants - must match root layout padding values
  const ROOT_PADDING_EXPANDED = 240;  // pl-60 = 15rem × 16px = 240px
  const ROOT_PADDING_COLLAPSED = 72;  // pl-18 = 4.5rem × 16px = 72px
  const TARGET_LEFT_OFFSET = 240;     // Desired total left offset

  // Calculate vault left column width to maintain constant total offset
  // When sidebar expanded (240px): leftColWidth = 240 - 240 = 0px
  // When sidebar collapsed (72px): leftColWidth = 240 - 72 = 168px
  $: leftColWidth = $sidebarExpanded
    ? Math.max(0, TARGET_LEFT_OFFSET - ROOT_PADDING_EXPANDED)
    : Math.max(0, TARGET_LEFT_OFFSET - ROOT_PADDING_COLLAPSED);

  // Dynamic grid template based on left column width
  $: gridTemplate = `${leftColWidth}px 320px 1fr`;

  onMount(async () => {
    // Initialize vault: load folders first, then notes
    await vaultActions.loadFolders();
    await vaultActions.loadNotes();
  });
</script>

<svelte:head>
  <title>知识库 - VNext</title>
</svelte:head>

<div class="vault-container" style="background: var(--surface-bg-primary);">
  <!-- Three-Column Layout with Dynamic Grid -->
  <div class="vault-grid" style="grid-template-columns: {gridTemplate};">
    <!-- Left Column: Folder Tree (hidden when sidebar expanded) -->
    {#if leftColWidth > 0}
      <div class="vault-column vault-column-left">
        <FolderTree />
      </div>
    {:else}
      <!-- Empty spacer when left column is hidden -->
      <div class="vault-column-spacer" aria-hidden="true"></div>
    {/if}

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
    /* grid-template-columns set inline via {gridTemplate} */
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

  /* Spacer for when left column is hidden (0px width) */
  .vault-column-spacer {
    width: 0;
    height: 0;
    overflow: hidden;
    visibility: hidden;
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
    /* On tablet, adjust middle column width but keep dynamic left column */
    .vault-column-middle {
      /* Width controlled by grid template, no override needed */
    }
  }

  @media (max-width: 768px) {
    .vault-grid {
      /* Mobile: Stack all columns vertically */
      grid-template-columns: 1fr !important;
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
