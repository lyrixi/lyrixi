# Lyrixi 文档站 · AI 配置

本目录给 Cursor / Claude 等助手使用，沉淀文档站目标与强制约束。

## 规则（`.ai/rules`）

| 文件 | 内容 |
|------|------|
| `docs-site-goals.md` | 项目目标、双库定位、技术选型 |
| `docs-site-constraints.md` | 构建/`docs`/`static`/`assets`/RN 等**强制**约束 |
| `docs-site-structure.md` | 目录分层与命名 |
| `docs-site-coding.md` | 代码/注释/可读性（最高优先级习惯） |

## 建议软链（可选）

在仓库根目录：

```bash
mkdir -p .cursor
ln -sfn ../.ai/rules .cursor/rules
```

Claude：

```bash
mkdir -p .claude
ln -sfn ../.ai/rules .claude/rules
```
