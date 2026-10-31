---
group:
  title: 导航
  order: 6
order: 1
title: ToolBar
toc: content
---

# ToolBar

工具栏组件，用于显示工具栏。

## ToolBar

### 何时使用

- 需要显示工具栏时
- 需要显示操作按钮时
- 需要显示筛选、搜索等功能时

### 代码演示

<code src="./demos/ToolBar.tsx"></code>

### API

#### 属性

| 属性      | 说明       | 类型            | 默认值      |
| --------- | ---------- | --------------- | ----------- |
| variant   | 变体       | `string`        | `'default'` |
| style     | 自定义样式 | `CSSProperties` | -           |
| className | 自定义类名 | `string`        | -           |
| children  | 工具栏内容 | `ReactNode`     | -           |

#### Ref

| 属性    | 说明   | 类型                     |
| ------- | ------ | ------------------------ |
| element | 根元素 | `HTMLDivElement \| null` |

## ToolBar.Button

工具栏按钮组件。

### 何时使用

- 需要在工具栏中显示按钮时

### 代码演示

<code src="./demos/ToolBarButton.tsx"></code>

### API

#### 属性

继承 [Button](/components/button) 的 `ButtonProps`，属性与 Button 一致。

#### Ref

同 Button 组件 Ref。

## ToolBar.Compact

工具栏紧凑按钮组，基于 Flex，将内部按钮圆角收拢到容器上，并在子项之间显示分割线。

### 何时使用

- 需要将多个 `ToolBar.Button`（或其他带 `lyrixi-button` 的工具栏项）紧凑排列时

### 代码演示

<code src="./demos/ToolBarCompact.tsx"></code>

### API

#### 属性

继承 [Flex](/components/flex) 的 `FlexProps`，并扩展：

| 属性      | 说明                         | 类型                   | 默认值 |
| --------- | ---------------------------- | ---------------------- | ------ |
| separator | 是否显示分割线，或自定义节点 | `ReactNode \| boolean` | `true` |
| radius    | 容器圆角                     | `Radius \| string`     | `'m'`  |

#### Ref

同 Flex 组件 Ref。

## ToolBar.Dropdown

工具栏下拉组件。

### 何时使用

- 需要在工具栏中显示下拉菜单时

代码示例见文档顶部 **代码演示** 中的「ToolBar.Dropdown」小节。

### 代码演示

<code src="./demos/ToolBarDropdown.tsx"></code>

### API

#### 属性

| 属性            | 说明             | 类型                                                                                                                                                | 默认值      |
| --------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| direction       | 方向             | `string`                                                                                                                                            | -           |
| variant         | 变体             | `ButtonProps['variant']`                                                                                                                            | -           |
| block           | 是否为块级元素   | `boolean`                                                                                                                                           | -           |
| color           | 颜色             | `ButtonProps['color']`                                                                                                                              | `'default'` |
| backgroundColor | 背景颜色         | `string`                                                                                                                                            | -           |
| borderColor     | 边框颜色         | `string`                                                                                                                                            | -           |
| border          | 边框样式         | `string`                                                                                                                                            | `'none'`    |
| size            | 高度尺寸         | `ButtonSize \| string \| number`                                                                                                                    | -           |
| square          | 是否为等宽高     | `boolean`                                                                                                                                           | -           |
| fontSize        | 字体大小         | `string \| number`                                                                                                                                  | -           |
| radius          | 圆角             | `string \| number`                                                                                                                                  | `'m'`       |
| style           | 自定义样式       | `CSSProperties`                                                                                                                                     | -           |
| className       | 自定义类名       | `string`                                                                                                                                            | -           |
| open            | 是否展开         | `boolean \| null`                                                                                                                                   | -           |
| children        | 下拉内容         | `ReactNode`                                                                                                                                         | -           |
| comboRender     | 自定义组合渲染   | `(params: { comboRef: RefObject<ToolBarComboRef \| null>; open: boolean \| null; onClick: (e: MouseEvent) => void \| Promise<void> }) => ReactNode` | -           |
| arrowRender     | 自定义箭头渲染   | `(props: { open: boolean \| null }) => ReactNode`                                                                                                   | -           |
| arrowSvg        | 自定义箭头 SVG   | `ComponentType<SVGProps<SVGSVGElement>> \| null`                                                                                                    | -           |
| modalStyle      | 模态框样式       | `CSSProperties`                                                                                                                                     | -           |
| modalClassName  | 模态框类名       | `string`                                                                                                                                            | -           |
| maskStyle       | 遮罩样式         | `CSSProperties`                                                                                                                                     | -           |
| maskClassName   | 遮罩类名         | `string`                                                                                                                                            | -           |
| offset          | 偏移量           | `{ top?: number; bottom?: number; left?: number; right?: number }`                                                                                  | -           |
| left            | 左侧偏移         | `string \| number`                                                                                                                                  | -           |
| right           | 右侧偏移         | `string \| number`                                                                                                                                  | -           |
| portal          | 挂载节点         | `HTMLElement`                                                                                                                                       | -           |
| modalRender     | 自定义模态框渲染 | `(ctx: { open: boolean \| null; onClose: () => void }) => ReactNode`                                                                                | -           |
| onClick         | 点击事件         | `MouseEventHandler<HTMLDivElement>`                                                                                                                 | -           |
| onBeforeOpen    | 打开前事件       | `() => boolean \| void \| Promise<boolean \| void>`                                                                                                 | -           |
| onOpen          | 打开事件         | `() => void`                                                                                                                                        | -           |
| onClose         | 关闭事件         | `() => void`                                                                                                                                        | -           |

#### Ref

| 属性    | 说明     | 类型                     |
| ------- | -------- | ------------------------ |
| element | 根元素   | `HTMLDivElement \| null` |
| close   | 关闭下拉 | `() => void`             |
| open    | 打开下拉 | `() => void`             |

## ToolBar.Search

工具栏搜索组件。

### 何时使用

- 需要在工具栏中显示搜索框时

### 代码演示

<code src="./demos/ToolBarSearch.tsx"></code>

### API

#### 属性

继承 [Input.Search](/components/input#inputsearch) 的 `InputSearchProps`（含 `debounceDelay` 等）。

#### Ref

同 Input.Search 组件 Ref。

## ToolBar.SearchActive

工具栏激活搜索组件。

### 何时使用

- 需要在工具栏中显示激活搜索时

### 代码演示

<code src="./demos/ToolBarSearchActive.tsx"></code>

### API

#### 属性

同 Input.Search 组件属性，以及：

| 属性     | 说明     | 类型         | 默认值 |
| -------- | -------- | ------------ | ------ |
| onCancel | 取消事件 | `() => void` | -      |

#### Ref

同 Input.Search 组件 Ref。

## ToolBar.DateRange

工具栏日期范围组件。

### 何时使用

- 需要在工具栏中显示日期范围选择时

### 代码演示

<code src="./demos/ToolBarDateRange.tsx"></code>

### API

#### 属性

| 属性           | 说明         | 类型                                                                                                                                                                                       | 默认值 |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ |
| value          | 日期范围值   | `(Date \| null)[] \| null`                                                                                                                                                                 | -      |
| rangeId        | 范围 ID      | `string \| null`                                                                                                                                                                           | -      |
| placeholder    | 占位符       | `string`                                                                                                                                                                                   | -      |
| readOnly       | 是否只读     | `boolean`                                                                                                                                                                                  | -      |
| disabled       | 是否禁用     | `boolean`                                                                                                                                                                                  | -      |
| allowClear     | 允许清除     | `boolean`                                                                                                                                                                                  | -      |
| style          | 自定义样式   | `CSSProperties`                                                                                                                                                                            | -      |
| className      | 自定义类名   | `string`                                                                                                                                                                                   | -      |
| leftIconNode   | 左侧图标     | `ReactNode`                                                                                                                                                                                | -      |
| rightIconNode  | 右侧图标     | `ReactNode`                                                                                                                                                                                | -      |
| clearRender    | 清除按钮渲染 | `(props: object) => ReactNode`                                                                                                                                                             | -      |
| type           | 日期类型     | `string`                                                                                                                                                                                   | -      |
| min            | 最小日期     | `Date \| null`                                                                                                                                                                             | -      |
| max            | 最大日期     | `Date \| null`                                                                                                                                                                             | -      |
| ranges         | 日期范围预设 | `DatePickerRangesMap`                                                                                                                                                                      | -      |
| maskClosable   | 点击遮罩关闭 | `boolean`                                                                                                                                                                                  | -      |
| safeArea       | 是否安全区   | `boolean`                                                                                                                                                                                  | -      |
| modalStyle     | 模态框样式   | `CSSProperties`                                                                                                                                                                            | -      |
| modalClassName | 模态框类名   | `string`                                                                                                                                                                                   | -      |
| maskStyle      | 遮罩样式     | `CSSProperties`                                                                                                                                                                            | -      |
| maskClassName  | 遮罩类名     | `string`                                                                                                                                                                                   | -      |
| portal         | 挂载节点     | `HTMLElement \| null \| false`                                                                                                                                                             | -      |
| titleRender    | 标题渲染     | `() => ReactNode`                                                                                                                                                                          | -      |
| ok             | 确认按钮     | `ReactNode`                                                                                                                                                                                | -      |
| cancel         | 取消按钮     | `ReactNode`                                                                                                                                                                                | -      |
| okVisible      | 确认按钮可见 | `boolean`                                                                                                                                                                                  | -      |
| cancelVisible  | 取消按钮可见 | `boolean`                                                                                                                                                                                  | -      |
| onBeforeOpen   | 打开前事件   | `() => boolean \| void \| Promise<boolean \| void>`                                                                                                                                        | -      |
| onChange       | 变化事件     | `(value: (Date \| null)[] \| null, options: { rangeId: string \| null \| undefined }) => void`                                                                                             | -      |
| onOk           | 确认事件     | `(value: (Date \| null)[] \| null \| undefined, options: { rangeId: string \| null \| undefined }) => void \| boolean \| (Date \| null)[] \| Promise<void \| boolean \| (Date \| null)[]>` | -      |

#### Ref

| 属性    | 说明       | 类型                     |
| ------- | ---------- | ------------------------ |
| element | 根元素     | `HTMLDivElement \| null` |
| close   | 关闭选择器 | `() => void`             |
| open    | 打开选择器 | `() => void`             |

## ToolBar.List

工具栏列表组件。

### 何时使用

- 需要在工具栏中显示横向选项列表（非日期周期）时
- **不要**用于日 / 月 / 季 / 年 / 周等日期类型或周期切换（含左右切期）；此类场景用 `DatePicker.TypeSwitcher`

### 代码演示

<code src="./demos/ToolBarList.tsx"></code>

### API

#### 属性

同 ToolBar.Dropdown 组件属性，以及：

| 属性        | 说明     | 类型                                                    | 默认值 |
| ----------- | -------- | ------------------------------------------------------- | ------ |
| value       | 选中值   | `ToolBarItem \| ToolBarItem[] \| null`                  | -      |
| placeholder | 占位符   | `string`                                                | -      |
| list        | 列表数据 | `ToolBarItem[]`                                         | -      |
| onChange    | 变化事件 | `(value: ToolBarItem \| ToolBarItem[] \| null) => void` | -      |

## ToolBar.ActionSheet

工具栏动作面板组件。

### 何时使用

- 需要在工具栏中显示动作面板时

### 代码演示

<code src="./demos/ToolBarActionSheet.tsx"></code>

### API

#### 属性

同 ActionSheet.Combo 组件属性，以及：

| 属性            | 说明     | 类型                                              | 默认值      |
| --------------- | -------- | ------------------------------------------------- | ----------- |
| direction       | 方向     | `string`                                          | -           |
| variant         | 变体     | `ButtonProps['variant']`                          | -           |
| block           | 块级     | `boolean`                                         | -           |
| color           | 颜色     | `string`                                          | `'default'` |
| backgroundColor | 背景颜色 | `string`                                          | -           |
| borderColor     | 边框颜色 | `string`                                          | -           |
| border          | 边框样式 | `string`                                          | `'none'`    |
| size            | 尺寸     | `ButtonSize \| string \| number`                  | -           |
| square          | 等宽高   | `boolean`                                         | -           |
| radius          | 圆角     | `string \| number`                                | `'m'`       |
| arrowRender     | 箭头渲染 | `(props: { open: boolean \| null }) => ReactNode` | -           |

#### Ref

| 属性  | 说明     | 类型         |
| ----- | -------- | ------------ |
| close | 关闭面板 | `() => void` |
| open  | 打开面板 | `() => void` |

## ToolBar.Filter

工具栏筛选组件。

### 何时使用

- 需要在工具栏中显示筛选时

### 代码演示

<code src="./demos/ToolBarFilter.tsx"></code>

### API

#### 属性

| 属性            | 说明         | 类型                                                                                                                                         | 默认值 |
| --------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| direction       | 方向         | `ButtonProps['direction']`                                                                                                                   | -      |
| variant         | 变体         | `ButtonProps['variant']`                                                                                                                     | -      |
| block           | 块级         | `boolean`                                                                                                                                    | -      |
| style           | 自定义样式   | `CSSProperties`                                                                                                                              | -      |
| className       | 自定义类名   | `string`                                                                                                                                     | -      |
| color           | 颜色         | `ButtonProps['color']`                                                                                                                       | -      |
| backgroundColor | 背景颜色     | `string`                                                                                                                                     | -      |
| borderColor     | 边框颜色     | `string`                                                                                                                                     | -      |
| border          | 边框样式     | `string`                                                                                                                                     | -      |
| size            | 尺寸         | `ButtonProps['size']`                                                                                                                        | -      |
| square          | 等宽高       | `boolean`                                                                                                                                    | -      |
| fontSize        | 字体大小     | `string \| number`                                                                                                                           | -      |
| radius          | 圆角         | `string \| number`                                                                                                                           | -      |
| maskStyle       | 遮罩样式     | `CSSProperties`                                                                                                                              | -      |
| maskClassName   | 遮罩类名     | `string`                                                                                                                                     | -      |
| modalStyle      | 模态框样式   | `CSSProperties`                                                                                                                              | -      |
| modalClassName  | 模态框类名   | `string`                                                                                                                                     | -      |
| children        | 筛选内容     | `ReactNode`                                                                                                                                  | -      |
| comboRender     | 组合区渲染   | `(params: { comboRef: RefObject<ButtonRef \| null>; open: boolean \| null; onClick: (e: MouseEvent<HTMLDivElement>) => void }) => ReactNode` | -      |
| modalRender     | 模态内容渲染 | `(params: { open: boolean \| null; onClose: () => void }) => ReactNode`                                                                      | -      |
| portal          | 挂载节点     | `ModalProps['portal']`                                                                                                                       | -      |
| footerRender    | 底部渲染     | `(params: { onClose?: ModalProps['onClose'] }) => ReactNode`                                                                                 | -      |
| icon            | 图标         | `ReactNode`                                                                                                                                  | -      |
| onCancel        | 取消事件     | `() => void`                                                                                                                                 | -      |
| onOpen          | 打开事件     | `() => void`                                                                                                                                 | -      |
| onClose         | 关闭事件     | `() => void`                                                                                                                                 | -      |
| onConfig        | 配置事件     | `() => void`                                                                                                                                 | -      |
| onReset         | 重置事件     | `() => void`                                                                                                                                 | -      |
| onOk            | 确认事件     | `(ctx: { close: () => void }) => void`                                                                                                       | -      |

#### Ref

| 属性    | 说明     | 类型                     |
| ------- | -------- | ------------------------ |
| element | 根元素   | `HTMLDivElement \| null` |
| close   | 关闭筛选 | `() => void`             |
| open    | 打开筛选 | `() => void`             |
