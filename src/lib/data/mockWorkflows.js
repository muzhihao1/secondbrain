/**
 * Mock Workflows Data
 *
 * Provides mock workflow data for development and testing.
 * Includes various statuses, dates, and metadata.
 */

/**
 * Generate mock workflows
 * @returns {Array<object>}
 */
export function getMockWorkflows() {
  return [
    {
      id: '1',
      name: 'Daily Reflection & Planning',
      status: 'active',
      lastRunAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      successRate: 0.95,
      tags: ['reflection', 'planning', 'daily']
    },
    {
      id: '2',
      name: 'Weekly Review Process',
      status: 'active',
      lastRunAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      successRate: 0.88,
      tags: ['review', 'weekly']
    },
    {
      id: '3',
      name: 'Meeting Notes Template',
      status: 'active',
      lastRunAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
      successRate: 0.92,
      tags: ['meetings', 'notes']
    },
    {
      id: '4',
      name: 'Project Kickoff Checklist',
      status: 'active',
      lastRunAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      successRate: 0.85,
      tags: ['project', 'checklist']
    },
    {
      id: '5',
      name: 'Content Calendar Setup',
      status: 'inactive',
      lastRunAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
      createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      successRate: 0.78,
      tags: ['content', 'calendar']
    },
    {
      id: '6',
      name: 'Bug Triage Workflow',
      status: 'active',
      lastRunAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
      successRate: 0.90,
      tags: ['bugs', 'development']
    },
    {
      id: '7',
      name: 'Monthly Budget Review',
      status: 'active',
      lastRunAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
      createdAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      successRate: 0.82,
      tags: ['finance', 'monthly']
    },
    {
      id: '8',
      name: 'Customer Feedback Analysis',
      status: 'active',
      lastRunAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      successRate: 0.87,
      tags: ['feedback', 'analysis']
    },
    {
      id: '9',
      name: 'Team Retrospective',
      status: 'inactive',
      lastRunAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days ago
      createdAt: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000).toISOString(),
      successRate: 0.75,
      tags: ['retrospective', 'team']
    },
    {
      id: '10',
      name: 'Documentation Update',
      status: 'active',
      lastRunAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
      createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
      successRate: 0.93,
      tags: ['documentation', 'updates']
    },
    {
      id: '11',
      name: 'Onboarding Checklist',
      status: 'active',
      lastRunAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      successRate: 0.91,
      tags: ['onboarding', 'hr']
    },
    {
      id: '12',
      name: 'Code Review Process',
      status: 'active',
      lastRunAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
      createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(),
      successRate: 0.89,
      tags: ['code-review', 'development']
    }
  ];
}

/**
 * Calculate dashboard statistics from workflows
 * @param {Array<object>} workflows - Array of workflow objects
 * @returns {object} Statistics object
 */
export function calculateStats(workflows) {
  const total = workflows.length;
  const active = workflows.filter(w => w.status === 'active').length;

  // Recent: workflows run in last 7 days
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recent = workflows.filter(w => {
    if (!w.lastRunAt) return false;
    return new Date(w.lastRunAt).getTime() > sevenDaysAgo;
  }).length;

  // Average success rate
  const successRate = workflows.reduce((sum, w) => sum + (w.successRate || 0), 0) / total;

  return {
    total,
    active,
    recent,
    successRate: successRate || 0
  };
}

/**
 * Filter workflows by search query and status
 * @param {Array<object>} workflows - Array of workflow objects
 * @param {string} query - Search query
 * @param {string} status - Status filter ('all', 'active', 'inactive')
 * @returns {Array<object>} Filtered workflows
 */
export function filterWorkflows(workflows, query = '', status = 'all') {
  let filtered = workflows;

  // Filter by status
  if (status !== 'all') {
    filtered = filtered.filter(w => w.status === status);
  }

  // Filter by search query
  if (query.trim()) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(w =>
      w.name.toLowerCase().includes(lowerQuery) ||
      (w.tags && w.tags.some(tag => tag.toLowerCase().includes(lowerQuery)))
    );
  }

  return filtered;
}

/**
 * Sort workflows
 * @param {Array<object>} workflows - Array of workflow objects
 * @param {string} sortBy - Sort option ('recent', 'name', 'status')
 * @returns {Array<object>} Sorted workflows
 */
export function sortWorkflows(workflows, sortBy = 'recent') {
  const sorted = [...workflows];

  switch (sortBy) {
    case 'recent':
      sorted.sort((a, b) => {
        const aTime = a.lastRunAt ? new Date(a.lastRunAt).getTime() : 0;
        const bTime = b.lastRunAt ? new Date(b.lastRunAt).getTime() : 0;
        return bTime - aTime;
      });
      break;

    case 'name':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case 'status':
      sorted.sort((a, b) => {
        if (a.status === 'active' && b.status === 'inactive') return -1;
        if (a.status === 'inactive' && b.status === 'active') return 1;
        return 0;
      });
      break;

    default:
      break;
  }

  return sorted;
}
