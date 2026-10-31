---
group:
  title: 导航
  order: 6
order: 1
title: FooterBar
toc: content
---

# FooterBar

底部栏组件，用于显示页面底部内容。

## FooterBar

### 何时使用

- 需要显示页面底部内容时
- 需要显示操作按钮时
- 需要在页面底部显示固定内容时

### 代码演示

<code src="./demos/FooterBar.tsx"></code>

### API

#### 属性

| 属性      | 说明       | 类型            | 默认值 |
| --------- | ---------- | --------------- | ------ |
| style     | 自定义样式 | `CSSProperties` | -      |
| className | 自定义类名 | `string`        | -      |
| children  | 底部栏内容 | `ReactNode`     | -      |

#### Ref

| 属性       | 说明       | 类型                          |
| ---------- | ---------- | ----------------------------- |
| element    | 根元素     | `HTMLElement \| null`         |
## FooterBar.Button

底部栏按钮组件。

### 何时使用

- 需要在底部栏中添加按钮时

### 代码演示

<code src="./demos/FooterBarButton.tsx"></code>

### API

#### 属性

| 属性      | 说明       | 类型                              | 默认值 |
| --------- | ---------- | --------------------------------- | ------ |
| disabled  | 是否禁用   | `boolean`                         | -      |
| style     | 自定义样式 | `CSSProperties`                   | -      |
| className | 自定义类名 | `string`                          | -      |
| children  | 按钮内容   | `ReactNode`                       | -      |
| onClick   | 点击事件   | `MouseEventHandler<HTMLDivElement>` | -      |

#### Ref

| 属性       | 说明       | 类型                          |
| ---------- | ---------- | ----------------------------- |
| element    | 根元素     | `HTMLDivElement \| null`      |
