# Named Tunnel 配置指南

## 🎯 目标

将临时的Quick Tunnel升级为永久的Named Tunnel，获得：
- ✅ 固定不变的URL
- ✅ 开机自动启动
- ✅ 更稳定的连接
- ✅ 无需每次更新Vercel配置

---

## 📋 配置步骤

### 步骤1: Cloudflare账号登录

如果您还没有Cloudflare账号，请：
1. 访问 https://dash.cloudflare.com/sign-up
2. 使用邮箱注册（完全免费）
3. 验证邮箱

### 步骤2: 认证cloudflared

在终端运行以下命令：

```bash
cloudflared tunnel login
```

**会发生什么：**
- 浏览器会自动打开Cloudflare授权页面
- 选择一个域名（如果您有多个）或选择"No domain"
- 点击"Authorize"授权
- 成功后会在 `~/.cloudflared/` 创建认证证书

**重要提示：** 如果您没有自己的域名也完全没问题！Cloudflare会自动为您的tunnel分配一个 `*.trycloudflare.com` 的子域名。

---

### 步骤3: 创建Named Tunnel

运行以下命令创建tunnel（名字可以自定义）：

```bash
cloudflared tunnel create obsidian-api
```

**输出示例：**
```
Tunnel credentials written to /Users/liasiloam/.cloudflared/<TUNNEL-ID>.json
Created tunnel obsidian-api with id <TUNNEL-ID>
```

**记录下这个 TUNNEL-ID**，稍后需要用到。

---

### 步骤4: 配置Tunnel路由

创建配置文件：

```bash
mkdir -p ~/.cloudflared
nano ~/.cloudflared/config.yml
```

粘贴以下内容（**替换 <TUNNEL-ID> 为您的实际ID**）：

```yaml
tunnel: <TUNNEL-ID>
credentials-file: /Users/liasiloam/.cloudflared/<TUNNEL-ID>.json

ingress:
  - hostname: <TUNNEL-NAME>.cfargotunnel.com
    service: https://127.0.0.1:27124
    originRequest:
      noTLSVerify: true
  - service: http_status:404
```

**重要说明：**
- `<TUNNEL-ID>`: 步骤3中获得的ID
- `<TUNNEL-NAME>`: 您自定义的tunnel名称（如 `obsidian-api`）
- `noTLSVerify: true`: 因为Obsidian REST API使用自签名证书

**保存文件：** `Ctrl+O` → `Enter` → `Ctrl+X`

---

### 步骤5: 创建DNS路由

运行以下命令（**替换tunnel名称**）：

```bash
cloudflared tunnel route dns obsidian-api obsidian-api.cfargotunnel.com
```

**输出示例：**
```
Added CNAME obsidian-api.cfargotunnel.com which will route to tunnel <TUNNEL-ID>
```

---

### 步骤6: 测试Tunnel

先手动启动测试：

```bash
cloudflared tunnel run obsidian-api
```

**预期输出：**
```
2025-10-26 ... Connection registered
2025-10-26 ... INF Registered tunnel connection
```

**测试访问：**

在另一个终端窗口运行：

```bash
curl -k https://obsidian-api.cfargotunnel.com/vault/
```

**应该看到Obsidian vault的文件列表！**

如果成功，按 `Ctrl+C` 停止测试。

---

### 步骤7: 配置macOS LaunchAgent（开机自启动）

创建LaunchAgent配置文件：

```bash
nano ~/Library/LaunchAgents/com.cloudflare.cloudflared.plist
```

粘贴以下内容（**替换tunnel名称**）：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.cloudflare.cloudflared</string>

    <key>ProgramArguments</key>
    <array>
        <string>/opt/homebrew/bin/cloudflared</string>
        <string>tunnel</string>
        <string>run</string>
        <string>obsidian-api</string>
    </array>

    <key>RunAtLoad</key>
    <true/>

    <key>KeepAlive</key>
    <true/>

    <key>StandardOutPath</key>
    <string>/tmp/cloudflared.log</string>

    <key>StandardErrorPath</key>
    <string>/tmp/cloudflared.error.log</string>
</dict>
</plist>
```

**保存文件。**

---

### 步骤8: 启动LaunchAgent

```bash
# 加载LaunchAgent
launchctl load ~/Library/LaunchAgents/com.cloudflare.cloudflared.plist

# 启动服务
launchctl start com.cloudflare.cloudflared

# 检查状态
launchctl list | grep cloudflared
```

**预期输出：**
```
-    0    com.cloudflare.cloudflared
```

**查看日志：**
```bash
tail -f /tmp/cloudflared.log
```

应该看到 "Connection registered" 等成功消息。

---

### 步骤9: 更新Vercel环境变量

1. 访问 https://vercel.com/dashboard
2. 选择项目 `secondbrain`
3. **Settings** → **Environment Variables**
4. 编辑 `VITE_API_URL`，更新为：
   ```
   https://obsidian-api.cfargotunnel.com
   ```
5. **Save** → 等待自动重新部署

---

### 步骤10: 端到端测试

1. 等待Vercel部署完成（2-3分钟）
2. 访问 https://secondbrain-two.vercel.app
3. 输入测试文本
4. 点击"保存"
5. 检查Obsidian vault中是否创建了新笔记

---

## 🔧 常用命令

### 查看tunnel状态
```bash
cloudflared tunnel list
```

### 手动运行tunnel（测试用）
```bash
cloudflared tunnel run obsidian-api
```

### 停止LaunchAgent
```bash
launchctl stop com.cloudflare.cloudflared
launchctl unload ~/Library/LaunchAgents/com.cloudflare.cloudflared.plist
```

### 重启LaunchAgent
```bash
launchctl stop com.cloudflare.cloudflared
launchctl start com.cloudflare.cloudflared
```

### 查看日志
```bash
tail -f /tmp/cloudflared.log
```

---

## ❌ 故障排查

### 问题1: 认证失败
```bash
# 重新登录
cloudflared tunnel login
```

### 问题2: Tunnel无法连接
```bash
# 检查Obsidian是否运行
pgrep -x "Obsidian"

# 检查REST API是否可访问
curl -k https://127.0.0.1:27124/vault/

# 查看cloudflared日志
tail -50 /tmp/cloudflared.log
```

### 问题3: LaunchAgent未启动
```bash
# 检查配置文件语法
plutil ~/Library/LaunchAgents/com.cloudflare.cloudflared.plist

# 重新加载
launchctl unload ~/Library/LaunchAgents/com.cloudflare.cloudflared.plist
launchctl load ~/Library/LaunchAgents/com.cloudflare.cloudflared.plist
```

---

## 🎉 完成！

配置完成后，您将拥有：
- ✅ 固定URL: `https://obsidian-api.cfargotunnel.com`
- ✅ 开机自动启动
- ✅ 崩溃自动重启
- ✅ 无需手动维护

**从此不再需要更新Vercel配置！**
