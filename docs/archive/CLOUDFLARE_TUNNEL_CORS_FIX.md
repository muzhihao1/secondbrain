# Cloudflare Tunnel CORS 配置指南

## 问题描述

Vercel 部署的前端应用无法访问通过 Cloudflare Tunnel 暴露的 Obsidian REST API:

```
Access to fetch at 'https://obsidian-api.chuhaihub.org/vault/...'
from origin 'https://secondbrain-two.vercel.app'
has been blocked by CORS policy
```

## 原因分析

Obsidian Local REST API 插件默认不返回 CORS 头,导致浏览器阻止跨域请求。

## 解决方案

### 方案 1: Cloudflare Workers 代理 (推荐)

在 Cloudflare Workers 中创建一个代理,自动添加 CORS 头。

#### 1. 创建 Worker

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 进入 **Workers & Pages** → **Create Application** → **Create Worker**
3. 命名为 `obsidian-api-cors-proxy`

#### 2. Worker 代码

```javascript
export default {
  async fetch(request, env, ctx) {
    // 允许的来源域名
    const allowedOrigins = [
      'https://secondbrain-two.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000'
    ];

    const origin = request.headers.get('Origin');

    // 处理 OPTIONS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // 代理请求到实际的 Obsidian API
    const url = new URL(request.url);
    const targetUrl = `http://localhost:27124${url.pathname}${url.search}`;

    // 克隆请求并转发
    const modifiedRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    // 获取响应
    const response = await fetch(modifiedRequest);

    // 克隆响应并添加 CORS 头
    const modifiedResponse = new Response(response.body, response);

    modifiedResponse.headers.set(
      'Access-Control-Allow-Origin',
      allowedOrigins.includes(origin) ? origin : allowedOrigins[0]
    );
    modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    modifiedResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return modifiedResponse;
  },
};
```

#### 3. 配置 Tunnel 路由

**注意**: Worker 需要通过 Cloudflare 隧道访问本地的 Obsidian API。

**实际上更简单的方法**: 直接在 Worker 中代理到您的隧道 URL:

```javascript
export default {
  async fetch(request, env, ctx) {
    const allowedOrigins = [
      'https://secondbrain-two.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000'
    ];

    const origin = request.headers.get('Origin');

    // 处理 OPTIONS 预检请求
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // 代理到您现有的 Tunnel URL
    const url = new URL(request.url);
    const targetUrl = `https://obsidian-api.chuhaihub.org${url.pathname}${url.search}`;

    try {
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      });

      // 添加 CORS 头
      const modifiedResponse = new Response(response.body, response);
      modifiedResponse.headers.set(
        'Access-Control-Allow-Origin',
        allowedOrigins.includes(origin) ? origin : allowedOrigins[0]
      );
      modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      modifiedResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      return modifiedResponse;

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
        },
      });
    }
  },
};
```

#### 4. 部署 Worker

1. 点击 **Save and Deploy**
2. 复制 Worker URL: `https://obsidian-api-cors-proxy.muzhihao1.workers.dev`

#### 5. 更新前端配置

在 Vercel 环境变量中,将 `PUBLIC_API_URL` 改为 Worker URL:

```
OLD: PUBLIC_API_URL=https://obsidian-api.chuhaihub.org
NEW: PUBLIC_API_URL=https://obsidian-api-cors-proxy.muzhihao1.workers.dev
```

---

### 方案 2: Obsidian 插件配置 (如果插件支持)

某些版本的 Obsidian Local REST API 插件可能支持 CORS 配置。

1. 打开 Obsidian
2. 进入 **Settings** → **Community Plugins** → **Local REST API**
3. 查找 CORS 相关设置
4. 如果有,添加:
   ```
   https://secondbrain-two.vercel.app
   ```

**注意**: 大多数版本不支持此功能,推荐使用方案 1。

---

### 方案 3: 浏览器扩展 (仅开发测试)

⚠️ **不推荐用于生产环境**

安装 CORS 浏览器扩展:
- Chrome: [CORS Unblock](https://chrome.google.com/webstore/detail/cors-unblock)
- Firefox: [CORS Everywhere](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/)

---

## 验证 CORS 配置

### 使用 curl 测试

```bash
# 测试 OPTIONS 预检请求
curl -i -X OPTIONS \
  -H "Origin: https://secondbrain-two.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type, Authorization" \
  https://obsidian-api-cors-proxy.muzhihao1.workers.dev/vault/

# 预期响应头:
# Access-Control-Allow-Origin: https://secondbrain-two.vercel.app
# Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
# Access-Control-Allow-Headers: Content-Type, Authorization
```

### 浏览器测试

1. 打开 https://secondbrain-two.vercel.app
2. 打开浏览器开发者工具 (F12)
3. 尝试录音或文本捕获
4. 检查 **Network** 标签:
   - ✅ 请求状态应为 `200 OK`
   - ✅ 响应头包含 `Access-Control-Allow-Origin`

---

## 故障排除

### 问题 1: Worker 返回 502 Bad Gateway

**原因**: Worker 无法访问本地 Obsidian API

**解决**:
- 确保 Cloudflare Tunnel 正在运行
- 检查 `targetUrl` 是否正确指向您的 Tunnel URL

### 问题 2: 仍然有 CORS 错误

**原因**: `allowedOrigins` 数组不包含实际的请求来源

**解决**:
1. 在浏览器控制台查看错误日志中的 `Origin` 值
2. 将该值添加到 Worker 的 `allowedOrigins` 数组
3. 重新部署 Worker

### 问题 3: Vercel Preview 部署无法访问

**原因**: Preview 部署使用不同的域名 (例如 `secondbrain-git-feature-muzhihao1.vercel.app`)

**解决**:
在 `allowedOrigins` 中添加通配符支持,或添加所有可能的 Preview 域名:

```javascript
const allowedOrigins = [
  'https://secondbrain-two.vercel.app',
  // 匹配所有 Vercel Preview 部署
  /^https:\/\/secondbrain-.*\.vercel\.app$/
];

// 修改检查逻辑
const isAllowed = allowedOrigins.some(allowed => {
  if (typeof allowed === 'string') return allowed === origin;
  if (allowed instanceof RegExp) return allowed.test(origin);
  return false;
});
```

---

## 推荐架构

```
┌─────────────────┐
│  Vercel (前端)   │
│  *.vercel.app   │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────────────────┐
│ Cloudflare Worker (CORS代理) │
│ obsidian-api-cors-proxy     │
│ - 添加 CORS 头              │
│ - 转发请求                  │
└────────┬────────────────────┘
         │ HTTPS
         ▼
┌─────────────────────────────┐
│ Cloudflare Tunnel           │
│ obsidian-api.chuhaihub.org  │
└────────┬────────────────────┘
         │ HTTP (本地)
         ▼
┌─────────────────────────────┐
│ Obsidian Local REST API     │
│ localhost:27124             │
└─────────────────────────────┘
```

**优势**:
- ✅ 完全控制 CORS 策略
- ✅ 可添加额外的安全层 (速率限制、认证)
- ✅ 无需修改 Obsidian 插件
- ✅ 支持所有 Vercel 部署环境

---

**实施后,CORS 错误将完全消失!** 🎉
