# 🚀 Quick Capture Web - 完整安装指南

从零开始设置前端PWA应用的详细步骤。

---

## 📋 前置要求

### 系统要求
- **Node.js**: 18.x 或更高版本
- **npm**: 9.x 或更高版本
- **浏览器**: Chrome 90+, Safari 15+, Firefox 88+

### 后端服务
- FastAPI后端必须已经运行在 `http://localhost:8000`
- 参见：`../backend/README.md`

---

## 🔧 安装步骤

### 步骤1: 安装依赖

```bash
cd web
npm install
```

**预计时间**: 2-3分钟

**验证安装**:
```bash
npm list svelte
# 应该显示 svelte@4.x.x
```

---

### 步骤2: 环境配置

#### 2.1 创建环境变量文件

```bash
cp .env.example .env
```

#### 2.2 本地开发配置

编辑 `.env`:

```env
# 本地开发
PUBLIC_API_URL=http://localhost:8000
```

#### 2.3 手机测试配置

**获取Mac的本地IP地址**:

```bash
# macOS
ifconfig | grep "inet " | grep -v 127.0.0.1

# 输出示例：
# inet 192.168.1.100 netmask 0xffffff00 broadcast 192.168.1.255
```

**更新 `.env`**:

```env
# 手机测试（替换为你的Mac IP）
PUBLIC_API_URL=http://192.168.1.100:8000
```

---

### 步骤3: 启动开发服务器

```bash
npm run dev
```

**成功输出示例**:
```
  VITE v5.0.11  ready in 1234 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.100:5173/
  ➜  press h + enter to show help
```

---

### 步骤4: 验证安装

#### 4.1 浏览器访问

打开：`http://localhost:5173`

你应该看到:
- ⚡ Quick Capture 标题
- 大文本输入框
- 💾 保存 和 🎤 麦克风按钮
- 底部导航栏

#### 4.2 功能测试

1. **文本捕获测试**:
   - 输入："测试文本捕获"
   - 点击"💾 保存"
   - 应该看到成功提示: "✅ 想法已保存"

2. **API连接测试**:
   - 打开浏览器控制台 (F12)
   - 查看Network标签
   - 应该看到POST请求到 `/api/capture`
   - 状态码应该是 200

#### 4.3 手机访问测试

**确保**:
- 手机和Mac在同一WiFi网络
- 后端服务器正在运行
- `.env` 中的IP地址正确

**手机浏览器访问**:
```
http://192.168.1.100:5173
```

**首次访问可能需要**:
- 允许不安全的HTTP连接（开发环境）
- 在iOS上：设置 → Safari → 高级 → 允许不安全的内容

---

## 🏗️ 构建生产版本

### 步骤1: 构建

```bash
npm run build
```

**输出目录**: `build/`

### 步骤2: 预览

```bash
npm run preview
```

访问：`http://localhost:4173`

### 步骤3: 部署

构建产物在 `build/` 目录中，可以部署到:

- **Netlify**: 拖拽 `build/` 文件夹
- **Vercel**: 连接Git仓库
- **Nginx**: 复制到web根目录
- **Apache**: 复制到htdocs

**注意**: 部署时需要配置环境变量 `PUBLIC_API_URL` 指向生产API地址。

---

## 🐛 故障排除

### 问题1: npm install 失败

**症状**:
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**解决**:
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

### 问题2: 开发服务器启动失败

**症状**:
```
Error: Could not resolve entry module
```

**检查**:
- Node.js版本 >= 18
- 删除 `.svelte-kit` 目录

**解决**:
```bash
rm -rf .svelte-kit
npm run dev
```

---

### 问题3: API请求失败 (CORS错误)

**症状**:
```
Access to fetch at 'http://localhost:8000/api/capture' from origin
'http://localhost:5173' has been blocked by CORS policy
```

**检查后端CORS配置**:

在 `backend/main.py` 中应该有:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 开发环境允许所有源
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

### 问题4: 手机无法访问

**症状**: 手机浏览器显示"无法连接"

**检查清单**:
1. ✅ 手机和Mac在同一WiFi
2. ✅ Mac IP地址正确（不是127.0.0.1）
3. ✅ 后端服务运行中
4. ✅ 防火墙允许5173端口

**macOS防火墙设置**:
```
系统偏好设置 → 安全性与隐私 → 防火墙 → 防火墙选项
→ 允许Node.js传入连接
```

**测试连通性**:
```bash
# 在手机上用浏览器访问
http://192.168.1.100:5173/
```

---

### 问题5: 语音录制不工作

**症状**: 点击麦克风无响应或权限被拒绝

**原因**:
- MediaRecorder API需要安全上下文(HTTPS或localhost)
- 浏览器不支持

**解决**:
1. **本地测试**: 使用 `localhost` (自动视为安全上下文)
2. **手机测试**:
   - iOS: 使用Safari (支持MediaRecorder)
   - Android: 使用Chrome (完全支持)
3. **生产环境**: 必须使用HTTPS

**检查浏览器支持**:
```javascript
// 在浏览器控制台运行
console.log(!!navigator.mediaDevices);  // 应该是true
console.log(!!window.MediaRecorder);   // 应该是true
```

---

### 问题6: PWA无法安装

**症状**: 没有显示"添加到主屏幕"选项

**要求**:
- ✅ 通过HTTPS访问（或localhost）
- ✅ manifest.json存在且有效
- ✅ Service Worker注册成功
- ✅ 有图标文件

**验证manifest**:
```bash
# 访问
http://localhost:5173/manifest.json

# 应该返回JSON（不是404）
```

**验证Service Worker**:
```
打开浏览器控制台 → Application → Service Workers
→ 应该看到注册的worker
```

---

## 📊 性能检查

### Lighthouse审计

1. 打开Chrome DevTools
2. 切换到Lighthouse标签
3. 选择Mobile + PWA
4. 点击"Generate report"

**目标分数**:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90
- PWA: > 90

---

## 🔐 安全注意事项

### 开发环境
- ❌ 不要在生产使用 `allow_origins=["*"]`
- ❌ 不要提交 `.env` 到Git
- ❌ 不要暴露API密钥

### 生产环境
- ✅ 使用HTTPS
- ✅ 限制CORS到特定域名
- ✅ 使用环境变量管理密钥
- ✅ 启用rate limiting

---

## 🚀 下一步

现在你的前端已经运行起来了！

1. ✅ 测试所有功能
2. ✅ 在手机上安装PWA
3. ✅ 尝试离线模式
4. ✅ 录制语音测试
5. ✅ 查看Dashboard和Timeline

**享受你的AI知识管理系统！** 🎉

---

## 📞 获取帮助

遇到问题？

1. 查看 [README.md](./README.md) 常见问题
2. 检查浏览器控制台错误
3. 查看后端日志
4. 提交Issue到GitHub

---

**文档版本**: 1.0.0
**最后更新**: 2025-01-28
