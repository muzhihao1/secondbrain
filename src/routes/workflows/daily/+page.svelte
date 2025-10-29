<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import {
		workflowState,
		workflowProgress,
		startWorkflow,
		executeCurrentStep,
		submitResponse,
		previousStep,
		resetWorkflow
	} from '$services/workflowEngine.js';

	let mode = 'evening'; // evening or morning
	let responses = {};
	let currentDimensionIndex = 0;

	$: workflowId = mode === 'morning' ? 'daily-planning' : 'daily-reflection';

	onMount(() => {
		const searchParams = $page.url.searchParams;
		mode = searchParams.get('mode') || 'evening';

		// Start the workflow
		startWorkflow(workflowId, mode);
	});

	function handleNext() {
		const currentStep = $workflowState.currentWorkflow?.steps[$workflowState.currentStep];

		if (currentStep?.type === 'interactive') {
			// For interactive steps, collect responses from current dimension
			const dimension =
				currentStep.dimensions[currentDimensionIndex];
			if (currentDimensionIndex < currentStep.dimensions.length - 1) {
				currentDimensionIndex++;
			} else {
				// All dimensions completed, submit and move to next step
				submitResponse({ reflectionResponses: responses });
				responses = {};
				currentDimensionIndex = 0;
			}
		} else if (currentStep?.type === 'interactive-batch') {
			// Submit all responses at once
			submitResponse({ quickReflectionResponses: responses });
			responses = {};
		} else {
			// Auto step, just execute
			executeCurrentStep();
		}
	}

	function handlePrevious() {
		if (currentDimensionIndex > 0) {
			currentDimensionIndex--;
		} else {
			previousStep();
		}
	}

	function handleCancel() {
		if (confirm('确定要退出工作流吗？未保存的内容将丢失。')) {
			resetWorkflow();
			goto('/workflows');
		}
	}
</script>

<svelte:head>
	<title>{mode === 'morning' ? '每日规划' : '每日反思'} - Quick Capture</title>
</svelte:head>

<div class="min-h-screen bg-background-base flex flex-col">
	<!-- Header with Progress -->
	<header class="bg-background-surface border-b border-background-muted p-4">
		<div class="max-w-3xl mx-auto">
			<div class="flex items-center justify-between mb-4">
				<div>
					<h1 class="text-2xl font-bold text-text-base">
						{mode === 'morning' ? '🌅 每日规划' : '🌙 每日反思'}
					</h1>
					<p class="text-sm text-text-muted mt-1">
						{mode === 'morning' ? '晨间模式：快速启动' : '晚间模式：深度回顾'}
					</p>
				</div>
				<button
					on:click={handleCancel}
					class="text-text-muted hover:text-text-base transition-colors"
				>
					<span class="text-2xl">×</span>
				</button>
			</div>

			<!-- Progress Bar -->
			<div class="w-full bg-background-muted rounded-full h-2 overflow-hidden">
				<div
					class="bg-primary h-full transition-all duration-500 ease-out"
					style="width: {$workflowProgress}%"
				></div>
			</div>

			<!-- Step Indicator -->
			<div class="mt-3 flex items-center justify-between text-xs text-text-muted">
				<span>
					Step {$workflowState.currentStep + 1} / {$workflowState.totalSteps}
				</span>
				<span>{$workflowProgress}% 完成</span>
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="flex-1 overflow-y-auto p-4 pb-24">
		<div class="max-w-3xl mx-auto">
			{#if $workflowState.loading}
				<!-- Loading State -->
				<div class="flex flex-col items-center justify-center py-12 animate-fade-in">
					<div class="animate-spin-slow text-6xl mb-4">⏳</div>
					<p class="text-text-muted">
						{$workflowState.currentWorkflow?.steps[$workflowState.currentStep]
							?.title}...
					</p>
				</div>
			{:else if $workflowState.error}
				<!-- Error State -->
				<div
					class="bg-status-error/10 border border-status-error/30 rounded-lg p-6 animate-fade-in"
				>
					<h3 class="text-status-error font-bold mb-2">❌ 出错了</h3>
					<p class="text-text-muted text-sm">{$workflowState.error}</p>
					<button
						on:click={executeCurrentStep}
						class="mt-4 px-4 py-2 bg-status-error text-white rounded-lg hover:bg-opacity-90 transition-colors"
					>
						重试
					</button>
				</div>
			{:else if $workflowState.currentWorkflow}
				{@const currentStep =
					$workflowState.currentWorkflow.steps[$workflowState.currentStep]}

				<div class="animate-fade-in">
					<!-- Step Title -->
					<h2 class="text-xl font-bold text-text-base mb-6">
						{currentStep.title}
					</h2>

					<!-- Auto Step Results -->
					{#if currentStep.type === 'auto'}
						{#if currentStep.id === 'read-journal'}
							{#if $workflowState.data.journalContent}
								<div class="bg-background-surface rounded-lg p-4 mb-4">
									<p class="text-sm text-text-muted mb-2">📄 已读取今日日志</p>
									<p class="text-text-base">
										{$workflowState.data.journalPath}
									</p>
								</div>
							{:else}
								<div class="bg-background-surface rounded-lg p-4 mb-4">
									<p class="text-text-muted mb-3">今日日志尚未创建，请简要描述今天的主要活动：</p>
									<textarea
										bind:value={responses.userSummary}
										placeholder="例如：完成了项目A的设计稿，下午开会讨论了新需求..."
										class="w-full h-32 bg-background-base border border-background-muted rounded-lg p-3 text-text-base placeholder-text-subtle focus:outline-none focus:border-primary resize-none"
									/>
								</div>
							{/if}
						{:else if currentStep.id === 'analyze'}
							{#if $workflowState.data.analysis}
								<div class="space-y-4">
									<!-- Task Analysis -->
									<div class="bg-background-surface rounded-lg p-4">
										<h4 class="font-semibold text-text-base mb-3">📊 任务完成情况</h4>
										<div class="flex items-center gap-4">
											<div class="text-3xl font-bold text-primary">
												{$workflowState.data.analysis.taskAnalysis.completionRate}%
											</div>
											<div class="text-sm text-text-muted">
												完成 {$workflowState.data.analysis.taskAnalysis.completed} /
												{$workflowState.data.analysis.taskAnalysis.total} 项任务
											</div>
										</div>
									</div>

									<!-- Wellbeing -->
									<div class="bg-background-surface rounded-lg p-4">
										<h4 class="font-semibold text-text-base mb-3">💫 状态评估</h4>
										<div class="space-y-2 text-sm">
											<div class="flex justify-between">
												<span class="text-text-muted">精力水平</span>
												<span class="text-text-base">
													{$workflowState.data.analysis.wellbeing.energyLevel}/10
												</span>
											</div>
											<div class="flex justify-between">
												<span class="text-text-muted">情绪倾向</span>
												<span class="text-text-base capitalize">
													{$workflowState.data.analysis.wellbeing.sentiment}
												</span>
											</div>
										</div>
									</div>

									<!-- Suggestions -->
									{#if $workflowState.data.analysis.suggestions?.length > 0}
										<div class="bg-primary/10 border border-primary/30 rounded-lg p-4">
											<h4 class="font-semibold text-text-base mb-3">💡 AI建议</h4>
											<ul class="space-y-2">
												{#each $workflowState.data.analysis.suggestions as suggestion}
													<li class="text-sm text-text-muted">
														• {suggestion.message}
													</li>
												{/each}
											</ul>
										</div>
									{/if}
								</div>
							{/if}
						{:else if currentStep.id === 'create-journal'}
							<div class="bg-status-success/10 border border-status-success/30 rounded-lg p-6 text-center">
								<div class="text-6xl mb-4">✅</div>
								<h3 class="text-xl font-bold text-text-base mb-2">工作流完成！</h3>
								<p class="text-text-muted mb-4">
									已创建明日工作日志：{$workflowState.data.tomorrowJournal}
								</p>
								<div class="flex gap-3 justify-center">
									<button
										on:click={() => goto('/workflows')}
										class="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg transition-colors"
									>
										返回工作流
									</button>
									<button
										on:click={() => goto('/vault')}
										class="px-6 py-2 bg-background-surface border border-background-muted hover:bg-background-muted text-text-base rounded-lg transition-colors"
									>
										查看日志
									</button>
								</div>
							</div>
						{/if}
					{/if}

					<!-- Interactive Step: Five Dimensions -->
					{#if currentStep.type === 'interactive' && currentStep.dimensions}
						{@const dimension = currentStep.dimensions[currentDimensionIndex]}

						<div class="space-y-6">
							<!-- Dimension Progress -->
							<div class="flex items-center justify-between text-sm text-text-muted">
								<span>维度 {currentDimensionIndex + 1} / {currentStep.dimensions.length}</span>
								<span>{dimension.title}</span>
							</div>

							<!-- Questions -->
							<div class="space-y-4">
								{#each dimension.questions as question, i}
									<div class="bg-background-surface rounded-lg p-4">
										<label class="block text-text-base mb-3">{question}</label>
										<textarea
											bind:value={responses[`${dimension.id}_${i}`]}
											placeholder="请分享您的想法..."
											class="w-full h-24 bg-background-base border border-background-muted rounded-lg p-3 text-text-base placeholder-text-subtle focus:outline-none focus:border-primary resize-none"
										/>
									</div>
								{/each}
							</div>
						</div>
					{/if}

					<!-- Interactive Batch: Quick Questions -->
					{#if currentStep.type === 'interactive-batch' && currentStep.questions}
						<div class="space-y-4">
							<p class="text-text-muted text-sm mb-4">
								请简洁回答以下5个问题（1-2句即可）：
							</p>

							{#each currentStep.questions as q}
								<div class="bg-background-surface rounded-lg p-4">
									<label class="block text-text-base mb-2 text-sm">{q.text}</label>
									<input
										type="text"
										bind:value={responses[q.id]}
										placeholder="简短回答..."
										class="w-full bg-background-base border border-background-muted rounded-lg px-3 py-2 text-text-base placeholder-text-subtle focus:outline-none focus:border-primary"
									/>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</main>

	<!-- Fixed Bottom Actions -->
	<footer class="fixed bottom-0 left-0 right-0 bg-background-surface border-t border-background-muted p-4">
		<div class="max-w-3xl mx-auto flex gap-3">
			<button
				on:click={handlePrevious}
				disabled={$workflowState.currentStep === 0 && currentDimensionIndex === 0}
				class="px-6 py-3 bg-background-muted hover:bg-background-muted/80 disabled:opacity-50 disabled:cursor-not-allowed text-text-base rounded-lg transition-colors"
			>
				← 上一步
			</button>

			<button
				on:click={handleNext}
				disabled={$workflowState.loading}
				class="flex-1 px-6 py-3 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
			>
				{#if $workflowState.loading}
					处理中...
				{:else if $workflowState.currentStep === $workflowState.totalSteps - 1}
					完成
				{:else}
					继续 →
				{/if}
			</button>
		</div>
	</footer>
</div>
