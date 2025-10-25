# 🚀 Quick Capture - Vercel部署完整指南

## 📋 部署架构

```
前端 (Vercel) ←→ 后端 (本地Mac + ngrok) ←→ Obsidian Vault
```

---

## 方案1：前端Vercel + 后端本地（推荐）

### 优势
- ✅ 前端全球访问
- ✅ 后端直接访问Obsidian
- ✅ 完全免费
- ✅ 数据安全

### 步骤

#### 1. 部署前端到Vercel

```bash
# 确保在web目录
cd web

# 初始化Git（如果还没有）
git init
git add .
git commit -m "Initial commit"

# 创建GitHub仓库并推送
# 访问 github.com 创建新仓库
git remote add origin https://github.com/YOUR_USERNAME/quick-capture-web.git
git branch -M main
git push -u origin main
```

**在Vercel上**：
1. 访问 https://vercel.com
2. 点击 "Add New" → "Project"
3. 导入你的GitHub仓库
4. Framework Preset: 选择 "SvelteKit"
5. 环境变量设置：
   ```
   Name: PUBLIC_API_URL
   Value: https://your-ngrok-url.ngrok-free.app (稍后填写)
   ```
6. 点击 "Deploy"

#### 2. 设置ngrok（暴露本地API）

```bash
# 安装ngrok
brew install ngrok

# 或下载：https://ngrok.com/download

# 注册并获取authtoken
# 访问 https://dashboard.ngrok.com/get-started/your-authtoken
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

#### 3. 启动后端和ngrok

```bash
# 终端1：启动FastAPI后端
cd ../backend
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000

# 终端2：启动ngrok
ngrok http 8000
```

**复制ngrok URL**：
```
Forwarding  https://xxxx-xxx-xxx.ngrok-free.app -> http://localhost:8000
```

#### 4. 更新Vercel环境变量

1. 访问 Vercel项目设置
2. Settings → Environment Variables
3. 编辑 `PUBLIC_API_URL`
4. 值改为：`https://xxxx-xxx-xxx.ngrok-free.app`
5. 保存并重新部署

#### 5. 测试

访问：`https://your-app.vercel.app`

应该能够：
- ✅ 看到快速捕获界面
- ✅ 输入文本并保存
- ✅ 查看Toast提示
- ✅ 检查Obsidian是否创建了文件

---

## 方案2：全部署到云端

### 适用场景
- 不想保持Mac开机
- 需要24/7可用
- 愿意使用云端存储

### 架构
```
Vercel (前端) ←→ Railway (后端API) ←→ GitHub (Obsidian同步)
```

### 步骤

#### 1. 准备后端

修改 `backend/main.py`，使用环境变量配置路径：

```python
import os

VAULT_PATH = os.getenv(
    "OBSIDIAN_VAULT_PATH",
    "/app/obsidian"  # 云端路径
)
```

#### 2. 部署后端到Railway

```bash
cd backend

# 创建Procfile
echo "web: uvicorn main:app --host 0.0.0.0 --port \$PORT" > Procfile

# 推送到GitHub
git add .
git commit -m "Add Railway config"
git push
```

**在Railway上**：
1. 访问 https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. 选择backend目录
4. 设置环境变量：
   ```
   OPENAI_API_KEY=sk-xxx
   OBSIDIAN_VAULT_PATH=/app/obsidian
   ```
5. 部署
6. 复制URL：`https://your-app.up.railway.app`

#### 3. 部署前端（同方案1）

环境变量：
```
PUBLIC_API_URL=https://your-app.up.railway.app
```

---

## 🔧 自动化脚本

### 本地开发快速启动

创建 `start-dev.sh`:

```bash
#!/bin/bash

# 启动后端
cd backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &

# 启动前端
cd ../web
npm run dev &

echo "✅ 开发服务器已启动"
echo "前端: http://localhost:5173"
echo "后端: http://localhost:8000"
echo "文档: http://localhost:8000/docs"
```

### 生产环境启动（ngrok）

创建 `start-prod.sh`:

```bash
#!/bin/bash

echo "🚀 启动生产环境..."

# 启动后端
cd backend
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# 等待后端启动
sleep 3

# 启动ngrok
ngrok http 8000 &
NGROK_PID=$!

echo "✅ 服务已启动"
echo "后端PID: $BACKEND_PID"
echo "ngrok PID: $NGROK_PID"
echo ""
echo "📝 复制ngrok URL并更新Vercel环境变量："
echo "   Vercel → Settings → Environment Variables"
echo "   PUBLIC_API_URL = https://xxxx.ngrok-free.app"
echo ""
echo "按 Ctrl+C 停止所有服务"

# 等待中断信号
trap "kill $BACKEND_PID $NGROK_PID; exit" INT
wait
```

使用：
```bash
chmod +x start-prod.sh
./start-prod.sh
```

---

## 🔐 环境变量管理

### 本地开发 (`.env`)
```env
PUBLIC_API_URL=http://localhost:8000
```

### Vercel生产环境
```env
PUBLIC_API_URL=https://xxxx.ngrok-free.app
# 或
PUBLIC_API_URL=https://your-app.up.railway.app
```

### Railway后端
```env
OPENAI_API_KEY=sk-xxx
OBSIDIAN_VAULT_PATH=/app/obsidian
PORT=8000
```

---

## 🐛 常见问题

### Q: Vercel部署成功但页面空白
**A**: 检查浏览器控制台，可能是API连接失败。确认：
1. `PUBLIC_API_URL` 设置正确
2. 后端正在运行
3. CORS配置正确

### Q: ngrok链接频繁变化怎么办？
**A**:
- 免费版每次重启会变化
- 升级ngrok付费版获得固定域名
- 或使用Cloudflare Tunnel（免费+固定域名）

### Q: 手机访问提示"不安全"
**A**:
- Vercel自动提供HTTPS，是安全的
- 如果使用ngrok免费版，可能会显示警告页，点击"Visit Site"继续

### Q: 部署后性能如何？
**A**:
- 前端：Vercel全球CDN，< 1秒加载
- 后端：取决于ngrok/Railway延迟，通常200-500ms
- 离线模式：完全本地，0延迟

---

## 📊 部署后监控

### Vercel Analytics
```bash
# 在package.json添加
npm install @vercel/analytics
```

在 `src/routes/+layout.svelte`:
```svelte
<script>
  import { dev } from '$app/environment';
  import { inject } from '@vercel/analytics';

  inject({ mode: dev ? 'development' : 'production' });
</script>
```

### 后端日志
```bash
# 查看Railway日志
railway logs

# 查看本地日志
tail -f backend.log
```

---

## 🎯 推荐配置

### 个人使用（你的场景）
```
前端: Vercel (免费)
后端: 本地Mac + ngrok (免费)
存储: 本地Obsidian Vault
成本: $0/月
```

### 团队使用
```
前端: Vercel Pro ($20/月)
后端: Railway ($5-20/月)
存储: GitHub Private Repo
成本: $25-40/月
```

---

## 🚀 一键部署命令

```bash
# 克隆项目
git clone https://github.com/YOUR_USERNAME/quick-capture.git
cd quick-capture

# 安装依赖
cd backend && pip install -r requirements.txt
cd ../web && npm install

# 配置环境变量
cp backend/.env.example backend/.env
cp web/.env.example web/.env

# 编辑环境变量
# backend/.env: 添加 OPENAI_API_KEY
# web/.env: 设置 PUBLIC_API_URL

# 启动开发环境
./start-dev.sh

# 或启动生产环境
./start-prod.sh
```

---

## ✅ 部署检查清单

- [ ] 前端代码推送到GitHub
- [ ] Vercel项目创建并连接仓库
- [ ] 后端正常运行（本地或Railway）
- [ ] ngrok/Railway URL已复制
- [ ] Vercel环境变量已设置
- [ ] 前端重新部署
- [ ] 测试文本捕获功能
- [ ] 测试语音录制功能
- [ ] 测试离线模式
- [ ] 检查Obsidian文件创建
- [ ] 手机PWA安装测试

---

## 🎉 部署完成！

现在你可以：
- 📱 在任何设备访问：`https://your-app.vercel.app`
- 🏠 添加到手机主屏幕
- 📝 随时随地记录想法
- 🔄 自动同步到Obsidian
- ✈️ 离线也能使用

**享受你的全球可访问AI知识管理系统！** 🚀
