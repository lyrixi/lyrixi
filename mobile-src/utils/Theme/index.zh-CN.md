---
category: Utils
group: 基本工具
title: Theme
---

# Theme

全局主题管理器：通过 CSS 变量切换主题，无需 React Context。

## API

| 名称 | 说明 |
| --- | --- |
| `Theme.getTheme(themeName?)` | 获取主题 token；不传则返回当前已应用主题 |
| `Theme.setTheme(themeName)` | 按主题名应用 CSS 变量 |
| `Theme.config({ themeName: {}, ... })` | 注册 / 覆盖主题，写入 `window.lyrixiThemes` |

内置主题：`default`、`dark`（来自 `VariablesUtil/variablesDefault`、`variablesDark`）。

## 示例

<code src="./demos/Theme.tsx"></code>
