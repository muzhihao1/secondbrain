/**
 * Workflow Engine
 * Manages workflow execution, state, and step progression
 */

import { writable, derived } from 'svelte/store';
import { obsidianApiClient } from './obsidianApiClient.js';
import { analyzeDailyJournal, analyzeMonthlyData } from './analysisService.js';

// Workflow state store
export const workflowState = writable({
	currentWorkflow: null,
	currentStep: 0,
	totalSteps: 0,
	data: {},
	analysis: null,
	responses: {},
	loading: false,
	error: null
});

// Derived stores
export const workflowProgress = derived(workflowState, ($state) => {
	if (!$state.currentWorkflow || $state.totalSteps === 0) return 0;
	return Math.round((($state.currentStep + 1) / $state.totalSteps) * 100);
});

/**
 * Workflow definitions
 */
const WORKFLOWS = {
	// Daily Reflection (Evening Mode)
	'daily-reflection': {
		id: 'daily-reflection',
		name: '每日反思',
		mode: 'evening',
		totalSteps: 5,
		steps: [
			{
				id: 'read-journal',
				title: '读取今日日志',
				type: 'auto',
				async execute(data) {
					const today = new Date().toISOString().split('T')[0];
					const year = today.substring(0, 4);
					const path = `01_Execution/Daily_Operations/Logs/Journal_Entries/${year}/${today}-工作日志.md`;

					try {
						const content = await obsidianApiClient.readNote(path);
						return {
							journalPath: path,
							journalContent: content,
							date: today
						};
					} catch (error) {
						console.warn('Journal not found, will ask user for summary');
						return {
							journalPath: null,
							journalContent: null,
							date: today,
							needsUserInput: true
						};
					}
				}
			},
			{
				id: 'analyze',
				title: 'AI深度分析',
				type: 'auto',
				async execute(data) {
					const content = data.journalContent || data.userSummary || '';
					const analysis = await analyzeDailyJournal(content);
					return { analysis };
				}
			},
			{
				id: 'reflection',
				title: '五维度互动反思',
				type: 'interactive',
				dimensions: [
					{
						id: 'emotion',
						title: '情绪与心境',
						questions: [
							'今天让您感到最有成就感的是什么？',
							'什么时候感觉最好？什么时候压力最大？'
						]
					},
					{
						id: 'effectiveness',
						title: '工作效能',
						questions: [
							'今天完成的事情中，哪一件对您长期发展最有价值？',
							'您觉得精力最充沛的时段做了什么？这个安排合理吗？'
						]
					},
					{
						id: 'learning',
						title: '学习成长',
						questions: [
							'除了显性知识，您在处理事务时有什么意外的学习或感悟？',
							'新获得的知识与您已有知识体系有什么关联？'
						]
					},
					{
						id: 'health',
						title: '健康管理',
						questions: [
							'身体和精力状态如何？疲劳主要来自哪里？',
							'健康相关的安排（如看医生、用药）执行情况和感受？'
						]
					},
					{
						id: 'challenges',
						title: '挑战应对',
						questions: ['遇到的困难、解决策略、经验教训是什么？']
					}
				]
			},
			{
				id: 'planning',
				title: '制定明日计划',
				type: 'interactive',
				prompts: [
					{
						id: 'schedule',
						question: '明天有哪些固定安排？（会议、培训、重要事务等）',
						placeholder: '例如：9:00 团队会议，14:00 客户电话...'
					},
					{
						id: 'priorities',
						question: '明天必须完成的最重要的3件事是什么？',
						placeholder: '1. ...\n2. ...\n3. ...'
					},
					{
						id: 'learning-plan',
						question: '明天的学习计划？（N8N、ML等）',
						placeholder: '例如：完成N8N教程第3章，30分钟...'
					},
					{
						id: 'exercise',
						question: '明天的运动安排？',
						placeholder: '例如：晚上7点健身1小时'
					}
				]
			},
			{
				id: 'create-journal',
				title: '创建明日日志',
				type: 'auto',
				async execute(data) {
					const tomorrow = new Date(Date.now() + 86400000)
						.toISOString()
						.split('T')[0];
					const year = tomorrow.substring(0, 4);
					const path = `01_Execution/Daily_Operations/Logs/Journal_Entries/${year}/${tomorrow}-工作日志.md`;

					const content = generateDailyJournal(tomorrow, data.planningResponses);

					await obsidianApiClient.createNote(content, path);

					return {
						tomorrowJournal: path,
						created: true
					};
				}
			}
		]
	},

	// Daily Planning (Morning Mode)
	'daily-planning': {
		id: 'daily-planning',
		name: '每日规划',
		mode: 'morning',
		totalSteps: 3,
		steps: [
			{
				id: 'read-yesterday',
				title: '快速回顾昨日',
				type: 'auto',
				async execute(data) {
					const yesterday = new Date(Date.now() - 86400000)
						.toISOString()
						.split('T')[0];
					const year = yesterday.substring(0, 4);
					const path = `01_Execution/Daily_Operations/Logs/Journal_Entries/${year}/${yesterday}-工作日志.md`;

					try {
						const content = await obsidianApiClient.readNote(path);
						const analysis = await analyzeDailyJournal(content);
						return { yesterdayContent: content, analysis };
					} catch (error) {
						return { yesterdayContent: null, analysis: null };
					}
				}
			},
			{
				id: 'quick-reflection',
				title: '快速5维度回顾',
				type: 'interactive-batch',
				questions: [
					{ id: 'emotion', text: '昨天整体感受如何？有什么让您特别满意或困扰的事？' },
					{
						id: 'effectiveness',
						text: '昨天完成的任务中，哪件最重要？时间安排是否合理？'
					},
					{ id: 'learning', text: '昨天有什么新的学习收获或感悟吗？' },
					{
						id: 'health',
						text: '今早精力状态如何（1-10分）？昨天的恢复措施（睡眠/运动/午睡）效果如何？'
					},
					{
						id: 'challenges',
						text: '昨天有未完成的任务或遗留问题需要今天处理吗？'
					}
				]
			},
			{
				id: 'create-today-plan',
				title: '创建今日计划',
				type: 'auto',
				async execute(data) {
					const today = new Date().toISOString().split('T')[0];
					const year = today.substring(0, 4);
					const path = `01_Execution/Daily_Operations/Logs/Journal_Entries/${year}/${today}-工作日志.md`;

					const content = generateDailyJournal(today, {
						yesterday: data.quickReflectionResponses,
						mode: 'morning'
					});

					await obsidianApiClient.createNote(content, path);

					return { todayJournal: path, created: true };
				}
			}
		]
	}
};

/**
 * Start a workflow
 */
export async function startWorkflow(workflowId, mode = null) {
	const workflow = WORKFLOWS[workflowId];

	if (!workflow) {
		throw new Error(`Workflow ${workflowId} not found`);
	}

	workflowState.set({
		currentWorkflow: workflow,
		currentStep: 0,
		totalSteps: workflow.totalSteps,
		data: { mode: mode || workflow.mode },
		analysis: null,
		responses: {},
		loading: false,
		error: null
	});

	// Execute first step if it's auto
	if (workflow.steps[0].type === 'auto') {
		await executeCurrentStep();
	}
}

/**
 * Execute current step
 */
export async function executeCurrentStep() {
	workflowState.update((state) => ({ ...state, loading: true, error: null }));

	try {
		const state = await new Promise((resolve) => {
			workflowState.subscribe((s) => resolve(s))();
		});

		const currentStep = state.currentWorkflow.steps[state.currentStep];

		if (currentStep.type === 'auto' && currentStep.execute) {
			const result = await currentStep.execute(state.data);

			workflowState.update((s) => ({
				...s,
				data: { ...s.data, ...result },
				loading: false
			}));
		} else {
			workflowState.update((s) => ({ ...s, loading: false }));
		}
	} catch (error) {
		console.error('Step execution error:', error);
		workflowState.update((s) => ({
			...s,
			loading: false,
			error: error.message
		}));
	}
}

/**
 * Submit response and move to next step
 */
export async function submitResponse(responses) {
	workflowState.update((state) => {
		const newState = {
			...state,
			responses: { ...state.responses, ...responses },
			data: { ...state.data, [`step${state.currentStep}Responses`]: responses }
		};

		// Move to next step
		if (state.currentStep < state.totalSteps - 1) {
			newState.currentStep = state.currentStep + 1;
		}

		return newState;
	});

	// Execute next step if it's auto
	const state = await new Promise((resolve) => {
		workflowState.subscribe((s) => resolve(s))();
	});

	const nextStep = state.currentWorkflow.steps[state.currentStep];
	if (nextStep && nextStep.type === 'auto') {
		await executeCurrentStep();
	}
}

/**
 * Go to previous step
 */
export function previousStep() {
	workflowState.update((state) => ({
		...state,
		currentStep: Math.max(0, state.currentStep - 1)
	}));
}

/**
 * Reset workflow
 */
export function resetWorkflow() {
	workflowState.set({
		currentWorkflow: null,
		currentStep: 0,
		totalSteps: 0,
		data: {},
		analysis: null,
		responses: {},
		loading: false,
		error: null
	});
}

/**
 * Generate daily journal content
 */
function generateDailyJournal(date, planData) {
	const created = new Date().toISOString();

	return `---
created: ${created}
type: daily-journal
date: ${date}
tags: [daily-journal, generated]
---

# ${date} 工作日志

## 📋 今日计划

### 核心任务
${planData?.priorities || '[ ] 待补充'}

### 时间安排
${planData?.schedule || '待补充具体安排'}

### 学习计划
${planData?.['learning-plan'] || '[ ] 待补充'}

### 运动安排
${planData?.exercise || '[ ] 待补充'}

---

## 📝 执行记录

### 上午

### 下午

### 晚上

---

## 💭 每日反思

### 高光时刻
-

### 遇到的挑战
-

### 学到的东西
-

---

## 📊 状态追踪

- **精力状态**: /10
- **心情指数**: /10
- **任务完成**: /
- **专注时长**: 小时

---

*📅 由工作流自动生成，请补充具体内容*
`;
}
