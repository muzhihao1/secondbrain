# Vercel 环境变量配置指南

## 🚨 紧急修复：环境变量命名问题

### 问题发现
生产环境返回 `{"services":{"cloudflare":false}}` 表示环境变量未被读取。

**根本原因（Ultra MCP 诊断）：**
```
SvelteKit 规则：$env/dynamic/private 不能访问 PUBLIC_ 前缀的变量
```

### ❌ 错误配置
```env
# Vercel Dashboard 中的配置（错误）
PUBLIC_VOICE_API_URL=https://voice-transcription-worker.muzhihao1.workers.dev
```

**为什么错误？**
- `PUBLIC_` 前缀表示这是客户端可见的公开变量
- `$env/dynamic/private` 只能访问**没有前缀**的私有变量
- 这是 SvelteKit 的安全设计，防止混淆公开和私有变量

---

## ✅ 正确配置步骤

### 第 1 步：在 Vercel Dashboard 中重命名环境变量

1. 登录 [Vercel Dashboard](https://vercel.com/)
2. 选择项目：`secondbrain`
3. 进入 **Settings** → **Environment Variables**

#### 需要修改的变量：

| 当前名称（错误） | 新名称（正确） | 用途 |
|-----------------|--------------|------|
| `PUBLIC_VOICE_API_URL` | `VOICE_API_URL` | Cloudflare Workers AI 端点 |
| `PUBLIC_API_KEY`（如有） | `API_KEY` | Cloudflare API 密钥 |

#### 操作步骤：

**方式 1：删除旧变量，创建新变量（推荐）**
```
1. 点击 PUBLIC_VOICE_API_URL 旁边的 "..." → Delete
2. 点击 "Add New" 按钮
3. Key: VOICE_API_URL
4. Value: https://voice-transcription-worker.muzhihao1.workers.dev
5. Environments: Production, Preview, Development（全选）
6. 点击 "Save"
```

**方式 2：编辑现有变量**
```
1. 点击 PUBLIC_VOICE_API_URL 旁边的 "Edit"
2. 修改 Key 为: VOICE_API_URL
3. 保持 Value 不变
4. 点击 "Save"
```

---

### 第 2 步：验证配置

**最终的 Vercel 环境变量应该是：**

```env
# ✅ 正确的服务器端私有变量（无 PUBLIC_ 前缀）
VOICE_API_URL=https://voice-transcription-worker.muzhihao1.workers.dev
API_KEY=your_cloudflare_api_key（可选）
OPENAI_API_KEY=sk-...（可选）
```

**如果需要在前端使用某些变量：**
```env
# ✅ 客户端可见变量（必须有 PUBLIC_ 前缀）
PUBLIC_API_URL=https://obsidian-api.chuhaihub.org
```

---

### 第 3 步：触发重新部署

修改环境变量后，**必须重新部署**才能生效：

**自动部署（推荐）：**
```bash
# 代码已经兼容新旧变量名，直接重新部署即可
git commit --allow-empty -m "chore: trigger redeploy for env var update"
git push origin main
```

**手动部署：**
1. 在 Vercel Dashboard 中进入 **Deployments** 标签
2. 点击最新部署旁边的 "..." → **Redeploy**
3. 确认重新部署

---

## 🔍 SvelteKit 环境变量规则详解

### 规则表

| 变量命名 | 访问模块 | 使用场景 | 可见性 |
|---------|---------|---------|--------|
| `VARIABLE_NAME` | `$env/dynamic/private` | 服务器端 API 密钥 | 私有 |
| `PUBLIC_VARIABLE` | `$env/static/public` | 客户端配置 | 公开 |
| `PUBLIC_VARIABLE` | `$env/dynamic/public` | 客户端运行时配置 | 公开 |

### 关键原则

**✅ 正确做法：**
```javascript
// 服务器端 API 路由 (+server.js)
import { env } from '$env/dynamic/private';

// 访问私有变量（无 PUBLIC_ 前缀）
const apiUrl = env.VOICE_API_URL;        // ✅
const apiKey = env.OPENAI_API_KEY;       // ✅
const dbUrl = env.DATABASE_URL;          // ✅
```

**❌ 错误做法：**
```javascript
// 服务器端尝试访问 PUBLIC_ 变量
import { env } from '$env/dynamic/private';

const apiUrl = env.PUBLIC_VOICE_API_URL; // ❌ 返回 undefined
```

### 为什么这样设计？

**SvelteKit 的安全哲学：**
1. **明确意图**：通过命名区分公开和私有变量
2. **防止泄露**：不允许在服务器端混用公开变量，避免意外暴露
3. **构建优化**：`PUBLIC_` 变量在构建时替换，私有变量运行时读取

---

## 🧪 验证配置是否成功

### 测试 1：健康检查 API

```bash
curl https://secondbrain-two.vercel.app/api/transcribe
```

**成功响应：**
```json
{
  "status": "healthy",
  "services": {
    "cloudflare": true,  // ✅ 应该是 true
    "openai": false
  },
  "primary": "cloudflare-workers-ai"
}
```

**失败响应（需要修复）：**
```json
{
  "services": {
    "cloudflare": false  // ❌ 表示环境变量未读取
  }
}
```

### 测试 2：查看 Vercel 运行时日志

1. 在 Vercel Dashboard 进入 **Deployments**
2. 点击最新部署
3. 查看 **Runtime Logs** 标签
4. 访问 `/api/transcribe` 后查看日志

**预期日志：**
```
[Health Check] Environment variables: {
  VOICE_API_URL: 'SET',
  OPENAI_API_KEY: 'NOT SET'
}
```

---

## 📋 完整配置清单

### 必需配置

| 变量名 | 值示例 | 环境 | 说明 |
|--------|--------|------|------|
| `VOICE_API_URL` | `https://voice-transcription-worker.muzhihao1.workers.dev` | Production, Preview | Cloudflare Workers AI 转录端点 |

### 可选配置

| 变量名 | 值示例 | 环境 | 说明 |
|--------|--------|------|------|
| `API_KEY` | `your_cloudflare_api_key` | Production, Preview | Cloudflare Worker 认证（如需要） |
| `OPENAI_API_KEY` | `sk-...` | Production | OpenAI Whisper 回退（高精度） |
| `PUBLIC_API_URL` | `https://obsidian-api.chuhaihub.org` | All | Obsidian API 端点（前端使用） |

---

## 🔧 故障排查

### 问题 1: 修改后仍然返回 `cloudflare: false`

**检查清单：**
- [ ] 确认在 Vercel Dashboard 中已删除 `PUBLIC_VOICE_API_URL`
- [ ] 确认已创建新变量 `VOICE_API_URL`（无 PUBLIC_ 前缀）
- [ ] 确认变量适用于 Production 环境
- [ ] 确认已触发重新部署
- [ ] 等待部署完成（通常 1-2 分钟）

### 问题 2: 日志显示 "Environment variables: { VOICE_API_URL: 'NOT SET' }"

**可能原因：**
1. 环境变量名称拼写错误
2. 变量未启用 Production 环境
3. 使用了旧的部署（未重新部署）

**解决步骤：**
```bash
# 1. 检查 Vercel Dashboard 中的变量名
# 2. 确认变量已保存
# 3. 强制重新部署
git commit --allow-empty -m "chore: force redeploy"
git push origin main
```

### 问题 3: 前端需要访问 API URL

**场景：** 前端代码需要知道转录 API 的 URL

**解决方案：**
前端应该使用相对路径访问自己的 API 端点：

```javascript
// ✅ 正确：前端使用相对路径
const response = await fetch('/api/transcribe', {
  method: 'POST',
  body: audioBlob
});

// ❌ 错误：前端不应该直接调用 Cloudflare Worker
// const response = await fetch(PUBLIC_VOICE_API_URL, {...});
```

**架构：**
```
前端 → /api/transcribe (SvelteKit) → Cloudflare Worker
```

这样：
- 前端不需要知道 Cloudflare Worker URL
- API 密钥保护在服务器端
- 避免 CORS 问题

---

## 📚 相关文档

- **SvelteKit 环境变量文档：** https://kit.svelte.dev/docs/modules#$env-dynamic-private
- **Vercel 环境变量指南：** https://vercel.com/docs/projects/environment-variables
- **部署修复总结：** `web/docs/DEPLOYMENT_FIX_SUMMARY.md`
- **Whisper 模型分析：** `web/docs/WHISPER_MODEL_ANALYSIS.md`

---

## ✅ 配置完成检查表

- [ ] 在 Vercel 中删除 `PUBLIC_VOICE_API_URL`
- [ ] 在 Vercel 中创建 `VOICE_API_URL`
- [ ] 变量值正确：`https://voice-transcription-worker.muzhihao1.workers.dev`
- [ ] 变量启用 Production 环境
- [ ] 触发重新部署
- [ ] 部署完成
- [ ] 健康检查返回 `cloudflare: true`
- [ ] 前端语音转录功能测试通过

---

**文档版本：** v1.0.0
**最后更新：** 2025-01-28
**关键发现：** SvelteKit `$env/dynamic/private` 不能访问 `PUBLIC_` 前缀变量
**解决方案：** 去掉 PUBLIC_ 前缀，使用 `VOICE_API_URL` 代替 `PUBLIC_VOICE_API_URL`
