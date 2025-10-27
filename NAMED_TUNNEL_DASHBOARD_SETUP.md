# Named Tunnel 配置指南（Dashboard方法）

> **推荐方法**：使用Cloudflare Zero Trust Dashboard创建tunnel，避免CLI授权问题

---

## 🎯 优势

- ✅ 无需复杂的CLI授权流程
- ✅ 图形化界面，更直观
- ✅ 自动生成配置和token
- ✅ 更稳定可靠

---

## 📋 配置步骤

### 步骤1: 访问Zero Trust Dashboard

1. 打开浏览器访问：**https://one.dash.cloudflare.com/**
2. **登录或注册Cloudflare账号**（完全免费）
3. 如果是新账号，会提示创建团队名称，随便填一个即可

### 步骤2: 创建Tunnel

1. 在左侧菜单找到 **Networks** → **Tunnels**
2. 点击右上角 **Create a tunnel** 按钮
3. 选择 **Cloudflared**
4. 点击 **Next**

### 步骤3: 配置Tunnel

1. **Tunnel name**: 输入 `obsidian-api`（或您喜欢的名字）
2. 点击 **Save tunnel**

### 步骤4: 安装Connector

**重要：** 页面会显示安装命令，**先不要关闭这个页面**！

1. 找到 **macOS** 标签页
2. 复制显示的命令（类似下面的格式）：

```bash
cloudflared service install <TOKEN>
```

3. **在新的终端窗口运行这个命令**

**示例：**
```bash
# 实际的token会很长，类似：
cloudflared service install eyJhIjoiNzk4YjNkZmE5NmQ3NGI1...
```

### 步骤5: 配置Public Hostname

在Dashboard页面继续：

1. 在 **Public Hostnames** 标签页
2. 点击 **Add a public hostname**
3. 填写以下信息：
   - **Subdomain**: `obsidian-api`（或您喜欢的名字）
   - **Domain**: 选择 `<你的团队名>.cloudflareaccess.com`
   - **Service Type**: 选择 `HTTPS`
   - **URL**: 输入 `127.0.0.1:27124`
4. 展开 **Additional application settings**
5. 在 **TLS** 部分：
   - 勾选 **No TLS Verify** ✅（因为Obsidian REST API使用自签名证书）
6. 点击 **Save hostname**

### 步骤6: 验证Tunnel状态

1. 返回 **Tunnels** 列表页面
2. 您应该看到 `obsidian-api` tunnel状态为 **HEALTHY** 🟢
3. 记录您的公共URL，格式类似：
   ```
   https://obsidian-api.<你的团队名>.cloudflareaccess.com
   ```

### 步骤7: 测试连接

在终端测试tunnel是否工作：

```bash
curl https://obsidian-api.<你的团队名>.cloudflareaccess.com/vault/
```

**预期结果：** 应该看到Obsidian vault的文件列表（JSON格式）

---

## 🚀 配置开机自启动

Dashboard方法已经自动配置了系统服务！运行：

```bash
# 检查服务状态
sudo launchctl list | grep cloudflared
```

**服务已经配置为开机自动启动！** 🎉

---

## 🔧 管理命令

### 查看服务状态
```bash
sudo launchctl list | grep cloudflared
```

### 查看日志
```bash
# macOS系统日志
sudo tail -f /var/log/system.log | grep cloudflared

# 或使用log命令
sudo log stream --predicate 'processImagePath contains "cloudflared"' --level debug
```

### 停止服务
```bash
sudo launchctl stop com.cloudflare.cloudflared
```

### 启动服务
```bash
sudo launchctl start com.cloudflare.cloudflared
```

### 卸载服务
```bash
sudo cloudflared service uninstall
```

---

## ⚙️ 更新Vercel环境变量

配置完成后：

1. 访问 https://vercel.com/dashboard
2. 选择项目 `secondbrain`
3. **Settings** → **Environment Variables**
4. 编辑 `VITE_API_URL`，更新为您的tunnel URL：
   ```
   https://obsidian-api.<你的团队名>.cloudflareaccess.com
   ```
5. **Save** → 等待自动重新部署（2-3分钟）

---

## ✅ 完成检查清单

- [ ] Tunnel在Dashboard显示HEALTHY状态
- [ ] curl测试成功返回vault文件列表
- [ ] 服务已配置为开机自启动
- [ ] Vercel环境变量已更新
- [ ] Web应用测试保存功能正常

---

## 🎉 优势总结

使用Dashboard方法，您获得了：

- ✅ **固定URL**: 永久不变的公共地址
- ✅ **自动启动**: 系统服务，开机自动运行
- ✅ **图形化管理**: Dashboard可视化监控tunnel状态
- ✅ **零维护**: 无需手动更新配置
- ✅ **更可靠**: 避免CLI授权问题

---

## ❌ 故障排查

### 问题1: Tunnel显示INACTIVE

```bash
# 检查Obsidian是否运行
pgrep -x "Obsidian"

# 检查REST API是否可访问
curl -k https://127.0.0.1:27124/vault/

# 重启tunnel服务
sudo launchctl stop com.cloudflare.cloudflared
sudo launchctl start com.cloudflare.cloudflared
```

### 问题2: curl测试返回502

- 确保Obsidian正在运行
- 确保REST API插件已启用
- 检查端口27124是否被占用

### 问题3: 服务未启动

```bash
# 检查服务是否安装
sudo launchctl list | grep cloudflared

# 如果没有，重新运行Dashboard提供的安装命令
```

---

## 📚 相关资源

- **Zero Trust Dashboard**: https://one.dash.cloudflare.com/
- **Cloudflare Tunnel文档**: https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/
- **Obsidian REST API插件**: https://github.com/coddingtonbear/obsidian-local-rest-api

---

**配置完成后，您的整个系统将全自动运行！** 🚀
