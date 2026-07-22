---
description: Lyrixi 文档站项目目标与产品定位（始终生效）
alwaysApply: true
---

# 文档站目标

本仓库是 **lyrixi 双库公开文档站**（非组件库源码仓），帮助用户使用已发布的 npm 组件库。

## 产品

| 产品 | 状态 | 说明 |
|------|------|------|
| `lyrixi-mobile` | **当前主交付** | React 19 移动端 H5 组件库；文档 + 右侧手机预览 |
| `lyrixi-mobile-rn` | **预留口子** | 尚未发布 npm 前不可切为正式文档；Logo 下拉显示「即将发布」 |

组件库源码可本地 sibling 只读复用（`../lyrixi-mobile`、`../lyrixi-mobile-rn`），**不把组件库源码公开进本仓**。

## 站点要做什么

- 布局对齐主流组件库文档站：顶栏 + 侧栏 + 正文 +（组件页）右侧手机预览
- 顶栏 Logo 悬停可切换产品名；RN 未发布时仅占位、不可用
- 顶栏 Nav：**指南**（首页/安装）、**组件**、**工具**、**模板**、**AI**
- 版本下拉、品牌视觉（炭灰壳层 + 薄荷绿 `#35e6b6`）
- **指南 / AI** 可偏营销与说明；**组件** 页复用 sibling 的 `index.zh-CN.md` + `demos/`
- AI 栏内容参考各库 `.ai`（接入 CLI、rules/docs/skills 说明），站点只做人读指南，不整包打进静态站

## 技术选型（已拍板）

- **自建** Vite + React + TypeScript + React Router（**禁止**用 Dumi / 其它死板文档框架做壳）
- 源码在 `site/`；构建产物在 `docs/`，供 GitHub Pages（`/docs`）
- 开发时 Vite alias 读 sibling；catalog 由脚本扫描 MD frontmatter 生成
