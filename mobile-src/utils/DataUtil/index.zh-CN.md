---
category: Utils
group: 基本工具
title: DataUtil
---

# DataUtil

对象与数据结构相关工具。

## 示例

<code src="./demos/DataUtil.tsx"></code>

## API

| 方法                         | 说明                                 |
| ---------------------------- | ------------------------------------ |
| `pickBy(object, predicate)`  | 按谓词挑选对象属性，返回新对象       |
| `cloneDeep(value)`           | 深拷贝对象或数组                     |
| `desensitize(value, params)` | 按 `[start, end)` 将字符串脱敏为 `*` |
