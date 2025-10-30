<script>
  /**
   * Daily Reflection & Planning Workflow Page
   *
   * Executes the daily reflection (evening) or daily planning (morning) workflow
   * based on URL query parameter or auto-detection
   */

  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import WorkflowExecutor from '$lib/components/workflow/WorkflowExecutor.svelte';

  // Get mode from query parameter
  $: mode = $page.url.searchParams.get('mode'); // 'evening' | 'morning' | null

  /**
   * Handle workflow completion
   */
  function handleComplete(state) {
    console.log('Workflow completed:', state);
    // Could show a celebration animation or save analytics
  }

  /**
   * Navigate back to workflows gallery
   */
  function goBack() {
    goto('/workflows');
  }
</script>

<svelte:head>
  <title>
    {mode === 'evening' ? '每日反思' :
     mode === 'morning' ? '每日规划' :
     '每日工作流'} - VNext
  </title>
</svelte:head>

<div class="workflow-page">
  <!-- Back Button -->
  <button on:click={goBack} class="back-button">
    <span class="back-icon">←</span>
    <span>返回工作流</span>
  </button>

  <!-- Workflow Executor -->
  <WorkflowExecutor
    workflowId="daily-reflection"
    {mode}
    onComplete={handleComplete}
  />
</div>

<style>
  .workflow-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem 1rem;
    position: relative;
  }

  .back-button {
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 12px;
    color: white;
    font-size: 0.9375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .back-button:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateX(-4px);
  }

  .back-icon {
    font-size: 1.25rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .workflow-page {
      padding: 1rem 0.5rem;
    }

    .back-button {
      top: 1rem;
      left: 1rem;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }
  }
</style>
