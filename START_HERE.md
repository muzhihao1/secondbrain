# 🚀 快速开始指南

欢迎使用智能知识管理系统！这个指南将帮助你在10分钟内启动并运行系统。

---

## ✅ 第一步：配置API密钥

### 1. 获取OpenAI API密钥

1. 访问 https://platform.openai.com/api-keys
2. 登录你的账号（如果没有，需要先注册）
3. 点击 "Create new secret key"
4. 复制密钥（只显示一次，请保存好）

**预估成本：**
- GPT-4: ~$0.03-0.06 per 1K tokens
- Whisper: $0.006/分钟
- 日常使用估算：$5-10/月

### 2. 创建环境变量文件

```bash
# 在项目根目录创建 .env 文件
cd "/Users/liasiloam/Library/Mobile Documents/iCloud~md~obsidian/Documents/03_Orchestration/conversational_ai"

# 复制示例文件
cp .env.example .env

# 编辑 .env 文件
nano .env  # 或使用你喜欢的编辑器
```

### 3. 修改 .env 文件

将 `OPENAI_API_KEY` 的值替换为你的真实密钥：

```bash
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
```

其他配置通常不需要修改，除非你的vault路径不同。

---

## 🔧 第二步：安装依赖

### 安装Python依赖

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
```

**注意：**
- 需要Python 3.11或更高版本
- 如果提示权限错误，可能需要 `sudo` 或使用 `--user` 选项

---

## 🚀 第三步：启动后端服务

```bash
# 确保在backend目录且虚拟环境已激活
cd backend
source venv/bin/activate

# 启动服务器
python main.py
```

**你应该看到：**

```
============================================================
🚀 Knowledge Management API v1.0.0
============================================================
📁 Vault: /Users/liasiloam/Library/.../Documents
🤖 AI Model: gpt-4-turbo-preview
🌐 Server: http://0.0.0.0:8000
📚 API Docs: http://0.0.0.0:8000/docs
============================================================

INFO:     Uvicorn running on http://0.0.0.0:8000
```

**测试API是否工作：**

打开浏览器访问：http://localhost:8000

你应该看到JSON响应，包含API信息。

---

## 🎨 第四步：测试核心功能

### 方法1：使用Swagger UI（推荐）

1. 打开浏览器：http://localhost:8000/docs
2. 你会看到所有API接口的交互式文档
3. 点击 `POST /api/capture`
4. 点击 "Try it out"
5. 输入测试数据：

```json
{
  "content": "今天学习了FastAPI和Svelte，感觉很强大！",
  "input_type": "text",
  "metadata": null
}
```

6. 点击 "Execute"
7. 查看响应，应该显示成功并返回文件路径

### 方法2：使用curl命令

```bash
curl -X POST "http://localhost:8000/api/capture" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "测试记录：系统启动成功",
    "input_type": "text"
  }'
```

### 验证数据是否保存

```bash
# 查看你的Obsidian vault
cd "/Users/liasiloam/Library/Mobile Documents/iCloud~md~obsidian/Documents/01_Execution/Daily_Operations/Ideas"

# 列出最新文件
ls -lt | head -5
```

你应该看到刚刚创建的markdown文件！

---

## 📱 第五步：手机访问（可选）

### 1. 获取你的Mac的IP地址

```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

例如输出：`inet 192.168.1.100`

### 2. 确保手机和Mac在同一WiFi网络

### 3. 手机浏览器访问

打开手机浏览器，输入：

```
http://你的IP地址:8000
```

例如：`http://192.168.1.100:8000`

如果成功，你应该看到API信息。

---

## 🧪 第六步：测试AI功能

### 测试智能分类

```bash
curl -X POST "http://localhost:8000/api/capture" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "完成了用户认证模块的开发，包括JWT token验证和权限管理"
  }'
```

AI应该识别这是 `work_log` 并保存到工作日志目录。

### 测试聊天功能

访问：http://localhost:8000/docs

找到 `POST /api/chat`，测试对话：

```json
{
  "message": "我今天想记录一些学习笔记",
  "conversation_history": [],
  "include_context": true
}
```

---

## 📊 第七步：查看Dashboard数据

访问：http://localhost:8000/api/dashboard

你会看到：
- 今日统计
- 活跃项目列表
- 写作中的文章
- 最近的记录

---

## 🎯 常见问题排查

### 问题1：`OPENAI_API_KEY not configured`

**解决：**
1. 确认 `.env` 文件存在于项目根目录
2. 确认文件中有 `OPENAI_API_KEY=sk-...`
3. 确认没有多余的空格或引号
4. 重启后端服务

### 问题2：`Obsidian vault path does not exist`

**解决：**
1. 检查 `.env` 中的 `OBSIDIAN_VAULT_PATH`
2. 确保路径是绝对路径
3. 路径中有空格需要正确处理
4. 确认该目录确实存在

### 问题3：`Port 8000 already in use`

**解决：**
```bash
# 查找占用端口的进程
lsof -i :8000

# 杀死进程
kill -9 <PID>

# 或者修改 .env 中的 BACKEND_PORT=8001
```

### 问题4：无法从手机访问

**解决：**
1. 确认Mac防火墙设置允许incoming connections
2. 确认手机和Mac在同一WiFi
3. 尝试ping Mac的IP地址
4. 检查 `.env` 中的 `CORS_ORIGINS` 是否包含手机访问的URL

---

## 🎉 成功标志

如果以下都正常，说明后端已完全可用：

- ✅ 后端服务启动无错误
- ✅ 访问 http://localhost:8000 看到API信息
- ✅ Swagger UI (http://localhost:8000/docs) 可访问
- ✅ 测试capture接口成功
- ✅ 在Obsidian中看到自动创建的文件
- ✅ AI正确分类了输入内容
- ✅ Dashboard返回正确的统计数据

---

## 📱 下一步：前端开发

后端已经完全可用！现在你可以：

**选项1：直接使用API（测试阶段）**
- 使用Swagger UI：http://localhost:8000/docs
- 使用Postman或curl测试所有功能

**选项2：开发前端界面**
- 我会为你生成完整的Svelte前端代码
- 包含手机优化的UI
- 语音输入、聊天界面、Dashboard等

**选项3：集成到现有工具**
- 可以从其他应用（如Shortcuts、Raycast）调用API
- 编写自动化脚本

---

## 💡 小贴士

1. **保持后端运行**：开发过程中后端需要一直运行
2. **查看日志**：后端会实时打印请求日志，方便调试
3. **API文档**：http://localhost:8000/docs 是你的最好朋友
4. **测试AI**：多测试不同类型的输入，帮助AI学习分类
5. **备份数据**：虽然系统不会删除文件，但建议定期备份vault

---

## 🆘 需要帮助？

遇到问题请告诉我：
1. 具体的错误信息
2. 你执行的命令
3. 你的系统环境（Mac/Linux，Python版本）

我会帮你快速解决！

---

**准备好了吗？让我们开始！** 🚀

首先执行：

```bash
cd "/Users/liasiloam/Library/Mobile Documents/iCloud~md~obsidian/Documents/03_Orchestration/conversational_ai"
cp .env.example .env
nano .env  # 添加你的OPENAI_API_KEY
```

然后告诉我结果！
