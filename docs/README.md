# 📚 文档目录

本目录包含Obsidian Web Interface项目的所有技术文档和报告。

---

## 📁 目录结构

```
docs/
├── README.md                      # 本文件
├── reports/                       # 当前有效的报告
│   ├── PHASE_1_FINAL_REPORT.md   # Phase 1最终报告
│   ├── DASHBOARD_REDESIGN_REPORT.md  # Dashboard重设计报告
│   └── PRODUCTION_DEPLOYMENT_REPORT.md  # 生产部署报告
├── archive/                       # 归档的旧文档
│   ├── PHASE_1_DAY_6_SUMMARY.md  # 日常总结（已整合到最终报告）
│   ├── MOCKUP_REDESIGN_REPORT.md # Mockup设计报告（已整合）
│   └── FRONTEND_COMPLETE.md      # 里程碑文档（已整合）
├── DEPLOYMENT_GUIDE.md           # 部署指南
├── VERCEL_ENV_SETUP.md           # Vercel环境变量配置
├── VERCEL_DEPLOYMENT_FIX.md      # Vercel部署问题修复
├── IMPLEMENTATION_PLAN.md        # 实现计划
├── DEPLOYMENT_FIX_SUMMARY.md     # 部署修复总结
├── FRONTEND_REFACTOR_MASTER_PLAN.md  # 前端重构总计划
├── VOICE_TO_TEXT_SETUP.md        # 语音转文字设置
└── WHISPER_MODEL_ANALYSIS.md     # Whisper模型分析
```

---

## 📊 报告文档 (reports/)

### 当前有效的报告

这些是项目最新和最重要的报告，反映当前状态：

| 报告 | 日期 | 描述 |
|------|------|------|
| [PHASE_1_FINAL_REPORT.md](reports/PHASE_1_FINAL_REPORT.md) | 2025-10-28 | Phase 1完整总结，包含核心功能、架构决策 |
| [DASHBOARD_REDESIGN_REPORT.md](reports/DASHBOARD_REDESIGN_REPORT.md) | 2025-10-28 | Dashboard重设计的完整报告 |
| [PRODUCTION_DEPLOYMENT_REPORT.md](reports/PRODUCTION_DEPLOYMENT_REPORT.md) | 2025-10-28 | 生产环境部署过程和结果 |

---

## 🗄️ 归档文档 (archive/)

### 已归档的历史文档

这些文档记录了项目历史，但已被后续文档取代：

| 文档 | 原因 | 新版本 |
|------|------|--------|
| PHASE_1_DAY_6_SUMMARY.md | 日常总结已整合 | PHASE_1_FINAL_REPORT.md |
| MOCKUP_REDESIGN_REPORT.md | 设计决策已整合 | DASHBOARD_REDESIGN_REPORT.md |
| FRONTEND_COMPLETE.md | 里程碑已记录 | PHASE_1_FINAL_REPORT.md |

---

## 🔧 技术指南

### 部署和配置

| 文档 | 用途 |
|------|------|
| [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) | 完整的部署流程和最佳实践 |
| [VERCEL_ENV_SETUP.md](VERCEL_ENV_SETUP.md) | Vercel平台环境变量配置 |
| [VERCEL_DEPLOYMENT_FIX.md](VERCEL_DEPLOYMENT_FIX.md) | Vercel部署常见问题解决 |
| [DEPLOYMENT_FIX_SUMMARY.md](DEPLOYMENT_FIX_SUMMARY.md) | 部署问题修复总结 |

### 开发和架构

| 文档 | 用途 |
|------|------|
| [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) | 功能实现计划和任务列表 |
| [FRONTEND_REFACTOR_MASTER_PLAN.md](FRONTEND_REFACTOR_MASTER_PLAN.md) | 前端重构总体规划 |

### 特定功能

| 文档 | 用途 |
|------|------|
| [VOICE_TO_TEXT_SETUP.md](VOICE_TO_TEXT_SETUP.md) | 语音转文字功能配置 |
| [WHISPER_MODEL_ANALYSIS.md](WHISPER_MODEL_ANALYSIS.md) | Whisper模型选择和分析 |

---

## 🆕 添加新文档

### 文档命名规范

- **报告**: `[类型]_[日期]_REPORT.md` (如: `FEATURE_2025-10-29_REPORT.md`)
- **指南**: `[主题]_GUIDE.md` (如: `TESTING_GUIDE.md`)
- **分析**: `[主题]_ANALYSIS.md` (如: `PERFORMANCE_ANALYSIS.md`)

### 文档模板

所有文档应包含：

```markdown
# [文档标题]

> 简短描述 | 创建日期

---

## 目录
- [概述](#概述)
- [详细内容](#详细内容)
- [总结](#总结)

---

## 概述
...

## 详细内容
...

## 总结
...

---

**创建日期**: YYYY-MM-DD
**最后更新**: YYYY-MM-DD
**维护者**: [姓名]
```

---

## 📝 文档维护

### 归档标准

文档应归档当：
1. 被新文档完全取代
2. 描述的功能/流程已过时
3. 作为历史记录保留但不再活跃引用

### 删除标准

文档通常**不应删除**，而是归档。只有在以下情况删除：
1. 包含敏感信息（如密钥、密码）
2. 完全错误且无历史价值
3. 重复且无额外信息

---

## 🔍 查找文档

### 按主题查找

- **部署**: `DEPLOYMENT_*.md`, `VERCEL_*.md`
- **设计**: `*_REDESIGN_*.md`, `*_DESIGN_*.md`
- **报告**: `reports/`, `*_REPORT.md`
- **阶段总结**: `PHASE_*.md`

### 按日期查找

文档通常在文件名或内容中包含日期，可以通过：

```bash
# 搜索特定日期的文档
grep -r "2025-10-28" docs/

# 列出最近修改的文档
ls -lt docs/ | head -10
```

---

## 📧 联系

如有文档问题或建议：
- 创建Issue
- 提交Pull Request
- 联系项目维护者

---

**最后更新**: 2025-10-29
**维护者**: Obsidian Web Interface Team
