/**
 * Analysis Service
 * Provides basic text analysis and pattern recognition for workflow insights
 *
 * Note: This is a client-side analysis service for basic pattern detection.
 * For deep AI analysis, use Ultra MCP through Claude Code in Obsidian.
 */

/**
 * Analyze daily journal content
 * @param {string} content - Journal markdown content
 * @returns {Promise<Object>} Analysis results
 */
export async function analyzeDailyJournal(content) {
	// Simulate processing time
	await new Promise((resolve) => setTimeout(resolve, 1000));

	// Extract tasks
	const completedTasks = (content.match(/\[x\]/gi) || []).length;
	const totalTasks = (content.match(/\[[ x]\]/gi) || []).length;
	const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

	// Extract time mentions
	const timeBlocks = content.match(/\d{1,2}:\d{2}/g) || [];

	// Extract highlights and challenges
	const highlights = extractSection(content, ['高光时刻', 'Highlights', '成就']);
	const challenges = extractSection(content, ['遇到的挑战', 'Challenges', '困难']);
	const learnings = extractSection(content, ['学到的东西', 'Learnings', '收获']);

	// Sentiment analysis (simple keyword-based)
	const sentiment = analyzeSentiment(content);

	// Energy level detection
	const energyLevel = extractEnergyLevel(content);

	return {
		taskAnalysis: {
			completed: completedTasks,
			total: totalTasks,
			completionRate: Math.round(completionRate)
		},
		timeManagement: {
			scheduledBlocks: timeBlocks.length,
			coverage: timeBlocks.length > 0 ? 'good' : 'needs_improvement'
		},
		contentInsights: {
			highlights: highlights || '未记录明显亮点',
			challenges: challenges || '未记录明显挑战',
			learnings: learnings || '未记录学习内容'
		},
		wellbeing: {
			sentiment: sentiment,
			energyLevel: energyLevel
		},
		suggestions: generateSuggestions({
			completionRate,
			timeBlocks: timeBlocks.length,
			sentiment,
			energyLevel
		})
	};
}

/**
 * Extract section content by headers
 */
function extractSection(content, keywords) {
	for (const keyword of keywords) {
		const regex = new RegExp(`##\\s*${keyword}[\\s\\S]*?(?=##|$)`, 'i');
		const match = content.match(regex);
		if (match) {
			return match[0]
				.replace(/##\s*.*\n/, '')
				.trim()
				.substring(0, 200);
		}
	}
	return null;
}

/**
 * Simple sentiment analysis based on keywords
 */
function analyzeSentiment(content) {
	const positive = [
		'成功',
		'完成',
		'很好',
		'满意',
		'进展',
		'突破',
		'顺利',
		'开心',
		'高兴'
	];
	const negative = [
		'失败',
		'困难',
		'问题',
		'挑战',
		'焦虑',
		'压力',
		'疲惫',
		'沮丧',
		'担心'
	];

	let positiveCount = 0;
	let negativeCount = 0;

	positive.forEach((word) => {
		positiveCount += (content.match(new RegExp(word, 'g')) || []).length;
	});

	negative.forEach((word) => {
		negativeCount += (content.match(new RegExp(word, 'g')) || []).length;
	});

	if (positiveCount > negativeCount * 1.5) return 'positive';
	if (negativeCount > positiveCount * 1.5) return 'negative';
	return 'neutral';
}

/**
 * Extract energy level from journal
 */
function extractEnergyLevel(content) {
	// Look for explicit energy markers
	const energyMatch = content.match(/(?:精力|energy|能量)[:：]\s*(\d+)/i);
	if (energyMatch) {
		return parseInt(energyMatch[1]);
	}

	// Look for mood markers
	const moodMatch = content.match(/(?:心情|mood)[:：]\s*(\d+)/i);
	if (moodMatch) {
		return parseInt(moodMatch[1]);
	}

	// Default to neutral
	return 5;
}

/**
 * Generate actionable suggestions
 */
function generateSuggestions({ completionRate, timeBlocks, sentiment, energyLevel }) {
	const suggestions = [];

	if (completionRate < 50) {
		suggestions.push({
			type: 'productivity',
			message: '任务完成率偏低，建议明天减少任务数量，聚焦最重要的3件事'
		});
	}

	if (timeBlocks < 3) {
		suggestions.push({
			type: 'planning',
			message: '建议为明天制定更详细的时间安排，帮助提高执行效率'
		});
	}

	if (sentiment === 'negative') {
		suggestions.push({
			type: 'wellbeing',
			message: '今天似乎遇到了一些挑战，记得关注自己的情绪，适当休息'
		});
	}

	if (energyLevel < 5) {
		suggestions.push({
			type: 'health',
			message: '精力状态偏低，建议明天优先安排重要任务在上午完成'
		});
	}

	if (suggestions.length === 0) {
		suggestions.push({
			type: 'positive',
			message: '今天整体表现不错，继续保持！'
		});
	}

	return suggestions;
}

/**
 * Analyze monthly review data
 * @param {Array} dailyJournals - Array of daily journal contents
 * @returns {Promise<Object>} Monthly analysis
 */
export async function analyzeMonthlyData(dailyJournals) {
	await new Promise((resolve) => setTimeout(resolve, 1500));

	const totalDays = dailyJournals.length;
	let totalCompleted = 0;
	let totalTasks = 0;
	const sentiments = [];
	const energyLevels = [];

	for (const journal of dailyJournals) {
		const analysis = await analyzeDailyJournal(journal);
		totalCompleted += analysis.taskAnalysis.completed;
		totalTasks += analysis.taskAnalysis.total;
		sentiments.push(analysis.wellbeing.sentiment);
		energyLevels.push(analysis.wellbeing.energyLevel);
	}

	const averageEnergy =
		energyLevels.reduce((a, b) => a + b, 0) / energyLevels.length;
	const positiveDays = sentiments.filter((s) => s === 'positive').length;

	return {
		overview: {
			totalDays,
			activeDays: dailyJournals.length,
			averageCompletionRate: Math.round((totalCompleted / totalTasks) * 100)
		},
		wellbeing: {
			averageEnergy: Math.round(averageEnergy * 10) / 10,
			positiveDays,
			positiveRatio: Math.round((positiveDays / totalDays) * 100)
		},
		trends: {
			productivity: totalCompleted / totalDays > 5 ? 'high' : 'moderate',
			consistency: totalDays > 20 ? 'good' : 'needs_improvement'
		}
	};
}

/**
 * Simulate Ultra MCP-like deep analysis
 * This is a placeholder for future backend integration
 */
export async function deepAnalysis(content, focus = 'all') {
	console.log('[AnalysisService] Deep analysis requested:', focus);

	// For now, use the basic analysis
	// In production, this would call a backend API that uses Ultra MCP
	const basicAnalysis = await analyzeDailyJournal(content);

	return {
		...basicAnalysis,
		aiInsights: {
			patterns: [
				'基于简化分析生成。完整AI分析需要在Obsidian中通过Claude Code使用Ultra MCP。'
			],
			recommendations: basicAnalysis.suggestions
		},
		method: 'client-side-analysis',
		note: '升级到服务器端Ultra MCP可获得更深入的洞察'
	};
}
