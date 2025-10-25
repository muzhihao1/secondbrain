# 🚀 Quick Capture Web - 前端PWA应用

AI驱动的移动优先知识捕获应用，为Obsidian设计。

---

## ✨ 功能特性

### 核心功能
- ⚡ **快速文本捕获** - 2秒完成想法记录
- 🎤 **语音转文字** - 支持60秒语音录制和AI转录
- 📊 **数据可视化** - Dashboard展示统计和趋势
- 📅 **时间线视图** - 按时间查看所有记录
- 🤖 **AI智能分类** - 自动分类到work_log、idea、meeting_note等

### PWA特性
- 📱 **手机优化** - 移动优先响应式设计
- 🔌 **离线支持** - 无网络时仍可记录，自动同步
- 🏠 **添加到主屏幕** - 像原生App一样使用
- ⚡ **极速加载** - Service Worker缓存优化
- 🔄 **后台同步** - 网络恢复自动上传离线数据

---

## 📦 快速开始

### 1. 安装依赖

```bash
cd web
npm install
```

### 2. 配置环境变量

复制 `.env.example` 并创建 `.env` 文件：

```bash
cp .env.example .env
```

编辑 `.env`：

```env
# 默认本地开发
PUBLIC_API_URL=http://localhost:8000

# 手机测试时，替换为Mac的IP地址
# PUBLIC_API_URL=http://192.168.1.100:8000
```

**获取Mac IP地址：**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问：`http://localhost:5173`

### 4. 手机测试

1. 确保手机和Mac在同一WiFi
2. 获取Mac IP地址（如：192.168.1.100）
3. 更新 `.env` 中的 `PUBLIC_API_URL`
4. 手机浏览器访问：`http://192.168.1.100:5173`

---

## 🏗️ 项目结构

```
web/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── shared/          # 共享UI组件
│   │   │   │   ├── Toast.svelte
│   │   │   │   ├── Button.svelte
│   │   │   │   └── Card.svelte
│   │   │   ├── QuickCapture.svelte
│   │   │   ├── VoiceRecorder.svelte
│   │   │   ├── Dashboard.svelte
│   │   │   └── Timeline.svelte
│   │   ├── stores/              # Svelte状态管理
│   │   │   ├── captureStore.js  # 捕获数据
│   │   │   ├── syncStore.js     # 同步状态
│   │   │   └── uiStore.js       # UI状态
│   │   ├── services/            # 业务逻辑
│   │   │   ├── apiClient.js     # API封装
│   │   │   ├── audioService.js  # 语音处理
│   │   │   └── dbService.js     # IndexedDB
│   │   └── utils/               # 工具函数
│   │       ├── constants.js
│   │       └── helpers.js
│   ├── routes/                  # SvelteKit路由
│   │   ├── +layout.svelte       # 全局布局
│   │   ├── +page.svelte         # 主页（快速捕获）
│   │   ├── dashboard/+page.svelte
│   │   └── timeline/+page.svelte
│   ├── app.html                 # HTML模板
│   └── app.css                  # 全局样式
├── static/
│   ├── manifest.json            # PWA配置
│   └── icons/                   # App图标
├── package.json
├── vite.config.js               # Vite配置
├── svelte.config.js             # Svelte配置
└── tailwind.config.js           # Tailwind CSS配置
```

---

## 🎯 使用说明

### 快速捕获
1. 打开应用（主页默认就是快速捕获页面）
2. 在文本框输入想法
3. 点击"💾 保存"按钮
4. AI自动分类并保存到Obsidian

### 语音录制
1. 点击右侧"🎤"按钮开始录音
2. 说出你的想法（最长60秒）
3. 再次点击停止录音
4. AI自动转录并分类保存

### 查看Dashboard
1. 点击底部"📊 Dashboard"导航
2. 查看今日统计、分类分布、7日趋势
3. 点击图表可查看详细数据

### 查看时间线
1. 点击底部"📅 时间线"导航
2. 按时间倒序查看所有记录
3. 支持搜索和过滤

### 离线使用
1. 应用自动检测网络状态
2. 离线时仍可记录，数据保存到本地IndexedDB
3. 网络恢复后自动同步到服务器
4. 顶部显示"🔄 N 待同步"提示

---

## 🔧 开发命令

```bash
# 开发模式（热重载）
npm run dev

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

---

## 📱 PWA安装

### iOS (Safari)
1. 打开应用网页
2. 点击分享按钮
3. 选择"添加到主屏幕"
4. 确认添加

### Android (Chrome)
1. 打开应用网页
2. 浏览器会自动显示安装横幅
3. 点击"安装"
4. 确认添加

### Desktop
1. 打开应用网页
2. 地址栏右侧会显示安装图标
3. 点击安装
4. 确认添加

---

## 🛠️ 技术栈

- **框架**: SvelteKit 2.0
- **构建工具**: Vite 5.0
- **样式**: Tailwind CSS 3.4
- **状态管理**: Svelte Stores
- **数据可视化**: Chart.js 4.4
- **本地存储**: IndexedDB (idb 8.0)
- **PWA**: vite-plugin-pwa 0.17

---

## 🐛 常见问题

### Q: 手机无法访问应用
**A:** 检查以下几点：
- 手机和Mac在同一WiFi
- `.env` 中的IP地址正确
- 后端服务器正在运行（`http://localhost:8000`）
- 防火墙允许5173端口

### Q: 语音录制不工作
**A:** 可能原因：
- 浏览器不支持MediaRecorder API（需要Chrome/Firefox/Safari）
- 未授予麦克风权限（检查浏览器设置）
- HTTPS问题（本地开发使用`localhost`或添加信任）

### Q: 离线数据未同步
**A:** 检查：
- 网络是否恢复
- 打开应用让后台同步执行
- 查看浏览器控制台是否有错误

### Q: PWA无法安装
**A:** 要求：
- 必须通过HTTPS访问（或localhost）
- manifest.json配置正确
- Service Worker注册成功

---

## 📈 性能优化

- **首次加载**: < 2秒（目标）
- **交互响应**: < 100ms
- **离线可用**: 100%核心功能
- **Lighthouse分数**: 目标 > 90

---

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

---

## 📄 许可证

MIT License

---

## 🔗 相关链接

- [后端API文档](../backend/README.md)
- [Obsidian集成说明](../README.md)
- [SvelteKit文档](https://kit.svelte.dev/)
- [Tailwind CSS文档](https://tailwindcss.com/)

---

**享受你的AI增强知识管理体验！ 🎉**
