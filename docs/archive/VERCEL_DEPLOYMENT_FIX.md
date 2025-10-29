# 🔧 Vercel 部署错误修复指南

> 解决 "Root Directory 'web' does not exist" 错误 | 2025-10-29

---

## ⚠️ 错误信息

```
The specified Root Directory "web" does not exist.
Please update your Project Settings.
```

**发生时间**: 2025-10-29 20:33
**部署 ID**: iad1
**GitHub Commit**: 75fcef9

---

## 🔍 问题分析

### 根本原因

**配置不匹配**: Vercel 项目配置中的 Root Directory 仍然指向旧的 `web/` 目录，但项目已重组到根目录。

| 项目 | 配置状态 | 实际状态 | 结果 |
|------|---------|---------|------|
| **Vercel 配置** | Root Directory = `web` | ❌ 配置过时 | 部署失败 |
| **GitHub 仓库** | 文件在根目录 | ✅ 结构已更新 | 无法找到文件 |

### 时间线

1. **2025-10-29 19:00** - 项目从 `web/` 重组到根目录
2. **2025-10-29 20:32** - 推送到 GitHub (commit 75fcef9)
3. **2025-10-29 20:33** - Vercel 自动部署触发
4. **2025-10-29 20:33** - 部署失败：找不到 `web/` 目录

---

## ✅ 解决方案

### 方案一：通过 Vercel Dashboard 修复（推荐）

这是最直接和推荐的方法。

#### 步骤 1：登录 Vercel

1. 访问 https://vercel.com
2. 登录您的账户

#### 步骤 2：进入项目设置

1. 在 Dashboard 中找到 `secondbrain` 项目
2. 点击项目卡片进入项目页面

#### 步骤 3：修改 Root Directory

1. 点击顶部 **"Settings"** 标签页
2. 在左侧导航栏选择 **"General"**
3. 向下滚动找到 **"Root Directory"** 选项
4. 将输入框中的 `web` **删除并留空**（或输入 `.`）

   ```
   之前: web
   之后: (留空) 或 .
   ```

5. 点击底部 **"Save"** 按钮保存更改

#### 步骤 4：重新部署

**选项 A: 手动重新部署**
1. 点击顶部 **"Deployments"** 标签页
2. 找到失败的部署
3. 点击右侧 "..." 菜单
4. 选择 **"Redeploy"**

**选项 B: 推送新提交触发自动部署**
```bash
cd Obsidian_Web_Interface
git commit --allow-empty -m "chore: trigger Vercel redeploy"
git push origin main
```

---

### 方案二：通过 vercel.json 配置（可选）

如果您希望通过代码管理配置，可以在项目根目录创建或更新 `vercel.json`：

```json
{
  "framework": "sveltekit",
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "installCommand": "npm install"
}
```

**注意**:
- 不需要指定 `"root": "."` - 默认就是根目录
- 这个方法需要推送到 GitHub 并等待 Vercel 读取新配置

---

## 🎯 验证修复

### 检查清单

修复后，请验证以下内容：

- [ ] Vercel Settings > General > Root Directory 为空或为 `.`
- [ ] 新的部署已开始
- [ ] 构建日志显示正在安装依赖 (`npm install`)
- [ ] 构建命令执行成功 (`npm run build`)
- [ ] 部署状态变为 "Ready"

### 预期的正确构建日志

```
✓ Cloning completed
✓ Running "npm install"
✓ Running "npm run build"
✓ Traced Next.js server files
✓ Build completed
✓ Uploading build outputs
✓ Deployment ready
```

---

## 🔧 其他可能需要检查的配置

### Build & Development Settings

确保以下设置正确：

| 设置项 | 推荐值 | 说明 |
|--------|--------|------|
| **Framework Preset** | SvelteKit | 自动检测 |
| **Build Command** | `npm run build` | 或留空使用默认 |
| **Output Directory** | `build` | SvelteKit 默认输出 |
| **Install Command** | `npm install` | 或留空使用默认 |
| **Root Directory** | (空) 或 `.` | ⚠️ 关键修复点 |

### 环境变量

检查是否需要设置环境变量：

```bash
# Vercel Dashboard > Settings > Environment Variables
PUBLIC_API_URL=https://your-api-url.com
# 其他必需的环境变量...
```

---

## 📊 项目结构对比

### Before (旧结构)

```
GitHub Repo Root/
├── web/                    # ← Vercel Root Directory 指向这里
│   ├── package.json
│   ├── src/
│   ├── static/
│   └── ...
└── backend/
```

### After (新结构)

```
GitHub Repo Root/           # ← Vercel Root Directory 应该指向这里
├── package.json
├── src/
├── static/
├── backend/
└── ...
```

---

## 🚨 常见错误和解决方法

### 错误 1: 修改后仍然失败

**可能原因**: Vercel 缓存了旧配置

**解决方法**:
1. 在 Vercel Dashboard 中完全删除失败的部署
2. 手动触发新部署
3. 或等待几分钟后再次推送

### 错误 2: 找不到 package.json

**可能原因**: Root Directory 设置不正确

**解决方法**:
- 确保 Root Directory 完全为空（不是空格）
- 尝试输入 `.` 而不是留空
- 清除浏览器缓存后重新检查设置

### 错误 3: 构建命令失败

**可能原因**: package.json 中的脚本配置问题

**解决方法**:
```bash
# 本地测试构建
cd Obsidian_Web_Interface
npm install
npm run build

# 如果本地成功，则是 Vercel 配置问题
```

---

## 🎓 经验教训

### 为什么会发生这个问题？

1. **项目重组**: 从嵌套结构移到扁平结构
2. **配置未同步**: Vercel 配置未随代码结构更新
3. **自动化触发**: Git push 自动触发部署，暴露了配置问题

### 如何避免类似问题？

#### 重构检查清单

当进行项目结构重组时，检查以下配置：

- [ ] Vercel Root Directory
- [ ] GitHub Actions 工作流路径
- [ ] CI/CD 脚本中的路径引用
- [ ] 文档中的路径说明
- [ ] README 中的快速开始指南
- [ ] docker-compose.yml 路径（如有）
- [ ] 团队成员的本地开发环境

#### 最佳实践

1. **配置即代码**: 使用 `vercel.json` 将配置纳入版本控制
2. **文档化**: 记录所有外部服务的配置依赖
3. **测试部署**: 重大重构后先在 Preview 环境测试
4. **团队通知**: 结构变更后立即通知团队成员

---

## 📝 修复验证报告模板

修复完成后，请填写以下验证报告：

```
修复时间: ____
修复方法: □ Dashboard  □ vercel.json  □ 其他
修复人: ____

验证结果:
- [ ] Root Directory 已更新
- [ ] 部署已重新触发
- [ ] 构建成功完成
- [ ] 应用可正常访问
- [ ] 所有页面正常加载

部署URL: ____
部署状态: □ Success  □ Failed
备注: ____
```

---

## 🔗 相关资源

### Vercel 文档
- [Project Configuration](https://vercel.com/docs/concepts/projects/project-configuration)
- [Build Step](https://vercel.com/docs/concepts/deployments/build-step)
- [Root Directory](https://vercel.com/docs/concepts/projects/project-configuration#root-directory)

### 项目文档
- [PROJECT_README.md](PROJECT_README.md)
- [DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md)
- [PROJECT_RELOCATION_REPORT.md](PROJECT_RELOCATION_REPORT.md)

---

## ✅ 快速参考

### 修复命令速查

```bash
# 方案 1: Vercel Dashboard
# 1. 登录 https://vercel.com
# 2. Settings > General > Root Directory > (留空)
# 3. Save > Deployments > Redeploy

# 方案 2: 触发新部署
cd Obsidian_Web_Interface
git commit --allow-empty -m "chore: trigger redeploy"
git push origin main
```

### 验证命令

```bash
# 检查 GitHub 最新提交
git log -1 --oneline

# 本地测试构建
npm install
npm run build
npm run preview

# 检查 Vercel CLI 状态（如已安装）
vercel whoami
vercel ls
```

---

**文档创建**: 2025-10-29
**问题状态**: ⚠️ 待修复
**优先级**: 🔴 高（阻塞生产部署）
**预计解决时间**: 5-10 分钟

---

**💡 提示**: 修复后请更新此文档的状态为 "✅ 已修复"**
