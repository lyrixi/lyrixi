---
group:
  title: 通用
  order: 1
order: 1
title: Combo
toc: content
---

# Combo

组合组件，用于自定义渲染组合元素。

## 何时使用

- 需要自定义渲染组合元素时
- 需要创建可点击的组合元素时

## 代码演示

<code src="./demos/Combo.tsx"></code>

## API

### 属性

| 属性      | 说明       | 类型                                | 默认值 |
| --------- | ---------- | ----------------------------------- | ------ |
| style     | 自定义样式 | `CSSProperties`                     | -      |
| className | 自定义类名 | `string`                            | -      |
| children  | 组合内容   | `ReactNode`                         | -      |
| onClick   | 点击事件   | `MouseEventHandler<HTMLDivElement>` | -      |

### Ref

| 属性       | 说明       | 类型                          |
| ---------- | ---------- | ----------------------------- |
| element    | 根元素     | `HTMLDivElement \| null`      |
