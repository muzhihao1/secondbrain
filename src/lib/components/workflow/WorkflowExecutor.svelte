<script>
  /**
   * Workflow Executor Component
   *
   * Provides UI for executing workflows step-by-step with:
   * - Progress visualization
   * - Interactive reflection questions
   * - Planning input forms
   * - Quality validation
   * - Error handling and retry
   *
   * Based on WORKFLOWS.md standards for daily reflection and planning.
   */

  import { workflowEngine, workflowState, currentStep, executionProgress } from '$lib/services/workflowEngine.js';
  import { onMount, onDestroy } from 'svelte';

  // Props
  export let workflowId = 'daily-reflection';
  export let mode = null; // 'evening' | 'morning' | null (auto-detect)
  export let onComplete = null; // Callback when workflow completes

  // Component state
  let reflectionData = {};
  let planningData = {};
  let error = null;
  let currentDimensionIndex = 0;

  // Subscribe to workflow state
  let unsubscribe;

  onMount(() => {
    // Subscribe to state changes
    unsubscribe = workflowState.subscribe(state => {
      if (state.status === 'completed' && onComplete) {
        onComplete(state);
      }
    });
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  /**
   * Start the workflow
   */
  async function startWorkflow() {
    try {
      error = null;
      await workflowEngine.startWorkflow(workflowId, { mode });
    } catch (err) {
      error = err.message;
      console.error('Failed to start workflow:', err);
    }
  }

  /**
   * Handle submission of reflection data
   */
  async function submitReflection() {
    try {
      error = null;
      await workflowEngine.nextStep(reflectionData);
      reflectionData = {}; // Reset
      currentDimensionIndex = 0;
    } catch (err) {
      error = err.message;
      console.error('Failed to submit reflection:', err);
    }
  }

  /**
   * Handle submission of planning data
   */
  async function submitPlanning() {
    try {
      error = null;
      await workflowEngine.nextStep(planningData);
      planningData = {}; // Reset
    } catch (err) {
      error = err.message;
      console.error('Failed to submit planning:', err);
    }
  }

  /**
   * Handle validation confirmation
   */
  async function confirmValidation() {
    try {
      error = null;
      await workflowEngine.nextStep({ validated: true });
    } catch (err) {
      error = err.message;
      console.error('Failed to confirm validation:', err);
    }
  }

  /**
   * Get questionnaire from current step data
   */
  function getQuestionnaire($workflowState) {
    return $workflowState.stepData?.step3?.questionnaire || [];
  }

  /**
   * Get planning phases from current step data
   */
  function getPlanningPhases($workflowState) {
    return $workflowState.stepData?.step4?.planningPhases || [];
  }

  /**
   * Get validation checks from current step data
   */
  function getValidationChecks($workflowState) {
    return $workflowState.stepData?.step6?.allChecks || [];
  }
</script>

<div class="workflow-executor">
  {#if $workflowState.status === 'idle'}
    <!-- Start Screen -->
    <div class="start-screen">
      <div class="icon-container">
        <span class="icon">🌟</span>
      </div>

      <h2 class="title">每日反思与规划</h2>
      <p class="subtitle">
        {mode === 'evening' ? '晚间深度反思模式 (15-25分钟)' :
         mode === 'morning' ? '晨间快速规划模式 (8-12分钟)' :
         '智能模式检测'}
      </p>

      <button on:click={startWorkflow} class="start-btn">
        开始工作流
      </button>

      {#if error}
        <div class="error-message">
          ❌ {error}
        </div>
      {/if}
    </div>

  {:else if $workflowState.status === 'executing' || $workflowState.status === 'paused'}
    <!-- Workflow Execution Screen -->
    <div class="execution-screen">
      <!-- Progress Bar -->
      <div class="progress-section">
        <div class="progress-header">
          <span class="step-counter">
            第 {$workflowState.currentStep + 1} / {$workflowState.totalSteps} 步
          </span>
          <span class="progress-percent">{$executionProgress}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: {$executionProgress}%"></div>
        </div>
      </div>

      {#if $currentStep}
        <!-- Current Step -->
        <div class="step-content">
          <h3 class="step-title">{$currentStep.name}</h3>
          <p class="step-description">{$currentStep.description}</p>

          {#if $workflowState.status === 'executing'}
            <!-- Loading State for Auto Steps -->
            <div class="loading-state">
              <div class="spinner"></div>
              <p>执行中...</p>
            </div>

          {:else if $currentStep.type === 'interactive-reflection'}
            <!-- Interactive Reflection UI -->
            {#each getQuestionnaire($workflowState) as dimension, dimIndex}
              {#if dimIndex === currentDimensionIndex}
                <div class="dimension-section animate-fade-in">
                  <div class="dimension-header">
                    <span class="dimension-icon">{dimension.icon}</span>
                    <h4 class="dimension-name">{dimension.name}</h4>
                  </div>

                  <div class="questions">
                    {#each dimension.questions as question}
                      <div class="question-block">
                        <label class="question-label">
                          {question.text}
                        </label>

                        {#if question.type === 'textarea'}
                          <textarea
                            bind:value={reflectionData[question.id]}
                            placeholder={question.placeholder}
                            rows="4"
                            class="question-input"
                          ></textarea>

                          {#if question.minLength && reflectionData[question.id]?.length < question.minLength}
                            <span class="hint">
                              还需 {question.minLength - (reflectionData[question.id]?.length || 0)} 字
                            </span>
                          {/if}

                        {:else if question.type === 'scale-with-comment'}
                          <div class="scale-input">
                            {#each question.scale.labels as label, i}
                              <button
                                class="scale-option"
                                class:selected={reflectionData[question.id]?.scale === i + 1}
                                on:click={() => {
                                  reflectionData[question.id] = {
                                    ...reflectionData[question.id],
                                    scale: i + 1
                                  };
                                }}
                              >
                                {i + 1}. {label}
                              </button>
                            {/each}
                          </div>

                          {#if reflectionData[question.id]?.scale}
                            <textarea
                              bind:value={reflectionData[question.id].comment}
                              placeholder={question.followUp}
                              rows="3"
                              class="question-input"
                            ></textarea>
                          {/if}
                        {/if}
                      </div>
                    {/each}
                  </div>

                  <!-- Navigation Buttons -->
                  <div class="dimension-nav">
                    {#if currentDimensionIndex > 0}
                      <button
                        on:click={() => currentDimensionIndex--}
                        class="nav-btn nav-btn-secondary"
                      >
                        上一维度
                      </button>
                    {/if}

                    {#if currentDimensionIndex < getQuestionnaire($workflowState).length - 1}
                      <button
                        on:click={() => currentDimensionIndex++}
                        class="nav-btn nav-btn-primary"
                      >
                        下一维度
                      </button>
                    {:else}
                      <button
                        on:click={submitReflection}
                        class="nav-btn nav-btn-primary"
                      >
                        完成反思
                      </button>
                    {/if}
                  </div>
                </div>
              {/if}
            {/each}

          {:else if $currentStep.type === 'interactive-planning'}
            <!-- Interactive Planning UI -->
            <div class="planning-section animate-fade-in">
              {#each getPlanningPhases($workflowState) as phase}
                <div class="planning-phase">
                  <h4 class="phase-name">{phase.name}</h4>

                  {#if phase.criticalNote}
                    <div class="critical-note">
                      {phase.criticalNote}
                    </div>
                  {/if}

                  <div class="questions">
                    {#each phase.questions as question}
                      <div class="question-block">
                        <label class="question-label">
                          {question.text}
                        </label>

                        {#if question.type === 'schedule-input' || question.type === 'textarea'}
                          <textarea
                            bind:value={planningData[question.id]}
                            placeholder={question.placeholder}
                            rows="4"
                            class="question-input"
                          ></textarea>

                        {:else if question.type === 'time-estimate'}
                          <input
                            type="number"
                            bind:value={planningData[question.id]}
                            min={question.min}
                            max={question.max}
                            class="question-input"
                          />
                          <span class="hint">{question.unit}</span>

                        {:else if question.type === 'priority-task-list'}
                          <div class="task-list-input">
                            {#each [1, 2, 3] as taskNum}
                              <input
                                type="text"
                                bind:value={planningData[`${question.id}_task${taskNum}`]}
                                placeholder={`任务 ${taskNum}`}
                                class="question-input"
                              />
                            {/each}
                          </div>
                        {/if}
                      </div>
                    {/each}
                  </div>
                </div>
              {/each}

              <button
                on:click={submitPlanning}
                class="submit-btn"
              >
                完成规划
              </button>
            </div>

          {:else if $currentStep.type === 'validation'}
            <!-- Validation Checklist UI -->
            <div class="validation-section animate-fade-in">
              <h4>质量检查清单</h4>

              <div class="checklist">
                {#each getValidationChecks($workflowState) as check}
                  <div class="check-item" class:passed={check.passed}>
                    <span class="check-icon">
                      {check.passed ? '✅' : '⏸️'}
                    </span>
                    <span class="check-text">{check.text}</span>
                  </div>
                {/each}
              </div>

              <button
                on:click={confirmValidation}
                class="submit-btn"
              >
                确认完成
              </button>
            </div>
          {/if}

          {#if error}
            <div class="error-message">
              ❌ {error}
            </div>
          {/if}
        </div>
      {/if}
    </div>

  {:else if $workflowState.status === 'completed'}
    <!-- Completion Screen -->
    <div class="completion-screen animate-fade-in">
      <div class="completion-icon">🎉</div>
      <h2 class="completion-title">工作流完成！</h2>
      <p class="completion-message">
        恭喜你完成了今天的反思与规划！
      </p>

      <div class="completion-stats">
        <div class="stat">
          <span class="stat-label">用时</span>
          <span class="stat-value">
            {Math.round((new Date() - new Date($workflowState.startTime)) / 60000)} 分钟
          </span>
        </div>
        <div class="stat">
          <span class="stat-label">完成步骤</span>
          <span class="stat-value">{$workflowState.totalSteps}</span>
        </div>
      </div>

      <button
        on:click={() => {
          workflowState.set({
            workflowId: null,
            mode: null,
            currentStep: 0,
            totalSteps: 0,
            status: 'idle',
            stepData: {},
            userInputs: {},
            startTime: null,
            lastUpdateTime: null,
            error: null
          });
        }}
        class="restart-btn"
      >
        返回首页
      </button>
    </div>

  {:else if $workflowState.status === 'error'}
    <!-- Error Screen -->
    <div class="error-screen">
      <div class="error-icon">❌</div>
      <h2 class="error-title">工作流执行失败</h2>
      <p class="error-details">{$workflowState.error}</p>

      <button on:click={startWorkflow} class="retry-btn">
        重新开始
      </button>
    </div>
  {/if}
</div>

<style>
  .workflow-executor {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  /* Start Screen */
  .start-screen {
    text-align: center;
    padding: 3rem 2rem;
  }

  .icon-container {
    margin-bottom: 1.5rem;
  }

  .icon {
    font-size: 4rem;
    display: inline-block;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .title {
    font-size: 2rem;
    font-weight: 600;
    color: var(--text-primary, #1a1a1a);
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1rem;
    color: var(--text-secondary, #666);
    margin-bottom: 2rem;
  }

  .start-btn {
    padding: 1rem 3rem;
    font-size: 1.125rem;
    font-weight: 600;
    background: var(--accent, #007AFF);
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .start-btn:hover {
    background: var(--accent-hover, #0056b3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
  }

  /* Execution Screen */
  .execution-screen {
    padding: 2rem;
  }

  .progress-section {
    margin-bottom: 2rem;
  }

  .progress-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    color: var(--text-secondary, #666);
  }

  .progress-bar {
    height: 8px;
    background: var(--background-secondary, #f0f0f0);
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent, #007AFF), #00c6ff);
    transition: width 0.3s ease;
  }

  .step-content {
    background: var(--background-secondary, #f9f9f9);
    border-radius: 12px;
    padding: 2rem;
  }

  .step-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-primary, #1a1a1a);
    margin-bottom: 0.5rem;
  }

  .step-description {
    font-size: 1rem;
    color: var(--text-secondary, #666);
    margin-bottom: 2rem;
  }

  .loading-state {
    text-align: center;
    padding: 3rem;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--background-tertiary, #e0e0e0);
    border-top-color: var(--accent, #007AFF);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Reflection UI */
  .dimension-section {
    margin-bottom: 2rem;
  }

  .dimension-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .dimension-icon {
    font-size: 2rem;
  }

  .dimension-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary, #1a1a1a);
  }

  .questions {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .question-block {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .question-label {
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-primary, #1a1a1a);
  }

  .question-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-default, #d0d0d0);
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;
    resize: vertical;
  }

  .question-input:focus {
    outline: none;
    border-color: var(--accent, #007AFF);
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }

  .hint {
    font-size: 0.875rem;
    color: var(--text-tertiary, #999);
  }

  .scale-input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .scale-option {
    padding: 0.75rem 1rem;
    border: 2px solid var(--border-default, #d0d0d0);
    border-radius: 8px;
    background: white;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s;
  }

  .scale-option:hover {
    border-color: var(--accent, #007AFF);
  }

  .scale-option.selected {
    border-color: var(--accent, #007AFF);
    background: rgba(0, 122, 255, 0.05);
  }

  .dimension-nav {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 2rem;
  }

  .nav-btn {
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .nav-btn-primary {
    background: var(--accent, #007AFF);
    color: white;
  }

  .nav-btn-primary:hover {
    background: var(--accent-hover, #0056b3);
  }

  .nav-btn-secondary {
    background: var(--background-tertiary, #e0e0e0);
    color: var(--text-primary, #1a1a1a);
  }

  .nav-btn-secondary:hover {
    background: var(--background-secondary, #d0d0d0);
  }

  /* Planning UI */
  .planning-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .planning-phase {
    border: 1px solid var(--border-default, #d0d0d0);
    border-radius: 8px;
    padding: 1.5rem;
  }

  .phase-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary, #1a1a1a);
    margin-bottom: 1rem;
  }

  .critical-note {
    padding: 0.75rem 1rem;
    background: rgba(255, 149, 0, 0.1);
    border-left: 4px solid #FF9500;
    border-radius: 4px;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: #CC7A00;
  }

  .task-list-input {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .submit-btn {
    padding: 1rem 3rem;
    background: var(--accent, #007AFF);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    align-self: center;
  }

  .submit-btn:hover {
    background: var(--accent-hover, #0056b3);
  }

  /* Validation UI */
  .validation-section {
    padding: 2rem;
  }

  .checklist {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin: 1.5rem 0;
  }

  .check-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 8px;
    background: var(--background-primary, white);
    border: 1px solid var(--border-default, #d0d0d0);
  }

  .check-item.passed {
    border-color: #34C759;
    background: rgba(52, 199, 89, 0.05);
  }

  .check-icon {
    font-size: 1.25rem;
  }

  .check-text {
    flex: 1;
    font-size: 1rem;
  }

  /* Completion Screen */
  .completion-screen {
    text-align: center;
    padding: 3rem 2rem;
  }

  .completion-icon {
    font-size: 5rem;
    margin-bottom: 1.5rem;
    animation: bounce 0.6s ease;
  }

  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }

  .completion-title {
    font-size: 2rem;
    font-weight: 600;
    color: var(--text-primary, #1a1a1a);
    margin-bottom: 0.5rem;
  }

  .completion-message {
    font-size: 1rem;
    color: var(--text-secondary, #666);
    margin-bottom: 2rem;
  }

  .completion-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-bottom: 2rem;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .stat-label {
    font-size: 0.875rem;
    color: var(--text-secondary, #666);
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--accent, #007AFF);
  }

  .restart-btn {
    padding: 0.75rem 2rem;
    background: var(--background-secondary, #f0f0f0);
    color: var(--text-primary, #1a1a1a);
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .restart-btn:hover {
    background: var(--background-tertiary, #e0e0e0);
  }

  /* Error UI */
  .error-screen {
    text-align: center;
    padding: 3rem 2rem;
  }

  .error-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .error-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #FF3B30;
    margin-bottom: 0.5rem;
  }

  .error-details {
    font-size: 1rem;
    color: var(--text-secondary, #666);
    margin-bottom: 2rem;
  }

  .retry-btn {
    padding: 0.75rem 2rem;
    background: var(--accent, #007AFF);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .retry-btn:hover {
    background: var(--accent-hover, #0056b3);
  }

  .error-message {
    padding: 1rem;
    background: rgba(255, 59, 48, 0.1);
    border-left: 4px solid #FF3B30;
    border-radius: 4px;
    color: #D70015;
    margin-top: 1rem;
  }

  /* Animations */
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .workflow-executor {
      padding: 1rem;
    }

    .execution-screen {
      padding: 1rem;
    }

    .step-content {
      padding: 1.5rem;
    }

    .dimension-nav {
      flex-direction: column;
    }

    .nav-btn {
      width: 100%;
    }

    .completion-stats {
      gap: 1.5rem;
    }
  }
</style>
