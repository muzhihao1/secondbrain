# Obsidian 知识库前端界面全面重构方案 - 完整实施计划

**版本**: v1.0.0
**日期**: 2025-10-27
**状态**: 📋 规划完成，待审批实施

---

## 📚 目录

1. [项目概述](#1-项目概述)
2. [设计理念与核心价值](#2-设计理念与核心价值)
3. [信息架构重组](#3-信息架构重组)
4. [设计系统规范](#4-设计系统规范)
5. [核心组件库](#5-核心组件库)
6. [技术架构设计](#6-技术架构设计)
7. [实施路线图](#7-实施路线图)
8. [风险管理与质量保障](#8-风险管理与质量保障)

---

## 1. 项目概述

### 1.1 项目背景

基于现有界面评估报告和卡片式设计mockups，现有界面存在以下核心问题：

| 问题类别 | 具体表现 |
|---------|---------|
| **信息架构混乱** | 底部4导航定位模糊，Dashboard缺乏价值，知识库功能薄弱 |
| **视觉层级不清** | 信息密度过高，缺少视觉焦点，色彩单一易疲劳 |
| **交互效率低** | 操作路径过长，缺少全局快捷操作（命令面板） |
| **响应式不足** | 桌面端和移动端体验割裂，布局不灵活 |

### 1.2 项目目标

**核心理念**: "聚合信息，聚焦行动" - 通过卡片式布局重塑知识工作流

**三大价值飞跃**:
1. **体验更清晰**: 混乱界面→井然有序，毫不费力找到信息
2. **操作更高效**: 信息与操作融合，浏览即可行动
3. **视觉更专业**: 统一精致的设计，提升品牌形象

### 1.3 技术约束

- **技术栈**: SvelteKit 2.0 + TailwindCSS + Obsidian Local REST API
- **兼容性**: 保持现有API集成，确保PWA功能不中断
- **性能**: 首屏加载 < 2s, LCP < 2.5s, TTI < 2s
- **方式**: 渐进式重构，不影响现有功能，支持回退

---

## 2. 设计理念与核心价值

### 2.1 为什么选择卡片式布局？

**三大不可替代优势**:

1. **高度模块化，信息一目了然**
   每个卡片都是独立、自包含的信息单元。用户像浏览实体卡片一样快速扫描、识别，极大降低认知负荷。

2. **天生具备响应式能力**
   卡片像积木一样在不同屏幕上轻松重排，确保任何设备上都有一致且优雅的视觉体验。

3. **增强的交互性和可操作性**
   整个卡片区域作为点击目标，承载丰富交互状态（悬停、选中、拖拽）和直接操作按钮，将信息展示与功能操作无缝结合。

### 2.2 设计原则: "沉静专注，流动智能"

- **沉静专注** (Calm Focus): 柔和深色模式、清晰视觉层级、充足留白，减少视觉噪音
- **流动智能** (Fluid Intelligence): 细腻动效、微交互、智能化界面元素，让AI存在自然无感

---

## 3. 信息架构重组

### 3.1 从底部导航到左侧垂直导航

**当前架构问题**: 底部4导航效率低下，移动端思维不适合桌面应用

**新架构**: 左侧垂直导航栏 + 卡片式主工作区

```
┌────────────────────────────────────────────────────────┐
│  ┌──────┐                                              │
│  │ Logo │  🏠 主页 (Home)                             │
│  ├──────┤                                              │
│  │  🏠  │  📁 知识库 (Vault)                          │
│  │  📁  │                                              │
│  │  ⚡  │  ⚡ 工作流 (Workflows)                       │
│  │  ⚙️  │                                              │
│  │      │  ⚙️ 设置 (Settings)                         │
│  │      │                                              │
│  │      │  ⌘K 命令面板 (全局快捷)                     │
│  └──────┘                                              │
│   导航     主工作区（卡片式布局）                       │
└────────────────────────────────────────────────────────┘
```

### 3.2 四大核心模块重新定义

| 模块 | 核心功能 | 设计形式 |
|------|---------|---------|
| **主页 (Home)** | 个人化仪表盘：智能捕获 + 今日聚焦 + 快速访问 + 灵感启发 | 灵活网格系统，4个核心卡片 |
| **知识库 (Vault)** | 完整知识管理：文件树 + 卡片列表 + Markdown编辑器 | 三栏布局，中间栏为卡片视图 |
| **工作流 (Workflows)** | 自动化引擎：模板市场 + 可视化编辑器 + 我的工作流 | 画廊式卡片网格 |
| **设置 (Settings)** | 系统配置：API + PWA + 主题 + 快捷键 + 实验功能 | 分组表单，Tab导航 |

### 3.3 全局功能：命令面板 (⌘+K)

**功能定位**: 现代生产力工具标配，通过快捷键快速访问任何功能、文件或设置

**技术方案**:
- 搜索引擎: Fuse.js (可替换)
- 交互模式: Focus trap + 键盘导航 + 异步命令支持
- 提供者系统: 插件化，支持动态注册命令

---

## 4. 设计系统规范

### 4.1 色彩体系 (基于 OKLCH)

**语义化 Design Tokens**:

```css
/* 背景层级 */
--color-bg-default: #121212;      /* 主背景 - 深邃灰 */
--color-surface-default: #1E1E1E; /* 卡片/浮层 - 层级灰 */
--color-surface-elevated: #252525; /* 提升层级 */
--color-surface-muted: #191919;    /* 弱化层级 */

/* 强调色 */
--color-accent-fg: #00A9A5;        /* 活力青 - 按钮/链接 */
--color-accent-bg: rgba(0,169,165,0.1); /* 背景使用 */
--color-accent-hover: #00C4C0;     /* 悬停态 */
--color-accent-active: #008B88;    /* 激活态 */

/* 文本层级 (通过不透明度区分) */
--color-text-primary: rgba(255,255,255,1.0);   /* 100% */
--color-text-secondary: rgba(255,255,255,0.8); /* 80% */
--color-text-tertiary: rgba(255,255,255,0.6);  /* 60% */
--color-text-disabled: rgba(255,255,255,0.4);  /* 40% */

/* 反馈色 */
--color-success: #10B981;
--color-warning: #F59E0B;
--color-danger: #EF4444;
--color-info: #3B82F6;

/* 边框 */
--color-border-default: rgba(255,255,255,0.08);
--color-border-focus: var(--color-accent-fg);
--color-border-subtle: rgba(255,255,255,0.04);
```

### 4.2 字体排印

**字体选择**:
- **UI Sans**: Inter Variable (英文)
- **UI CJK**: 思源黑体 Noto Sans SC (中文)
- **Mono**: JetBrains Mono Variable (代码)

**字号体系** (基于 rem, 1rem = 16px):

| Token | Size | Line Height | 用途 |
|-------|------|------------|------|
| `text-xs` | 12px (0.75rem) | 1.5 | 辅助信息、标签 |
| `text-sm` | 14px (0.875rem) | 1.5 | 次要文本、说明 |
| `text-base` | 16px (1rem) | 1.5 | 正文默认 |
| `text-lg` | 18px (1.125rem) | 1.4 | 卡片标题 |
| `text-xl` | 20px (1.25rem) | 1.3 | 页面子标题 |
| `text-2xl` | 24px (1.5rem) | 1.3 | 页面主标题 |
| `text-3xl` | 30px (1.875rem) | 1.2 | Hero标题 |

**字体加载策略**:
- 自托管 woff2 格式 (隐私+离线)
- `font-display: optional` (UI字体)
- 预加载关键子集 (Latin基础 + 常用符号)
- CJK字体使用系统默认，避免体积问题

### 4.3 间距与布局 (8px Grid System)

**间距阶梯** (基于 4px/8px 网格):

```css
--space-0: 0;
--space-1: 4px;    /* 0.25rem */
--space-2: 8px;    /* 0.5rem */
--space-3: 12px;   /* 0.75rem */
--space-4: 16px;   /* 1rem */
--space-5: 20px;   /* 1.25rem */
--space-6: 24px;   /* 1.5rem */
--space-8: 32px;   /* 2rem */
--space-10: 40px;  /* 2.5rem */
--space-12: 48px;  /* 3rem */
--space-16: 64px;  /* 4rem */
```

**卡片规范**:
- **卡片内边距**: `space-6` (24px)
- **卡片间距**: `space-4` (16px)
- **卡片圆角**: `radius-md` (12px)
- **卡片阴影**: `shadow-md` (柔和弥散)

### 4.4 圆角系统

```css
--radius-none: 0;
--radius-sm: 6px;
--radius-md: 12px;    /* 卡片默认 */
--radius-lg: 16px;
--radius-full: 9999px; /* 圆形按钮 */
```

### 4.5 阴影系统 (Elevated Style)

```css
--shadow-xs: 0 1px 2px rgba(0,0,0,0.05);
--shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
--shadow-md: 0 4px 12px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.05);
--shadow-lg: 0 12px 24px rgba(0,0,0,0.2), 0 4px 8px rgba(0,0,0,0.08);
--shadow-xl: 0 24px 48px rgba(0,0,0,0.25), 0 8px 16px rgba(0,0,0,0.1);
```

### 4.6 动效规范

**持续时间**:
```css
--duration-fast: 100ms;    /* 微交互 */
--duration-base: 200ms;    /* 标准过渡 */
--duration-slow: 300ms;    /* 复杂动画 */
--duration-slower: 500ms;  /* 页面转换 */
```

**缓动函数**:
```css
--easing-linear: cubic-bezier(0, 0, 1, 1);
--easing-ease-out: cubic-bezier(0, 0, 0.2, 1);    /* 默认 */
--easing-ease-in: cubic-bezier(0.4, 0, 1, 1);
--easing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

**尊重用户偏好**:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4.7 图标系统

**选择**: Lucide Icons (高质量线性图标库)

**规范**:
- **尺寸**: 16px / 20px / 24px / 32px
- **描边宽度**: 1.5px (consistent)
- **导入方式**: 按需导入 (tree-shaking)
- **使用**: `<Icon name="home" size={20} />`

---

## 5. 核心组件库

### 5.1 基础组件 (Primitives)

**组件清单**:

| 组件 | Props | Slots | Events | A11y |
|------|-------|-------|--------|------|
| **Button** | variant, size, disabled, loading | default, leading, trailing | onClick | focus-visible, aria-busy |
| **IconButton** | variant, size, disabled, loading, ariaLabel | - | onClick | aria-label必需 |
| **Input** | value, placeholder, invalid, disabled | prefix, suffix, hint, error | onInput, onChange, onClear | aria-invalid, aria-describedby |
| **Card** | elevation, bordered, hoverable | default | onClick? | - |
| **Badge** | variant, size | default | - | - |
| **Tooltip** | content, placement | trigger | - | aria-describedby |
| **Popover** | open, placement | trigger, content | onOpenChange | role="dialog" |
| **Modal** | open, closeOnEsc, closeOnOutside | default | onOpenChange | focus trap, body scroll lock |
| **Tabs** | value, items | - | onChange | roving tabindex |
| **Menu** | items, open | trigger | onSelect, onOpenChange | keyboard nav |
| **List** | virtualized, selectionMode | default | onSelect | aria-listbox |
| **Splitter** | direction, sizes, min, max | - | onResize | keyboard resize |

### 5.2 复合组件

**LeftNav** (左侧导航):
```typescript
interface LeftNavProps {
  state: 'expanded' | 'collapsed' | 'hidden';
  width: number; // expanded时的宽度
  items: NavItem[];
  selectedItemId: string | null;
  onStateChange: (state) => void;
  onSelect: (itemId) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: string; // Lucide icon name
  route: string;
  badge?: number;
  children?: NavItem[];
}
```

**CommandPalette** (命令面板):
```typescript
interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open) => void;
  providers: CommandProvider[];
  placeholder?: string;
  maxResults?: number;
}

interface CommandProvider {
  id: string;
  name: string;
  getCommands: (ctx: CommandContext) => Promise<Command[]>;
}

interface Command {
  id: string;
  title: string;
  subtitle?: string;
  icon?: string;
  shortcut?: string[];
  tags?: string[];
  run: (ctx: CommandContext) => Promise<void> | void;
  isAvailable?: (ctx: CommandContext) => boolean;
}
```

**VaultCardList** (知识库卡片列表):
```typescript
interface VaultCardListProps {
  notes: Note[];
  virtualized?: boolean;
  selectionMode?: 'single' | 'multiple' | 'none';
  onSelect: (noteIds: string[]) => void;
  onAction: (noteId: string, action: string) => void;
}

interface NoteCard {
  id: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  coverImage?: string;
  modifiedAt: Date;
  metadata?: Record<string, any>;
}
```

**WorkflowCard** (工作流卡片):
```typescript
interface WorkflowCardProps {
  workflow: Workflow;
  onLaunch: () => void;
  onEdit: () => void;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  icon: string;
  color?: string; // accent color
  status: 'active' | 'inactive' | 'draft';
  lastRun?: Date;
}
```

---

## 6. 技术架构设计

### 6.1 路由架构 (SvelteKit 2.0)

```
src/routes/
├── +layout.svelte                 # 全局布局: 导航 + 命令面板 + 主题Provider
├── +layout.ts                     # 全局加载逻辑
├── (app)/                         # 应用主路由组
│   ├── +layout.svelte             # 左侧导航布局
│   ├── +page.svelte               # 重定向到 /home
│   ├── home/                      # 主页
│   │   ├── +page.svelte
│   │   └── +page.ts
│   ├── vault/                     # 知识库
│   │   ├── +layout.svelte         # 三栏布局
│   │   ├── +page.svelte           # 默认视图
│   │   ├── folder/[...path]/      # 文件夹视图
│   │   │   └── +page.svelte
│   │   └── note/[id]/             # 笔记详情
│   │       └── +page.svelte
│   ├── workflows/                 # 工作流
│   │   ├── +page.svelte           # 画廊视图
│   │   ├── market/                # 模板市场
│   │   │   └── +page.svelte
│   │   └── editor/[id]/           # 可视化编辑器
│   │       └── +page.svelte
│   └── settings/                  # 设置
│       └── +page.svelte
└── api/                           # API路由 (现有)
    └── transcribe/
        └── +server.js
```

### 6.2 状态管理策略

**方案选择**: **Svelte Stores + TanStack Query (混合方案)**

**状态域划分**:

```typescript
// UI状态 - Svelte Stores
stores/
├── nav.ts              // 导航状态 (collapsed, selectedItem)
├── theme.ts            // 主题状态 (light/dark, density)
├── commandPalette.ts   // 命令面板状态
└── layout.ts           // 布局状态 (pane widths)

// 远程数据 - TanStack Query
queries/
├── vault.ts            // 知识库查询 (files, folders, search)
├── notes.ts            // 笔记CRUD
├── workflows.ts        // 工作流查询
└── settings.ts         // 设置持久化
```

**持久化策略**:
- **localStorage**: UI偏好 (nav state, pane widths, theme)
- **IndexedDB**: 离线缓存 (笔记内容, 列表数据)
- **URL**: 可分享状态 (selected resource, pane mode)

### 6.3 组件架构

```
src/lib/
├── components/
│   ├── base/                 # 基础组件 (Primitives)
│   │   ├── Button.svelte
│   │   ├── Input.svelte
│   │   ├── Card.svelte
│   │   └── ...
│   ├── composite/            # 复合组件
│   │   ├── LeftNav/
│   │   │   ├── LeftNav.svelte
│   │   │   ├── NavItem.svelte
│   │   │   └── NavGroup.svelte
│   │   ├── CommandPalette/
│   │   │   ├── CommandPalette.svelte
│   │   │   ├── CommandInput.svelte
│   │   │   ├── CommandList.svelte
│   │   │   └── CommandItem.svelte
│   │   ├── VaultCardList/
│   │   │   ├── CardList.svelte
│   │   │   ├── NoteCard.svelte
│   │   │   └── EmptyState.svelte
│   │   └── WorkflowCard/
│   │       └── WorkflowCard.svelte
│   └── layouts/              # 布局组件
│       ├── AppShell.svelte
│       ├── ThreeColumnLayout.svelte
│       └── GridLayout.svelte
├── stores/                   # Svelte stores
├── queries/                  # TanStack Query definitions
├── services/                 # 业务逻辑
│   ├── audioService.js      # 现有
│   ├── obsidianApiClient.js # 现有
│   ├── commandRegistry.ts   # 命令注册
│   └── themeManager.ts      # 主题管理
├── utils/
│   ├── constants.js         # 现有
│   ├── helpers.js           # 现有
│   └── shortcuts.ts         # 快捷键管理
└── styles/
    ├── tokens.css           # Design Tokens
    ├── base.css             # 基础样式重置
    └── utilities.css        # Tailwind扩展
```

### 6.4 响应式断点

```css
/* Tailwind配置 */
module.exports = {
  theme: {
    screens: {
      'xs': '480px',   // 手机横屏
      'sm': '640px',   // 大手机/小平板
      'md': '768px',   // 平板
      'lg': '1024px',  // 小笔记本
      'xl': '1280px',  // 桌面
      '2xl': '1536px', // 大桌面
    }
  }
}
```

**布局适配规则**:

| 断点 | 左侧导航 | Vault布局 | 工作流网格 | 命令面板 |
|------|---------|-----------|-----------|----------|
| XS/SM | 隐藏(抽屉) | 单栏 | 1列 | 全屏模态 |
| MD | 折叠(64px) | 双栏 | 2列 | 全屏模态 |
| LG | 展开(264px) | 三栏 | 3列 | 居中对话框 |
| XL/2XL | 展开(264px) | 三栏(可调) | 4列 | 居中对话框 |

---

## 7. 实施路线图

### 7.1 Phase 0: 准备阶段 (Week 1-2)

**目标**: 建立基础设施和设计系统

**任务清单**:
- [ ] ✅ Design Tokens 定义与生成 (Style Dictionary)
- [ ] ✅ TailwindCSS Preset 配置
- [ ] ✅ 字体自托管与子集化
- [ ] ✅ Storybook 初始化 + 主题切换
- [ ] ✅ 基础组件 Primitives (Button, Input, Card等 16个)
- [ ] ✅ A11y 对比度自动检测脚本
- [ ] ✅ 性能基线测试 (Lighthouse)

**交付物**:
- `/tokens/` Design Tokens源文件
- `/packages/tailwind-preset-ui/` Tailwind配置
- `/packages/ui-primitives/` 基础组件库
- `/docs/design-system/` 设计系统文档

### 7.2 Phase 1: 全局骨架 (Week 3-4)

**目标**: 实现左侧导航 + 命令面板 + 路由架构

**任务清单**:
- [ ] 🔨 实现 AppShell 布局 (左侧导航 + 主内容区)
- [ ] 🔨 LeftNav 组件 (折叠/展开/隐藏 + 状态持久化)
- [ ] 🔨 CommandPalette 组件 (Fuse.js + 键盘导航)
- [ ] 🔨 路由架构 (SvelteKit路由 + URL状态同步)
- [ ] 🔨 全局快捷键系统 (⌘+K, 导航快捷键)
- [ ] 🔨 主题切换功能 (light/dark + data-theme)
- [ ] 🔨 移动端底部导航 (抽屉模式)

**里程碑**: 用户可以通过新导航在模块间切换，使用命令面板快速访问功能

### 7.3 Phase 2: 主页重构 (Week 5-6)

**目标**: 实现卡片式主页 Dashboard

**任务清单**:
- [ ] 🎨 智能捕获卡片 (快速输入 + 附件上传)
- [ ] 🎨 今日聚焦卡片 (待办 + 日历集成)
- [ ] 🎨 最近笔记卡片 (列表 + 快捷操作)
- [ ] 🎨 工作流快捷卡片 (图标 + 启动按钮)
- [ ] 🎨 响应式网格布局 (CSS Grid + 断点适配)
- [ ] 🎨 卡片拖拽排序 (可选功能)
- [ ] 🎨 空状态设计 (初次使用引导)

**里程碑**: 主页完全重构，用户获得聚合仪表盘体验

### 7.4 Phase 3: 知识库重构 (Week 7-9)

**目标**: 实现三栏布局 + 卡片列表视图

**任务清单**:
- [ ] 📁 三栏布局实现 (Grid + 可调整 Splitter)
- [ ] 📁 左栏: 文件树组件 (虚拟滚动 + 异步加载)
- [ ] 📁 中栏: 卡片列表视图 (NoteCard + 虚拟化)
- [ ] 📁 右栏: Markdown编辑器集成 (CodeMirror 6)
- [ ] 📁 全局搜索功能 (顶部搜索框)
- [ ] 📁 状态同步逻辑 (selection → tabs → editor)
- [ ] 📁 快捷键系统 (文件导航、切换视图)
- [ ] 📁 移动端适配 (单栏 + Sheet详情)

**里程碑**: 知识库体验完整，用户可以流畅浏览和编辑笔记

### 7.5 Phase 4: 工作流重构 (Week 10-11)

**目标**: 实现工作流画廊 + 可视化编辑器

**任务清单**:
- [ ] ⚡ 工作流画廊视图 (WorkflowCard网格)
- [ ] ⚡ 模板市场 Tab (浏览 + 安装)
- [ ] ⚡ 我的工作流 Tab (管理 + 运行)
- [ ] ⚡ 可视化编辑器 (节点画布 - 可延后到v2)
- [ ] ⚡ 工作流启动交互 (参数表单 + 进度反馈)
- [ ] ⚡ 工作流状态指示 (active/inactive/draft)

**里程碑**: 工作流模块完整，用户可以管理和运行自动化流程

### 7.6 Phase 5: 设置与优化 (Week 12-13)

**目标**: 完成设置页面 + 性能优化 + 测试

**任务清单**:
- [ ] ⚙️ 设置页面重构 (Tab分组 + 搜索设置项)
- [ ] ⚙️ API配置、PWA管理、主题设置、快捷键配置
- [ ] 🚀 代码分割与懒加载优化
- [ ] 🚀 图片/字体优化 (WebP, 子集化)
- [ ] 🚀 Service Worker缓存策略更新
- [ ] 🧪 E2E测试覆盖核心流程
- [ ] 🧪 A11y审计 (axe + 手动屏幕阅读器)
- [ ] 📊 性能监控埋点 (Web Vitals)

**里程碑**: 应用达到生产就绪状态

### 7.7 Phase 6: 上线与迭代 (Week 14+)

**任务清单**:
- [ ] 🚢 灰度发布 (Feature Flag控制)
- [ ] 🚢 用户反馈收集
- [ ] 🚢 Bug修复与微调
- [ ] 🚢 文档更新 (用户手册 + 开发文档)
- [ ] 📈 数据分析与优化建议

---

## 8. 风险管理与质量保障

### 8.1 主要风险与缓解措施

| 风险 | 严重性 | 缓解措施 |
|------|-------|---------|
| **性能回退** | 高 | 设定性能预算(首屏<2s)，CI自动检测，关键路径优先加载 |
| **A11y缺陷** | 高 | axe自动化测试，手动屏幕阅读器测试，WCAG 2.2 AA标准 |
| **状态同步Bug** | 中 | 严格TypeScript类型，状态机验证，E2E测试覆盖 |
| **移动端体验差** | 中 | 移动优先设计，真机测试，手势冲突检测 |
| **API兼容性破坏** | 中 | 适配层隔离，向后兼容，回退机制 |
| **用户反弹** | 中 | 渐进式发布，Feature Flag，旧版本保留入口 |

### 8.2 质量标准

**性能指标**:
- 首屏加载 < 2s (4G网络)
- LCP < 2.5s
- TTI < 2s
- CLS < 0.1
- FID < 100ms

**可访问性标准**:
- WCAG 2.2 Level AA
- 键盘完全可操作
- 屏幕阅读器友好 (NVDA, VoiceOver测试)
- 色彩对比度 >= 4.5:1 (文本)

**浏览器兼容性**:
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- 移动端: iOS Safari 15+, Chrome Android

### 8.3 测试策略

**单元测试**:
- 基础组件 Props/Events验证
- Store逻辑测试 (reducers, selectors)
- 工具函数测试

**集成测试**:
- 命令面板搜索与执行
- Vault三栏状态同步
- 路由导航与URL同步

**E2E测试 (Playwright)**:
- 核心用户流程 (捕获→保存→浏览→编辑)
- 命令面板快捷操作
- 工作流启动与执行
- 跨设备响应式

**视觉回归测试**:
- Storybook + Chromatic (可选)
- 关键页面截图对比

---

## 9. 附录

### 9.1 参考资料

- [原始评估文档] `/Documents/Obsidian 知识库前端界面全面评估与重构方案.md`
- [卡片设计理念] `/Documents/核心理念_ "聚合信息,聚焦行动"——卡片式布局重塑您的知识工作流.md`
- [设计Mockups]:
  - `home_dashboard_mockup.png`
  - `vault_card_view_mockup.png`
  - `workflows_gallery_mockup.png`

### 9.2 决策记录

| 决策 | 日期 | 理由 |
|------|------|------|
| 选择卡片式布局 | 2025-10-27 | 模块化、响应式、交互性强，符合现代设计趋势 |
| 使用Svelte Stores + TanStack Query | 2025-10-27 | 平衡简单性与功能性，避免过度工程化 |
| 编辑器选择CodeMirror 6 | 2025-10-27 | 与Obsidian一致性，生态成熟，扩展性强 |
| 命令面板使用Fuse.js | 2025-10-27 | 成熟稳定，包体积可接受，可后续替换 |
| 自托管字体 | 2025-10-27 | 隐私保护，离线支持，避免CDN依赖 |

### 9.3 团队协作

**建议团队结构** (如适用):
- **UI/UX Designer**: 1人 - 设计系统维护、Mockup细化
- **Frontend Lead**: 1人 - 架构决策、代码审查
- **Frontend Developers**: 2-3人 - 组件实现、功能开发
- **QA Engineer**: 1人 - 测试策略、E2E测试编写

**沟通机制**:
- 每周设计评审 (Week 1, 3, 5, 7, 9)
- 每日站会 (15min同步进度)
- 每2周Sprint回顾
- 文档先行 (Design Doc → Code Review → Implementation)

---

**文档版本**: v1.0.0
**最后更新**: 2025-10-27
**作者**: Claude Code + Ultra MCP
**审批状态**: ⏳ 待审批

**下一步行动**:
1. 团队评审本方案
2. 确认资源与时间线
3. 启动 Phase 0 准备工作
4. 建立项目看板与里程碑追踪

---

*此方案基于现有评估报告、卡片设计mockups和Ultra MCP深度分析生成。方案采用渐进式实施策略，确保在保持现有功能的同时，逐步完成全面重构。*
