---
group:
  title: 反馈
  order: 4
order: 1
title: Tooltip
toc: content
---

# Tooltip

文字提示组件，用于显示提示信息。

## 何时使用

- 需要显示提示信息时
- 需要在元素上显示提示时
- 需要显示帮助信息时

## 代码演示

<code src="./demos/Tooltip.tsx"></code>

## API

### 属性

| 属性             | 说明             | 类型                                                                                                       | 默认值            |
| ---------------- | ---------------- | ---------------------------------------------------------------------------------------------------------- | ----------------- |
| maskClosable     | 点击遮罩关闭     | `boolean`                                                                                                  | `true`            |
| style            | 自定义样式       | `CSSProperties`                                                                                             | -                 |
| className        | 自定义类名       | `string`                                                                                                    | -                 |
| animation        | 动画效果         | `string`                                                                                                    | `'slideDownLeft'` |
| modalStyle       | 模态框样式       | `CSSProperties`                                                                                             | -                 |
| modalClassName   | 模态框类名       | `string`                                                                                                    | -                 |
| maskStyle        | 遮罩样式         | `CSSProperties`                                                                                             | -                 |
| maskClassName    | 遮罩类名         | `string`                                                                                                    | -                 |
| children         | 触发元素         | `ReactNode`                                                                                                 | -                 |
| comboRender      | 自定义组合渲染   | `(ctx: { comboRef, open, onClick }) => ReactNode`                                                           | -                 |
| modalRender      | 自定义模态框渲染 | `(ctx: { open, onClose }) => ReactNode`                                                                     | -                 |
| referenceElement | 参考元素         | `Element \| null \| (() => Element \| null)`                                                                | -                 |
| portal           | 挂载节点         | `boolean \| Element \| null`                                                                                | -                 |
| onBeforeOpen     | 打开前事件       | `() => boolean \| void \| Promise<boolean \| void>`                                                         | -                 |
| onOpen           | 打开事件         | `() => void`                                                                                                | -                 |
| onClose          | 关闭事件         | `() => void`                                                                                                | -                 |

### Ref

| 属性       | 说明       | 类型                   |
| ---------- | ---------- | ---------------------- |
| element    | 根元素     | `HTMLDivElement \| null` |
### 静态方法

| 方法                                 | 说明             | 类型                                                                     |
| ------------------------------------ | ---------------- | ------------------------------------------------------------------------ |
| updatePositionByReferenceElement | 更新元素位置 | `(current: HTMLElement, options?: TooltipUpdatePositionParams) => void` |
