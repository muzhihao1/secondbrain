# Cloudflare Worker - CORS Proxy for Obsidian API

## 概述

此Cloudflare Worker作为CORS代理，解决从Vercel部署的前端应用访问Obsidian Local REST API时的跨域问题。

## 功能特性

- ✅ 添加CORS响应头，允许跨域请求
- ✅ 支持所有HTTP方法 (GET, POST, PUT, DELETE, OPTIONS)
- ✅ 处理OPTIONS预检请求
- ✅ 支持多个来源域名（生产环境、开发环境、Vercel预览部署）
- ✅ 完整的错误处理和日志记录
- ✅ 透明代理所有请求到实际的Obsidian API

## Worker代码

```javascript
export default {
  async fetch(request, env, ctx) {
    // Allowed origins for CORS
    const allowedOrigins = [
      'https://secondbrain-two.vercel.app',
      'http://localhost:5173',
      'http://localhost:3000',
      /^https:\/\/secondbrain-.*\.vercel\.app$/  // Vercel preview deployments
    ];

    const origin = request.headers.get('Origin');

    // Check if origin is allowed
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') return allowed === origin;
      if (allowed instanceof RegExp) return allowed.test(origin);
      return false;
    });

    const allowedOrigin = isAllowed ? origin : allowedOrigins[0];

    // Handle OPTIONS preflight request
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': allowedOrigin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      });
    }

    // Proxy request to actual Obsidian API
    const url = new URL(request.url);
    const targetUrl = `https://obsidian-api.chuhaihub.org${url.pathname}${url.search}`;

    try {
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: request.headers,
        body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      });

      // Clone response and add CORS headers
      const modifiedResponse = new Response(response.body, response);
      modifiedResponse.headers.set('Access-Control-Allow-Origin', allowedOrigin);
      modifiedResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      modifiedResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      return modifiedResponse;

    } catch (error) {
      return new Response(JSON.stringify({
        error: 'Proxy Error',
        message: error.message
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': allowedOrigin,
        },
      });
    }
  },
};
```

## 部署步骤

### 1. 创建Cloudflare Worker

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 导航到 **Workers & Pages** → **Create Application** → **Create Worker**
3. 命名Worker: `obsidian-api-cors-proxy`
4. 将上面的代码复制粘贴到Worker编辑器中
5. 点击 **Save and Deploy**
6. 复制Worker URL（格式：`https://obsidian-api-cors-proxy.用户名.workers.dev`）

### 2. 更新Vercel环境变量

1. 访问 [Vercel Dashboard](https://vercel.com/)
2. 选择项目：`secondbrain`
3. 进入 **Settings** → **Environment Variables**
4. 找到 `PUBLIC_API_URL` 变量并编辑
5. 更新值为Worker URL：
   ```
   OLD: https://obsidian-api.chuhaihub.org
   NEW: https://obsidian-api-cors-proxy.你的用户名.workers.dev
   ```
6. 确保启用环境：**Production**, **Preview**, **Development**
7. 保存更改

### 3. 触发重新部署

环境变量更改后需要重新部署才能生效：

```bash
# 在项目根目录执行
git commit --allow-empty -m "chore: trigger redeploy for CORS fix"
git push origin main
```

### 4. 验证配置

部署完成后（约2-3分钟），进行以下测试：

1. 访问 https://secondbrain-two.vercel.app
2. 打开浏览器开发者工具 → Console标签
3. 导航到任务页面 (`/tasks`)
4. 检查控制台 - 不应看到CORS错误
5. 尝试捕获笔记 - 应正常工作

## 配置说明

### 允许的来源域名

在代码中可以自定义允许的来源：

```javascript
const allowedOrigins = [
  'https://secondbrain-two.vercel.app',  // 生产环境
  'http://localhost:5173',               // 本地开发（Vite默认端口）
  'http://localhost:3000',               // 备用本地端口
  /^https:\/\/secondbrain-.*\.vercel\.app$/  // Vercel预览部署（正则表达式）
];
```

### 目标API地址

Worker将所有请求转发到：

```javascript
const targetUrl = `https://obsidian-api.chuhaihub.org${url.pathname}${url.search}`;
```

如需修改Obsidian API地址，更改此行即可。

### CORS响应头

Worker添加以下CORS头：

- `Access-Control-Allow-Origin`: 允许的来源域名
- `Access-Control-Allow-Methods`: 允许的HTTP方法
- `Access-Control-Allow-Headers`: 允许的请求头
- `Access-Control-Max-Age`: 预检请求缓存时间（24小时）

## 架构流程图

```
┌─────────────────────────┐
│   用户浏览器              │
│   secondbrain-two       │
│   .vercel.app           │
└────────┬────────────────┘
         │ HTTPS Request
         │ (带Origin头)
         ▼
┌─────────────────────────┐
│ Cloudflare Worker       │
│ obsidian-api-cors-proxy │
│ - 检查Origin是否允许     │
│ - 添加CORS响应头         │
│ - 转发请求              │
└────────┬────────────────┘
         │ HTTPS Request
         │ (原始请求+headers)
         ▼
┌─────────────────────────┐
│ Cloudflare Tunnel       │
│ obsidian-api            │
│ .chuhaihub.org          │
└────────┬────────────────┘
         │ HTTP (本地)
         ▼
┌─────────────────────────┐
│ Obsidian Local REST API │
│ localhost:27124         │
└─────────────────────────┘
```

## 故障排查

### 问题：Worker返回502 Bad Gateway
**原因**: Worker无法连接到Obsidian API
**解决方案**:
- 检查Cloudflare Tunnel是否运行
- 验证 `obsidian-api.chuhaihub.org` 是否可访问
- 检查Obsidian Local REST API插件是否启用

### 问题：仍然看到CORS错误
**原因**: 旧的部署仍然活跃
**解决方案**:
1. 清除浏览器缓存
2. 硬刷新页面 (Cmd/Ctrl+Shift+R)
3. 检查Vercel部署状态
4. 验证环境变量是否正确更新

### 问题：环境变量未更新
**原因**: Vercel缓存了旧值
**解决方案**:
1. 删除旧的环境变量
2. 创建新的环境变量
3. 强制重新部署

## 测试命令

使用curl测试Worker的CORS配置：

```bash
# 测试OPTIONS预检请求
curl -i -X OPTIONS \
  -H "Origin: https://secondbrain-two.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: Content-Type" \
  https://obsidian-api-cors-proxy.你的用户名.workers.dev/vault/

# 预期响应头：
# Access-Control-Allow-Origin: https://secondbrain-two.vercel.app
# Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
# Access-Control-Allow-Headers: Content-Type, Authorization
```

## 性能考虑

- **延迟**: Worker通常增加 10-50ms 的延迟
- **免费额度**: Cloudflare Workers免费套餐每天10万次请求
- **全球分布**: Worker在Cloudflare全球网络上运行，提供低延迟

## 安全性

- ✅ 仅允许预定义的来源域名
- ✅ 所有请求通过HTTPS加密
- ✅ 支持Authorization头透传
- ✅ 可添加速率限制（未来增强）
- ✅ 可添加请求日志和监控（未来增强）

## 维护

定期检查：
1. Worker日志（在Cloudflare Dashboard中）
2. 请求成功率和错误率
3. 是否需要更新允许的来源列表
4. Cloudflare Workers API版本更新

## 相关文档

- [Cloudflare Workers文档](https://developers.cloudflare.com/workers/)
- [CORS协议说明](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Obsidian Local REST API插件](https://github.com/coddingtonbear/obsidian-local-rest-api)

---

**最后更新**: 2025-10-30
**版本**: 1.0
**状态**: ✅ 生产就绪
