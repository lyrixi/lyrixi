---
group:
  title: 数据录入
  order: 2
order: 1
title: Transfer
toc: content
---

# Transfer

穿梭框组件，用于在两栏之间移动元素。
## Transfer

### 何时使用

- 需要在两栏之间移动元素时
- 需要选择多个选项时
- 需要管理已选和未选项时

### 代码演示

<code src="./demos/Transfer.tsx"></code>

### API

#### 属性

| 属性       | 说明       | 类型                                      | 默认值 |
| ---------- | ---------- | ----------------------------------------- | ------ |
| value      | 选中的值   | `Array<{id: string \| number, name?: ReactNode, [key: string]: unknown}>` | -      |
| list       | 选项列表   | `Array<{id: string \| number, name?: ReactNode, [key: string]: unknown}>` | -      |
| titles     | 标题       | `{ source?: ReactNode, target?: ReactNode }` | -      |
| open       | 是否展开   | `boolean`                                 | -      |
| allowClear | 允许清除   | `boolean`                                 | -      |
| style      | 自定义样式 | `CSSProperties`                           | -      |
| className  | 自定义类名 | `string`                                  | -      |
| onChange   | 变化事件   | `(value: TransferItem[]) => void`         | -      |

#### Ref

| 属性           | 说明       | 类型                         |
| -------------- | ---------- | ---------------------------- |
| mainElement    | 主元素     | `HTMLDivElement \| null`     |
| getMainElement | 获取主元素 | () => `HTMLDivElement \| null`

## Transfer.Combo

穿梭框组合组件，结合输入框和穿梭框。

### 何时使用

- 需要结合输入框和穿梭框时

### 代码演示

<code src="./demos/Combo/index.tsx"></code>

### API

#### 属性

同 Transfer 组件属性，继承 [Input.Select](/components/input#inputselect) 的 `InputSelectProps` 和 Transfer.Modal 属性，以及：

| 属性          | 说明       | 类型                                               | 默认值 |
| ------------- | ---------- | -------------------------------------------------- | ------ |
| value         | 选中的值   | `TransferItem[]`                                   | -      |
| list          | 选项列表   | `TransferItem[]`                                   | -      |
| onChange      | 变化事件   | `(value: TransferItem[]) => void`                  | -      |
| onBeforeOpen  | 打开前事件 | `() => boolean \| void \| Promise<boolean \| void>` | -      |

#### Ref

同 Transfer 组件 Ref。

## Transfer.Modal

穿梭框模态框组件。

### 何时使用

- 需要以模态框形式显示穿梭框时

### 代码演示

<code src="./demos/Modal/index.tsx"></code>

### API

#### 属性

同 Transfer 组件属性，以及：

| 属性            | 说明         | 类型                                                 | 默认值 |
| --------------- | ------------ | ---------------------------------------------------- | ------ |
| maskClosable    | 点击遮罩关闭 | `boolean`                                            | -      |
| safeArea        | 安全区适配   | `boolean`                                            | -      |
| modalStyle      | 模态框样式   | `CSSProperties`                                      | -      |
| modalClassName  | 模态框类名   | `string`                                             | -      |
| maskStyle       | 遮罩样式     | `CSSProperties`                                      | -      |
| maskClassName   | 遮罩类名     | `string`                                             | -      |
| portal          | 挂载节点     | `ModalProps['portal']`                                | -      |
| title           | 标题         | `ReactNode`                                          | -      |
| ok          | 确认按钮     | `ReactNode`                                          | -      |
| cancel      | 取消按钮     | `ReactNode`                                          | -      |
| okVisible       | 确认按钮可见 | `boolean`                                            | -      |
| cancelVisible   | 取消按钮可见 | `boolean`                                            | -      |
| onClose         | 关闭事件     | `() => void`                                         | -      |
| onOk            | 确认事件     | `(value: TransferItem[]) => boolean \| void \| Promise<boolean \| void>` | -      |

#### Ref

同 Transfer 组件 Ref。

## Transfer.Main

穿梭框主组件。

### 何时使用

- 需要直接使用穿梭框主组件时

### 代码演示

<code src="./demos/Main/index.tsx"></code>

### API

#### 属性

同 Transfer 组件属性。

#### Ref

同 Transfer 组件 Ref。

