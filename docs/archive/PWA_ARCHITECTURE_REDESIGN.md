# PWA架构重新设计：从快速捕获到知识库交互窗口

## 📋 需求变更

**从**: 简单的快速捕获工具
**到**: 知识库交互窗口 + 工作流执行器

### 核心定位
- **Obsidian**: 后端知识库（数据存储层）
- **PWA**: 主要交互界面（用户体验层）
- **Ultra MCP**: AI增强分析引擎

---

## 🏗️ 新架构设计

### 1. 导航结构（底部导航）

```
┌─────────────────────────────────┐
│  ⚡ 捕获  │  🔄 工作流  │  📚 知识库  │  📊 Dashboard  │
└─────────────────────────────────┘
```

#### **Tab 1: ⚡ 快速捕获**
- 快速文本/语音输入
- 智能分类（Journal/Ideas/Projects）
- 实时同步状态

#### **Tab 2: 🔄 工作流**
- **每日反思** (晚间模式)
- **每日规划** (晨间模式)
- **月度总结**
- **生命轮评估**
- 工作流执行界面（引导式对话）

#### **Tab 3: 📚 知识库**
- 浏览Vault结构
- 全文搜索
- 笔记查看和编辑
- 最近访问

#### **Tab 4: 📊 Dashboard**
- 统计数据
- 同步状态
- 系统信息
- 设置入口

---

## 🔄 工作流执行流程设计

### 每日反思工作流（晚间模式）

```
用户触发: "做今天的反思"
    ↓
[PWA] 显示工作流引导界面
    ↓
Step 1: 自动读取当日日志
    ├─ 调用 Obsidian API: GET /vault/01_Execution/.../YYYY-MM-DD-工作日志.md
    ├─ 解析日志内容
    └─ 展示今日活动摘要
    ↓
Step 2: Ultra MCP深度分析
    ├─ 调用 Ultra-Analyze API
    ├─ 识别模式和关键事件
    └─ 生成分析结果
    ↓
Step 3: 5维度互动反思（逐个进行）
    ├─ 维度1: 情绪与心境 → 等待用户回答
    ├─ 维度2: 工作效能 → 等待用户回答
    ├─ 维度3: 学习成长 → 等待用户回答
    ├─ 维度4: 健康管理 → 等待用户回答
    └─ 维度5: 挑战应对 → 等待用户回答
    ↓
Step 4: 明日计划制定
    ├─ 询问明日具体安排（会议/学习/运动等）
    ├─ 识别时间冲突
    ├─ 调用 Ultra-Plan 生成计划草案
    └─ 与用户确认并迭代
    ↓
Step 5: 创建明日日志
    ├─ 生成简化日志（60行以内）
    ├─ 调用 Obsidian API: PUT /vault/.../明日日志.md
    └─ 更新今日日志状态
    ↓
完成提示 + 总结展示
```

---

## 🛠️ 技术实现方案

### 前端组件划分

```
/routes
  /capture         - 快速捕获页面 (已有)
  /workflows       - 工作流主页
    /daily         - 每日反思/规划
    /monthly       - 月度总结
    /life-wheel    - 生命轮评估
  /vault           - 知识库浏览
    /browse        - 文件浏览器
    /search        - 搜索界面
    /[path]        - 笔记查看/编辑
  /dashboard       - Dashboard (已有)
  /timeline        - 时间线 (已有)

/lib
  /components
    /workflows
      WorkflowCard.svelte       - 工作流卡片
      ReflectionStep.svelte     - 反思步骤组件
      QuestionPrompt.svelte     - 问题提示组件
      PlanEditor.svelte         - 计划编辑器
    /vault
      FileExplorer.svelte       - 文件浏览器
      MarkdownViewer.svelte     - Markdown查看器
      MarkdownEditor.svelte     - Markdown编辑器
      SearchBar.svelte          - 搜索栏
  /services
    obsidianApiClient.js        - 已有
    ultraMcpClient.js           - 新增：Ultra MCP API客户端
    workflowEngine.js           - 新增：工作流引擎
    vaultService.js             - 新增：Vault浏览服务
  /stores
    workflowStore.js            - 新增：工作流状态管理
    vaultStore.js               - 新增：Vault状态管理
```

### API端点设计

#### Obsidian REST API（已有）
```
GET  /vault/                     - 列出文件
GET  /vault/{filepath}           - 读取文件
PUT  /vault/{filepath}           - 创建/更新文件
POST /search/simple              - 简单搜索
```

#### Ultra MCP Integration（新增）
```javascript
// 通过MCP工具调用Ultra MCP
import { mcp__ultra_mcp__ultra_analyze } from '@tools/ultra-mcp';

async function analyzeDaily(journalContent) {
  return await mcp__ultra_mcp__ultra_analyze({
    task: `分析今日工作日志，识别关键模式和事件`,
    files: [journalPath],
    focus: 'all'
  });
}
```

---

## 📱 用户体验流程

### 场景1: 晚间反思
1. 用户打开PWA，点击"工作流"标签
2. 看到工作流卡片列表，点击"每日反思（晚间模式）"
3. 进入引导式对话界面：
   - 顶部显示进度条（Step 1/5）
   - 中间区域显示当前步骤内容
   - 底部有"继续"按钮
4. Step 1自动执行，展示今日日志摘要
5. Step 2 Ultra MCP分析，显示加载动画和分析结果
6. Step 3-5 逐个引导用户回答和确认
7. 完成后展示总结，返回工作流主页

### 场景2: 晨间规划
1. 早上打开PWA，点击"工作流"标签
2. 点击"每日规划（晨间模式）"
3. 一次性展示5个快速问题
4. 用户快速回答（1-2句）
5. 生成今日行动计划
6. 确认后创建今日日志

### 场景3: 浏览知识库
1. 点击"知识库"标签
2. 看到Vault目录结构
3. 点击文件夹展开，点击文件查看
4. 支持Markdown渲染和编辑
5. 保存后自动同步到Obsidian

---

## 🎨 UI/UX设计原则

基于Ultra MCP设计研究的建议：

### 视觉设计
- **配色**: 保持Obsidian深紫灰色系，强调色使用亮紫色（#A78BFA）
- **字体**: 系统字体（San Francisco/Roboto）
- **层次**: 极简，聚焦当前步骤

### 交互设计
- **工作流**: 线性引导，每次只展示一个步骤
- **反馈**: 所有操作有明确的视觉反馈（加载/成功/失败）
- **离线**: 支持离线答题，恢复连接后同步

### 状态指示
- 常驻状态栏：显示同步状态、工作流进度
- 卡片级状态：每条记录显示同步状态图标

---

## 🔐 数据流与安全

### 数据存储
- **本地**: IndexedDB缓存最近访问的笔记、离线工作流答案
- **远程**: Obsidian Vault通过Cloudflare Tunnel访问
- **同步**: 在线时实时同步，离线时缓存，恢复后自动同步

### API认证
```javascript
// 所有请求携带Bearer Token
headers: {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json'
}
```

---

## 📈 实施路线图

### Phase 1: 核心工作流（1周）
- [ ] 创建工作流主页和导航
- [ ] 实现每日反思工作流UI
- [ ] 集成Ultra MCP API客户端
- [ ] 实现基本的引导式对话流程

### Phase 2: 知识库浏览（1周）
- [ ] 实现Vault文件浏览器
- [ ] 实现Markdown查看器
- [ ] 实现基本的Markdown编辑器
- [ ] 实现搜索功能

### Phase 3: 完善工作流（1周）
- [ ] 实现月度总结工作流
- [ ] 实现生命轮评估
- [ ] 实现晨间规划快速模式
- [ ] 优化离线支持

### Phase 4: 打磨体验（持续）
- [ ] 性能优化
- [ ] 动画和过渡效果
- [ ] 错误处理和重试机制
- [ ] 用户反馈系统

---

## ✅ 成功标准

### 功能完整性
- ✅ 支持所有WORKFLOWS.md定义的工作流
- ✅ 能够读取、创建、更新Obsidian笔记
- ✅ Ultra MCP集成正常工作
- ✅ 离线模式下工作流可以继续进行

### 用户体验
- ✅ 工作流执行流畅，无卡顿
- ✅ 引导清晰，用户知道下一步做什么
- ✅ 状态反馈及时，操作结果明确
- ✅ 移动端体验优秀（拇指热区、合适字号）

### 性能指标
- ✅ PWA首屏加载 < 2秒
- ✅ API请求响应 < 1秒（在线）
- ✅ 离线模式切换无感知
- ✅ 支持100+笔记浏览无性能问题

---

## 🚀 下一步行动

1. **立即创建工作流主页** (`/routes/workflows/+page.svelte`)
2. **创建Ultra MCP客户端** (`/lib/services/ultraMcpClient.js`)
3. **创建工作流引擎** (`/lib/services/workflowEngine.js`)
4. **实现第一个完整工作流**: 每日反思（晚间模式）

---

**文档版本**: 1.0.0
**创建时间**: 2025-10-26
**作者**: Claude + User
