---
group:
  title: 数据录入
  order: 2
order: 1
title: Keyboard
toc: content
---

# Keyboard

键盘组件，目前提供数字键盘 Keyboard.Number。

## Keyboard.Number

数字键盘组件。可直接使用，也可通过 `Input.NumberKeyboard` 组合；自定义场景常与 `Input.Text` / `Input.Node` 配合，用 `open` / `onClose` 控制显隐。

### 何时使用

- 需要数字输入时（金额、数量等）
- 需要避免系统键盘弹起时
- 需要自定义键盘样式或按钮时

### 代码演示

<code src="./demos/KeyboardNumber.tsx"></code>

### API

#### 属性

| 属性           | 说明         | 类型                                                                               | 默认值 |
| -------------- | ------------ | ---------------------------------------------------------------------------------- | ------ |
| id             | 键盘 ID      | `string`                                                                           | -      |
| safeArea       | 是否安全区   | `boolean`                                                                          | `true` |
| portal         | 挂载节点     | `HTMLElement`                                                                      | -      |
| value          | 当前值       | `string`                                                                           | `''`   |
| onChange       | 变化事件     | `(value: string, options: { action: KeyboardAction }) => void`                     | -      |
| dot            | 小数点按钮   | `boolean`                                                                          | -      |
| minus          | 负号按钮     | `boolean`                                                                          | -      |
| ok             | 确认按钮     | `ReactNode`                                                                        | -      |
| okVisible      | 确认按钮可见 | `boolean`                                                                          | -      |
| cancel         | 取消按钮     | `ReactNode`                                                                        | -      |
| cancelVisible  | 取消按钮可见 | `boolean`                                                                          | -      |
| modalStyle     | 模态框样式   | `CSSProperties`                                                                    | -      |
| modalClassName | 模态框类名   | `string`                                                                           | -      |
| open           | 是否显示     | `boolean`                                                                          | -      |
| onOpen         | 打开事件     | `() => void`                                                                       | -      |
| onClose        | 关闭事件     | `() => void`                                                                       | -      |
| onOk           | 确认事件     | `(value: string) => Promise<boolean \| undefined> \| boolean \| undefined`         | -      |
| onCancel       | 取消事件     | `() => void`                                                                       | -      |

#### Ref

| 属性       | 说明       | 类型                   |
| ---------- | ---------- | ---------------------- |
| element    | 根元素     | `HTMLElement \| null`       |
