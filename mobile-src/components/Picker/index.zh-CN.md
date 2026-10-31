---
group:
  title: 数据录入
  order: 2
order: 1
title: Picker
toc: content
---

# Picker

选择器组件，用于从多个选项中选择。

## Picker.Combo

选择器组合组件，结合输入框和选择器。

### 何时使用

- 需要结合输入框和选择器时

### 代码演示

<code src="./demos/PickerCombo.tsx"></code>

<code src="./demos/PickerComboInput.tsx"></code>

### API

#### 属性

同 Picker.Main 组件属性。

#### Ref

同 Picker.Main 组件 Ref。

## Picker.Modal

选择器模态框组件。

### 何时使用

- 需要以模态框形式显示选择器时

### 代码演示

<code src="./demos/PickerModal.tsx"></code>

### API

#### 属性

同 Picker.Main 组件属性。

#### Ref

同 Picker.Main 组件 Ref。

## Picker.Main

选择器主组件。

### 何时使用

- 需要直接使用选择器主组件时

### 代码演示

<code src="./demos/PickerMain.tsx"></code>

### API

#### 属性

| 属性            | 说明         | 类型                                                                    | 默认值 |
| --------------- | ------------ | ----------------------------------------------------------------------- | ------ |
| value           | 选中的值     | `PickerItem[] \| null`                                                  | -      |
| placeholder     | 占位符       | `string`                                                                | -      |
| formatter       | 格式化函数   | `(value: PickerItem[] \| null, options?: { separator?: string }) => string` | -      |
| autoSize        | 自动调整大小 | `boolean`                                                               | -      |
| separator       | 分隔符       | `string`                                                                | -      |
| mode            | 模式         | `string`                                                                | -      |
| readOnly        | 是否只读     | `boolean`                                                               | -      |
| disabled        | 是否禁用     | `boolean`                                                               | -      |
| allowClear      | 允许清除     | `boolean`                                                               | -      |
| style           | 自定义样式   | `CSSProperties`                                                         | -      |
| className       | 自定义类名   | `string`                                                                | -      |
| leftIconRender  | 左侧图标渲染 | `ReactNode`                                                             | -      |
| leftIconSvg     | 左侧图标 SVG | `string`                                                                | -      |
| rightIconRender | 右侧图标渲染 | `ReactNode`                                                             | -      |
| rightIconSvg    | 右侧图标 SVG | `string`                                                                | -      |
| clearRender     | 清除按钮渲染 | `(props: object) => ReactNode`                                          | -      |
| open            | 是否打开     | `boolean`                                                               | -      |
| list            | 选项列表     | `PickerItem[] \| PickerItem[][]`                                        | -      |
| maskClosable    | 点击遮罩关闭 | `boolean`                                                               | -      |
| safeArea        | 是否安全区   | `boolean`                                                               | -      |
| modalStyle      | 模态框样式   | `object`                                                                | -      |
| modalClassName  | 模态框类名   | `string`                                                                | -      |
| maskStyle       | 遮罩样式     | `object`                                                                | -      |
| maskClassName   | 遮罩类名     | `string`                                                                | -      |
| portal          | 挂载节点     | `HTMLElement \| null \| false`                                          | -      |
| title           | 标题         | `ReactNode`                                                             | -      |
| ok          | 确认按钮     | `ReactNode`                                                             | -      |
| cancel      | 取消按钮     | `ReactNode`                                                             | -      |
| okVisible       | 确认按钮可见 | `boolean`                                                               | -      |
| cancelVisible   | 取消按钮可见 | `boolean`                                                               | -      |
| onBeforeOpen    | 打开前事件   | `() => boolean \| void \| Promise<boolean \| void>`                     | -      |
| onClose         | 关闭事件     | `(e?: MouseEvent<HTMLDivElement>) => void`                              | -      |
| onOk            | 确认事件     | `(value: PickerItem[]) => boolean \| void \| Date \| Promise<boolean \| void \| Date>` | -      |
| onChange        | 变化事件     | `(value: PickerItem[]) => void`                                         | -      |

#### Ref

| 属性            | 说明           | 类型                       |
| --------------- | -------------- | -------------------------- |
| element         | 根元素         | `HTMLDivElement`           |
| mainElement     | 主选择器元素   | `HTMLDivElement`           |
| getMainElement  | 获取主选择器   | () => `HTMLDivElement`     |
| maskElement     | 遮罩元素       | `HTMLDivElement`           |
| modalElement    | 模态框元素     | `HTMLDivElement`           |
| getValue        | 获取当前值     | () => `PickerItem[] \| null` |
| update          | 更新选择器     | `() => void`               |
| close           | 关闭选择器     | `() => void`               |
| open            | 打开选择器     | `() => void`               |
