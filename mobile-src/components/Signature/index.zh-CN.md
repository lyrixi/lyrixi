---
group:
  title: 数据录入
  order: 2
order: 1
title: Signature
toc: content
---

# Signature

签名组件，用于手写签名。

## Signature.Combo

签名组合组件，结合输入框和签名。

### 何时使用

- 需要结合输入框和签名时
- 需要显示和编辑签名时

### 代码演示

<code src="./demos/SignatureCombo.tsx"></code>

### API

#### 属性

| 属性            | 说明       | 类型     | 默认值   |
| --------------- | ---------- | -------- | -------- |
| value           | 签名值     | `string` | -        |
| allowClear      | 允许清除   | `boolean`| `true`   |
| style           | 自定义样式 | `CSSProperties` | -        |
| className       | 自定义类名 | `string` | -        |
| modalClassName  | 模态框类名 | `string` | -        |
| modalStyle      | 模态框样式 | `CSSProperties` | -        |
| maskStyle       | 遮罩样式   | `CSSProperties` | -        |
| maskClassName   | 遮罩类名   | `string` | -        |
| portal          | 挂载节点   | `Element` | -        |
| color           | 画笔颜色   | `string` | `'#000'` |
| backgroundColor | 背景颜色   | `string` | `'#fff'` |
| onChange        | 变化事件   | `(base64: string \| null) => void` | -      |
| onPreview       | 预览事件   | `(src: string) => Promise<boolean \| string \| void>` | - |

## Signature.Modal

签名模态框组件。

### 何时使用

- 需要以模态框形式显示签名时
- 需要全屏显示签名时

### 代码演示

<code src="./demos/SignatureModal.tsx"></code>

### API

#### 属性

| 属性            | 说明       | 类型     | 默认值   |
| --------------- | ---------- | -------- | -------- |
| value           | 签名值     | `string` | -        |
| open            | 是否显示   | `boolean`| -        |
| modalClassName  | 模态框类名 | `string` | -        |
| modalStyle      | 模态框样式 | `CSSProperties` | -        |
| portal          | 挂载节点   | `Element` | -        |
| color           | 画笔颜色   | `string` | `'#000'` |
| backgroundColor | 背景颜色   | `string` | `'#fff'` |
| onChange        | 变化事件   | `(base64: string \| null) => void` | -      |
| onOpen          | 打开事件   | `() => void` | -      |
| onClose         | 关闭事件   | `() => void` | -      |

#### Ref

| 属性            | 说明           | 类型                   |
| --------------- | -------------- | ---------------------- |
| modalElement    | 模态框元素     | `HTMLElement \| null`       |
## Signature.Main

签名主组件。

### 何时使用

- 需要直接使用签名主组件时
- 需要自定义签名界面时

### 代码演示

<code src="./demos/SignatureMain.tsx"></code>

### API

#### 属性

| 属性            | 说明       | 类型     | 默认值   |
| --------------- | ---------- | -------- | -------- |
| style           | 自定义样式 | `CSSProperties` | -        |
| color           | 画笔颜色   | `string` | `'#000'` |
| backgroundColor | 背景颜色   | `string` | `'#fff'` |
| onChange        | 变化事件   | `(base64: string \| null) => void` | -      |
| onCancel        | 取消事件   | `() => void` | -      |

#### Ref

| 属性       | 说明        | 类型                                        |
| ---------- | ----------- | ------------------------------------------- |
| element    | 根元素      | `HTMLDivElement \| null`                    |
| getBase64  | 获取 Base64 | `(() => Promise<string \| null>) \| undefined` |
| clear      | 清除签名    | `(() => void) \| undefined`                  |
