# Obsidian Web Interface 全面重构实施方案

## 📋 概述 / Overview

本方案旨在对 Obsidian Web Interface 进行系统性重构，聚焦于四个核心页面的优化和功能实现。

### 核心目标

1. **捕获页面 (Capture)** - 快速记录入口，统一保存流程
2. **任务页面 (Tasks)** - 从工作日志中提取和管理任务
3. **工作流页面 (Workflows)** - 可执行的每日反思工作流
4. **知识库页面 (Vault)** - 显示真实的 Obsidian 笔记

---

## 🎯 Phase 1: 导航与路由重构

### 1.1 更新导航配置

**文件**: `src/lib/config/navItems.js`

**当前结构:**
```javascript
export const navItems = [
  { href: '/', label: 'Home', icon: Home, id: 'home' },
  { href: '/capture', label: '捕获', icon: Zap, id: 'capture' },
  { href: '/workflows-gallery', label: '工作流', icon: Grid3x3, id: 'workflows' },
  { href: '/vault', label: '知识库', icon: FolderOpen, id: 'vault' }
];
```

**目标结构:**
```javascript
import { Zap, ListTodo, Workflow, FolderOpen } from 'lucide-svelte';

export const navItems = [
  { href: '/capture', label: '捕获', icon: Zap, id: 'capture' },
  { href: '/tasks', label: '任务', icon: ListTodo, id: 'tasks' },
  { href: '/workflows', label: '工作流', icon: Workflow, id: 'workflows' },
  { href: '/vault', label: '知识库', icon: FolderOpen, id: 'vault' }
];
```

**改动说明:**
- ✅ 将 `/` (Home) 改为 `/tasks` (任务)
- ✅ 移除 `workflows-gallery`，统一为 `workflows`
- ✅ 更新图标：使用 `ListTodo` 表示任务，`Workflow` 表示工作流

### 1.2 路由文件调整

#### 任务：重命名 Home 为 Tasks

**操作步骤:**

1. **创建新的 tasks 路由**
   ```bash
   mv src/routes/+page.svelte src/routes/tasks/+page.svelte
   ```

2. **创建根路由重定向**
   ```javascript
   // src/routes/+page.server.js
   import { redirect } from '@sveltejs/kit';

   export function load() {
     throw redirect(307, '/capture'); // 默认重定向到捕获页面
   }
   ```

3. **更新 workflows 路由**
   ```bash
   mv src/routes/workflows-gallery src/routes/workflows
   ```

---

## 🎤 Phase 2: 捕获页面重构 - 统一保存流程

### 2.1 当前问题分析

**现状:**
- 语音录音后直接调用 API 保存，没有经过用户确认
- 文本输入和语音输入是两个独立的流程
- 用户无法编辑转录后的内容

**目标:**
- 语音转录后内容填充到输入框
- 用户可以编辑/确认后再点击保存
- 统一的保存按钮处理所有输入类型

### 2.2 实现方案

**文件**: `src/routes/capture/+page.svelte`

**核心修改:**

```javascript
// 当前语音录音处理（直接保存）
async function handleVoiceSubmit(event) {
  const { audioBlob, transcription } = event.detail;

  try {
    syncing = true;
    await obsidianApiClient.captureVoice({
      audioBlob,
      transcription,
      input_type: 'voice'
    });
    // 直接保存成功...
  } catch (error) {
    // ...
  }
}

// 🎯 目标：改为填充输入框
async function handleVoiceTranscription(event) {
  const { audioBlob, transcription } = event.detail;

  // 1. 将转录文本填充到输入框
  captureText = transcription;

  // 2. 可选：保存音频文件的引用
  pendingAudioBlob = audioBlob;

  // 3. 用户可以编辑，然后点击"保存"按钮统一处理
  showToast('语音转录完成，请确认内容后保存', 'success');
}

// 统一的保存处理函数
async function handleSave() {
  if (!captureText.trim()) {
    showToast('请输入内容', 'warning');
    return;
  }

  syncing = true;

  try {
    // 构造保存数据
    const captureData = {
      content: captureText,
      input_type: pendingAudioBlob ? 'voice' : 'text',
      timestamp: new Date().toISOString()
    };

    // 如果有音频文件，一并上传
    if (pendingAudioBlob) {
      // 1. 先上传音频文件到 00_Capture/Voice/
      const audioFileName = await saveAudioFile(pendingAudioBlob);

      // 2. 在内容中插入音频文件链接
      captureData.content = `${captureText}\n\n![[${audioFileName}]]`;
    }

    // 调用统一的捕获 API
    await obsidianApiClient.capture(captureData);

    // 成功后清空
    captureText = '';
    pendingAudioBlob = null;
    showToast('保存成功', 'success');

  } catch (error) {
    showToast(`保存失败: ${error.message}`, 'error');
  } finally {
    syncing = false;
  }
}
```

**UI 调整:**

```svelte
<!-- 语音录音组件更新 -->
<VoiceRecorder
  on:transcription={handleVoiceTranscription}  <!-- 改为转录事件 -->
  on:error={handleVoiceError}
/>

<!-- 统一的文本输入区 -->
<textarea
  bind:value={captureText}
  placeholder="输入想法，或点击麦克风开始录音..."
  class="min-h-[200px]"
/>

<!-- 统一的保存按钮 -->
<button
  on:click={handleSave}
  disabled={syncing || !captureText.trim()}
  class="btn-primary"
>
  {syncing ? '保存中...' : '💾 保存到知识库'}
</button>
```

### 2.3 音频文件管理

**新增服务函数**:

```javascript
// src/lib/services/obsidianApiClient.js

/**
 * 保存音频文件到 Vault
 * @param {Blob} audioBlob - 音频二进制数据
 * @returns {Promise<string>} 保存的文件名
 */
async saveAudioFile(audioBlob) {
  const timestamp = new Date();
  const dateStr = formatDate(timestamp, 'YYYY-MM-DD');
  const timeStr = formatDate(timestamp, 'HHmmss');

  // 文件路径: 00_Capture/Voice/YYYY-MM/YYYY-MM-DD_HHmmss.webm
  const folder = `00_Capture/Voice/${timestamp.getFullYear()}-${String(timestamp.getMonth() + 1).padStart(2, '0')}`;
  const fileName = `${dateStr}_${timeStr}.webm`;
  const filePath = `${folder}/${fileName}`;

  // 1. 确保文件夹存在
  try {
    await this.createFolder(folder);
  } catch (error) {
    // 文件夹可能已存在，忽略错误
  }

  // 2. 上传音频文件（二进制）
  const formData = new FormData();
  formData.append('file', audioBlob, fileName);

  const response = await fetch(`${this.baseUrl}/vault/${encodeURIComponent(filePath)}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${this.apiKey}`,
      // Content-Type 由 FormData 自动设置
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Failed to save audio file: ${response.statusText}`);
  }

  return fileName;
}
```

---

## 📋 Phase 3: 任务页面 - 从工作日志提取任务

### 3.1 数据来源分析

**Obsidian Vault 结构 (Palantir Foundry):**

```
01_Periodic/
├── Daily/
│   ├── 2025/
│   │   ├── 2025-10-01.md
│   │   ├── 2025-10-02.md
│   │   └── ...
│   │   └── 2025-10-30.md (today)
│   └── 2024/
└── Weekly/  (可选)
```

**日志文件格式示例:**

```markdown
---
created: 2025-10-30
type: daily-log
tags: [daily, work]
---

# 2025-10-30 Wednesday

## 今日计划
- [ ] 完成 Obsidian Web Interface 重构方案 📅 2025-10-30
- [ ] Review PR #123 ⏫
- [x] 团队周会 14:00

## 项目进展
### VNext 重构
- [ ] 实现任务提取功能
- [ ] 测试工作流执行引擎 ⏳ 2025-10-31

## 回顾与反思
- 今天完成了导航重构
- 需要优化语音转录的准确性

## 待办事项 (Backlog)
- [ ] 优化移动端响应式布局
- [ ] 添加暗色模式切换功能
```

**任务识别规则:**
1. 所有 `- [ ]` 或 `- [x]` 开头的行
2. 提取任务文本、状态（完成/未完成）
3. 识别特殊标记：
   - `📅 YYYY-MM-DD` 或 `⏳ YYYY-MM-DD` - 截止日期
   - `⏫` 或 `🔺` - 高优先级
   - `#tag` - 标签

### 3.2 任务提取服务实现

**新文件**: `src/lib/services/taskExtractor.js`

```javascript
/**
 * 任务提取服务 - 从 Markdown 文件中解析任务
 */

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import { visit } from 'unist-util-visit';

/**
 * Task 数据结构
 * @typedef {Object} Task
 * @property {string} id - 唯一标识 (filePath:lineNumber)
 * @property {string} content - 任务内容
 * @property {boolean} completed - 是否完成
 * @property {string|null} dueDate - 截止日期 (YYYY-MM-DD)
 * @property {string|null} priority - 优先级 (high/normal)
 * @property {string[]} tags - 标签列表
 * @property {string} sourceFile - 来源文件路径
 * @property {number} lineNumber - 行号
 * @property {string} context - 上下文标题
 */

export class TaskExtractor {
  constructor(obsidianApiClient) {
    this.api = obsidianApiClient;
    this.processor = unified()
      .use(remarkParse)
      .use(remarkFrontmatter, ['yaml']);
  }

  /**
   * 从单个文件提取任务
   * @param {string} filePath - 文件路径
   * @param {string} content - 文件内容
   * @returns {Task[]} 任务列表
   */
  extractTasksFromFile(filePath, content) {
    const tasks = [];
    const lines = content.split('\n');
    let currentContext = null; // 当前所在的标题上下文

    lines.forEach((line, index) => {
      const lineNumber = index + 1;

      // 识别标题作为上下文
      if (line.startsWith('#')) {
        currentContext = line.replace(/^#+\s*/, '').trim();
        return;
      }

      // 识别任务行
      const taskMatch = line.match(/^(\s*)-\s+\[([ x])\]\s+(.+)$/);
      if (!taskMatch) return;

      const [, indent, checkmark, taskContent] = taskMatch;
      const completed = checkmark.toLowerCase() === 'x';

      // 提取截止日期
      const dueDateMatch = taskContent.match(/[📅⏳]\s*(\d{4}-\d{2}-\d{2})/);
      const dueDate = dueDateMatch ? dueDateMatch[1] : null;

      // 提取优先级
      const hasPriority = /[⏫🔺]/.test(taskContent);
      const priority = hasPriority ? 'high' : 'normal';

      // 提取标签
      const tags = Array.from(taskContent.matchAll(/#([\w-]+)/g)).map(m => m[1]);

      // 清理任务内容（移除日期、优先级标记）
      const cleanContent = taskContent
        .replace(/[📅⏳]\s*\d{4}-\d{2}-\d{2}/g, '')
        .replace(/[⏫🔺]/g, '')
        .trim();

      tasks.push({
        id: `${filePath}:${lineNumber}`,
        content: cleanContent,
        completed,
        dueDate,
        priority,
        tags,
        sourceFile: filePath,
        lineNumber,
        context: currentContext,
        indentLevel: indent.length / 2 // 计算缩进层级
      });
    });

    return tasks;
  }

  /**
   * 扫描整个月份的任务
   * @param {number} year - 年份
   * @param {number} month - 月份 (1-12)
   * @returns {Promise<Task[]>} 任务列表
   */
  async scanMonthlyTasks(year, month) {
    const monthStr = String(month).padStart(2, '0');
    const dailyFolder = `01_Periodic/Daily/${year}`;

    try {
      // 1. 获取文件夹中的所有文件
      const filesResponse = await this.api.listFiles(dailyFolder);
      if (!filesResponse || !filesResponse.files) {
        return [];
      }

      // 2. 过滤出当月的日志文件
      const monthlyFiles = filesResponse.files
        .filter(file => {
          if (typeof file !== 'string') return false;
          const match = file.match(/^(\d{4})-(\d{2})-\d{2}\.md$/);
          return match && match[1] === String(year) && match[2] === monthStr;
        })
        .map(file => `${dailyFolder}/${file}`);

      console.log(`Found ${monthlyFiles.length} daily log files for ${year}-${monthStr}`);

      // 3. 并行获取所有文件内容并提取任务
      const allTasks = await Promise.all(
        monthlyFiles.map(async (filePath) => {
          try {
            const content = await this.api.readNote(filePath);
            return this.extractTasksFromFile(filePath, content);
          } catch (error) {
            console.warn(`Failed to read ${filePath}:`, error);
            return [];
          }
        })
      );

      // 4. 展平并返回
      return allTasks.flat();

    } catch (error) {
      console.error(`Failed to scan monthly tasks for ${year}-${monthStr}:`, error);
      return [];
    }
  }

  /**
   * 获取今日任务
   * 包括：今天的任务 + 逾期未完成的任务
   * @returns {Promise<Object>} { today: Task[], overdue: Task[] }
   */
  async getTodayTasks() {
    const today = new Date();
    const todayStr = this.formatDate(today);

    // 扫描当月所有任务
    const allTasks = await this.scanMonthlyTasks(today.getFullYear(), today.getMonth() + 1);

    // 筛选今日任务
    const todayTasks = allTasks.filter(task => {
      // 1. 来源文件是今天的日志
      if (task.sourceFile.includes(todayStr)) return true;

      // 2. 或者截止日期是今天
      if (task.dueDate === todayStr && !task.completed) return true;

      return false;
    });

    // 筛选逾期任务
    const overdueTasks = allTasks.filter(task => {
      if (task.completed) return false;
      if (!task.dueDate) return false;
      return task.dueDate < todayStr;
    });

    return {
      today: todayTasks,
      overdue: overdueTasks,
      all: allTasks
    };
  }

  /**
   * 切换任务完成状态
   * @param {Task} task - 任务对象
   * @returns {Promise<boolean>} 是否成功
   */
  async toggleTaskCompletion(task) {
    try {
      // 1. 读取源文件
      const content = await this.api.readNote(task.sourceFile);
      const lines = content.split('\n');

      // 2. 修改对应行
      const targetLine = lines[task.lineNumber - 1];
      if (!targetLine) {
        throw new Error(`Line ${task.lineNumber} not found in ${task.sourceFile}`);
      }

      // 切换状态
      const newCheckmark = task.completed ? ' ' : 'x';
      const updatedLine = targetLine.replace(/^(\s*-\s+\[)[ x](\])/, `$1${newCheckmark}$2`);
      lines[task.lineNumber - 1] = updatedLine;

      // 3. 写回文件
      const updatedContent = lines.join('\n');
      await this.api.createNote(updatedContent, task.sourceFile);

      return true;

    } catch (error) {
      console.error(`Failed to toggle task:`, error);
      return false;
    }
  }

  /**
   * 格式化日期
   */
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}

// 导出单例
export const taskExtractor = new TaskExtractor(obsidianApiClient);
```

### 3.3 任务页面 UI 实现

**文件**: `src/routes/tasks/+page.svelte`

```svelte
<script>
  import { onMount } from 'svelte';
  import { taskExtractor } from '$lib/services/taskExtractor.js';
  import TaskList from '$lib/components/tasks/TaskList.svelte';
  import TaskStats from '$lib/components/tasks/TaskStats.svelte';

  let loading = true;
  let error = null;

  let todayTasks = [];
  let overdueTasks = [];
  let monthlyTasks = [];

  let activeView = 'today'; // 'today' | 'month'
  let filterStatus = 'all'; // 'all' | 'active' | 'completed'

  // 加载任务数据
  async function loadTasks() {
    loading = true;
    error = null;

    try {
      // 获取今日任务和逾期任务
      const { today, overdue, all } = await taskExtractor.getTodayTasks();

      todayTasks = today;
      overdueTasks = overdue;
      monthlyTasks = all;

    } catch (err) {
      console.error('Failed to load tasks:', err);
      error = err.message;
    } finally {
      loading = false;
    }
  }

  // 切换任务完成状态
  async function handleToggleTask(event) {
    const { task } = event.detail;

    try {
      const success = await taskExtractor.toggleTaskCompletion(task);

      if (success) {
        // 更新本地状态
        task.completed = !task.completed;

        // 重新加载任务列表（确保数据一致性）
        await loadTasks();
      }
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  }

  // 过滤任务
  $: displayedTasks = (() => {
    let tasks = activeView === 'today'
      ? [...overdueTasks, ...todayTasks]
      : monthlyTasks;

    // 应用状态过滤
    if (filterStatus === 'active') {
      tasks = tasks.filter(t => !t.completed);
    } else if (filterStatus === 'completed') {
      tasks = tasks.filter(t => t.completed);
    }

    return tasks;
  })();

  // 统计数据
  $: stats = {
    total: displayedTasks.length,
    completed: displayedTasks.filter(t => t.completed).length,
    overdue: overdueTasks.filter(t => !t.completed).length,
    highPriority: displayedTasks.filter(t => t.priority === 'high' && !t.completed).length
  };

  onMount(() => {
    loadTasks();

    // 每5分钟刷新一次
    const interval = setInterval(loadTasks, 5 * 60 * 1000);
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>任务 - Quick Capture</title>
</svelte:head>

<div class="min-h-screen bg-background-primary p-4 pb-28">
  <!-- Header -->
  <header class="mb-6">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-large-title text-text-primary">📋 任务管理</h1>

      <button
        on:click={loadTasks}
        class="px-3 py-2 bg-background-secondary rounded-lg hover:bg-background-tertiary transition-colors"
        disabled={loading}
      >
        {loading ? '🔄 加载中...' : '🔄 刷新'}
      </button>
    </div>

    <!-- View Toggle -->
    <div class="flex gap-2 mb-4">
      <button
        on:click={() => activeView = 'today'}
        class="px-4 py-2 rounded-lg transition-colors"
        class:bg-accent={activeView === 'today'}
        class:text-white={activeView === 'today'}
        class:bg-background-secondary={activeView !== 'today'}
      >
        今日任务
      </button>
      <button
        on:click={() => activeView = 'month'}
        class="px-4 py-2 rounded-lg transition-colors"
        class:bg-accent={activeView === 'month'}
        class:text-white={activeView === 'month'}
        class:bg-background-secondary={activeView !== 'month'}
      >
        本月任务
      </button>
    </div>

    <!-- Filter Tabs -->
    <div class="flex gap-2">
      {#each [
        { value: 'all', label: '全部' },
        { value: 'active', label: '进行中' },
        { value: 'completed', label: '已完成' }
      ] as filter}
        <button
          on:click={() => filterStatus = filter.value}
          class="px-3 py-1.5 text-sm rounded-md transition-colors"
          class:bg-background-tertiary={filterStatus === filter.value}
          class:text-accent={filterStatus === filter.value}
          class:text-text-secondary={filterStatus !== filter.value}
        >
          {filter.label}
        </button>
      {/each}
    </div>
  </header>

  <!-- Stats Cards -->
  <TaskStats {stats} />

  <!-- Error State -->
  {#if error}
    <div class="mb-4 p-4 bg-red-900/20 border border-red-700 rounded-lg">
      <p class="text-red-300">❌ {error}</p>
    </div>
  {/if}

  <!-- Loading State -->
  {#if loading}
    <div class="text-center py-12">
      <div class="text-4xl mb-4 animate-pulse">⏳</div>
      <p class="text-text-secondary">加载任务中...</p>
    </div>
  {:else if displayedTasks.length === 0}
    <!-- Empty State -->
    <div class="text-center py-12">
      <div class="text-6xl mb-4">🎉</div>
      <p class="text-xl text-text-secondary mb-2">
        {filterStatus === 'completed' ? '还没有完成的任务' : '没有待办任务'}
      </p>
      <p class="text-sm text-text-tertiary">
        {activeView === 'today' ? '今天的任务都完成了！' : '本月没有任务记录'}
      </p>
    </div>
  {:else}
    <!-- Task Lists -->
    {#if activeView === 'today' && overdueTasks.filter(t => filterStatus === 'all' || (filterStatus === 'active' && !t.completed) || (filterStatus === 'completed' && t.completed)).length > 0}
      <div class="mb-6">
        <h2 class="text-headline text-text-primary mb-3 flex items-center gap-2">
          ⚠️ 逾期任务
          <span class="text-sm text-red-400">
            ({overdueTasks.filter(t => !t.completed).length})
          </span>
        </h2>
        <TaskList
          tasks={overdueTasks.filter(t => filterStatus === 'all' || (filterStatus === 'active' && !t.completed) || (filterStatus === 'completed' && t.completed))}
          on:toggle={handleToggleTask}
          highlightOverdue={true}
        />
      </div>
    {/if}

    <TaskList
      tasks={activeView === 'today' ? todayTasks.filter(t => filterStatus === 'all' || (filterStatus === 'active' && !t.completed) || (filterStatus === 'completed' && t.completed)) : displayedTasks}
      on:toggle={handleToggleTask}
    />
  {/if}
</div>

<style>
  /* 任务页面样式 */
</style>
```

### 3.4 任务组件

**新文件**: `src/lib/components/tasks/TaskList.svelte`

```svelte
<script>
  import { createEventDispatcher } from 'svelte';
  import { formatDistanceToNow } from 'date-fns';
  import { zhCN } from 'date-fns/locale';

  export let tasks = [];
  export let highlightOverdue = false;

  const dispatch = createEventDispatcher();

  function handleToggle(task) {
    dispatch('toggle', { task });
  }

  function isOverdue(task) {
    if (!task.dueDate || task.completed) return false;
    return task.dueDate < new Date().toISOString().split('T')[0];
  }
</script>

<div class="space-y-2">
  {#each tasks as task (task.id)}
    <div
      class="task-item p-4 bg-background-secondary rounded-lg border border-border-default hover:border-accent transition-all"
      class:opacity-60={task.completed}
      class:border-red-500={highlightOverdue && isOverdue(task)}
    >
      <div class="flex items-start gap-3">
        <!-- Checkbox -->
        <button
          on:click={() => handleToggle(task)}
          class="task-checkbox mt-0.5"
          aria-label={task.completed ? '标记为未完成' : '标记为完成'}
        >
          <div
            class="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
            class:border-accent={!task.completed}
            class:bg-accent={task.completed}
            class:border-text-tertiary={task.completed}
          >
            {#if task.completed}
              <span class="text-white text-sm">✓</span>
            {/if}
          </div>
        </button>

        <!-- Task Content -->
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <p
              class="text-subhead leading-relaxed"
              class:line-through={task.completed}
              class:text-text-primary={!task.completed}
              class:text-text-tertiary={task.completed}
            >
              {task.content}
            </p>

            {#if task.priority === 'high'}
              <span class="text-red-400 shrink-0">⏫</span>
            {/if}
          </div>

          <!-- Metadata -->
          <div class="flex flex-wrap items-center gap-2 mt-2 text-caption text-text-tertiary">
            <!-- Source File -->
            <span class="flex items-center gap-1">
              📄 {task.sourceFile.split('/').pop().replace('.md', '')}
            </span>

            <!-- Context -->
            {#if task.context}
              <span class="text-text-quaternary">•</span>
              <span>{task.context}</span>
            {/if}

            <!-- Due Date -->
            {#if task.dueDate}
              <span class="text-text-quaternary">•</span>
              <span
                class="flex items-center gap-1"
                class:text-red-400={isOverdue(task)}
              >
                📅 {task.dueDate}
                {#if isOverdue(task)}
                  <span class="text-xs">(逾期)</span>
                {/if}
              </span>
            {/if}

            <!-- Tags -->
            {#if task.tags && task.tags.length > 0}
              <span class="text-text-quaternary">•</span>
              {#each task.tags as tag}
                <span class="px-2 py-0.5 bg-background-tertiary rounded text-xs">
                  #{tag}
                </span>
              {/each}
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>

<style>
  .task-checkbox {
    cursor: pointer;
    transition: transform 0.1s ease;
  }

  .task-checkbox:active {
    transform: scale(0.95);
  }

  .task-item {
    animation: fadeIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
```

**新文件**: `src/lib/components/tasks/TaskStats.svelte`

```svelte
<script>
  export let stats = {
    total: 0,
    completed: 0,
    overdue: 0,
    highPriority: 0
  };

  $: completionRate = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;
</script>

<div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
  <!-- Total Tasks -->
  <div class="stat-card">
    <div class="stat-icon">📊</div>
    <div class="stat-value">{stats.total}</div>
    <div class="stat-label">总任务</div>
  </div>

  <!-- Completed -->
  <div class="stat-card">
    <div class="stat-icon">✅</div>
    <div class="stat-value text-green-400">{stats.completed}</div>
    <div class="stat-label">已完成 ({completionRate}%)</div>
  </div>

  <!-- Overdue -->
  <div class="stat-card">
    <div class="stat-icon">⚠️</div>
    <div class="stat-value text-red-400">{stats.overdue}</div>
    <div class="stat-label">逾期</div>
  </div>

  <!-- High Priority -->
  <div class="stat-card">
    <div class="stat-icon">⏫</div>
    <div class="stat-value text-yellow-400">{stats.highPriority}</div>
    <div class="stat-label">高优先级</div>
  </div>
</div>

<style>
  .stat-card {
    @apply p-4 bg-background-secondary rounded-lg border border-border-default;
    @apply flex flex-col items-center text-center;
    @apply transition-all hover:border-accent;
  }

  .stat-icon {
    @apply text-2xl mb-2;
  }

  .stat-value {
    @apply text-2xl font-bold text-text-primary mb-1;
  }

  .stat-label {
    @apply text-caption text-text-tertiary;
  }
</style>
```

---

## 🔄 Phase 4: 工作流页面 - 可执行的每日反思工作流

### 4.1 工作流定义

**工作流架构:**
- 使用 JSON 定义工作流步骤
- 每个步骤可以是：提示 (prompt)、任务查询 (query)、笔记创建 (create)、笔记更新 (update)
- 支持步骤间的数据传递和条件逻辑

**工作流示例**: 每日反思与计划

```json
{
  "id": "daily-reflection-planning",
  "name": "每日反思与计划",
  "description": "回顾昨日，规划今日，设定三大优先事项",
  "version": "1.0.0",
  "icon": "🌅",
  "estimatedDuration": "15-20分钟",
  "steps": [
    {
      "id": "step1-review-yesterday",
      "type": "query-tasks",
      "title": "📅 回顾昨日任务",
      "description": "查看昨天的任务完成情况",
      "config": {
        "dateOffset": -1,
        "includeCompleted": true,
        "includeIncomplete": true
      },
      "output": "yesterdayTasks"
    },
    {
      "id": "step2-reflection-prompt",
      "type": "prompt",
      "title": "🤔 昨日反思",
      "description": "回顾昨天的工作，总结收获与不足",
      "config": {
        "questions": [
          {
            "id": "wins",
            "label": "昨天最大的成就是什么？",
            "type": "textarea",
            "placeholder": "列出1-3个主要成就..."
          },
          {
            "id": "challenges",
            "label": "遇到了哪些挑战？如何解决的？",
            "type": "textarea",
            "placeholder": "记录挑战和解决方案..."
          },
          {
            "id": "learnings",
            "label": "有什么收获或教训？",
            "type": "textarea",
            "placeholder": "今天学到了什么..."
          }
        ]
      },
      "output": "reflectionData"
    },
    {
      "id": "step3-carryover-tasks",
      "type": "task-carryover",
      "title": "📌 转移未完成任务",
      "description": "将昨日未完成的任务转移到今日",
      "config": {
        "source": "yesterdayTasks",
        "filter": {
          "completed": false
        },
        "allowSelection": true,
        "target": "todayNote"
      },
      "output": "carriedOverTasks"
    },
    {
      "id": "step4-priorities",
      "type": "prompt",
      "title": "🎯 设定今日优先事项",
      "description": "确定今天最重要的3件事",
      "config": {
        "questions": [
          {
            "id": "priority1",
            "label": "优先事项 #1（最重要）",
            "type": "text",
            "required": true,
            "placeholder": "今天必须完成的最重要的事..."
          },
          {
            "id": "priority2",
            "label": "优先事项 #2",
            "type": "text",
            "required": true,
            "placeholder": "第二重要的事..."
          },
          {
            "id": "priority3",
            "label": "优先事项 #3",
            "type": "text",
            "required": false,
            "placeholder": "如果时间允许..."
          }
        ]
      },
      "output": "priorities"
    },
    {
      "id": "step5-create-daily-note",
      "type": "create-note",
      "title": "📝 生成今日日志",
      "description": "创建今天的每日日志并填充内容",
      "config": {
        "template": "daily-log-template",
        "path": "01_Periodic/Daily/{{year}}/{{date}}.md",
        "data": {
          "date": "{{today}}",
          "reflectionWins": "{{reflectionData.wins}}",
          "reflectionChallenges": "{{reflectionData.challenges}}",
          "reflectionLearnings": "{{reflectionData.learnings}}",
          "carriedOverTasks": "{{carriedOverTasks}}",
          "priority1": "{{priorities.priority1}}",
          "priority2": "{{priorities.priority2}}",
          "priority3": "{{priorities.priority3}}"
        }
      },
      "output": "dailyNotePath"
    },
    {
      "id": "step6-completion",
      "type": "completion",
      "title": "✅ 工作流完成",
      "description": "每日反思与计划已完成！",
      "config": {
        "message": "今日日志已生成，祝您有美好的一天！",
        "actions": [
          {
            "label": "查看今日日志",
            "type": "open-note",
            "target": "{{dailyNotePath}}"
          },
          {
            "label": "前往任务页面",
            "type": "navigate",
            "target": "/tasks"
          }
        ]
      }
    }
  ]
}
```

### 4.2 工作流执行引擎实现

**新文件**: `src/lib/services/workflowEngine.js`

```javascript
/**
 * 工作流执行引擎
 * 负责加载、执行和管理工作流
 */

import { writable, derived } from 'svelte/store';
import { obsidianApiClient } from './obsidianApiClient.js';
import { taskExtractor } from './taskExtractor.js';

export class WorkflowEngine {
  constructor() {
    // 工作流状态 store
    this.currentWorkflow = writable(null);
    this.currentStep = writable(0);
    this.stepData = writable({}); // 存储每个步骤的输出数据
    this.isRunning = writable(false);
    this.error = writable(null);
  }

  /**
   * 加载工作流定义
   * @param {Object|string} workflowDefOrPath - 工作流定义对象或路径
   */
  async loadWorkflow(workflowDefOrPath) {
    try {
      let workflowDef;

      if (typeof workflowDefOrPath === 'string') {
        // 从文件加载
        const content = await obsidianApiClient.readNote(workflowDefOrPath);
        workflowDef = JSON.parse(content);
      } else {
        // 直接使用对象
        workflowDef = workflowDefOrPath;
      }

      // 验证工作流定义
      this.validateWorkflow(workflowDef);

      // 设置当前工作流
      this.currentWorkflow.set(workflowDef);
      this.currentStep.set(0);
      this.stepData.set({});
      this.error.set(null);

      return workflowDef;

    } catch (error) {
      console.error('Failed to load workflow:', error);
      this.error.set(error.message);
      throw error;
    }
  }

  /**
   * 验证工作流定义
   */
  validateWorkflow(workflow) {
    if (!workflow.id || !workflow.name || !workflow.steps) {
      throw new Error('Invalid workflow definition: missing required fields');
    }

    if (!Array.isArray(workflow.steps) || workflow.steps.length === 0) {
      throw new Error('Workflow must have at least one step');
    }

    // 验证每个步骤
    workflow.steps.forEach((step, index) => {
      if (!step.id || !step.type || !step.title) {
        throw new Error(`Step ${index + 1} is missing required fields`);
      }
    });
  }

  /**
   * 开始执行工作流
   */
  async startWorkflow() {
    this.isRunning.set(true);
    this.currentStep.set(0);
    this.stepData.set({});
    this.error.set(null);
  }

  /**
   * 执行当前步骤
   * @param {Object} userInput - 用户输入数据
   */
  async executeStep(userInput = {}) {
    const workflow = await this.getCurrentWorkflow();
    const stepIndex = await this.getCurrentStepIndex();
    const step = workflow.steps[stepIndex];

    if (!step) {
      throw new Error(`Step ${stepIndex} not found`);
    }

    try {
      // 根据步骤类型执行相应逻辑
      let output;

      switch (step.type) {
        case 'query-tasks':
          output = await this.executeQueryTasks(step, userInput);
          break;

        case 'prompt':
          output = userInput; // 用户输入的表单数据
          break;

        case 'task-carryover':
          output = await this.executeTaskCarryover(step, userInput);
          break;

        case 'create-note':
          output = await this.executeCreateNote(step);
          break;

        case 'update-note':
          output = await this.executeUpdateNote(step);
          break;

        case 'completion':
          output = { completed: true };
          break;

        default:
          throw new Error(`Unknown step type: ${step.type}`);
      }

      // 保存步骤输出
      if (step.output) {
        this.updateStepData(step.output, output);
      }

      // 移动到下一步
      if (stepIndex < workflow.steps.length - 1) {
        this.currentStep.update(n => n + 1);
      } else {
        // 工作流完成
        this.isRunning.set(false);
      }

      return output;

    } catch (error) {
      console.error(`Failed to execute step ${step.id}:`, error);
      this.error.set(error.message);
      throw error;
    }
  }

  /**
   * 执行任务查询步骤
   */
  async executeQueryTasks(step, userInput) {
    const { dateOffset = 0, includeCompleted = true, includeIncomplete = true } = step.config;

    // 计算目标日期
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + dateOffset);

    const dateStr = this.formatDate(targetDate);
    const filePath = `01_Periodic/Daily/${targetDate.getFullYear()}/${dateStr}.md`;

    try {
      const content = await obsidianApiClient.readNote(filePath);
      const tasks = taskExtractor.extractTasksFromFile(filePath, content);

      // 根据配置过滤任务
      let filteredTasks = tasks;
      if (!includeCompleted) {
        filteredTasks = filteredTasks.filter(t => !t.completed);
      }
      if (!includeIncomplete) {
        filteredTasks = filteredTasks.filter(t => t.completed);
      }

      return {
        date: dateStr,
        filePath,
        tasks: filteredTasks,
        stats: {
          total: filteredTasks.length,
          completed: filteredTasks.filter(t => t.completed).length,
          incomplete: filteredTasks.filter(t => !t.completed).length
        }
      };
    } catch (error) {
      if (error.message.includes('404')) {
        // 文件不存在
        return {
          date: dateStr,
          filePath,
          tasks: [],
          stats: { total: 0, completed: 0, incomplete: 0 }
        };
      }
      throw error;
    }
  }

  /**
   * 执行任务转移步骤
   */
  async executeTaskCarryover(step, userInput) {
    const { source, filter, allowSelection, target } = step.config;

    // 获取源任务数据
    const sourceData = await this.getStepData(source);
    if (!sourceData || !sourceData.tasks) {
      return { tasks: [], count: 0 };
    }

    // 应用过滤器
    let tasksToCarry = sourceData.tasks;
    if (filter) {
      if (filter.completed !== undefined) {
        tasksToCarry = tasksToCarry.filter(t => t.completed === filter.completed);
      }
      if (filter.priority) {
        tasksToCarry = tasksToCarry.filter(t => t.priority === filter.priority);
      }
    }

    // 如果允许用户选择，使用用户输入的选择
    if (allowSelection && userInput.selectedTaskIds) {
      tasksToCarry = tasksToCarry.filter(t => userInput.selectedTaskIds.includes(t.id));
    }

    return {
      tasks: tasksToCarry,
      count: tasksToCarry.length,
      source: sourceData.filePath
    };
  }

  /**
   * 执行创建笔记步骤
   */
  async executeCreateNote(step) {
    const { template, path, data } = step.config;

    // 解析路径模板变量
    const resolvedPath = this.resolvePath(path);

    // 加载模板
    let content;
    if (template) {
      const templatePath = `03_Areas/System/Templates/${template}.md`;
      try {
        content = await obsidianApiClient.readNote(templatePath);
      } catch (error) {
        console.warn(`Template not found: ${templatePath}, using default`);
        content = await this.generateDefaultDailyTemplate();
      }
    } else {
      content = await this.generateDefaultDailyTemplate();
    }

    // 替换数据占位符
    content = this.replaceTemplateVariables(content, data);

    // 创建笔记
    await obsidianApiClient.createNote(content, resolvedPath);

    return {
      path: resolvedPath,
      created: true
    };
  }

  /**
   * 执行更新笔记步骤
   */
  async executeUpdateNote(step) {
    const { path, operation, data } = step.config;

    const resolvedPath = this.resolvePath(path);

    // 读取现有内容
    let content = await obsidianApiClient.readNote(resolvedPath);

    // 根据操作类型更新内容
    switch (operation) {
      case 'append':
        content += '\n\n' + this.replaceTemplateVariables(data.content, data);
        break;

      case 'prepend':
        content = this.replaceTemplateVariables(data.content, data) + '\n\n' + content;
        break;

      case 'replace-section':
        // 替换指定章节
        const sectionRegex = new RegExp(`^## ${data.section}$([\\s\\S]*?)(?=^## |$)`, 'm');
        const newSection = `## ${data.section}\n${this.replaceTemplateVariables(data.content, data)}\n`;
        if (sectionRegex.test(content)) {
          content = content.replace(sectionRegex, newSection);
        } else {
          content += '\n\n' + newSection;
        }
        break;

      default:
        throw new Error(`Unknown update operation: ${operation}`);
    }

    // 写回文件
    await obsidianApiClient.createNote(content, resolvedPath);

    return {
      path: resolvedPath,
      updated: true
    };
  }

  /**
   * 解析路径模板变量
   */
  resolvePath(pathTemplate) {
    const today = new Date();
    const vars = {
      'year': today.getFullYear(),
      'month': String(today.getMonth() + 1).padStart(2, '0'),
      'day': String(today.getDate()).padStart(2, '0'),
      'date': this.formatDate(today)
    };

    return pathTemplate.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return vars[key] || match;
    });
  }

  /**
   * 替换模板变量
   */
  replaceTemplateVariables(template, data) {
    const allData = { ...await this.getAllStepData(), ...data };

    return template.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
      // 支持嵌套路径，如 {{reflectionData.wins}}
      const value = this.getNestedValue(allData, path);

      if (value === undefined) return match;

      // 特殊处理数组（如任务列表）
      if (Array.isArray(value)) {
        if (path.includes('tasks') || path.includes('Tasks')) {
          return this.formatTaskList(value);
        }
        return value.join('\n');
      }

      return String(value);
    });
  }

  /**
   * 格式化任务列表为 Markdown
   */
  formatTaskList(tasks) {
    return tasks.map(task => {
      const checkbox = task.completed ? '[x]' : '[ ]';
      let line = `- ${checkbox} ${task.content}`;

      if (task.priority === 'high') {
        line += ' ⏫';
      }

      if (task.dueDate) {
        line += ` 📅 ${task.dueDate}`;
      }

      return line;
    }).join('\n');
  }

  /**
   * 获取嵌套对象值
   */
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
      return current ? current[key] : undefined;
    }, obj);
  }

  /**
   * 生成默认每日日志模板
   */
  async generateDefaultDailyTemplate() {
    const today = new Date();
    const dateStr = this.formatDate(today);
    const weekday = today.toLocaleDateString('zh-CN', { weekday: 'long' });

    return `---
created: ${new Date().toISOString()}
type: daily-log
tags: [daily, work]
---

# ${dateStr} ${weekday}

## 今日计划
- [ ] {{priorities.priority1}} ⏫
- [ ] {{priorities.priority2}}
- [ ] {{priorities.priority3}}

## 转移任务
{{carriedOverTasks.tasks}}

## 项目进展

## 今日记录

## 回顾与反思
### 昨日成就
{{reflectionData.wins}}

### 遇到的挑战
{{reflectionData.challenges}}

### 收获与教训
{{reflectionData.learnings}}
`;
  }

  /**
   * 格式化日期
   */
  formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Store 辅助方法
  async getCurrentWorkflow() {
    return new Promise(resolve => {
      this.currentWorkflow.subscribe(value => resolve(value))();
    });
  }

  async getCurrentStepIndex() {
    return new Promise(resolve => {
      this.currentStep.subscribe(value => resolve(value))();
    });
  }

  async getAllStepData() {
    return new Promise(resolve => {
      this.stepData.subscribe(value => resolve(value))();
    });
  }

  async getStepData(key) {
    const allData = await this.getAllStepData();
    return allData[key];
  }

  updateStepData(key, value) {
    this.stepData.update(data => ({
      ...data,
      [key]: value
    }));
  }

  /**
   * 跳转到指定步骤
   */
  goToStep(stepIndex) {
    this.currentStep.set(stepIndex);
  }

  /**
   * 上一步
   */
  previousStep() {
    this.currentStep.update(n => Math.max(0, n - 1));
  }

  /**
   * 下一步
   */
  nextStep() {
    this.currentStep.update(n => n + 1);
  }

  /**
   * 重置工作流
   */
  reset() {
    this.currentWorkflow.set(null);
    this.currentStep.set(0);
    this.stepData.set({});
    this.isRunning.set(false);
    this.error.set(null);
  }
}

// 导出单例
export const workflowEngine = new WorkflowEngine();
```

### 4.3 工作流 UI 实现

**文件**: `src/routes/workflows/+page.svelte`

```svelte
<script>
  import { onMount } from 'svelte';
  import { workflowEngine } from '$lib/services/workflowEngine.js';
  import WorkflowCard from '$lib/components/workflows/WorkflowCard.svelte';
  import WorkflowExecutor from '$lib/components/workflows/WorkflowExecutor.svelte';

  // 导入工作流定义
  import dailyReflectionWorkflow from '$lib/workflows/daily-reflection.json';

  let availableWorkflows = [
    dailyReflectionWorkflow
    // 可以添加更多工作流
  ];

  let selectedWorkflow = null;
  let isExecuting = false;

  // 启动工作流
  async function startWorkflow(workflow) {
    try {
      await workflowEngine.loadWorkflow(workflow);
      await workflowEngine.startWorkflow();

      selectedWorkflow = workflow;
      isExecuting = true;

    } catch (error) {
      console.error('Failed to start workflow:', error);
      alert(`启动工作流失败: ${error.message}`);
    }
  }

  // 关闭工作流执行器
  function closeExecutor() {
    selectedWorkflow = null;
    isExecuting = false;
    workflowEngine.reset();
  }

  onMount(() => {
    // 可以从服务器加载更多工作流
  });
</script>

<svelte:head>
  <title>工作流 - Quick Capture</title>
</svelte:head>

{#if !isExecuting}
  <!-- 工作流列表 -->
  <div class="min-h-screen bg-background-primary p-4 pb-28">
    <header class="mb-6">
      <h1 class="text-large-title text-text-primary mb-2">🔄 工作流</h1>
      <p class="text-subhead text-text-secondary">AI 增强的反思与规划工具</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each availableWorkflows as workflow (workflow.id)}
        <WorkflowCard
          {workflow}
          on:start={() => startWorkflow(workflow)}
        />
      {/each}
    </div>
  </div>
{:else}
  <!-- 工作流执行器 -->
  <WorkflowExecutor
    workflow={selectedWorkflow}
    on:close={closeExecutor}
    on:complete={closeExecutor}
  />
{/if}
```

由于篇幅限制，完整的实施方案文档已创建。让我继续添加 Phase 5 (Vault配置) 的内容。

---

## 📚 Phase 5: 知识库配置 - 显示真实 Obsidian 笔记

### 5.1 文件夹结构分析

根据 Palantir Foundry 架构，需要在 Vault 页面展示以下文件夹：

**建议显示的文件夹层级:**

```
📂 Knowledge Vault
├── 📥 00_Capture (捕获)
│   ├── Inbox (收件箱)
│   └── Voice (语音录音)
│
├── 📅 01_Periodic (周期性记录)
│   ├── Daily (每日日志)
│   ├── Weekly (每周回顾)
│   └── Monthly (每月总结)
│
├── 🚀 02_Execution (执行)
│   ├── Projects (项目)
│   └── Tasks (任务)
│
├── 💡 03_Insights (洞察)
│   ├── Analysis (分析报告)
│   └── Reflections (反思记录)
│
└── 📖 04_Foundation (基础知识)
    ├── Areas (领域知识)
    ├── Resources (资源库)
    └── Templates (模板)
```

**文件夹显示优先级:**

1. **一级文件夹** - 始终显示根目录下的主要文件夹
2. **二级文件夹** - 展开后显示子文件夹
3. **文件列表** - 点击文件夹显示其中的 Markdown 文件

### 5.2 FolderTree 配置更新

**文件**: `src/lib/components/vault/FolderTree.svelte`

**更新要点:**

```javascript
// 1. 定义 Foundry 文件夹配置
const FOUNDRY_FOLDERS = [
  {
    path: '00_Capture',
    name: '捕获',
    icon: '📥',
    subfolders: ['Inbox', 'Voice'],
    expanded: true // 默认展开
  },
  {
    path: '01_Periodic',
    name: '周期性记录',
    icon: '📅',
    subfolders: ['Daily', 'Weekly', 'Monthly'],
    expanded: true
  },
  {
    path: '02_Execution',
    name: '执行',
    icon: '🚀',
    subfolders: ['Projects', 'Tasks'],
    expanded: false
  },
  {
    path: '03_Insights',
    name: '洞察',
    icon: '💡',
    subfolders: ['Analysis', 'Reflections'],
    expanded: false
  },
  {
    path: '04_Foundation',
    name: '基础知识',
    icon: '📖',
    subfolders: ['Areas', 'Resources', 'Templates'],
    expanded: false
  }
];

// 2. 加载文件夹内容
async function loadFolder(folderPath) {
  try {
    const response = await obsidianApiClient.listFiles(folderPath);

    if (!response || !response.files) {
      return { folders: [], files: [] };
    }

    // 分离文件夹和文件
    const items = response.files.map(name => ({
      name,
      path: `${folderPath}/${name}`,
      isFolder: !name.endsWith('.md')
    }));

    return {
      folders: items.filter(item => item.isFolder),
      files: items.filter(item => !item.isFolder).sort((a, b) => {
        // 按修改时间倒序排列（最新的在前）
        return b.name.localeCompare(a.name);
      })
    };
  } catch (error) {
    console.error(`Failed to load folder ${folderPath}:`, error);
    return { folders: [], files: [] };
  }
}

// 3. 点击文件夹展开/收起
function toggleFolder(folder) {
  if (folder.expanded) {
    folder.expanded = false;
  } else {
    // 如果还没加载过内容，先加载
    if (!folder.loaded) {
      loadFolder(folder.path).then(result => {
        folder.subfolders = result.folders;
        folder.files = result.files;
        folder.loaded = true;
        folder.expanded = true;
        // 触发重新渲染
        folderTree = folderTree;
      });
    } else {
      folder.expanded = true;
    }
  }

  // 更新 store
  vaultStore.update(state => ({
    ...state,
    expandedFolders: folder.expanded
      ? [...state.expandedFolders, folder.path]
      : state.expandedFolders.filter(p => p !== folder.path)
  }));
}

// 4. 选择文件
function selectFile(file) {
  // 更新当前选中的文件
  vaultStore.setCurrentNote(file.path);

  // 加载文件内容到编辑器
  loadNoteContent(file.path);
}
```

### 5.3 Vault Store 更新

**文件**: `src/lib/stores/vault.js`

**增强功能:**

```javascript
import { writable, derived } from 'svelte/store';
import { obsidianApiClient } from '$services/obsidianApiClient.js';

// Vault 状态
const vaultState = writable({
  folderTree: [],
  expandedFolders: [],
  selectedFolder: null,
  notes: [],
  currentNote: null,
  currentNoteContent: '',
  loading: false,
  error: null
});

// Vault Actions
export const vaultActions = {
  /**
   * 初始化 Vault - 加载文件夹结构
   */
  async initialize() {
    vaultState.update(state => ({ ...state, loading: true, error: null }));

    try {
      const FOUNDRY_FOLDERS = [
        { path: '00_Capture', name: '捕获', icon: '📥', expanded: true },
        { path: '01_Periodic', name: '周期性记录', icon: '📅', expanded: true },
        { path: '02_Execution', name: '执行', icon: '🚀', expanded: false },
        { path: '03_Insights', name: '洞察', icon: '💡', expanded: false },
        { path: '04_Foundation', name: '基础知识', icon: '📖', expanded: false }
      ];

      // 并行加载所有根文件夹的内容
      const loadedFolders = await Promise.all(
        FOUNDRY_FOLDERS.map(async (folder) => {
          try {
            const response = await obsidianApiClient.listFiles(folder.path);

            const subfolders = response.files
              .filter(name => !name.endsWith('.md'))
              .map(name => ({
                name,
                path: `${folder.path}/${name}`,
                icon: '📁',
                expanded: false,
                loaded: false
              }));

            return {
              ...folder,
              subfolders,
              loaded: true
            };
          } catch (error) {
            console.warn(`Failed to load folder ${folder.path}:`, error);
            return {
              ...folder,
              subfolders: [],
              loaded: false,
              error: error.message
            };
          }
        })
      );

      vaultState.update(state => ({
        ...state,
        folderTree: loadedFolders,
        loading: false
      }));

    } catch (error) {
      console.error('Failed to initialize vault:', error);
      vaultState.update(state => ({
        ...state,
        loading: false,
        error: error.message
      }));
    }
  },

  /**
   * 加载文件夹中的笔记列表
   */
  async loadNotesFromFolder(folderPath) {
    vaultState.update(state => ({ ...state, loading: true }));

    try {
      const response = await obsidianApiClient.listFiles(folderPath);

      if (!response || !response.files) {
        vaultState.update(state => ({
          ...state,
          notes: [],
          selectedFolder: folderPath,
          loading: false
        }));
        return;
      }

      // 只保留 Markdown 文件
      const notes = response.files
        .filter(name => name.endsWith('.md'))
        .map(name => ({
          name: name.replace('.md', ''),
          path: `${folderPath}/${name}`,
          folder: folderPath
        }))
        .sort((a, b) => b.name.localeCompare(a.name)); // 倒序排列

      vaultState.update(state => ({
        ...state,
        notes,
        selectedFolder: folderPath,
        loading: false
      }));

    } catch (error) {
      console.error(`Failed to load notes from ${folderPath}:`, error);
      vaultState.update(state => ({
        ...state,
        loading: false,
        error: error.message
      }));
    }
  },

  /**
   * 加载笔记内容
   */
  async loadNoteContent(notePath) {
    vaultState.update(state => ({ ...state, loading: true }));

    try {
      const content = await obsidianApiClient.readNote(notePath);

      vaultState.update(state => ({
        ...state,
        currentNote: notePath,
        currentNoteContent: content,
        loading: false
      }));

    } catch (error) {
      console.error(`Failed to load note ${notePath}:`, error);
      vaultState.update(state => ({
        ...state,
        loading: false,
        error: error.message
      }));
    }
  },

  /**
   * 保存笔记内容
   */
  async saveNoteContent(notePath, content) {
    try {
      await obsidianApiClient.createNote(content, notePath);

      vaultState.update(state => ({
        ...state,
        currentNoteContent: content
      }));

      return true;
    } catch (error) {
      console.error(`Failed to save note ${notePath}:`, error);
      throw error;
    }
  },

  /**
   * 搜索笔记
   */
  async searchNotes(query) {
    // TODO: 实现全文搜索
    // 可以使用 Obsidian REST API 的搜索端点
    // 或者在客户端实现简单的文件名搜索
  },

  /**
   * 切换文件夹展开状态
   */
  toggleFolderExpansion(folderPath) {
    vaultState.update(state => {
      const isExpanded = state.expandedFolders.includes(folderPath);

      return {
        ...state,
        expandedFolders: isExpanded
          ? state.expandedFolders.filter(p => p !== folderPath)
          : [...state.expandedFolders, folderPath]
      };
    });
  }
};

// 导出 store
export const vaultStore = {
  subscribe: vaultState.subscribe,
  ...vaultActions
};

// 派生 store
export const filteredNotes = derived(
  vaultState,
  $state => {
    // 可以添加过滤逻辑
    return $state.notes;
  }
);

export const currentNoteMetadata = derived(
  vaultState,
  $state => {
    if (!$state.currentNote) return null;

    return {
      path: $state.currentNote,
      name: $state.currentNote.split('/').pop().replace('.md', ''),
      folder: $state.selectedFolder,
      wordCount: $state.currentNoteContent.split(/\s+/).length,
      lineCount: $state.currentNoteContent.split('\n').length
    };
  }
);
```

### 5.4 NoteEditor 增强

**文件**: `src/lib/components/vault/NoteEditor.svelte`

**功能增强:**

1. **实时预览** - Markdown 渲染
2. **编辑/预览切换**
3. **自动保存**
4. **链接跳转** - 支持 `[[wikilink]]` 和 `[]()`
5. **搜索和替换**

```svelte
<script>
  import { vaultStore, currentNoteMetadata } from '$stores/vault.js';
  import { marked } from 'marked';
  import { debounce } from '$utils/debounce.js';

  let editMode = true; // true: 编辑, false: 预览
  let content = '';
  let unsavedChanges = false;

  // 订阅当前笔记内容
  $: if ($vaultStore.currentNoteContent !== content) {
    content = $vaultStore.currentNoteContent;
    unsavedChanges = false;
  }

  // 渲染 Markdown
  $: renderedContent = marked.parse(content);

  // 检测未保存的更改
  $: unsavedChanges = content !== $vaultStore.currentNoteContent;

  // 自动保存（防抖）
  const autoSave = debounce(async () => {
    if (!unsavedChanges || !$vaultStore.currentNote) return;

    try {
      await vaultStore.saveNoteContent($vaultStore.currentNote, content);
      unsavedChanges = false;
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  }, 2000); // 2秒后自动保存

  // 内容变化时触发自动保存
  $: if (unsavedChanges) {
    autoSave();
  }

  // 手动保存
  async function handleSave() {
    if (!$vaultStore.currentNote) return;

    try {
      await vaultStore.saveNoteContent($vaultStore.currentNote, content);
      unsavedChanges = false;
      showToast('保存成功', 'success');
    } catch (error) {
      showToast(`保存失败: ${error.message}`, 'error');
    }
  }

  // 切换编辑/预览模式
  function toggleMode() {
    editMode = !editMode;
  }

  // 处理 Wiki Link 点击
  function handleWikiLinkClick(event) {
    const target = event.target;
    if (target.classList.contains('wiki-link')) {
      event.preventDefault();
      const linkPath = target.getAttribute('data-path');
      if (linkPath) {
        vaultStore.loadNoteContent(linkPath);
      }
    }
  }
</script>

<div class="note-editor h-full flex flex-col">
  {#if $vaultStore.currentNote}
    <!-- Editor Header -->
    <div class="editor-header px-4 py-3 border-b border-border-default flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h2 class="text-headline text-text-primary font-semibold">
          {$currentNoteMetadata?.name || 'Untitled'}
        </h2>

        {#if unsavedChanges}
          <span class="text-xs text-yellow-400">● 未保存</span>
        {/if}
      </div>

      <div class="flex items-center gap-2">
        <!-- Mode Toggle -->
        <button
          on:click={toggleMode}
          class="px-3 py-1.5 text-sm rounded-md transition-colors"
          class:bg-accent={editMode}
          class:text-white={editMode}
        >
          {editMode ? '📝 编辑' : '👁️ 预览'}
        </button>

        <!-- Save Button -->
        <button
          on:click={handleSave}
          class="px-3 py-1.5 bg-accent text-white rounded-md text-sm hover:bg-accent/90 transition-colors"
          disabled={!unsavedChanges}
        >
          💾 保存
        </button>
      </div>
    </div>

    <!-- Editor Content -->
    <div class="editor-content flex-1 overflow-y-auto p-4">
      {#if editMode}
        <!-- Edit Mode -->
        <textarea
          bind:value={content}
          class="w-full h-full min-h-full p-4 bg-background-secondary text-text-primary font-mono text-sm resize-none border-none outline-none"
          placeholder="开始输入..."
        />
      {:else}
        <!-- Preview Mode -->
        <div
          class="prose prose-invert max-w-none"
          on:click={handleWikiLinkClick}
        >
          {@html renderedContent}
        </div>
      {/if}
    </div>

    <!-- Editor Footer -->
    <div class="editor-footer px-4 py-2 border-t border-border-default text-caption text-text-tertiary flex items-center justify-between">
      <span>{$currentNoteMetadata?.folder}</span>
      <span>
        {$currentNoteMetadata?.wordCount} 字 · {$currentNoteMetadata?.lineCount} 行
      </span>
    </div>
  {:else}
    <!-- Empty State -->
    <div class="flex items-center justify-center h-full text-center">
      <div>
        <div class="text-6xl mb-4">📝</div>
        <p class="text-xl text-text-secondary mb-2">选择一个笔记开始编辑</p>
        <p class="text-sm text-text-tertiary">从左侧文件树中选择笔记</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .note-editor {
    background: var(--background-primary);
  }

  .prose {
    @apply text-text-primary;
  }

  .prose h1,
  .prose h2,
  .prose h3 {
    @apply text-text-primary font-semibold;
  }

  .prose a {
    @apply text-accent hover:underline;
  }

  .prose code {
    @apply bg-background-tertiary px-1 py-0.5 rounded text-sm;
  }

  .prose pre {
    @apply bg-background-tertiary p-4 rounded overflow-x-auto;
  }

  /* Wiki Link 样式 */
  :global(.wiki-link) {
    @apply text-accent cursor-pointer hover:underline;
  }
</style>
```

---

## 📊 实施优先级与时间估算

### Phase 1: 导航重构
- **优先级**: 🔴 高
- **时间估算**: 2-4 小时
- **依赖**: 无

### Phase 2: 捕获页面
- **优先级**: 🔴 高
- **时间估算**: 4-6 小时
- **依赖**: Phase 1 完成

### Phase 3: 任务页面
- **优先级**: 🟠 中高
- **时间估算**: 8-12 小时
- **依赖**: Phase 1 完成
- **关键点**: 任务提取逻辑和 Markdown 解析

### Phase 4: 工作流执行
- **优先级**: 🟡 中
- **时间估算**: 12-16 小时
- **依赖**: Phase 3 完成（需要任务提取功能）
- **关键点**: 工作流引擎实现

### Phase 5: Vault 配置
- **优先级**: 🟢 低
- **时间估算**: 6-8 小时
- **依赖**: 无
- **关键点**: 文件夹加载和笔记编辑器

**总计**: 32-46 小时（4-6 个工作日）

---

## 🧪 测试策略

### 单元测试
- TaskExtractor 任务解析逻辑
- WorkflowEngine 步骤执行
- Markdown 渲染和链接处理

### 集成测试
- API 调用（Obsidian REST API）
- 文件读写操作
- 任务状态切换端到端流程

### 用户测试场景
1. **捕获流程**: 语音录音 → 转录 → 编辑 → 保存
2. **任务管理**: 查看今日任务 → 标记完成 → 验证文件更新
3. **工作流执行**: 启动每日反思 → 完成所有步骤 → 验证日志生成
4. **Vault 浏览**: 展开文件夹 → 选择笔记 → 编辑保存

---

## 🚀 部署清单

### 环境变量检查
```bash
✓ PUBLIC_API_URL - Obsidian REST API 地址
✓ PUBLIC_API_KEY - API 认证密钥
✓ PUBLIC_VOICE_API_URL - 语音转录服务（可选）
```

### 依赖安装
```bash
npm install unified remark-parse remark-frontmatter unist-util-visit
npm install date-fns marked
npm install --save-dev @types/marked
```

### 构建和部署
```bash
npm run tokens:build    # 生成设计令牌
npm run build           # 生产构建
npm run preview         # 本地预览
```

### 验证步骤
1. ✅ 导航显示正确的4个页面
2. ✅ 捕获页面语音转录到输入框
3. ✅ 任务页面显示真实的任务数据
4. ✅ 工作流能够成功执行并生成日志
5. ✅ Vault 显示文件夹结构和笔记内容

---

## 📖 API 文档更新

### 新增 API 端点需求

#### 1. 任务提取 API (可选 - 客户端实现)
```
GET /api/tasks/today
GET /api/tasks/month/:year/:month
POST /api/tasks/:taskId/toggle
```

#### 2. 工作流管理 API (可选)
```
GET /api/workflows
GET /api/workflows/:id
POST /api/workflows/:id/execute
GET /api/workflows/:id/state
```

#### 3. Vault 搜索 API (未来)
```
GET /api/vault/search?q=keyword
```

---

## 🔒 安全考虑

1. **API 密钥保护**: 使用环境变量，不要提交到代码库
2. **输入验证**: 所有用户输入必须验证和清理
3. **XSS 防护**: Markdown 渲染使用 DOMPurify 清理
4. **CORS 配置**: 确保 Obsidian REST API 允许 Web 应用访问
5. **文件路径验证**: 防止路径遍历攻击

---

## 📚 文档和培训

### 用户文档
- [ ] 快速开始指南
- [ ] 捕获功能使用说明
- [ ] 任务管理最佳实践
- [ ] 工作流自定义教程
- [ ] Vault 配置指南

### 开发者文档
- [ ] 架构设计文档
- [ ] API 集成指南
- [ ] 工作流定义规范
- [ ] 贡献指南

---

## 🎯 下一步行动

### 立即开始 (本周)
1. ✅ 审阅并确认重构方案
2. 🔄 实施 Phase 1: 导航重构
3. 🔄 实施 Phase 2: 捕获页面统一流程

### 短期目标 (2周内)
1. 完成 Phase 3: 任务提取和管理
2. 开始 Phase 4: 工作流引擎基础实现

### 中期目标 (1个月内)
1. 完成 Phase 4: 每日反思工作流
2. 完成 Phase 5: Vault 完整功能
3. 用户测试和反馈收集

### 长期目标 (2-3个月)
1. 添加更多工作流模板
2. 实现高级搜索和过滤
3. AI 增强功能集成
4. 移动端优化

---

## 📞 支持和反馈

如有问题或建议，请通过以下方式联系：
- GitHub Issues: [项目地址]
- 邮件: [联系邮箱]
- 文档: [文档地址]

---

**文档版本**: 1.0.0  
**最后更新**: 2025-10-30  
**作者**: Claude Code  

