<script>
	import { goto } from '$app/navigation';
	import AppleCard from '$lib/components/AppleCard.svelte';

	// Workflow cards data
	const workflows = [
		{
			id: 'daily-reflection',
			title: '每日反思',
			subtitle: '晚间模式',
			icon: '🌙',
			description: '深度回顾今日，15-25分钟互动反思',
			duration: '15-25分钟',
			bestTime: '晚间 19:00-23:00',
			color: 'from-workflow-green to-green-600',
			link: '/workflows/daily?mode=evening'
		},
		{
			id: 'daily-planning',
			title: '每日规划',
			subtitle: '晨间模式',
			icon: '🌅',
			description: '快速回顾昨日，制定今日计划',
			duration: '8-12分钟',
			bestTime: '早晨 7:00-10:00',
			color: 'from-workflow-orange to-yellow-600',
			link: '/workflows/daily?mode=morning'
		},
		{
			id: 'monthly-review',
			title: '月度总结',
			subtitle: '深度版',
			icon: '📊',
			description: '全面回顾本月，制定下月计划',
			duration: '15-25分钟',
			bestTime: '月末最后3天',
			color: 'from-workflow-blue to-blue-600',
			link: '/workflows/monthly?type=full'
		},
		{
			id: 'mid-month-review',
			title: '月中检查',
			subtitle: '轻量版',
			icon: '📋',
			description: '快速评估进度，及时调整方向',
			duration: '5-8分钟',
			bestTime: '每月15日',
			color: 'from-workflow-blue/80 to-cyan-600',
			link: '/workflows/monthly?type=mid'
		},
		{
			id: 'life-wheel',
			title: '生命轮评估',
			subtitle: '平衡诊断',
			icon: '🎡',
			description: '6维度评估生活平衡状态',
			duration: '10-15分钟',
			bestTime: '月度/季度复盘',
			color: 'from-teal-600 to-green-600',
			link: '/workflows/life-wheel'
		},
		{
			id: 'project-review',
			title: '项目管理',
			subtitle: '进度追踪',
			icon: '🚀',
			description: '项目状态评估与计划调整',
			duration: '20-30分钟',
			bestTime: '项目里程碑节点',
			color: 'from-workflow-purple to-purple-600',
			link: '/workflows/project'
		}
	];

	function handleWorkflowClick(workflow) {
		goto(workflow.link);
	}
</script>

<svelte:head>
	<title>工作流 - Quick Capture</title>
</svelte:head>

<div class="min-h-screen bg-background-primary flex flex-col p-4 pb-28">
	<!-- Header -->
	<header class="mb-6 animate-fade-in">
		<h1 class="text-large-title text-text-primary mb-2">🔄 工作流</h1>
		<p class="text-subhead text-text-secondary">AI增强的反思与规划工具</p>
	</header>

	<!-- Workflow Cards Grid -->
	<div class="flex-1 overflow-y-auto">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			{#each workflows as workflow, i (workflow.id)}
				<div
					class="animate-scale-in"
					style="animation-delay: {i * 80}ms"
				>
					<AppleCard
						gradient={workflow.color}
						onClick={() => handleWorkflowClick(workflow)}
					>
						<!-- Icon and Title -->
						<div class="flex items-start justify-between mb-3">
							<div class="flex items-center gap-3">
								<span class="text-5xl">{workflow.icon}</span>
								<div>
									<h3 class="text-headline text-white font-semibold">{workflow.title}</h3>
									<span class="text-caption text-white/70">{workflow.subtitle}</span>
								</div>
							</div>
							<span class="text-white/50 text-2xl">→</span>
						</div>

						<!-- Description -->
						<p class="text-callout text-white/90 mb-4 leading-relaxed">{workflow.description}</p>

						<!-- Meta Info -->
						<div class="flex flex-wrap gap-2">
							<span class="px-3 py-1.5 bg-black/20 backdrop-blur-sm rounded-md text-caption text-white/80 font-medium">
								⏱️ {workflow.duration}
							</span>
							<span class="px-3 py-1.5 bg-black/20 backdrop-blur-sm rounded-md text-caption text-white/80 font-medium">
								🕐 {workflow.bestTime}
							</span>
						</div>
					</AppleCard>
				</div>
			{/each}
		</div>

		<!-- Help Section -->
		<div class="mt-6 bg-background-secondary/70 backdrop-blur-lg border border-white/5 rounded-lg p-5 shadow-subtle animate-fade-in">
			<h4 class="text-headline text-text-primary font-semibold mb-3">💡 使用提示</h4>
			<ul class="text-subhead text-text-secondary space-y-2 leading-relaxed">
				<li>• <strong class="text-text-primary">晚间反思</strong>：深度回顾，最佳时间为晚间19:00-23:00</li>
				<li>• <strong class="text-text-primary">晨间规划</strong>：快速启动，建议早晨7:00-10:00完成</li>
				<li>• <strong class="text-text-primary">月度总结</strong>：全面复盘，月末进行效果最佳</li>
				<li>• <strong class="text-text-primary">生命轮</strong>：诊断平衡，配合月度总结使用</li>
			</ul>
		</div>
	</div>
</div>
