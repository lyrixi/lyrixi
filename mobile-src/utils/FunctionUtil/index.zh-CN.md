---
category: Utils
group: 基本工具
title: FunctionUtil
---

# FunctionUtil

函数相关工具。

## 示例

<code src="./demos/FunctionUtil.tsx"></code>

## API

| 方法                              | 说明                                                                                |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| `debounce(func, wait?, options?)` | 防抖：`wait` 内再次调用会重新计时，仅最后一次在延迟后执行（基于 `lodash/debounce`） |
| `throttle(func, wait?, options?)` | 节流：`wait` 内最多执行一次（基于 `lodash/throttle`）                               |
