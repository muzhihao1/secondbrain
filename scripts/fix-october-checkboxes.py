#!/usr/bin/env python3
"""
批量修改10月份Obsidian文档，移除不应该使用checkbox的内容

核心原则：行动/记录二分法
- 只有可执行任务保留checkbox（- [ ] 或 - [x]）
- 时间记录、笔记、反思、数据等改为普通列表（*）
"""

import re
import os
from pathlib import Path
from datetime import datetime

# Obsidian vault路径
JOURNAL_PATH = Path("/Users/liasiloam/Library/Mobile Documents/iCloud~md~obsidian/Documents/02_Execution/Journal/2025")
MONTHLY_PATH = Path("/Users/liasiloam/Library/Mobile Documents/iCloud~md~obsidian/Documents/01_Periodic/Monthly")

# 备份目录
BACKUP_DIR = Path("/Users/liasiloam/Vibecoding/Obsidian_Web_Interface/.backup/october-fix-" + datetime.now().strftime("%Y%m%d-%H%M%S"))

# 不应该使用checkbox的模式（改为普通列表）
PATTERNS_TO_FIX = [
    # 时间记录模式
    (r'^(\s*)- \[([ x])\] \*\*(\d{2}:\d{2})', r'\1* **\3'),  # - [ ] **08:30** -> * **08:30**
    (r'^(\s*)- \[([ x])\] `(\d{2}:\d{2})', r'\1* `\3'),      # - [ ] `08:30` -> * `08:30`

    # 环境/技术强制（设置类）
    (r'^(\s*)- \[([ x])\] \*\*早上起床', r'\1* **早上起床'),
    (r'^(\s*)- \[([ x])\] \*\*下午\d{2}:', r'\1* **下午'),
    (r'^(\s*)- \[([ x])\] \*\*\d{2}:\d{2}后', r'\1* **'),
    (r'^(\s*)- \[([ x])\] `\d{2}:\d{2}` - ', r'\1* `'),

    # 实验/假设记录
    (r'^(\s*)- \[([ x])\] 认为', r'\1* 认为'),
    (r'^(\s*)- \[([ x])\] 担心', r'\1* 担心'),

    # 记录型内容
    (r'^(\s*)- \[([ x])\] 暂停前', r'\1* 暂停前'),
    (r'^(\s*)- \[([ x])\] 暂停期间', r'\1* 暂停期间'),
    (r'^(\s*)- \[([ x])\] 暂停后', r'\1* 暂停后'),
    (r'^(\s*)- \[([ x])\] 当前任务进度', r'\1* 当前任务进度'),
    (r'^(\s*)- \[([ x])\] 专注度', r'\1* 专注度'),
    (r'^(\s*)- \[([ x])\] 疲劳感', r'\1* 疲劳感'),
    (r'^(\s*)- \[([ x])\] 心理', r'\1* 心理'),
    (r'^(\s*)- \[([ x])\] 身体', r'\1* 身体'),
    (r'^(\s*)- \[([ x])\] 重启顺', r'\1* 重启顺'),
    (r'^(\s*)- \[([ x])\] 思路清晰', r'\1* 思路清晰'),
    (r'^(\s*)- \[([ x])\] 总体感受', r'\1* 总体感受'),
]

# 保留checkbox的标题（在这些标题下的checkbox保持不变）
KEEP_CHECKBOX_SECTIONS = [
    "主要任务",
    "核心任务",
    "Key Tasks",
    "P0", "P1", "P2",
    "必达任务",
    "实验任务",
    "项目任务",
    "习惯",
    "学习",
    "目标",
    "清单",
]

def should_keep_section(line: str) -> bool:
    """判断这一行是否在"应保留checkbox"的区域"""
    return any(keyword in line for keyword in KEEP_CHECKBOX_SECTIONS)

def backup_file(file_path: Path) -> None:
    """备份文件"""
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    backup_path = BACKUP_DIR / file_path.name
    backup_path.write_text(file_path.read_text(encoding='utf-8'), encoding='utf-8')
    print(f"  ✓ Backed up: {file_path.name}")

def fix_checkboxes(content: str, file_name: str) -> tuple[str, int]:
    """修复文件中不应该使用的checkbox"""
    lines = content.split('\n')
    modified = 0
    current_section = ""
    in_keep_section = False

    for i, line in enumerate(lines):
        # 检测标题（更新当前section）
        if line.startswith('#'):
            current_section = line
            in_keep_section = should_keep_section(line)
            continue

        # 如果在应保留checkbox的区域，跳过
        if in_keep_section:
            continue

        # 应用修复模式
        original_line = line
        for pattern, replacement in PATTERNS_TO_FIX:
            line = re.sub(pattern, replacement, line)

        if line != original_line:
            lines[i] = line
            modified += 1

    return '\n'.join(lines), modified

def process_october_files():
    """处理10月份的所有文件"""
    print("=" * 60)
    print("批量修改10月份Obsidian文档 - Checkbox规范化")
    print("=" * 60)
    print()

    total_files = 0
    total_changes = 0

    # 处理工作日志
    print("📁 处理工作日志文件...")
    october_journals = sorted(JOURNAL_PATH.glob("2025-10-*.md"))

    for file_path in october_journals:
        try:
            total_files += 1
            print(f"\n处理: {file_path.name}")

            # 备份
            backup_file(file_path)

            # 读取并修复
            content = file_path.read_text(encoding='utf-8')
            fixed_content, changes = fix_checkboxes(content, file_path.name)

            if changes > 0:
                # 写回文件
                file_path.write_text(fixed_content, encoding='utf-8')
                print(f"  ✓ 修改了 {changes} 处checkbox")
                total_changes += changes
            else:
                print(f"  • 无需修改（已符合规范）")

        except Exception as e:
            print(f"  ✗ 错误: {e}")

    # 处理月度文件
    print(f"\n\n📁 处理月度文件...")
    october_monthly = [
        MONTHLY_PATH / "2025-09~2025-10_复盘+规划.md",
        MONTHLY_PATH / "2025-10-mid_中期复盘.md",
    ]

    for file_path in october_monthly:
        if not file_path.exists():
            continue

        try:
            total_files += 1
            print(f"\n处理: {file_path.name}")

            # 备份
            backup_file(file_path)

            # 读取并修复
            content = file_path.read_text(encoding='utf-8')
            fixed_content, changes = fix_checkboxes(content, file_path.name)

            if changes > 0:
                # 写回文件
                file_path.write_text(fixed_content, encoding='utf-8')
                print(f"  ✓ 修改了 {changes} 处checkbox")
                total_changes += changes
            else:
                print(f"  • 无需修改（已符合规范）")

        except Exception as e:
            print(f"  ✗ 错误: {e}")

    # 总结
    print(f"\n\n{'=' * 60}")
    print(f"✅ 完成！")
    print(f"{'=' * 60}")
    print(f"处理文件数: {total_files}")
    print(f"修改checkbox数: {total_changes}")
    print(f"备份目录: {BACKUP_DIR}")
    print()
    print("核心原则: 行动/记录二分法")
    print("  ✅ 保留：具体任务、项目里程碑、习惯追踪")
    print("  ❌ 移除：时间记录、笔记、反思、数据、设置")
    print()

if __name__ == "__main__":
    process_october_files()
