---
group:
  title: 数据录入
  order: 2
order: 1
title: Select
toc: content
---

# Select

选择器组件，用于从多个选项中选择。

## Select.Combo

选择器组合组件，结合输入框和选择模态框。

### 何时使用

- 需要结合输入框和选择模态框时

### 代码演示

<code src="./demos/SelectCombo.tsx"></code>

### API

#### 属性

| 属性             | 说明         | 类型                            | 默认值 |
| ---------------- | ------------ | ------------------------------- | ------ |
| value            | 选中的值     | `any \| any[]`                  | -      |
| placeholder      | 占位符       | `string`                        | -      |
| formatter        | 格式化函数   | `(value: any) => string`        | -      |
| autoSize         | 自动调整大小 | `boolean`                       | -      |
| separator        | 分隔符       | `string`                        | -      |
| mode             | 模式         | `string`                        | -      |
| readOnly         | 是否只读     | `boolean`                       | -      |
| disabled         | 是否禁用     | `boolean`                       | -      |
| allowClear       | 允许清除     | `boolean`                       | -      |
| multiple         | 是否多选     | `boolean`                       | -      |
| style            | 自定义样式   | `CSSProperties`                 | -      |
| className        | 自定义类名   | `string`                        | -      |
| leftIconRender   | 左侧图标渲染 | `() => ReactNode`               | -      |
| leftIconSvg      | 左侧 SVG 图标 | `ComponentType<SVGProps<SVGSVGElement>>` | -      |
| rightIconRender  | 右侧图标渲染 | `() => ReactNode`               | -      |
| rightIconSvg     | 右侧 SVG 图标 | `ComponentType<SVGProps<SVGSVGElement>>` | -      |
| clearRender      | 清除按钮渲染 | `(params: { clearable; allowClear; onClear; onTouchStart }) => ReactNode \| undefined` | -      |
| list             | 选项列表     | `Array<object>`                 | -      |
| formatViewItem   | 格式化项     | `(item: object) => object`      | -      |
| maskClosable     | 点击遮罩关闭 | `boolean`                       | -      |
| safeArea         | 是否安全区   | `boolean`                       | -      |
| modalStyle       | 模态框样式   | `object`                        | -      |
| modalClassName   | 模态框类名   | `string`                        | -      |
| maskStyle        | 遮罩样式     | `object`                        | -      |
| maskClassName    | 遮罩类名     | `string`                        | -      |
| portal           | 挂载节点     | `HTMLElement \| null \| false`  | -      |
| title            | 标题         | `ReactNode`                     | -      |
| cancel       | 取消按钮     | `ReactNode`                     | -      |
| cancelVisible    | 取消按钮可见 | `boolean`                       | -      |
| headerRender     | 头部渲染     | `(ctx: { open: boolean; value?: InputSelectValue; list?: SelectItem[] }) => ReactNode` | -      |
| itemRender       | 项渲染       | `(item: SelectItem, options: { index: number; checked: boolean; onChange: (item: SelectItem) => void }) => ReactNode` | -      |
| itemLayout       | 项布局       | `string`                        | -      |
| itemStyle        | 项自定义样式 | `CSSProperties`                 | -      |
| itemClassName    | 项自定义类名 | `string`                        | -      |
| checkable        | 是否可选     | `boolean`                       | -      |
| checkboxVariant  | 复选框外观   | `string`                        | -      |
| checkboxPlacement | 复选框位置   | `string`                        | -      |
| onOk             | 确认事件     | `(value: SelectItem \| SelectItem[] \| null) => unknown` | -      |
| onChange         | 变化事件     | `(value: InputSelectValue, options?: unknown) => void` | -      |
| onBeforeOpen     | 打开前事件   | `() => boolean \| void \| Promise<boolean \| void>` | -      |

#### Ref

| 属性       | 说明       | 类型                   |
| ---------- | ---------- | ---------------------- |
| element    | 根元素     | `HTMLDivElement`       |
| close      | 关闭选择器 | `() => void`           |
| open       | 打开选择器 | `() => void`           |

## Select.Modal

选择器模态框组件。

### 何时使用

- 需要以模态框形式显示选择器时
- 需要全屏显示选择列表时

### 代码演示

### API

#### 属性

| 属性             | 说明         | 类型                                                                 | 默认值 |
| ---------------- | ------------ | -------------------------------------------------------------------- | ------ |
| value            | 选中的值     | `SelectItem \| SelectItem[] \| null`                                 | -      |
| list             | 选项列表     | `SelectItem[]`                                                       | -      |
| formatViewItem   | 格式化项     | `(item: SelectItem, options: { index: number }) => ListViewItem`         | -      |
| multiple         | 是否多选     | `boolean`                                                            | -      |
| checkable        | 是否可选     | `boolean`                                                            | -      |
| itemStyle        | 项样式       | `object`                                                             | -      |
| itemClassName    | 项类名       | `string`                                                             | -      |
| itemLayout       | 项布局       | `string`                                                             | -      |
| checkboxVariant  | 复选框变体   | `string`                                                             | -      |
| checkboxPlacement | 复选框位置   | `string`                                                             | -      |
| itemRender       | 项渲染       | `(item, options: { index; checked; onChange }) => ReactNode`         | -      |
| onChange         | 变化事件     | `(newValue, options?: { action; currentItem }) => void`              | -      |
| open             | 是否显示     | `boolean`                                                            | -      |
| maskClosable     | 点击遮罩关闭 | `boolean`                                                            | -      |
| safeArea         | 是否安全区   | `boolean`                                                            | -      |
| modalStyle       | 模态框样式   | `object`                                                             | -      |
| modalClassName   | 模态框类名   | `string`                                                             | -      |
| maskStyle        | 遮罩样式     | `object`                                                             | -      |
| maskClassName    | 遮罩类名     | `string`                                                             | -      |
| portal           | 挂载节点     | `HTMLElement \| null \| false`                                       | -      |
| title            | 标题         | `ReactNode`                                                          | -      |
| cancel       | 取消按钮     | `ReactNode`                                                          | -      |
| cancelVisible    | 取消按钮可见 | `boolean`                                                            | -      |
| headerRender     | 头部渲染     | `(ctx: { open; value; list }) => ReactNode`                          | -      |
| onOk             | 确认事件     | `(value: SelectItem \| SelectItem[] \| null) => unknown`             | -      |
| onClose          | 关闭事件     | `() => void`                                                         | -      |

#### Ref

| 属性            | 说明           | 类型                   |
| --------------- | -------------- | ---------------------- |
| maskElement     | 遮罩元素       | `HTMLDivElement`       |
| modalElement    | 模态元素       | `HTMLDivElement`       |
| mainElement     | 主列表元素     | `HTMLDivElement`       |
| getMainElement  | 获取主列表元素 | () => `HTMLDivElement` |

## Select.Main

选择器主组件。

### 何时使用

- 需要直接使用选择器主组件时
- 需要自定义选择界面时

### 代码演示

### API

#### 属性

| 属性             | 说明       | 类型                                                         | 默认值 |
| ---------------- | ---------- | ------------------------------------------------------------ | ------ |
| value            | 选中的值   | `SelectItem \| SelectItem[] \| null`                         | -      |
| list             | 选项列表   | `SelectItem[]`                                               | -      |
| formatViewItem   | 格式化项   | `(item: SelectItem, options: { index: number }) => ListViewItem` | -      |
| multiple         | 是否多选   | `boolean`                                                    | -      |
| checkable        | 是否可选   | `boolean`                                                    | -      |
| itemStyle        | 项样式     | `object`                                                     | -      |
| itemClassName    | 项类名     | `string`                                                     | -      |
| itemLayout       | 项布局     | `string`                                                     | -      |
| checkboxVariant  | 复选框变体 | `string`                                                     | -      |
| checkboxPlacement | 复选框位置 | `string`                                                     | -      |
| itemRender       | 项渲染     | `(item, options: { index; checked; onChange }) => ReactNode` | -      |
| onChange         | 变化事件   | `(newValue, options?: { action; currentItem }) => void`      | -      |
| style            | 自定义样式 | `object`                                                     | -      |
| className        | 自定义类名 | `string`                                                     | -      |

`list` 与 List 一致：扁平数据，仅分组头写 `type: 'group'`，普通项不必写 type，不传 `children`。

#### Ref

| 属性           | 说明       | 类型                   |
| -------------- | ---------- | ---------------------- |
| mainElement    | 主元素     | `HTMLDivElement`       |
| getMainElement | 获取主元素 | () => `HTMLDivElement` |
