# 🎯 实施计划 - Obsidian前端界面系统

基于Ultra MCP深度分析制定

## 📋 核心需求总结

1. **快速捕捉** - 文本 + 语音转文字 ✅（已完成）
2. **工作流系统** - 任务管理、每日反思、写作
3. **每日工作日志** - 查看每天进度
4. **每月规划** - 查看月度计划

## 🏗️ 系统架构

### 路由结构
```
/ → 重定向到 /dashboard
/dashboard - 仪表盘（聚合信息+聚焦行动）
/capture - 快速捕捉 ✅
/workflows-gallery - 工作流画廊 ✅
/workflow/:id - 具体工作流执行页
/timeline/daily/:date? - 每日日志
/timeline/monthly/:month? - 每月规划
/vault - 知识库浏览 ✅
```

### Dashboard组件结构
```
Dashboard
├── QuickCaptureEntry (快速捕获入口)
│   └── 点击跳转到/capture或弹出模态框
├── TodayTasks (今日任务)
│   └── 从Obsidian查询今天到期任务
├── WorkflowShortcuts (核心工作流快捷方式)
│   ├── 任务管理
│   ├── 每日反思计划
│   └── 写作工作流
└── RecentJournalPreview (近期日志预览)
    └── 显示最近一篇每日日志摘要
```

## ⚡ Phase 1: 核心功能（立即实施）

### 1.1 Dashboard重构
**目标**: 聚合信息 + 聚焦行动

**需要创建的组件**:
- [x] `QuickCaptureEntry.svelte` - 紧凑的捕获入口
- [ ] `TodayTasks.svelte` - 今日任务列表
- [ ] `WorkflowShortcuts.svelte` - 工作流快捷卡片
- [ ] `RecentJournalPreview.svelte` - 日志预览卡片

**页面重构**: `src/routes/+page.svelte`
- 移除纯卡片画廊布局
- 添加4个核心区域
- 保持响应式设计

### 1.2 Timeline实现
**目标**: 时间维度的信息聚合

**需要创建**:
- [ ] `src/routes/timeline/daily/+page.svelte` - 每日日志
- [ ] `src/routes/timeline/monthly/+page.svelte` - 每月规划
- [ ] `DailyJournalView.svelte` - 每日日志组件
- [ ] `MonthlyPlanView.svelte` - 每月规划组件
- [ ] `DatePicker.svelte` - 日期选择器

**数据查询**:
- 从Obsidian API查询Daily Notes (`Journal/YYYY-MM-DD.md`)
- 从Obsidian API查询Monthly Plans (`Journal/YYYY-MM.md`)
- 聚合当天完成的任务、创建的笔记

## 🔮 Phase 2: 工作流扩展（后续）

### 2.1 动态工作流路由
- [ ] `src/routes/workflow/[id]/+page.svelte`
- [ ] 工作流模板系统

### 2.2 具体工作流页面
- [ ] `/workflow/daily-review` - 每日反思计划
- [ ] `/workflow/task-management` - 任务管理
- [ ] `/workflow/start-writing` - 写作工作流

## 📊 数据流架构

```
用户操作
  ↓
Svelte组件
  ↓
syncStore (状态管理)
  ↓
IndexedDB (立即更新 + 离线队列)
  ↓ ↓
  UI更新 | 后台同步
         ↓
   Obsidian API
         ↓
   Obsidian Vault
```

### IndexedDB结构
```typescript
{
  notes: {
    key: "path/to/note.md",
    value: { content, metadata, timestamp }
  },
  tasks: {
    key: "taskId",
    value: { description, date, project, status }
  },
  sync_queue: {
    key: "operationId",
    value: { type, path, data, timestamp, retries }
  }
}
```

## 🎨 设计原则

1. **聚合信息** - Dashboard聚合最重要的信息
2. **聚焦行动** - 明确的行动入口（捕获、工作流）
3. **离线优先** - 即时响应，后台同步
4. **响应式设计** - 移动端优先
5. **视觉一致性** - 使用VNext Design System

## ✅ 当前状态

**已完成**:
- ✅ /capture - 完整的快速捕获功能
- ✅ /workflows-gallery - 工作流画廊
- ✅ WorkflowCard组件
- ✅ VNext Design System（tokens, primitives）
- ✅ 离线同步基础（syncStore, IndexedDB）

**待实施**:
- ⚠️ Dashboard重构
- ❌ Timeline页面（每日+每月）
- ❌ 动态工作流路由

## 📅 实施时间线

**Week 1-2**: Phase 1
- Day 1-3: Dashboard重构
- Day 4-6: Timeline每日日志
- Day 7: Timeline每月规划

**Week 3+**: Phase 2
- 动态工作流系统
- 具体工作流页面实现

## 🔗 与Obsidian的交互

### 依赖的文件夹结构
```
01-Inbox/ - 快速捕获
02-Journal/
  ├── Daily/YYYY-MM-DD.md - 每日笔记
  └── Monthly/YYYY-MM.md - 每月规划
03-Projects/ - 项目笔记
```

### 核心API端点
- `search` - 查询特定笔记/任务
- `read` - 读取文件内容
- `write` - 创建/覆盖文件
- `append` - 追加内容到文件末尾

---

**版本**: 1.0.0
**更新日期**: 2025-10-28
**基于**: Ultra MCP深度分析
