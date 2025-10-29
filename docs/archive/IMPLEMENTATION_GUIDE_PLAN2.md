# 方案2实施指南：Vercel + Cloudflare Tunnel + 本地后端

**创建时间**: 2025-10-25
**预计时间**: 1-2小时
**目标**: 保持数据在本地，实现Web可访问

---

## 📋 实施清单

- [ ] **步骤1**: 修复Vercel Root Directory配置（5分钟）
- [ ] **步骤2**: 验证本地后端运行（10分钟）
- [ ] **步骤3**: 安装Cloudflare Tunnel（15分钟）
- [ ] **步骤4**: 配置Quick Tunnel（5分钟）
- [ ] **步骤5**: 配置前端环境变量（10分钟）
- [ ] **步骤6**: 端到端测试（15分钟）

---

## 🎯 步骤1：修复Vercel Root Directory配置

### 为什么要做这个？
这是最基础的修复，无论用哪个方案都必须做。让Vercel能够正确构建前端。

### 操作步骤

1. **登录Vercel Dashboard**
   - 访问: https://vercel.com/dashboard
   - 找到您的项目（应该叫 `secondbrain` 或类似名称）

2. **进入项目设置**
   - 点击项目名称
   - 点击顶部的 **Settings** 标签

3. **修改Root Directory**
   - 左侧菜单选择 **General**
   - 找到 **Root Directory** 部分
   - 点击 **Edit** 按钮
   - 输入: `web`
   - 点击 **Save**

4. **验证配置**
   - Vercel会自动触发新的部署
   - 或者手动: Deployments → 最新部署 → ··· → Redeploy

5. **检查构建日志**
   等待2-3分钟，查看部署日志，应该看到：
   ```
   ✅ 正确的构建:
   [时间] Running "cd web && npm install"
   [时间] Installing dependencies... (30-60秒)
   [时间] Running "npm run build"
   [时间] vite v5.4.21 building for production...
   [时间] ✓ built in 9.01s
   ```

   **如果看到48ms** → Root Directory配置没有生效，重新检查

### ✅ 完成标志
- 构建时间正常（9-15秒，不是48ms）
- 网站可以访问
- UI正常显示（虽然功能还不可用）

---

## 🎯 步骤2：验证本地后端运行

### 检查后端是否就绪

1. **进入后端目录**
   ```bash
   cd "/Users/liasiloam/Library/Mobile Documents/iCloud~md~obsidian/Documents/03_Orchestration/conversational_ai/backend"
   ```

2. **检查Python虚拟环境**
   ```bash
   # 激活虚拟环境
   source venv/bin/activate

   # 验证Python版本
   python --version
   # 应该显示: Python 3.9+ 或更高
   ```

3. **检查依赖是否安装**
   ```bash
   pip list | grep fastapi
   pip list | grep uvicorn
   pip list | grep openai
   ```

   如果缺少依赖：
   ```bash
   pip install -r requirements.txt
   ```

4. **启动后端服务**
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```

5. **验证后端可访问**

   打开新的终端窗口，测试：
   ```bash
   # 测试健康检查
   curl http://localhost:8000/health

   # 应该返回类似:
   # {"status":"ok","message":"API is running"}
   ```

   或者在浏览器访问：
   ```
   http://localhost:8000
   http://localhost:8000/docs  # FastAPI自动生成的API文档
   ```

### ✅ 完成标志
- 后端在 `localhost:8000` 运行
- 可以访问 `/health` 端点
- 终端显示类似：
  ```
  INFO:     Started server process [12345]
  INFO:     Waiting for application startup.
  INFO:     Application startup complete.
  INFO:     Uvicorn running on http://0.0.0.0:8000
  ```

---

## 🎯 步骤3：安装Cloudflare Tunnel

### 3.1 安装cloudflared CLI

**macOS (Homebrew)**:
```bash
brew install cloudflare/cloudflare/cloudflared
```

**macOS (直接下载)**:
```bash
# 下载
curl -L --output cloudflared.pkg https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-amd64.pkg

# 安装
sudo installer -pkg cloudflared.pkg -target /
```

**验证安装**:
```bash
cloudflared --version
# 应该显示版本号，如: cloudflared version 2024.x.x
```

### 3.2 快速测试（可选但推荐）

在继续之前，先快速测试Tunnel是否能工作：

```bash
# 确保后端正在运行（localhost:8000）
cloudflared tunnel --url http://localhost:8000
```

会看到输出：
```
INF Thank you for trying Cloudflare Tunnel...
INF Your quick Tunnel has been created! Visit it at:
INF https://abc-def-ghi.trycloudflare.com
```

**测试这个URL**:
```bash
# 复制上面的URL，用curl测试
curl https://abc-def-ghi.trycloudflare.com/health
```

如果返回健康检查响应，说明Tunnel工作正常！

按 `Ctrl+C` 停止这个临时Tunnel。

### ✅ 完成标志
- cloudflared已安装
- 临时Tunnel可以成功暴露本地服务
- 外部可以访问Tunnel URL

---

## 🎯 步骤4：使用Quick Tunnel（推荐快速方案）

### 为什么选择Quick Tunnel？

对于个人项目，**Quick Tunnel**比完整的命名Tunnel更简单：
- ✅ 无需注册Cloudflare账号
- ✅ 无需配置DNS
- ✅ 一条命令启动
- ⚠️ 缺点：每次重启URL会变化

### 启动Quick Tunnel

1. **创建启动脚本**（方便重复使用）

   ```bash
   # 在后端目录创建脚本
   cd "/Users/liasiloam/Library/Mobile Documents/iCloud~md~obsidian/Documents/03_Orchestration/conversational_ai/backend"

   cat > start_with_tunnel.sh << 'EOF'
#!/bin/bash

echo "🚀 启动后端和Cloudflare Tunnel..."

# 激活虚拟环境
source venv/bin/activate

# 启动FastAPI（后台运行）
echo "📦 启动FastAPI后端..."
uvicorn main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# 等待后端启动
sleep 3

# 启动Cloudflare Tunnel
echo "🌐 启动Cloudflare Tunnel..."
cloudflared tunnel --url http://localhost:8000

# 清理：当Tunnel停止时，也停止后端
kill $BACKEND_PID
EOF

   # 添加执行权限
   chmod +x start_with_tunnel.sh
   ```

2. **运行脚本**
   ```bash
   ./start_with_tunnel.sh
   ```

3. **记录Tunnel URL**

   从输出中找到这一行：
   ```
   INF Your quick Tunnel has been created! Visit it at:
   INF https://randomly-generated-url.trycloudflare.com
   ```

   **复制这个URL**，接下来要用！

### ✅ 完成标志
- 脚本成功运行
- 看到Tunnel URL输出
- 可以从外网访问该URL

---

## 🎯 步骤5：配置前端连接Tunnel

### 5.1 在Vercel配置环境变量

1. **访问Vercel Dashboard**
   - 项目 → Settings → Environment Variables

2. **添加API URL变量**
   ```
   Name: VITE_API_URL
   Value: https://your-tunnel-url.trycloudflare.com
   ```
   （替换为步骤4中得到的实际URL）

3. **选择环境**
   - Production ✅
   - Preview ✅
   - Development（可选）

4. **保存**

### 5.2 更新前端代码（如果需要）

检查前端是否已经配置好读取环境变量：

```bash
cd "/Users/liasiloam/Library/Mobile Documents/iCloud~md~obsidian/Documents/03_Orchestration/conversational_ai/web"

# 检查constants文件
cat src/lib/utils/constants.js
```

应该有类似这样的代码：
```javascript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
```

如果没有，创建或修改：

```bash
# 确保目录存在
mkdir -p src/lib/utils

cat > src/lib/utils/constants.js << 'EOF'
/**
 * API配置
 * 从环境变量读取后端URL
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

console.log('[Config] API_BASE_URL:', API_BASE_URL);
console.log('[Config] Environment:', import.meta.env.MODE);
EOF
```

### 5.3 更新apiClient使用constants

检查 `src/lib/services/apiClient.js`:

```javascript
import { API_BASE_URL } from '$utils/constants.js';

class APIClient {
    constructor(baseURL = API_BASE_URL) {
        this.baseURL = baseURL;
        // ... 其他代码
    }
}
```

### 5.4 提交并部署

```bash
cd web

# 查看修改
git status

# 如果有修改，提交
git add .
git commit -m "feat: 配置从环境变量读取API URL

- 创建constants.js统一管理配置
- 使用VITE_API_URL环境变量
- 添加环境检测日志"

git push origin main
```

Vercel会自动触发新部署。

### ✅ 完成标志
- 环境变量已添加到Vercel
- 前端代码使用环境变量
- 新版本已部署

---

## 🎯 步骤6：端到端测试

### 6.1 验证所有服务运行

**检查清单**:
- [ ] 本地后端运行中（localhost:8000）
- [ ] Cloudflare Tunnel运行中（显示URL）
- [ ] Vercel前端已部署（最新版本）

### 6.2 测试Tunnel连接

```bash
# 测试Tunnel是否正常转发
curl https://your-tunnel-url.trycloudflare.com/health

# 应该返回和本地一样的响应
```

### 6.3 测试前端访问

1. **访问Vercel网站**
   ```
   https://your-project.vercel.app
   ```

2. **打开浏览器开发者工具**
   - 按 F12 或 Cmd+Option+I
   - 切换到 Console 标签

3. **查看配置日志**
   应该看到：
   ```
   [Config] API_BASE_URL: https://your-tunnel-url.trycloudflare.com
   [Config] Environment: production
   ```

4. **测试捕获功能**
   - 在输入框输入一些文本
   - 点击"快速捕获"
   - 切换到 Network 标签观察请求

   **期望看到**:
   - 请求发送到Tunnel URL
   - 状态码 200 OK
   - 返回成功响应

### 6.4 验证数据保存

回到本地，检查Obsidian Vault：

```bash
cd "/Users/liasiloam/Library/Mobile Documents/iCloud~md~obsidian/Documents"

# 查看最新文件
ls -lt 01_Execution/Logs/Journal_Entries/ | head -5
```

应该能看到新创建的文件！

### ✅ 完成标志
- 前端可以成功调用后端API
- 数据保存到本地Obsidian
- 整个流程打通

---

## 🔧 常见问题排查

### 问题1: Vercel前端显示"Network Error"

**可能原因**:
1. Cloudflare Tunnel没有运行
2. 环境变量配置错误
3. CORS配置问题

**解决方法**:
```bash
# 检查Tunnel是否运行
ps aux | grep cloudflared

# 检查后端CORS设置
# 编辑 backend/main.py，确保有：
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 开发时可以用*，生产环境应指定具体域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 问题2: Tunnel URL无法访问

**检查**:
```bash
# 1. 后端是否运行
curl http://localhost:8000/health

# 2. 重启Tunnel
# Ctrl+C 停止，然后重新运行
./start_with_tunnel.sh
```

### 问题3: 数据没有保存到Obsidian

**检查后端配置**:
```bash
cd backend
cat core/config.py
```

确保 `vault_path` 指向正确的Obsidian目录。

---

## 📝 日常使用流程

设置完成后，日常使用很简单：

### 启动系统

1. **启动后端+Tunnel**（保持运行）
   ```bash
   cd backend
   ./start_with_tunnel.sh
   ```

2. **复制新的Tunnel URL**（每次启动会变）

3. **更新Vercel环境变量**（如果URL变了）
   - Vercel Dashboard → Settings → Environment Variables
   - 修改 `VITE_API_URL` 的值
   - 触发重新部署

### 停止系统

按 `Ctrl+C` 停止Tunnel和后端。

---

## 🚀 进阶优化（可选）

### 1. 使用命名Tunnel（URL不变）

如果觉得每次URL变化太麻烦，可以升级到命名Tunnel：

```bash
# 1. 登录Cloudflare
cloudflared tunnel login

# 2. 创建命名Tunnel
cloudflared tunnel create my-obsidian

# 3. 配置DNS（需要自己的域名）
cloudflared tunnel route dns my-obsidian api.yourdomain.com

# 4. 运行
cloudflared tunnel run my-obsidian
```

### 2. 开机自动启动

创建 macOS LaunchAgent：

```bash
cat > ~/Library/LaunchAgents/com.obsidian.tunnel.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.obsidian.tunnel</string>
    <key>ProgramArguments</key>
    <array>
        <string>/path/to/backend/start_with_tunnel.sh</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
EOF

# 加载服务
launchctl load ~/Library/LaunchAgents/com.obsidian.tunnel.plist
```

### 3. 添加基础认证

如果担心安全，可以给Tunnel添加密码保护。

---

## ✅ 实施完成检查清单

完成后，您应该实现：

- [x] Vercel前端可访问
- [x] 前端UI正常显示
- [x] 可以在Web端输入内容
- [x] 点击提交后成功调用后端
- [x] 数据保存到本地Obsidian
- [x] 笔记保持本地.md格式
- [x] 完全控制数据
- [x] 无需额外云服务费用

---

**预计总时间**: 1-2小时
**难度**: 中等
**成本**: 完全免费

祝实施顺利！🎉
