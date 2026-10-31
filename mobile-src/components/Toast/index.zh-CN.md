---
group:
  title: 反馈
  order: 4
order: 1
title: Toast
toc: content
---

# Toast

轻提示组件，用于显示简短的消息提示。提供命令式 API（`Toast.open` / `Toast.close`）与组件式用法。

## 何时使用

- 需要显示简短的消息提示时
- 需要显示操作结果时
- 需要显示成功、错误、警告等信息时

## Toast.open

命令式打开轻提示。全局同时仅存在一个实例，再次调用会先关闭上一个。

### 代码演示

<code src="./demos/ToastApi.tsx"></code>

### API

#### 参数

| 参数          | 说明                                         | 类型                            | 默认值     |
| ------------- | -------------------------------------------- | ------------------------------- | ---------- |
| duration      | 显示时长（毫秒）                             | `number`                        | `2000`     |
| maskClickable | 遮罩是否可点击                               | `boolean`                       | `true`     |
| placement     | 显示位置，`top` 上、`middle` 中、`bottom` 下 | `'top' \| 'middle' \| 'bottom'` | `'middle'` |
| portal        | 挂载节点                                     | `HTMLElement`                   | -          |
| maskClassName | 遮罩类名                                     | `string`                        | -          |
| maskStyle     | 遮罩样式                                     | `CSSProperties`                 | -          |
| modalClassName | 内容区类名                                   | `string`                        | -          |
| modalStyle     | 内容区样式                                   | `CSSProperties`                 | -          |
| content       | 提示内容                                     | `string`                        | -          |
| onClose       | 关闭事件                                     | `() => void`                    | -          |

#### 返回值

`HTMLDivElement` — 挂载 Toast 的容器节点。

## Toast.close

隐藏当前 Toast。

### 代码演示

见 Toast.open

### API

#### 参数

| 参数    | 说明     | 类型         | 默认值 |
| ------- | -------- | ------------ | ------ |
| onClose | 关闭回调 | `() => void` | -      |

#### 返回值

无返回值。

## Toast

组件式用法，通过 JSX 渲染 Toast。

### 代码演示

<code src="./demos/Toast.tsx"></code>

### API

#### 属性

| 参数          | 说明             | 类型                            | 默认值     |
| ------------- | ---------------- | ------------------------------- | ---------- |
| duration      | 显示时长（毫秒） | `number`                        | `2000`     |
| maskClickable | 遮罩是否可点击   | `boolean`                       | `true`     |
| placement     | 显示位置         | `'top' \| 'middle' \| 'bottom'` | `'middle'` |
| content       | 提示内容         | `string`                        | -          |
| maskClassName | 遮罩类名         | `string`                        | -          |
| maskStyle     | 遮罩样式         | `CSSProperties`                 | -          |
| modalClassName | 内容区类名       | `string`                        | -          |
| modalStyle     | 内容区样式       | `CSSProperties`                 | -          |
| portal        | 挂载节点         | `HTMLElement`                   | -          |
| onClose       | 关闭事件         | `() => void`                    | -          |

#### Ref

| 属性       | 说明       | 类型                           |
| ---------- | ---------- | ------------------------------ |
| element    | 根元素     | `HTMLDivElement \| null`       |
## Toast.defaultProps

Toast 的静态默认属性。

### 类型

`ToastProps`
