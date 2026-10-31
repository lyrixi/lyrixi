---
group:
  title: 数据展示
  order: 5
order: 1
title: Progress
toc: content
---

# Progress

进度条组件，用于显示进度。

## Progress.Bar

条形进度条组件。

### 何时使用

- 需要显示条形进度时
- 需要显示水平进度条时

### 代码演示

<code src="./demos/ProgressBar.tsx"></code>

### API

#### 属性

| 属性      | 说明       | 类型     | 默认值 |
| --------- | ---------- | -------- | ------ |
| percent   | 进度百分比 | `number`        | `0`    |
| style     | 自定义样式 | `CSSProperties` | -      |
| className | 自定义类名 | `string`        | -      |

#### Ref

| 属性       | 说明       | 类型                          |
| ---------- | ---------- | ----------------------------- |
| element    | 根元素     | `HTMLDivElement \| null`      |
## Progress.Circle

圆形进度条组件。

### 何时使用

- 需要显示圆形进度时
- 需要显示环形进度条时

### 代码演示

<code src="./demos/ProgressCircle.tsx"></code>

### API

#### 属性

| 属性      | 说明       | 类型            | 默认值 |
| --------- | ---------- | --------------- | ------ |
| percent   | 进度百分比 | `number`        | `0`    |
| size      | 尺寸       | `number`        | `50`   |
| style     | 自定义样式 | `CSSProperties` | -      |
| className | 自定义类名 | `string`        | -      |
| children  | 中间内容   | `ReactNode`     | -      |

#### Ref

| 属性       | 说明       | 类型                          |
| ---------- | ---------- | ----------------------------- |
| element    | 根元素     | `HTMLDivElement \| null`      |
