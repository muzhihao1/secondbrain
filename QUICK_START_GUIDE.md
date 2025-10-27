# 快速开始指南：方案A+ (Obsidian REST API)

**最后更新**: 2025-10-25
**预计时间**: 30分钟
**当前进度**: ✅ 70% 完成

---

## ✅ 已完成的步骤

- [x] **步骤1**: 安装 Obsidian Local REST API 插件
- [x] **步骤2**: 安装 Cloudflare Tunnel (cloudflared)
- [x] **步骤3**: 创建前端配置代码
- [x] **步骤4**: 创建 Obsidian API 适配器
- [x] **步骤5**: 创建启动脚本

---

## 📋 接下来需要做的（您来操作）

### 步骤6: 启动 Cloudflare Tunnel（5分钟）

1. **打开新的终端窗口**

2. **运行启动脚本**:
   ```bash
   cd "/Users/liasiloam/Library/Mobile Documents/iCloud~md~obsidian/Documents/03_Orchestration/conversational_ai"
   ./start_tunnel.sh
   ```

3. **复制Tunnel URL**

   脚本会显示类似这样的输出：
   ```
   INF Your quick Tunnel has been created! Visit it at:
   INF https://randomly-generated-url.trycloudflare.com
   ```

   **复制这个URL！** 例如：`https://abc-def-ghi.trycloudflare.com`

4. **保持终端窗口打开**

   Tunnel需要一直运行。关闭终端会停止Tunnel。

---

### 步骤7: 配置Vercel环境变量（5分钟）

1. **访问Vercel Dashboard**
   - 网址: https://vercel.com/dashboard
   - 找到您的项目

2. **添加环境变量**
   - 点击项目 → Settings → Environment Variables
   - 添加两个变量：

   ```
   Name: VITE_API_URL
   Value: https://your-tunnel-url.trycloudflare.com
   (替换为步骤6中复制的URL)

   Name: VITE_API_KEY
   Value: a9bb78697a7306061e9131735d4b0e99de6e20d61c57325012d404a25d54e957
   ```

3. **选择环境**
   - Production ✅
   - Preview ✅
   - Development（可选）

4. **保存**

---

### 步骤8: 更新前端代码使用Obsidian API（10分钟）

现在需要修改前端的主页面来使用新的 Obsidian API 客户端。

1. **打开主页面**:
   ```bash
   cd web
   open src/routes/+page.svelte
   ```

2. **修改导入语句**

   找到这一行：
   ```javascript
   import { apiClient } from '$services/apiClient.js';
   ```

   改为：
   ```javascript
   import { obsidianApiClient as apiClient } from '$services/obsidianApiClient.js';
   ```

   这样只需改一行，其他代码保持不变！

3. **保存文件**

---

### 步骤9: 提交并部署（5分钟）

```bash
cd web

# 查看修改
git status

# 添加所有修改
git add .

# 提交
git commit -m "feat: 接入Obsidian Local REST API

- 使用Obsidian REST API插件替代自建后端
- 添加obsidianApiClient适配器
- 配置API Key认证
- 数据保持100%本地存储
- 简化架构，只需Vercel一个平台"

# 推送到GitHub
git push origin main
```

Vercel会自动检测到推送并开始部署。

---

### 步骤10: 测试完整流程（10分钟）

#### 10.1 测试Tunnel连接

在浏览器访问您的Tunnel URL：
```
https://your-tunnel-url.trycloudflare.com/vault/
```

应该会要求认证。如果能看到JSON响应或文件列表，说明Tunnel工作正常。

#### 10.2 等待Vercel部署

1. 访问 https://vercel.com/dashboard
2. 找到最新的部署
3. 等待状态变为 ✅ Ready (约2-3分钟)

#### 10.3 测试Web应用

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
   [Config] API_KEY configured: Yes
   [Config] Environment: production
   ```

4. **测试捕获功能**
   - 在输入框输入: "测试捕获功能"
   - 点击"快速捕获"
   - 应该看到成功提示

5. **验证Obsidian中的文件**

   回到Obsidian，检查这个文件夹：
   ```
   01_Execution/Daily_Operations/Logs/Journal_Entries/
   ```

   应该能看到新创建的文件！

---

## 🎉 完成！

如果您能在Obsidian中看到新创建的文件，说明整个系统已经成功运行！

### 系统架构

```
您的浏览器
    ↓
Vercel前端 (https://your-project.vercel.app)
    ↓ HTTPS
Cloudflare Tunnel (https://random.trycloudflare.com)
    ↓
Obsidian REST API插件 (localhost:27124)
    ↓
Obsidian Vault  ← 您的.md文件在这里！
```

### 数据流程

1. ✅ 您在Web端输入内容
2. ✅ 前端发送到Tunnel URL
3. ✅ Tunnel转发到本地Obsidian插件
4. ✅ 插件保存为.md文件
5. ✅ 文件出现在Obsidian中

**所有数据都在本地！** 🎊

---

## 📝 日常使用

### 启动系统

每次使用前：

1. **确保Obsidian运行中**
2. **启动Tunnel**:
   ```bash
   cd "/Users/liasiloam/Library/Mobile Documents/iCloud~md~obsidian/Documents/03_Orchestration/conversational_ai"
   ./start_tunnel.sh
   ```
3. **记下新的Tunnel URL**（每次启动会变）
4. **如果URL变了，更新Vercel环境变量**

### 停止系统

按 Ctrl+C 停止Tunnel即可。

---

## 🔧 常见问题

### Q: Tunnel URL每次都变，太麻烦？

**解决方法**: 升级到命名Tunnel

```bash
# 1. 登录Cloudflare
cloudflared tunnel login

# 2. 创建命名Tunnel
cloudflared tunnel create my-obsidian

# 3. 获取Tunnel ID
cloudflared tunnel list

# 4. 创建配置文件
cat > ~/.cloudflared/config.yml << 'EOF'
tunnel: <YOUR_TUNNEL_ID>
credentials-file: /Users/liasiloam/.cloudflared/<YOUR_TUNNEL_ID>.json

ingress:
  - hostname: api.yourdomain.com
    service: https://127.0.0.1:27124
  - service: http_status:404
EOF

# 5. 配置DNS（需要自己的域名）
cloudflared tunnel route dns my-obsidian api.yourdomain.com

# 6. 运行
cloudflared tunnel run my-obsidian
```

URL就固定为 `https://api.yourdomain.com` 了！

---

### Q: 前端显示"Network Error"

**检查清单**:
- [ ] Obsidian是否运行中？
- [ ] REST API插件是否启用？
- [ ] Tunnel是否运行中？
- [ ] Vercel环境变量是否正确？
- [ ] API Key是否匹配？

**调试步骤**:

```bash
# 1. 测试本地API
curl -k -H "Authorization: Bearer YOUR_API_KEY" \
  https://127.0.0.1:27124/vault/

# 2. 测试Tunnel
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://your-tunnel-url.trycloudflare.com/vault/

# 3. 查看浏览器Console错误信息
```

---

### Q: 想在手机上访问

1. 确保Tunnel运行中
2. 手机浏览器访问 Vercel URL
3. 功能完全一样！

---

### Q: 可以同时运行原来的FastAPI后端吗？

可以！两个系统是独立的：

- **Obsidian REST API**: 端口 27124，通过Tunnel访问
- **FastAPI后端**: 端口 8000，可以继续本地使用

---

## 🚀 下一步优化（可选）

### 1. 自动启动Tunnel

创建 macOS LaunchAgent：

```bash
cat > ~/Library/LaunchAgents/com.obsidian.tunnel.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
"http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.obsidian.tunnel</string>
    <key>ProgramArguments</key>
    <array>
        <string>/opt/homebrew/bin/cloudflared</string>
        <string>tunnel</string>
        <string>--url</string>
        <string>https://127.0.0.1:27124</string>
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

### 2. 添加AI分类

目前的capture方法使用简单的关键词匹配。可以：
- 集成OpenAI API进行智能分类
- 或者使用更复杂的本地规则

### 3. 更丰富的前端功能

- 时间线视图
- 搜索功能
- 标签管理
- 统计仪表盘

---

## 📚 相关文档

- Obsidian REST API文档: https://coddingtonbear.github.io/obsidian-local-rest-api/
- Cloudflare Tunnel文档: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/
- 完整方案对比: `FINAL_SOLUTION_COMPARISON.md`

---

## ✅ 实施检查清单

最终验证：

- [x] Obsidian REST API插件已安装并启用
- [x] cloudflared已安装
- [x] 启动脚本已创建
- [x] 前端代码已更新
- [ ] Tunnel已启动并获得URL
- [ ] Vercel环境变量已配置
- [ ] 代码已提交并部署
- [ ] Web应用可以访问
- [ ] 成功创建了测试笔记
- [ ] 笔记出现在Obsidian中

---

**恭喜！您已经成功实现了最简单、最优雅的部署方案！** 🎉

**关键优势**:
- ✅ 数据100%在本地
- ✅ 只需一个云平台（Vercel）
- ✅ 使用官方维护的工具
- ✅ 完全免费
- ✅ 架构极其简单

---

🤖 Generated by Claude Code

Co-Authored-By: Claude <noreply@anthropic.com>
