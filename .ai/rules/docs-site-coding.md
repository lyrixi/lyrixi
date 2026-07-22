---
description: 文档站代码/注释/可读性规范（最高优先级习惯）
globs: 'site/**/*.{ts,tsx,js,jsx,css,mjs}'
alwaysApply: false
---

# 代码规范与可读性（最重要）

开发时**必须**对齐主流 React/TS 工程习惯：目录清晰、命名语义化、注释写意图、可读性优先。宁可少写炫技，不可难读。

## 总原则

1. **可读性 > 短期省事**：后来者（含 AI）应能快速看懂模块职责与数据流。
2. **参考主流**：React 函数组件、TypeScript 严格模式、CSS Modules、配置与 UI 分离。
3. **小而专的文件**：一个文件一个主要职责；避免上千行巨型组件。
4. **不引入无关重构**：只改任务需要的代码；不顺手大扫除。

## TypeScript / React

- 使用函数组件；props 用明确 `interface` / `type`，避免 `any`（第三方边界除外并注明）。
- 产品 id、路由段、Nav key 用联合类型或 `config` 导出常量。
- 禁止在业务里硬编码可配置的产品名、版本、base path（集中 `config/`）。
- 事件与状态命名：`handleXxx` / `onXxx`；布尔用 `is` / `has` / `enabled` 前缀。

## 注释

- **写为什么与约束**，不写复述代码的废话。
- 文件/模块顶部：一句话说明职责（尤其是 `preview/`、`scripts/`、`ProductContext`）。
- 公开函数：一行说明用途；复杂参数用简短 JSDoc `@param`。
- 强制约束相关逻辑（如 `assetsDir`、`enabled: false`、拷贝 assets）必须有注释指向约束原因，防止被「顺手改回」。

```ts
// Vite chunks 必须进 static/，docs/assets/ 留给根目录外网资源拷贝
assetsDir: 'static',
```

## 样式

- 品牌色只用 CSS 变量（`styles/tokens.css`），禁止散落魔法色值（demo 展示色除外）。
- 壳层暗色、文档正文浅底：保持对比可读，不要为了「全暗」牺牲长文阅读。

## 禁止

- 为通过构建而 `// @ts-ignore` 大面积吞错（应收窄类型或隔离边界）。
- 把 sibling 私有实现细节 fork 进本仓后不再同步。
- 在未通知启用 RN 前，重新把 `lyrixi-mobile-rn` 源码打进生产包。
