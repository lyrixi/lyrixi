---
group:
  title: 数据展示
  order: 5
order: 1
title: Stamp
toc: content
---

# Stamp

邮戳组件

## 何时使用

- 需要显示邮戳标记时
- 需要内容盖章效果时
- 需要覆盖式标记展示时

## 代码演示

<code src="./demos/Stamp.tsx"></code>

## API

### 属性

| 属性      | 说明       | 类型            | 默认值    |
| --------- | ---------- | --------------- | --------- |
| shape     | 形状       | `string`        | `'round'` |
| color     | 颜色       | `string`        | -         |
| style     | 自定义样式 | `CSSProperties` | -         |
| className | 自定义类名 | `string`        | -         |
| children  | 内容       | `ReactNode`     | -         |

### Ref

| 属性       | 说明       | 类型                        |
| ---------- | ---------- | --------------------------- |
| element    | 根元素     | `HTMLDivElement \| null`    |
