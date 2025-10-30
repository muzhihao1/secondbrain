# 🔧 Cloudflare Tunnel 连接问题修复指南

**问题时间**: 2025-10-30
**Tunnel名称**: obsidian-api
**Tunnel ID**: 668db21c-ce49-4416-be53-227aa549688c
**状态**: DOWN (❌ 无法连接到Cloudflare Edge)

---

## 🎯 问题诊断总结

### 根本原因

**你的Mac上运行的代理 (127.0.0.1:7890) 正在拦截Cloudflare Tunnel的连接。**

### 技术细节

1. **DNS劫持检测**:
   ```bash
   # 系统DNS解析结果（被代理劫持）
   $ dig +short region1.argotunnel.com
   198.18.3.84  # ❌ 这是代理的sinkhole地址

   # 正常的Cloudflare公共DNS应该返回真实的边缘服务器IP
   $ dig +short region1.argotunnel.com @1.1.1.1
   (被防火墙阻止，无法查询)
   ```

2. **代理配置检测**:
   ```bash
   $ scutil --proxy
   HTTPEnable : 1
   HTTPPort : 7890
   HTTPProxy : 127.0.0.1     # ⚠️ 代理正在运行
   HTTPSEnable : 1
   HTTPSPort : 7890
   HTTPSProxy : 127.0.0.1
   ```

3. **Cloudflared日志错误模式**:
   ```
   ❌ Failed to dial a quic connection: timeout: no recent network activity
   ❌ Connection terminated: there are no free edge addresses left to resolve to
   ❌ sendmsg: no route to host
   ```

   **解释**: cloudflared尝试使用QUIC协议（UDP端口7844）连接到Cloudflare边缘服务器，但：
   - 代理拦截了DNS查询，返回sinkhole地址 (198.18.x.x)
   - UDP流量被代理阻止或重定向
   - 导致QUIC握手超时，连接失败

---

## ✅ 解决方案

### 方案1: 强制使用HTTP/2协议（推荐）

**原理**: HTTP/2使用TCP端口443，代理通常不会阻止HTTPS流量，可以绕过UDP/QUIC限制。

**修复步骤**:

#### 快速执行（一键修复）

在终端运行：

```bash
cd /Users/liasiloam/Vibecoding/Obsidian_Web_Interface
./fix_cloudflare_tunnel.sh
```

脚本将自动：
1. 停止当前cloudflared服务
2. 备份原配置文件
3. 安装新配置（添加 `--protocol http2` 参数）
4. 重新启动服务
5. 验证连接状态

#### 手动执行（分步操作）

如果你想手动执行每一步：

```bash
# 1. 停止服务
sudo launchctl unload /Library/LaunchDaemons/com.cloudflare.cloudflared.plist

# 2. 备份原配置
sudo cp /Library/LaunchDaemons/com.cloudflare.cloudflared.plist \
        /Library/LaunchDaemons/com.cloudflare.cloudflared.plist.backup

# 3. 复制新配置（包含 --protocol http2）
cd /Users/liasiloam/Vibecoding/Obsidian_Web_Interface
sudo cp com.cloudflare.cloudflared.plist /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
sudo chown root:wheel /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
sudo chmod 644 /Library/LaunchDaemons/com.cloudflare.cloudflared.plist

# 4. 重新加载服务
sudo launchctl load /Library/LaunchDaemons/com.cloudflare.cloudflared.plist

# 5. 检查服务状态
ps aux | grep cloudflared
tail -20 /Library/Logs/com.cloudflare.cloudflared.err.log
```

---

### 方案2: 配置代理Bypass（可选）

如果你希望继续使用QUIC协议，可以在代理软件中添加bypass规则。

**需要添加到bypass列表的域名**:
- `*.argotunnel.com`
- `*.cfargotunnel.com`
- `cftunnel.com`

**常见代理软件配置方法**:

<details>
<summary>Clash / Clash X / Clash Verge</summary>

编辑配置文件，在 `rules` 部分添加：

```yaml
rules:
  - DOMAIN-SUFFIX,argotunnel.com,DIRECT
  - DOMAIN-SUFFIX,cfargotunnel.com,DIRECT
  - DOMAIN-SUFFIX,cftunnel.com,DIRECT
  # ... 其他规则
```

重启Clash使配置生效。

</details>

<details>
<summary>Surge</summary>

在 `[Rule]` 部分添加：

```
DOMAIN-SUFFIX,argotunnel.com,DIRECT
DOMAIN-SUFFIX,cfargotunnel.com,DIRECT
DOMAIN-SUFFIX,cftunnel.com,DIRECT
```

</details>

<details>
<summary>v2rayN / Qv2ray</summary>

在路由设置中添加直连规则：

```
domain:argotunnel.com
domain:cfargotunnel.com
domain:cftunnel.com
```

</details>

---

## 🧪 验证修复

### 1. 检查服务状态

```bash
# 查看进程是否运行
ps aux | grep cloudflared

# 查看最新日志
tail -50 /Library/Logs/com.cloudflare.cloudflared.err.log
```

**成功标志**:
- 看到 `Connection registered` 消息
- 看到 `Registered tunnel connection` 消息
- 没有 `timeout` 或 `connection terminated` 错误

### 2. 测试API连接

```bash
# 应该返回401/404（表示Tunnel工作但需要认证），而不是530
curl -i https://obsidian-api.chuhaihub.org/
```

**预期结果**:
```
HTTP/2 401  # ✅ 或 404 - 表示Tunnel正常
或
HTTP/2 200  # ✅ 如果配置了public路由
```

**失败标志**:
```
HTTP/2 530  # ❌ Tunnel仍未连接
error code: 1033
```

### 3. 检查Cloudflare Dashboard

访问: https://dash.cloudflare.com/

导航到: **Networks** → **Tunnels** → **obsidian-api**

**预期状态**:
- Status: **UP** (绿色)
- Uptime: 显示运行时间
- Routes: 显示配置的路由

### 4. 测试生产网站

访问: https://secondbrain-two.vercel.app/tasks

**预期结果**:
- ✅ 页面正常加载任务数据
- ✅ 浏览器控制台没有530错误
- ✅ 看到任务列表或"暂无任务"消息（不是加载错误）

---

## 🔍 故障排查

### 问题: 脚本运行后Tunnel仍然DOWN

**可能原因1**: HTTP/2也被代理阻止

解决方案：
```bash
# 临时关闭代理测试
# 在系统偏好设置 → 网络 → 高级 → 代理中关闭代理
# 或者在代理软件中暂停代理

# 重启cloudflared
sudo launchctl unload /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
sudo launchctl load /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
```

**可能原因2**: Cloudflare边缘服务器连接超时

解决方案：
```bash
# 尝试指定edge IP版本
# 修改plist文件，添加 --edge-ip-version 4
sudo nano /Library/LaunchDaemons/com.cloudflare.cloudflared.plist

# 在 <string>--protocol</string> 后添加:
# <string>--edge-ip-version</string>
# <string>4</string>

# 重新加载
sudo launchctl unload /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
sudo launchctl load /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
```

### 问题: 日志显示 "Permission denied"

解决方案：
```bash
# 检查日志目录权限
ls -la /Library/Logs/com.cloudflare.cloudflared.*

# 修复权限
sudo touch /Library/Logs/com.cloudflare.cloudflared.out.log
sudo touch /Library/Logs/com.cloudflare.cloudflared.err.log
sudo chmod 644 /Library/Logs/com.cloudflare.cloudflared.*.log
```

### 问题: Obsidian API仍然需要配置

**检查Obsidian插件状态**:
1. 打开Obsidian应用
2. 设置 → 社区插件 → Local REST API
3. 确认插件已启用
4. 确认HTTPS服务器在 https://127.0.0.1:27124/ 运行
5. 确认API Key已配置

**测试本地API**:
```bash
# 使用你的API Key替换 YOUR_KEY
curl -k -H "Authorization: Bearer YOUR_KEY" https://127.0.0.1:27124/
```

---

## 📊 配置对比

### 修改前（使用QUIC，被代理阻止）

```xml
<array>
    <string>/opt/homebrew/bin/cloudflared</string>
    <string>tunnel</string>
    <string>run</string>
    <string>--token</string>
    <string>eyJhIjoiNjg1MjIxNDNlNjA4NzE2NTJjM2VjZWEzMzI0NGM3ZDciLCJ0IjoiNjY4ZGIyMWMtY2U0OS00NDE2LWJlNTMtMjI3YWE1NDk2ODhjIiwicyI6Ill6TTJNMkkyTVRRdE1ESTBPUzAwTUdNMExXSm1OVE10TUdFMFlUSTJPV0ZpT1RBMyJ9</string>
</array>
```

**协议**: QUIC (UDP 7844) - 默认
**问题**: UDP被代理拦截，DNS被劫持到198.18.x.x

### 修改后（强制使用HTTP/2）

```xml
<array>
    <string>/opt/homebrew/bin/cloudflared</string>
    <string>tunnel</string>
    <string>run</string>
    <string>--protocol</string>
    <string>http2</string>
    <string>--token</string>
    <string>eyJhIjoiNjg1MjIxNDNlNjA4NzE2NTJjM2VjZWEzMzI0NGM3ZDciLCJ0IjoiNjY4ZGIyMWMtY2U0OS00NDE2LWJlNTMtMjI3YWE1NDk2ODhjIiwicyI6Ill6TTJNMkkyTVRRdE1ESTBPUzAwTUdNMExXSm1OVE10TUdFMFlUSTJPV0ZpT1RBMyJ9</string>
</array>
```

**协议**: HTTP/2 (TCP 443)
**优势**: 代理通常不会阻止HTTPS流量，可绕过限制

---

## 📚 技术背景

### 为什么会出现198.18.x.x地址？

`198.18.0.0/15` 是IANA保留的测试网段，常被企业级代理/VPN/安全软件用作：
- **DNS Sinkhole**: 拦截特定域名的DNS查询，返回内部IP
- **流量检测**: 强制流量通过检测设备
- **策略控制**: 阻止或重定向某些类型的连接

### QUIC vs HTTP/2 协议对比

| 特性 | QUIC | HTTP/2 |
|------|------|--------|
| 传输层 | UDP | TCP |
| 端口 | 7844 (Cloudflare Tunnel) | 443 (HTTPS) |
| 延迟 | 更低 (0-RTT) | 稍高 (TCP握手) |
| 代理兼容性 | 差 (UDP常被阻止) | 好 (HTTPS标准协议) |
| 连接稳定性 | 好 (网络切换时) | 一般 |
| 适用场景 | 公共网络、直连 | 企业网络、代理环境 |

### Cloudflare Tunnel工作原理

```
┌─────────────────────────┐
│   本地 Obsidian API     │
│   127.0.0.1:27124       │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│   cloudflared           │
│   (LaunchDaemon)        │
│   协议: HTTP/2 ✅        │
└────────┬────────────────┘
         │ TCP 443
         │ 加密隧道
         ▼
┌─────────────────────────┐
│   Cloudflare Edge       │
│   全球边缘网络           │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│   公共域名              │
│   obsidian-api          │
│   .chuhaihub.org        │
└─────────────────────────┘
```

---

## 🆘 需要帮助？

### 查看完整日志

```bash
# 实时查看日志
tail -f /Library/Logs/com.cloudflare.cloudflared.err.log

# 查看最近100行
tail -100 /Library/Logs/com.cloudflare.cloudflared.err.log

# 搜索错误
grep -i "error\|failed\|timeout" /Library/Logs/com.cloudflare.cloudflared.err.log
```

### 完全重置Tunnel

```bash
# 1. 停止并卸载服务
sudo launchctl unload /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
sudo cloudflared service uninstall

# 2. 清理日志
sudo rm /Library/Logs/com.cloudflare.cloudflared.*

# 3. 重新安装（使用http2协议）
cd /Users/liasiloam/Vibecoding/Obsidian_Web_Interface
sudo cp com.cloudflare.cloudflared.plist /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
sudo launchctl load /Library/LaunchDaemons/com.cloudflare.cloudflared.plist
```

### 联系支持

- **Cloudflare社区**: https://community.cloudflare.com/
- **Cloudflare文档**: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/
- **GitHub Issues**: https://github.com/cloudflare/cloudflared/issues

---

## 📝 相关文档

- [CLOUDFLARE_WORKER_CORS_PROXY.md](./CLOUDFLARE_WORKER_CORS_PROXY.md) - CORS代理配置
- [PRODUCTION_DEPLOYMENT_FIX_REPORT.md](./PRODUCTION_DEPLOYMENT_FIX_REPORT.md) - 完整问题报告

---

**最后更新**: 2025-10-30
**状态**: 🟡 待验证修复
**预计修复时间**: 5分钟

🤖 Generated with [Claude Code](https://claude.com/claude-code)
