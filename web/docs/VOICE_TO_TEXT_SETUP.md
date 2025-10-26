# 语音转文字功能配置指南

## 功能说明

Quick Capture 支持语音录制并自动转换为文字保存到 Obsidian。目前提供两种实现方案:

## 方案对比

| 特性 | Cloudflare Workers AI ⭐推荐 | Web Speech API (备用) |
|-----|---------------------------|----------------------|
| **成本** | 免费额度慷慨 | 完全免费 |
| **隐私** | 数据在 Cloudflare 处理 | 数据发送给 Google |
| **浏览器兼容** | 全浏览器支持 | 仅 Chrome/Edge |
| **音频支持** | 支持预录音频 | **仅支持实时录音** |
| **准确度** | 高 (Whisper模型) | 中等 |
| **部署难度** | 需部署 Worker | 无需部署 |

## 方案1: Cloudflare Workers AI (推荐)

### 为什么推荐?

1. **完美整合**: 与您现有的 Cloudflare Tunnel 无缝集成
2. **成本极低**: 免费额度足够个人使用
3. **隐私可控**: 数据在您的 Cloudflare 账户中处理
4. **全平台支持**: 任何浏览器都能使用

### 部署步骤

#### 1. 创建 Cloudflare Worker

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** → **Create Application** → **Create Worker**
3. 命名为 `voice-transcription-worker`

#### 2. 编写 Worker 代码

将以下代码粘贴到 Worker 编辑器:

```javascript
export default {
  async fetch(request, env, ctx) {
    // CORS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    // 只接受 POST 请求
    if (request.method !== 'POST') {
      return new Response('Expected POST request', { status: 405 });
    }

    // 获取音频数据
    const audioBlob = await request.blob();
    if (!audioBlob || audioBlob.size === 0) {
      return new Response('Audio data not provided', { status: 400 });
    }

    try {
      // 调用 Cloudflare Workers AI 的 Whisper 模型
      const response = await env.AI.run(
        '@cf/openai/whisper',
        {
          audio: [...new Uint8Array(await audioBlob.arrayBuffer())],
        }
      );

      // 返回转写结果 (添加 CORS 头)
      return new Response(
        JSON.stringify({ text: response.text }),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );

    } catch (e) {
      console.error('Transcription error:', e);
      return new Response(
        JSON.stringify({ error: e.message }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  },
};
```

#### 3. 绑定 Workers AI

1. 在 Worker 设置页面,找到 **Settings** → **Variables**
2. 在 **AI Bindings** 部分,添加绑定:
   - Variable name: `AI`
   - 选择 `Workers AI`

#### 4. 部署 Worker

1. 点击 **Save and Deploy**
2. 复制 Worker URL,例如: `https://voice-transcription-worker.your-account.workers.dev`

#### 5. 配置 PWA 应用

在项目根目录创建 `.env` 文件 (或修改现有文件):

```env
# Obsidian REST API (已有配置)
PUBLIC_API_URL=https://your-tunnel.your-domain.com
PUBLIC_API_KEY=your-api-key

# 语音转文字 API (新增)
PUBLIC_VOICE_API_URL=https://voice-transcription-worker.your-account.workers.dev
```

#### 6. 重启开发服务器

```bash
npm run dev
```

#### 7. 测试

1. 打开应用: http://localhost:5173/capture
2. 点击 🎤 麦克风按钮
3. 录制语音后点击 ⏹ 停止
4. 稍等几秒,查看是否成功转录并保存

---

## 方案2: Web Speech API (临时备用)

### 限制

⚠️ **重要限制**:
- **仅支持实时语音识别**,不支持预录音频转写
- 仅在 Chrome/Edge 浏览器中可用
- 数据会发送给 Google 服务器
- 准确度不如 Cloudflare Workers AI

### 当前实现

如果未配置 `PUBLIC_VOICE_API_URL`,系统会尝试使用 Web Speech API,但由于技术限制,**目前无法正常工作**。

Web Speech API 设计用于实时语音输入,不支持转写已录制的音频文件。如果需要语音转文字功能,请配置 Cloudflare Workers AI。

---

## 离线支持

### IndexedDB 缓存

当网络离线时,录制的音频会自动保存到浏览器 IndexedDB:

1. 音频文件存储在本地
2. 标记为"待同步"
3. 网络恢复后自动上传转写

### 手动同步

在 Capture 页面,如果看到 🔄 同步按钮,说明有离线录音待处理。点击按钮手动触发同步。

---

## 故障排除

### 问题1: Worker 返回 500 错误

**原因**: AI Binding 未正确配置

**解决**:
1. 检查 Worker 设置中是否有 `AI` 绑定
2. 确保 Worker 已部署最新代码
3. 查看 Worker 日志 (Workers & Pages → 选择 Worker → Logs)

### 问题2: CORS 错误

**原因**: Worker 未返回正确的 CORS 头

**解决**:
- 确保 Worker 代码中包含 `Access-Control-Allow-Origin: *`
- 检查 OPTIONS 预检请求是否正确处理

### 问题3: 音频格式不支持

**原因**: Whisper 模型对某些音频格式支持有限

**解决**:
- 检查录制的音频格式 (在 audioService.js 中查看 MIME type)
- 常见支持格式: audio/webm, audio/wav, audio/mp3
- 如果浏览器默认格式不支持,可以在前端转换格式

### 问题4: 转写语言不对

**原因**: Whisper 默认检测语言,可能误判

**解决**:
在 Worker 代码中指定语言:

```javascript
const response = await env.AI.run('@cf/openai/whisper', {
  audio: [...new Uint8Array(await audioBlob.arrayBuffer())],
  language: 'zh', // 强制使用中文
});
```

---

## 成本估算

### Cloudflare Workers AI 定价

- **免费额度**: 每月 10,000 次推理 (Inference)
- **超额费用**: $0.01 / 1000 次推理

**示例**:
- 每天录制 10 条语音 → 每月 300 次
- 完全在免费额度内
- 即使每天 100 条,全年成本也仅 $3.60

---

## 高级配置

### 1. 自定义 Whisper 模型参数

在 Worker 中,可以调整转写参数:

```javascript
const response = await env.AI.run('@cf/openai/whisper', {
  audio: [...new Uint8Array(await audioBlob.arrayBuffer())],
  language: 'zh',           // 指定语言
  task: 'transcribe',       // transcribe 或 translate
  temperature: 0,           // 温度参数 (0-1)
  response_format: 'json',  // 响应格式
});
```

### 2. 添加音频预处理

可以在 Worker 中添加音频降噪、格式转换等预处理逻辑。

### 3. 批量处理优化

如果需要处理多条语音,可以实现队列和批处理机制。

---

## 安全建议

1. **限制 CORS**: 在生产环境中,将 `Access-Control-Allow-Origin` 改为您的域名
2. **添加认证**: 在 Worker 中验证 API Token
3. **速率限制**: 使用 Cloudflare Rate Limiting 防止滥用
4. **日志监控**: 定期检查 Worker 日志,发现异常调用

---

## 参考资源

- [Cloudflare Workers AI 文档](https://developers.cloudflare.com/workers-ai/)
- [Whisper 模型文档](https://developers.cloudflare.com/workers-ai/models/whisper/)
- [Web Speech API 文档](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

---

**配置完成后,语音转文字功能即可正常使用!** 🎉
