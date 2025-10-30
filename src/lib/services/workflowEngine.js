/**
 * Workflow Engine Service
 *
 * Executes workflow definitions with support for:
 * - Sequential step execution with data flow
 * - Multiple step types (query-log, ultra-analyze, interactive-reflection, etc.)
 * - Progress saving and resumption
 * - Integration with Obsidian API and Ultra MCP
 * - Quality validation and error handling
 *
 * Based on WORKFLOWS.md standards for standardized daily reflection and planning.
 */

import { obsidianApiClient } from './obsidianApiClient.js';
import { writable, derived, get } from 'svelte/store';

// ============================================================================
// Store Definitions
// ============================================================================

/**
 * Current workflow execution state
 * @type {import('svelte/store').Writable<WorkflowState>}
 */
export const workflowState = writable({
  workflowId: null,
  mode: null, // 'evening' | 'morning'
  currentStep: 0,
  totalSteps: 0,
  status: 'idle', // 'idle' | 'loading' | 'executing' | 'paused' | 'completed' | 'error'
  stepData: {}, // Data outputs from each step
  userInputs: {}, // User input data for interactive steps
  startTime: null,
  lastUpdateTime: null,
  error: null
});

/**
 * Loaded workflow definition
 * @type {import('svelte/store').Writable<WorkflowDefinition>}
 */
export const workflowDefinition = writable(null);

/**
 * Current step being executed
 * @type {import('svelte/store').Readable<WorkflowStep>}
 */
export const currentStep = derived(
  [workflowDefinition, workflowState],
  ([$definition, $state]) => {
    if (!$definition || $state.currentStep >= $definition.steps.length) {
      return null;
    }
    return $definition.steps[$state.currentStep];
  }
);

/**
 * Execution progress (0-100)
 * @type {import('svelte/store').Readable<number>}
 */
export const executionProgress = derived(
  workflowState,
  ($state) => {
    if ($state.totalSteps === 0) return 0;
    return Math.round(($state.currentStep / $state.totalSteps) * 100);
  }
);

// ============================================================================
// Workflow Engine Class
// ============================================================================

class WorkflowEngine {
  constructor() {
    this.currentWorkflow = null;
    this.executionContext = {};
    this.stepHandlers = new Map();

    // Register step type handlers
    this._registerStepHandlers();
  }

  /**
   * Load a workflow definition from JSON file
   * @param {string} workflowId - Workflow identifier
   * @returns {Promise<WorkflowDefinition>}
   */
  async loadWorkflow(workflowId) {
    try {
      // Load workflow definition from static directory
      const response = await fetch(`/workflows/${workflowId}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load workflow: ${response.statusText}`);
      }

      const definition = await response.json();

      // Validate workflow definition
      this._validateWorkflowDefinition(definition);

      workflowDefinition.set(definition);
      this.currentWorkflow = definition;

      console.log(`[WorkflowEngine] Loaded workflow: ${definition.name}`);
      return definition;
    } catch (error) {
      console.error('Error loading workflow:', error);
      throw new Error(`Failed to load workflow "${workflowId}": ${error.message}`);
    }
  }

  /**
   * Start workflow execution
   * @param {string} workflowId - Workflow to execute
   * @param {object} options - Execution options
   * @param {string} options.mode - Execution mode ('evening' | 'morning')
   * @param {object} options.context - Initial execution context
   * @param {string} options.triggerPhrase - Phrase that triggered workflow
   * @returns {Promise<void>}
   */
  async startWorkflow(workflowId, options = {}) {
    try {
      // Load workflow definition
      const definition = await this.loadWorkflow(workflowId);

      // Detect mode from trigger phrase or time if not specified
      const mode = options.mode || this._detectMode(definition, options.triggerPhrase);

      // Initialize workflow state
      workflowState.set({
        workflowId: definition.id,
        mode,
        currentStep: 0,
        totalSteps: definition.steps.length,
        status: 'executing',
        stepData: {},
        userInputs: {},
        startTime: new Date().toISOString(),
        lastUpdateTime: new Date().toISOString(),
        error: null
      });

      // Initialize execution context with date variables
      this.executionContext = {
        mode,
        ...this._getDateVariables(),
        ...options.context
      };

      console.log(`[WorkflowEngine] Starting workflow: ${definition.name} (${mode} mode)`);

      // Execute first step
      await this._executeCurrentStep();

    } catch (error) {
      console.error('Error starting workflow:', error);
      workflowState.update(state => ({
        ...state,
        status: 'error',
        error: error.message
      }));
      throw error;
    }
  }

  /**
   * Execute the current step
   * @private
   * @returns {Promise<void>}
   */
  async _executeCurrentStep() {
    const state = get(workflowState);
    const definition = get(workflowDefinition);

    if (!definition || state.currentStep >= definition.steps.length) {
      await this._completeWorkflow();
      return;
    }

    const step = definition.steps[state.currentStep];
    console.log(`[WorkflowEngine] Executing step ${state.currentStep + 1}/${state.totalSteps}: ${step.name}`);

    try {
      // Get step handler
      const handler = this.stepHandlers.get(step.type);
      if (!handler) {
        throw new Error(`No handler registered for step type: ${step.type}`);
      }

      // Execute step handler
      const stepOutput = await handler.call(this, step, state, this.executionContext);

      // Save step output
      workflowState.update(s => ({
        ...s,
        stepData: {
          ...s.stepData,
          [`step${state.currentStep + 1}`]: stepOutput
        },
        lastUpdateTime: new Date().toISOString()
      }));

      // For interactive steps, wait for user input before proceeding
      if (this._isInteractiveStep(step)) {
        console.log(`[WorkflowEngine] Step requires user interaction, pausing...`);
        workflowState.update(s => ({
          ...s,
          status: 'paused'
        }));
        return;
      }

      // Auto-advance to next step for non-interactive steps
      await this.nextStep();

    } catch (error) {
      console.error(`Error executing step ${state.currentStep + 1}:`, error);

      // Handle step error based on configuration
      if (step.onError && step.onError.action === 'continue') {
        console.warn(`[WorkflowEngine] Step failed but continuing: ${step.onError.message}`);
        workflowState.update(s => ({
          ...s,
          stepData: {
            ...s.stepData,
            [`step${state.currentStep + 1}`]: {
              error: error.message,
              message: step.onError.message
            }
          }
        }));
        await this.nextStep();
      } else {
        workflowState.update(s => ({
          ...s,
          status: 'error',
          error: `Step ${state.currentStep + 1} failed: ${error.message}`
        }));
        throw error;
      }
    }
  }

  /**
   * Advance to next step
   * @param {object} userInput - User input data for current step (if interactive)
   * @returns {Promise<void>}
   */
  async nextStep(userInput = null) {
    const state = get(workflowState);

    // Save user input if provided
    if (userInput) {
      workflowState.update(s => ({
        ...s,
        userInputs: {
          ...s.userInputs,
          [`step${state.currentStep + 1}`]: userInput
        },
        stepData: {
          ...s.stepData,
          [`step${state.currentStep + 1}`]: {
            ...s.stepData[`step${state.currentStep + 1}`],
            reflectionData: userInput
          }
        }
      }));
    }

    // Move to next step
    workflowState.update(s => ({
      ...s,
      currentStep: s.currentStep + 1,
      status: 'executing',
      lastUpdateTime: new Date().toISOString()
    }));

    // Execute next step
    await this._executeCurrentStep();
  }

  /**
   * Pause workflow execution
   */
  pauseWorkflow() {
    workflowState.update(s => ({
      ...s,
      status: 'paused',
      lastUpdateTime: new Date().toISOString()
    }));
  }

  /**
   * Resume workflow execution
   * @returns {Promise<void>}
   */
  async resumeWorkflow() {
    workflowState.update(s => ({
      ...s,
      status: 'executing',
      lastUpdateTime: new Date().toISOString()
    }));

    await this._executeCurrentStep();
  }

  /**
   * Complete workflow execution
   * @private
   * @returns {Promise<void>}
   */
  async _completeWorkflow() {
    console.log('[WorkflowEngine] Workflow completed successfully');

    const state = get(workflowState);
    const definition = get(workflowDefinition);

    // Save workflow results to vault if configured
    if (definition.persistence && definition.persistence.saveToVault) {
      await this._saveWorkflowResults(state, definition);
    }

    workflowState.update(s => ({
      ...s,
      status: 'completed',
      lastUpdateTime: new Date().toISOString()
    }));
  }

  /**
   * Save workflow results to Obsidian vault
   * @private
   * @param {WorkflowState} state
   * @param {WorkflowDefinition} definition
   * @returns {Promise<void>}
   */
  async _saveWorkflowResults(state, definition) {
    try {
      const savePath = this._interpolateVariables(
        definition.persistence.savePath,
        this.executionContext
      );

      const content = this._generateMarkdownReport(state, definition);

      await obsidianApiClient.createNote(content, savePath);

      console.log(`[WorkflowEngine] Results saved to: ${savePath}`);
    } catch (error) {
      console.error('Error saving workflow results:', error);
      // Don't fail the workflow if saving fails
    }
  }

  // ============================================================================
  // Step Type Handlers
  // ============================================================================

  /**
   * Register all step type handlers
   * @private
   */
  _registerStepHandlers() {
    this.stepHandlers.set('query-log', this._handleQueryLog);
    this.stepHandlers.set('ultra-analyze', this._handleUltraAnalyze);
    this.stepHandlers.set('interactive-reflection', this._handleInteractiveReflection);
    this.stepHandlers.set('interactive-planning', this._handleInteractivePlanning);
    this.stepHandlers.set('create-note', this._handleCreateNote);
    this.stepHandlers.set('validation', this._handleValidation);
  }

  /**
   * Handle query-log step: Read daily log from Obsidian
   * @private
   * @param {WorkflowStep} step
   * @param {WorkflowState} state
   * @param {object} context
   * @returns {Promise<object>}
   */
  async _handleQueryLog(step, state, context) {
    console.log('[WorkflowEngine] Querying daily log...');

    const logPath = this._interpolateVariables(
      step.config.logPath,
      context
    );

    try {
      const logContent = await obsidianApiClient.readNote(logPath);

      // Extract tasks from log content
      const tasksExtracted = this._extractTasksFromLog(logContent);

      return {
        logContent,
        logPath,
        logExists: true,
        tasksExtracted
      };
    } catch (error) {
      console.warn(`Log not found: ${logPath}`);

      if (step.config.fallbackBehavior === 'create-new') {
        return {
          logContent: '',
          logPath,
          logExists: false,
          tasksExtracted: []
        };
      }

      throw error;
    }
  }

  /**
   * Handle ultra-analyze step: Deep analysis with Ultra MCP
   * @private
   * @param {WorkflowStep} step
   * @param {WorkflowState} state
   * @param {object} context
   * @returns {Promise<object>}
   */
  async _handleUltraAnalyze(step, state, context) {
    console.log('[WorkflowEngine] Performing Ultra MCP analysis...');

    // Get input data from previous steps
    const logContent = state.stepData.step1?.logContent || '';

    // Prepare analysis prompt
    const analysisPrompt = this._buildAnalysisPrompt(step, logContent, context);

    try {
      // This would call the actual Ultra MCP API
      // For now, we'll simulate the response
      const insights = await this._callUltraMcp('ultra-analyze', {
        task: analysisPrompt,
        provider: step.config.provider,
        focus: step.config.focus
      });

      return {
        insights: insights.analysis,
        patterns: insights.patterns || [],
        recommendations: insights.recommendations || [],
        emotionalTrend: insights.emotionalTrend || 'neutral',
        efficiencyScore: insights.efficiencyScore || 0
      };
    } catch (error) {
      console.error('Ultra MCP analysis failed:', error);
      throw new Error(`Ultra MCP analysis failed: ${error.message}`);
    }
  }

  /**
   * Handle interactive-reflection step: Present reflection questions
   * @private
   * @param {WorkflowStep} step
   * @param {WorkflowState} state
   * @param {object} context
   * @returns {Promise<object>}
   */
  async _handleInteractiveReflection(step, state, context) {
    console.log('[WorkflowEngine] Preparing interactive reflection...');

    // Determine which question set to use based on mode
    const mode = context.mode || 'evening';

    // Build reflection questionnaire based on mode
    const questionnaire = step.config.dimensions.map(dimension => ({
      ...dimension,
      questions: dimension.questions[mode] || dimension.questions.evening
    }));

    // Return prepared questionnaire
    // The UI will display this and collect user responses
    return {
      questionnaire,
      mode,
      ready: true
    };
  }

  /**
   * Handle interactive-planning step: Present planning questions
   * @private
   * @param {WorkflowStep} step
   * @param {WorkflowState} state
   * @param {object} context
   * @returns {Promise<object>}
   */
  async _handleInteractivePlanning(step, state, context) {
    console.log('[WorkflowEngine] Preparing interactive planning...');

    // Get AI suggestions from previous steps
    const reflectionData = state.userInputs.step3 || {};
    const recommendations = state.stepData.step2?.recommendations || [];
    const tasksExtracted = state.stepData.step1?.tasksExtracted || [];

    // Build planning phases with AI suggestions
    const planningPhases = step.config.planningPhases.map(phase => ({
      ...phase,
      aiSuggestions: this._generatePlanSuggestions(
        phase,
        reflectionData,
        recommendations,
        tasksExtracted
      )
    }));

    return {
      planningPhases,
      ready: true
    };
  }

  /**
   * Handle create-note step: Create note in Obsidian
   * @private
   * @param {WorkflowStep} step
   * @param {WorkflowState} state
   * @param {object} context
   * @returns {Promise<object>}
   */
  async _handleCreateNote(step, state, context) {
    console.log('[WorkflowEngine] Creating note...');

    // Get data from previous steps
    const planData = state.userInputs.step4 || {};

    // Build note content from template
    const content = this._buildNoteFromTemplate(step, planData, context);

    // Interpolate target path with date variables
    const targetPath = this._interpolateVariables(
      step.config.targetPath,
      context
    );

    try {
      await obsidianApiClient.createNote(content, targetPath);

      return {
        logPath: targetPath,
        logCreated: true,
        logPreview: content.slice(0, 500)
      };
    } catch (error) {
      console.error('Failed to create note:', error);

      if (step.onError?.fallback === 'save-to-clipboard') {
        // In browser environment, we can't access clipboard without user gesture
        // Instead, return content for UI to handle
        return {
          logPath: targetPath,
          logCreated: false,
          logPreview: content,
          error: error.message,
          clipboardFallback: true
        };
      }

      throw error;
    }
  }

  /**
   * Handle validation step: Quality checklist
   * @private
   * @param {WorkflowStep} step
   * @param {WorkflowState} state
   * @param {object} context
   * @returns {Promise<object>}
   */
  async _handleValidation(step, state, context) {
    console.log('[WorkflowEngine] Running quality checks...');

    const checklist = step.config.checklist;
    const results = [];

    for (const check of checklist) {
      let passed = false;

      if (check.autoCheck) {
        // Evaluate check expression
        passed = this._evaluateCheckExpression(check.checkSource, state);
      } else if (check.requireUserConfirmation) {
        // Will be confirmed by user in UI
        passed = true; // Assume passed for now
      }

      results.push({
        id: check.id,
        text: check.text,
        passed,
        autoCheck: check.autoCheck
      });
    }

    const passedChecks = results.filter(r => r.passed).length;
    const qualityScore = passedChecks;
    const failedChecks = results.filter(r => !r.passed);

    // Check if minimum passing checks met
    if (passedChecks < step.config.minPassingChecks) {
      console.warn(`Quality check failed: ${passedChecks}/${step.config.minPassingChecks} checks passed`);

      if (!step.config.allowProceedOnFail) {
        throw new Error(`Quality validation failed: only ${passedChecks}/${step.config.minPassingChecks} checks passed`);
      }
    }

    return {
      qualityScore,
      passedChecks: results.filter(r => r.passed),
      failedChecks,
      allChecks: results
    };
  }

  // ============================================================================
  // Utility Methods
  // ============================================================================

  /**
   * Detect workflow mode from trigger phrase or current time
   * @private
   * @param {WorkflowDefinition} definition
   * @param {string} triggerPhrase
   * @returns {string}
   */
  _detectMode(definition, triggerPhrase) {
    if (!triggerPhrase) {
      // Auto-detect from current time
      const hour = new Date().getHours();
      return (hour >= 19 || hour <= 6) ? 'evening' : 'morning';
    }

    const lowerPhrase = triggerPhrase.toLowerCase();

    // Check evening trigger phrases
    if (definition.modes.evening.triggerPhrases.some(p =>
      lowerPhrase.includes(p.toLowerCase())
    )) {
      return 'evening';
    }

    // Check morning trigger phrases
    if (definition.modes.morning.triggerPhrases.some(p =>
      lowerPhrase.includes(p.toLowerCase())
    )) {
      return 'morning';
    }

    // Default to evening
    return 'evening';
  }

  /**
   * Get date-related template variables
   * @private
   * @returns {object}
   */
  _getDateVariables() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatDate = (date) => ({
      year: date.getFullYear().toString(),
      month: (date.getMonth() + 1).toString().padStart(2, '0'),
      day: date.getDate().toString().padStart(2, '0')
    });

    const today = formatDate(now);
    const next = formatDate(tomorrow);

    return {
      ...today,
      nextYear: next.year,
      nextMonth: next.month,
      nextDay: next.day,
      nextDate: `${next.year}-${next.month}-${next.day}`
    };
  }

  /**
   * Interpolate template variables in string
   * @private
   * @param {string} template
   * @param {object} variables
   * @returns {string}
   */
  _interpolateVariables(template, variables) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables[key] !== undefined ? variables[key] : match;
    });
  }

  /**
   * Check if step requires user interaction
   * @private
   * @param {WorkflowStep} step
   * @returns {boolean}
   */
  _isInteractiveStep(step) {
    return ['interactive-reflection', 'interactive-planning', 'validation'].includes(step.type);
  }

  /**
   * Extract tasks from log content
   * @private
   * @param {string} content
   * @returns {Array<object>}
   */
  _extractTasksFromLog(content) {
    const tasks = [];
    const lines = content.split('\n');

    for (const line of lines) {
      // Match markdown checkboxes: - [ ] or - [x]
      const match = line.match(/^[-*]\s\[([ x])\]\s(.+)$/i);
      if (match) {
        const [, status, text] = match;
        tasks.push({
          text,
          completed: status.toLowerCase() === 'x',
          raw: line
        });
      }
    }

    return tasks;
  }

  /**
   * Build analysis prompt for Ultra MCP
   * @private
   * @param {WorkflowStep} step
   * @param {string} logContent
   * @param {object} context
   * @returns {string}
   */
  _buildAnalysisPrompt(step, logContent, context) {
    const mode = context.mode || 'evening';
    const modeDesc = mode === 'evening' ? '深度反思' : '快速规划';

    return `
请对以下工作日志进行${modeDesc}模式的深度分析：

工作日志内容：
${logContent || '（今日暂无日志内容）'}

请从以下维度进行分析：
${step.config.analysisAspects.map((aspect, i) => `${i + 1}. ${aspect}`).join('\n')}

请提供：
1. 深度洞察 (insights)
2. 模式识别 (patterns)
3. 改进建议 (recommendations)
4. 情绪趋势 (emotionalTrend)
5. 效能评分 (efficiencyScore: 0-10)
`.trim();
  }

  /**
   * Call Ultra MCP API (placeholder - integrate with actual MCP)
   * @private
   * @param {string} tool
   * @param {object} params
   * @returns {Promise<object>}
   */
  async _callUltraMcp(tool, params) {
    // TODO: Integrate with actual Ultra MCP API
    // For now, return mock data
    console.log(`[WorkflowEngine] Calling Ultra MCP tool: ${tool}`);

    return {
      analysis: '基于工作日志的深度分析结果...',
      patterns: ['效率模式', '情绪模式'],
      recommendations: ['建议1', '建议2'],
      emotionalTrend: 'positive',
      efficiencyScore: 7
    };
  }

  /**
   * Generate AI suggestions for planning
   * @private
   * @param {object} phase
   * @param {object} reflectionData
   * @param {Array} recommendations
   * @param {Array} tasks
   * @returns {Array<string>}
   */
  _generatePlanSuggestions(phase, reflectionData, recommendations, tasks) {
    // Placeholder - would use AI to generate suggestions
    return [
      '基于昨日反思的建议任务1',
      '基于昨日反思的建议任务2',
      '基于昨日反思的建议任务3'
    ];
  }

  /**
   * Build note content from template
   * @private
   * @param {WorkflowStep} step
   * @param {object} data
   * @param {object} context
   * @returns {string}
   */
  _buildNoteFromTemplate(step, data, context) {
    const sections = step.config.sections.map(section => {
      let content = section.content;

      // Interpolate variables
      content = this._interpolateVariables(content, {
        ...context,
        ...data
      });

      return `## ${section.name}\n\n${content}\n`;
    });

    return sections.join('\n');
  }

  /**
   * Generate markdown report from workflow results
   * @private
   * @param {WorkflowState} state
   * @param {WorkflowDefinition} definition
   * @returns {string}
   */
  _generateMarkdownReport(state, definition) {
    const { year, month, day } = this._getDateVariables();

    let content = `# ${definition.name} - ${year}-${month}-${day}\n\n`;
    content += `模式: ${state.mode}\n`;
    content += `完成时间: ${new Date().toLocaleString('zh-CN')}\n\n`;

    // Add step results
    Object.entries(state.stepData).forEach(([stepKey, data]) => {
      content += `## ${stepKey}\n\n`;
      content += JSON.stringify(data, null, 2);
      content += '\n\n';
    });

    return content;
  }

  /**
   * Evaluate check expression
   * @private
   * @param {string} expression
   * @param {WorkflowState} state
   * @returns {boolean}
   */
  _evaluateCheckExpression(expression, state) {
    try {
      // Simple evaluation - check if referenced data exists
      // Format: "step1.logExists && step2.insights"
      const parts = expression.split('&&').map(p => p.trim());

      return parts.every(part => {
        const [step, field] = part.split('.');
        return state.stepData[step] && state.stepData[step][field];
      });
    } catch (error) {
      console.warn('Error evaluating check expression:', error);
      return false;
    }
  }

  /**
   * Validate workflow definition structure
   * @private
   * @param {WorkflowDefinition} definition
   * @throws {Error} If validation fails
   */
  _validateWorkflowDefinition(definition) {
    if (!definition.id || !definition.name) {
      throw new Error('Workflow must have id and name');
    }

    if (!definition.steps || definition.steps.length === 0) {
      throw new Error('Workflow must have at least one step');
    }

    // Validate each step
    definition.steps.forEach((step, index) => {
      if (!step.id || !step.type || !step.name) {
        throw new Error(`Step ${index + 1} must have id, type, and name`);
      }
    });
  }
}

// ============================================================================
// Export Singleton Instance
// ============================================================================

export const workflowEngine = new WorkflowEngine();

// ============================================================================
// Legacy API Compatibility (for backward compatibility)
// ============================================================================

/**
 * @deprecated Use workflowEngine.startWorkflow() instead
 */
export async function startWorkflow(workflowId, mode = null) {
  return workflowEngine.startWorkflow(workflowId, { mode });
}

/**
 * @deprecated Use workflowEngine.nextStep() instead
 */
export async function submitResponse(responses) {
  return workflowEngine.nextStep(responses);
}

/**
 * @deprecated Use workflowState store directly
 */
export function resetWorkflow() {
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
}

// ============================================================================
// Type Definitions (JSDoc)
// ============================================================================

/**
 * @typedef {Object} WorkflowDefinition
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {Array<WorkflowStep>} steps
 * @property {object} modes
 * @property {object} execution
 * @property {object} integration
 * @property {object} persistence
 */

/**
 * @typedef {Object} WorkflowStep
 * @property {string} id
 * @property {string} type
 * @property {string} name
 * @property {string} description
 * @property {boolean} mandatory
 * @property {boolean} canSkip
 * @property {object} config
 * @property {object} inputs
 * @property {object} outputs
 */

/**
 * @typedef {Object} WorkflowState
 * @property {string} workflowId
 * @property {string} mode
 * @property {number} currentStep
 * @property {number} totalSteps
 * @property {string} status
 * @property {object} stepData
 * @property {object} userInputs
 * @property {string} startTime
 * @property {string} lastUpdateTime
 * @property {string|null} error
 */
