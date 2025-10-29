# 🎨 Obsidian Web Interface

> AI驱动的Obsidian知识管理Web应用 - 前后端完整项目 | 2025-10-29

---

## 📋 项目概览

### 🎯 项目愿景

为Obsidian知识库构建现代化、AI增强的Web界面，实现：
- **快速捕获**: 2秒记录想法，支持文本和语音
- **智能分类**: AI自动分类到合适的笔记类型
- **工作流管理**: 可视化知识处理流程
- **移动优先**: PWA支持，离线可用
- **无缝集成**: 直接操作Obsidian vault

---

## 🗂️ 项目结构

```
Obsidian_Web_Interface/
├── 📱 Frontend (Web App)
│   ├── src/                    # SvelteKit应用源代码
│   ├── static/                 # 静态资源
│   ├── docs/                   # 前端文档
│   ├── tokens/                 # 设计令牌
│   ├── package.json
│   └── README.md              # 前端快速开始
│
├── 🔧 Backend (API Server)
│   ├── app/                    # FastAPI应用
│   ├── services/               # 业务逻辑
│   ├── models/                 # 数据模型
│   ├── requirements.txt
│   └── README.md              # 后端快速开始
│
├── 📚 Documentation
│   ├── PROJECT_README.md       # 本文档（项目总览）
│   ├── FRONTEND_PROJECT.md     # 前端详细文档
│   ├── START_HERE.md           # 快速上手指南
│   ├── QUICK_START_GUIDE.md    # 完整设置指南
│   ├── OBSIDIAN_INTEGRATION_GUIDE.md
│   └── ... (更多技术文档)
│
├── 🖼️ Design Assets
│   ├── home_dashboard_mockup.png
│   ├── vault_card_view_mockup.png
│   └── workflows_gallery_mockup.png
│
└── 🔐 Configuration
    ├── .env.example
    ├── requirements.txt
    └── start_tunnel.sh
```

---

## 🚀 快速开始

### Prerequisites

- **Node.js** 18+
- **Python** 3.8+
- **Obsidian** vault设置完成

### 1. 克隆或下载项目

项目已位于 Obsidian 库根目录的 `Obsidian_Web_Interface/` 文件夹。

### 2. 后端设置

```bash
# 进入backend目录
cd backend/

# 创建虚拟环境
python3 -m venv venv
source venv/bin/activate  # Mac/Linux
# venv\Scripts\activate  # Windows

# 安装依赖
pip install -r requirements.txt

# 配置环境变量
cp ../.env.example .env
# 编辑 .env 设置 OBSIDIAN_VAULT_PATH

# 启动服务器
uvicorn app.main:app --reload --port 8000
```

**后端将运行在**: `http://localhost:8000`

### 3. 前端设置

```bash
# 在项目根目录
npm install

# 配置环境变量
# 编辑已有的 .env.example 或创建 .env
# PUBLIC_API_URL=http://localhost:8000

# 构建设计令牌
npm run tokens:build

# 启动开发服务器
npm run dev
```

**前端将运行在**: `http://localhost:5173`

### 4. 访问应用

打开浏览器访问 `http://localhost:5173`

---

## 📱 前端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| SvelteKit | 2.0 | 框架 |
| Vite | 5.0 | 构建工具 |
| Tailwind CSS | 3.4 | 样式 |
| Style Dictionary | 4.x | 设计令牌 |
| Chart.js | 4.4 | 数据可视化 |
| IndexedDB (idb) | 8.0 | 离线存储 |
| vite-plugin-pwa | 0.17 | PWA |

**详细文档**: [FRONTEND_PROJECT.md](FRONTEND_PROJECT.md)

---

## 🔧 后端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| FastAPI | 0.104+ | Web框架 |
| Pydantic | 2.0+ | 数据验证 |
| OpenAI API | - | AI分类 |
| Whisper | - | 语音转文字 |
| Python-Frontmatter | - | Markdown处理 |

**详细文档**: [backend/README.md](backend/README.md)

---

## 📚 核心文档

### 快速上手
- **[START_HERE.md](START_HERE.md)** - 项目入门指南
- **[QUICK_START_GUIDE.md](QUICK_START_GUIDE.md)** - 完整设置流程

### 前端开发
- **[FRONTEND_PROJECT.md](FRONTEND_PROJECT.md)** - 前端架构和设计系统
- **[docs/README.md](docs/README.md)** - 前端文档导航
- **[docs/reports/](docs/reports/)** - Phase报告和设计报告

### 后端开发
- **[backend/README.md](backend/README.md)** - 后端API文档
- **[OBSIDIAN_INTEGRATION_GUIDE.md](OBSIDIAN_INTEGRATION_GUIDE.md)** - Obsidian集成

### 部署和运维
- **[SIMPLIFIED_DEPLOYMENT_GUIDE.md](SIMPLIFIED_DEPLOYMENT_GUIDE.md)** - 部署指南
- **[CLOUDFLARE_TUNNEL_CORS_FIX.md](CLOUDFLARE_TUNNEL_CORS_FIX.md)** - CORS配置
- **[docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)** - Vercel部署

### 架构和设计
- **[SYSTEM_ARCHITECTURE_ANALYSIS.md](SYSTEM_ARCHITECTURE_ANALYSIS.md)** - 系统架构
- **[PWA_ARCHITECTURE_REDESIGN.md](PWA_ARCHITECTURE_REDESIGN.md)** - PWA架构
- **[Obsidian 知识库前端界面全面评估与重构方案.md]** - 重构方案

---

## 🎨 设计资产

### Mockup图片

项目根目录包含3个高清设计mockup：
- `home_dashboard_mockup.png` - 主Dashboard设计
- `vault_card_view_mockup.png` - 知识库卡片视图
- `workflows_gallery_mockup.png` - 工作流画廊

### 设计系统

使用 **Style Dictionary** 管理设计令牌：
- 颜色: 深色主题 + Cyan强调色
- 间距: 4px基础单位
- 圆角、阴影、字体

**详细说明**: [FRONTEND_PROJECT.md](FRONTEND_PROJECT.md#设计系统)

---

## 🛠️ 开发命令

### 前端命令

```bash
# 开发
npm run dev              # 启动开发服务器
npm run tokens:build     # 构建设计令牌
npm run check            # 类型检查

# 构建
npm run build            # 生产构建
npm run preview          # 预览构建

# 代码质量
npm run format           # 格式化代码
npm run lint             # 代码检查
```

### 后端命令

```bash
# 开发
uvicorn app.main:app --reload --port 8000

# 测试
pytest                   # 运行测试

# 代码质量
black .                  # 格式化代码
flake8                   # 代码检查
```

---

## 🌐 部署

### Vercel (前端)

```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel

# 生产部署
vercel --prod
```

**详细指南**: [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)

### Cloudflare Tunnel (后端)

```bash
# 启动tunnel
./start_tunnel.sh
```

**详细指南**: [CLOUDFLARE_TUNNEL_CORS_FIX.md](CLOUDFLARE_TUNNEL_CORS_FIX.md)

---

## 📊 项目状态

### 已完成功能

- ✅ 前端基础架构（SvelteKit + Tailwind）
- ✅ 设计系统和组件库
- ✅ 响应式导航系统
- ✅ Dashboard重设计（卡片式布局）
- ✅ 后端API服务器（FastAPI）
- ✅ AI分类和语音转文字
- ✅ Obsidian vault集成
- ✅ PWA支持
- ✅ 离线功能

### 开发中

- 🚧 知识库浏览器
- 🚧 Markdown编辑器
- 🚧 全文搜索
- 🚧 工作流执行引擎

---

## 🤝 贡献指南

### 提交代码

1. Fork项目
2. 创建feature分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

### 代码标准

- 前端: ESLint + Prettier
- 后端: Black + Flake8
- 提交信息: 遵循Conventional Commits

---

## 📄 许可证

MIT License

---

## 📞 联系和支持

- **问题反馈**: GitHub Issues
- **文档更新**: 更新对应的markdown文件
- **功能请求**: 创建Issue讨论

---

## 🎯 快速链接

### 开始使用
- [快速上手](START_HERE.md)
- [完整设置](QUICK_START_GUIDE.md)

### 前端开发
- [前端文档](FRONTEND_PROJECT.md)
- [组件库](docs/)
- [设计系统](FRONTEND_PROJECT.md#设计系统)

### 后端开发
- [后端文档](backend/README.md)
- [API参考](OBSIDIAN_INTEGRATION_GUIDE.md)

### 部署
- [前端部署](docs/DEPLOYMENT_GUIDE.md)
- [后端部署](CLOUDFLARE_TUNNEL_CORS_FIX.md)

---

**最后更新**: 2025-10-29
**项目位置**: `Obsidian库根目录/Obsidian_Web_Interface/`
**维护者**: Obsidian Web Interface Team

---

🎉 **开始构建您的AI增强知识管理系统！**
