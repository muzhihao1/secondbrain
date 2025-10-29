# 🎨 Obsidian Web Interface - 前端项目文档

> AI驱动的Obsidian知识管理Web界面 | 2025-10-29更新

---

## 📋 目录

- [项目概览](#项目概览)
- [最近更新](#最近更新)
- [核心架构](#核心架构)
- [设计系统](#设计系统)
- [文档导航](#文档导航)
- [开发指南](#开发指南)

---

## 项目概览

### 🎯 项目愿景

构建一个现代化、响应式的Web界面，为Obsidian知识库提供：
- **快速捕获**：2秒完成想法记录，支持文本和语音输入
- **工作流管理**：可视化、可交互的知识处理工作流
- **智能浏览**：高效的知识库导航和搜索
- **移动优先**：PWA支持，离线可用

### 🏗️ 技术栈

| 类别 | 技术 | 版本 | 用途 |
|------|------|------|------|
| **框架** | SvelteKit | 2.0 | 服务端渲染 + 客户端路由 |
| **构建** | Vite | 5.0 | 快速构建和热更新 |
| **样式** | Tailwind CSS | 3.4 | 实用优先的CSS框架 |
| **设计令牌** | Style Dictionary | 4.x | 设计系统token管理 |
| **状态管理** | Svelte Stores | 原生 | 响应式状态 |
| **数据可视化** | Chart.js | 4.4 | 数据图表 |
| **本地存储** | IndexedDB (idb) | 8.0 | 离线数据持久化 |
| **PWA** | vite-plugin-pwa | 0.17 | 渐进式Web应用 |

---

## 最近更新

### ✨ 2025-10-29: 响应式导航架构

**问题**: 桌面端和移动端导航同时显示，造成冗余

**解决方案**:
- 实现断点式响应导航（1024px断点）
- 桌面端（≥1024px）：显示左侧Sidebar
- 移动端（<1024px）：显示底部BottomNav
- 统一导航配置（`src/lib/config/navItems.js`）
- 响应式屏幕宽度监听（`src/lib/stores/screen.js`）

**影响的文件**:
- `src/lib/stores/screen.js` - 新增屏幕宽度store
- `src/lib/config/navItems.js` - 统一导航配置
- `src/routes/+layout.svelte` - 条件渲染导航
- `src/lib/components/layout/Sidebar.svelte` - 使用统一配置
- `src/lib/components/BottomNav.svelte` - 使用统一配置

### 🎨 2025-10-28: Dashboard重设计

**核心改进**:
- Card组件化设计系统
- 深色主题 + Cyan强调色（#00A9A5）
- 2栏网格布局（桌面端）
- 毛玻璃效果和现代阴影

**相关文档**: [`docs/reports/DASHBOARD_REDESIGN_REPORT.md`](docs/reports/DASHBOARD_REDESIGN_REPORT.md)

### 🚀 Phase 1 完成

**里程碑**: 核心功能和架构建立完成

**详细报告**: [`docs/reports/PHASE_1_FINAL_REPORT.md`](docs/reports/PHASE_1_FINAL_REPORT.md)

---

## 核心架构

### 🗂️ 项目结构

```
web/
├── src/
│   ├── lib/
│   │   ├── components/          # UI组件
│   │   │   ├── primitives/      # 基础组件（Button, Heading, etc）
│   │   │   ├── composite/       # 复合组件（Card, etc）
│   │   │   ├── layout/          # 布局组件（Sidebar, PageLayout）
│   │   │   └── shared/          # 共享组件（Toast, etc）
│   │   ├── stores/              # Svelte状态管理
│   │   │   ├── captureStore.js  # 捕获数据
│   │   │   ├── syncStore.js     # 同步状态
│   │   │   ├── screen.js        # 屏幕宽度（响应式）
│   │   │   └── uiStore.js       # UI状态
│   │   ├── services/            # 业务逻辑
│   │   │   ├── apiClient.js     # API封装
│   │   │   ├── audioService.js  # 语音处理
│   │   │   └── dbService.js     # IndexedDB
│   │   ├── config/              # 配置文件
│   │   │   └── navItems.js      # 导航配置
│   │   ├── tokens/              # 设计令牌（自动生成）
│   │   ├── styles/              # 全局样式
│   │   └── utils/               # 工具函数
│   ├── routes/                  # SvelteKit路由
│   │   ├── +layout.svelte       # 全局布局（导航）
│   │   ├── +page.svelte         # Home Dashboard
│   │   ├── capture/             # 快速捕获
│   │   ├── vault/               # 知识库
│   │   └── workflows-gallery/   # 工作流画廊
│   ├── app.html                 # HTML模板
│   └── app.css                  # 全局样式
├── tokens/                      # 设计令牌源文件
│   ├── colors.json
│   ├── spacing.json
│   └── style-dictionary.config.js
├── static/
│   ├── manifest.json            # PWA配置
│   └── icons/                   # App图标
├── docs/                        # 📚 项目文档
│   ├── reports/                 # 当前有效报告
│   ├── archive/                 # 归档的旧文档
│   ├── DEPLOYMENT_GUIDE.md
│   ├── VERCEL_ENV_SETUP.md
│   └── IMPLEMENTATION_PLAN.md
└── ADR/                         # 架构决策记录
```

### 🎯 组件架构层次

```
┌─────────────────────────────────────┐
│  Pages (routes/)                    │
│  - 页面级组件                       │
│  - 路由和数据加载                   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Layout Components                  │
│  - PageLayout, Sidebar, BottomNav   │
│  - 页面结构和导航                   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Composite Components               │
│  - Card, Stack, Cluster             │
│  - 业务相关的复合组件               │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  Primitive Components               │
│  - Button, Heading, Text            │
│  - 基础UI构建块                     │
└─────────────────────────────────────┘
```

---

## 设计系统

### 🎨 设计令牌

使用 **Style Dictionary** 管理设计系统：

```bash
# 构建设计令牌
npm run tokens:build
```

**令牌类别**:
- **颜色**: 中性色、品牌色（teal/purple）、语义色
- **间距**: 4px基础单位，8-64px范围
- **圆角**: sm(4px), md(8px), lg(12px), xl(16px)
- **阴影**: card, strong, focus
- **字体**: Inter字体族，14-48px字号

**输出**:
- `src/lib/styles/tokens.css` - CSS变量
- `src/lib/tokens/index.js` - JavaScript对象

### 🌙 颜色系统

| 用途 | 颜色 | 值 |
|------|------|-----|
| 背景主色 | background-primary | #1a1a1a |
| 背景次色 | background-secondary | #252525 |
| 背景三级 | background-tertiary | #3a3a3c |
| 强调色 | accent | #00A9A5 (Cyan) |
| 品牌紫色 | brand-purple | #9c27b0 |
| 文本白色 | white | #ffffff |

### 📐 断点系统

| 断点 | 宽度 | 用途 |
|------|------|------|
| Mobile | < 640px | 手机纵向 |
| Tablet | 640px - 1023px | 平板和手机横向 |
| Desktop | ≥ 1024px | 桌面和笔记本 |

**导航断点**: 1024px
- `< 1024px`: BottomNav（底部导航）
- `≥ 1024px`: Sidebar（左侧边栏）

---

## 文档导航

### 📚 主要文档

| 文档 | 描述 | 链接 |
|------|------|------|
| **README** | 快速开始和基础使用 | [README.md](README.md) |
| **SETUP** | 详细安装配置 | [SETUP.md](SETUP.md) |
| **本文档** | 项目总览和架构 | 当前文件 |

### 📊 报告文档

| 报告 | 日期 | 描述 |
|------|------|------|
| Phase 1最终报告 | 2025-10-28 | [PHASE_1_FINAL_REPORT.md](docs/reports/PHASE_1_FINAL_REPORT.md) |
| Dashboard重设计 | 2025-10-28 | [DASHBOARD_REDESIGN_REPORT.md](docs/reports/DASHBOARD_REDESIGN_REPORT.md) |
| 生产部署报告 | 2025-10-28 | [PRODUCTION_DEPLOYMENT_REPORT.md](docs/reports/PRODUCTION_DEPLOYMENT_REPORT.md) |

### 🔧 技术指南

| 指南 | 描述 |
|------|------|
| [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md) | 部署到Vercel和生产环境 |
| [VERCEL_ENV_SETUP.md](docs/VERCEL_ENV_SETUP.md) | Vercel环境变量配置 |
| [IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) | 实现计划和任务 |

### 📦 归档文档

旧的和过时的文档已移至 [`docs/archive/`](docs/archive/)

---

## 开发指南

### 🚀 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 设置 PUBLIC_API_URL

# 3. 构建设计令牌
npm run tokens:build

# 4. 启动开发服务器
npm run dev
```

### 🛠️ 开发命令

```bash
# 开发模式（热重载）
npm run dev

# 构建设计令牌
npm run tokens:build

# 类型检查
npm run check

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码格式化
npm run format

# 代码检查
npm run lint
```

### 📝 代码规范

**组件创建**:
1. 使用 **primitive → composite → layout** 层次
2. Props使用 `export let` 声明
3. 样式使用Tailwind + 设计令牌
4. 响应式使用断点类（`md:`, `lg:`）

**Stores使用**:
```javascript
import { myStore } from '$stores/myStore.js';

// 读取
$: value = $myStore;

// 更新
myStore.update(n => n + 1);
```

**路由约定**:
- `+page.svelte` - 页面组件
- `+layout.svelte` - 布局组件
- `+server.js` - 服务端API路由

### 🎨 设计令牌使用

**CSS变量**:
```css
.my-component {
  background: var(--surface-surface-default);
  color: var(--text-primary);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
}
```

**JavaScript**:
```javascript
import tokens from '$lib/tokens';

const primaryColor = tokens.color.brand.teal[500];
```

### 📱 响应式开发

**断点检查**:
```javascript
import { screenWidth, BREAKPOINT_DESKTOP } from '$lib/stores/screen.js';

$: isDesktop = $screenWidth >= BREAKPOINT_DESKTOP;
```

**Tailwind响应式类**:
```html
<div class="grid grid-cols-1 lg:grid-cols-2">
  <!-- 移动端单列，桌面端双列 -->
</div>
```

---

## 🤝 贡献指南

### 提交代码

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

### 代码审查标准

- ✅ 遵循现有代码风格
- ✅ 添加必要的注释
- ✅ 更新相关文档
- ✅ 测试在桌面和移动端都正常工作
- ✅ 无控制台错误或警告

---

## 📞 联系和支持

- **项目仓库**: [GitHub](链接)
- **问题反馈**: [Issues](链接)
- **文档更新**: 请更新本文档以反映最新状态

---

## 📄 许可证

MIT License

---

**最后更新**: 2025-10-29
**维护者**: Obsidian Web Interface Team
