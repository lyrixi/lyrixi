---
group:
  title: 数据录入
  order: 2
order: 1
title: DatePicker
toc: content
---

# DatePicker

日期选择器组件，用于选择日期、时间等。

## DatePicker.Combo

日期选择器组合组件，结合输入框和日期选择器。

### 何时使用

- 需要结合输入框和日期选择器时

### 代码演示

<code src="./demos/DatePickerCombo.tsx"></code>

<code src="./demos/DatePickerComboInput.tsx"></code>

### API

#### 属性

同 DatePicker.Main 组件属性。

#### Ref

同 DatePicker.Main 组件 Ref。

## DatePicker.Modal

日期选择器模态框组件。

### 何时使用

- 需要以模态框形式显示日期选择器时

### 代码演示

### API

#### 属性

同 DatePicker.Main 组件属性。

#### Ref

同 DatePicker.Main 组件 Ref。

## DatePicker.Main

日期选择器主组件。

### 何时使用

- 需要直接使用日期选择器主组件时

### 代码演示

### API

#### 属性

| 属性             | 说明           | 类型                                                                                   | 默认值   |
| ---------------- | -------------- | -------------------------------------------------------------------------------------- | -------- |
| value            | 选中的值       | `Date \| null`                                                                         | -        |
| placeholder      | 占位符         | `string`                                                                               | -        |
| formatter        | 格式化函数     | `(value: Date \| null \| undefined, options?: { separator?: string }) => string`       | -        |
| autoSize         | 自动调整大小   | `boolean`                                                                              | -        |
| separator        | 分隔符         | `string`                                                                               | -        |
| readOnly         | 是否只读       | `boolean`                                                                              | -        |
| disabled         | 是否禁用       | `boolean`                                                                              | -        |
| allowClear       | 允许清除       | `boolean`                                                                              | -        |
| style            | 自定义样式     | `CSSProperties`                                                                        | -        |
| className        | 自定义类名     | `string`                                                                               | -        |
| comboRender      | 自定义组合渲染 | `(params: { comboRef: RefObject<unknown>; open: boolean; onClick: () => void }) => ReactNode` | -        |
| children         | 子元素         | `ReactNode`                                                                            | -        |
| leftIconRender   | 左侧图标渲染   | `ReactNode`                                                                            | -        |
| leftIconSvg      | 左侧图标 SVG   | `string`                                                                               | -        |
| rightIconRender  | 右侧图标渲染   | `ReactNode`                                                                            | -        |
| rightIconSvg     | 右侧图标 SVG   | `string`                                                                               | -        |
| clearRender      | 清除按钮渲染   | `(props: object) => ReactNode`                                                         | -        |
| type             | 日期类型       | `'year' \| 'quarter' \| 'month' \| 'date' \| 'time' \| 'datetime' \| 'week'`           | `'date'` |
| min              | 最小日期       | `Date \| null`                                                                         | -        |
| max              | 最大日期       | `Date \| null`                                                                         | -        |
| hourStep         | 小时步长       | `number`                                                                               | -        |
| minuteStep       | 分钟步长       | `number`                                                                               | -        |
| maskClosable     | 点击遮罩关闭   | `boolean`                                                                              | -        |
| safeArea         | 是否安全区     | `boolean`                                                                              | -        |
| modalStyle       | 模态框样式     | `CSSProperties`                                                                        | -        |
| modalClassName   | 模态框类名     | `string`                                                                               | -        |
| maskStyle        | 遮罩样式       | `CSSProperties`                                                                        | -        |
| maskClassName    | 遮罩类名       | `string`                                                                               | -        |
| portal           | 挂载节点       | `HTMLElement \| null \| false`                                                         | -        |
| titleRender      | 标题渲染       | `(value: Date \| null \| undefined, options: { type?: DatePickerPickerType }) => ReactNode` | -        |
| ok           | 确认按钮       | `ReactNode`                                                                            | -        |
| cancel       | 取消按钮       | `ReactNode`                                                                            | -        |
| okVisible        | 确认按钮可见   | `boolean`                                                                              | -        |
| cancelVisible    | 取消按钮可见   | `boolean`                                                                              | -        |
| onBeforeOpen     | 打开前事件     | `() => boolean \| void \| Promise<boolean \| void>`                                    | -        |
| onChange         | 变化事件       | `(value: Date \| null \| undefined, options?: unknown) => void`                           | -        |
| onOk             | 确认事件       | `(value: Date \| null \| undefined) => boolean \| Date \| void \| Promise<boolean \| Date \| void>` | -        |

#### Ref

| 属性       | 说明       | 类型                   |
| ---------- | ---------- | ---------------------- |
| element    | 根元素     | `HTMLDivElement`       |
| close      | 关闭选择器 | `() => void`           |
| open       | 打开选择器 | `() => void`           |

## DatePicker.Range

日期范围选择器组件。

### 何时使用

- 需要选择日期范围时

### 代码演示

<code src="./demos/DatePickerRangeCombo.tsx"></code>

### API

#### 属性

同 DatePicker.Main 组件属性，但 value 为 `Date[]`。

#### Ref

同 DatePicker.Main 组件 Ref。

## DatePicker.Multiple

多日期选择器组件。

### 何时使用

- 需要选择多个日期时

### 代码演示

<code src="./demos/DatePickerMultipleCombo.tsx"></code>

### API

#### 属性

同 DatePicker.Main 组件属性，但 value 为 `Date[]`。

#### Ref

同 DatePicker.Main 组件 Ref。

## DatePicker.Week

周选择器组件。

### 何时使用

- 需要选择周时

### 代码演示

<code src="./demos/DatePickerWeekCombo.tsx"></code>

### API

#### 属性

同 DatePicker.Main 组件属性。

#### Ref

同 DatePicker.Main 组件 Ref。

## DatePicker.TypeSwitcher

日期类型选择器组件：日期类型 Tab（日/月/季/年/周等）+ 当前期左右切换。

### 何时使用

- 需要切换日期类型（日 / 月 / 季 / 年 / 周等）时
- 需要周期切换、日期类型切换（含左右切期、年份切换）时
- 报表 / 详情页顶部「月季年」等周期 Tab + 日期导航时
- **禁止**用 `ToolBar.List`、`TabBar` 或自造左右箭头拼装同类日期切换；应直接使用本组件

### 代码演示

<code src="./demos/DatePickerTypeSwitcher.tsx"></code>

### API

#### 属性

| 属性                | 说明           | 类型                                                                | 默认值 |
| ------------------- | -------------- | ------------------------------------------------------------------- | ------ |
| value               | 当前选中项     | `DatePickerTypeSwitcherValue`                                       | -      |
| types               | 类型列表       | `DatePickerTypeListItem[]`                                          | -      |
| variant             | 切换方式       | `'tabbar' \| 'dropdown'`                                            | -      |
| dropdownPortal      | 下拉挂载节点   | `HTMLElement`                                                       | -      |
| dropdownLeft        | 下拉左侧偏移   | `string \| number`                                                  | -      |
| style               | 自定义样式     | `CSSProperties`                                                     | -      |
| className           | 自定义类名     | `string`                                                            | -      |
| pickerComboStyle    | 选择器组合样式 | `CSSProperties`                                                     | -      |
| pickerComboClassName | 选择器组合类名 | `string`                                                           | -      |
| tabbarStyle         | Tab 栏样式     | `CSSProperties`                                                     | -      |
| tabbarClassName     | Tab 栏类名     | `string`                                                            | -      |
| min                 | 最小日期       | `Date \| null`                                                      | -      |
| max                 | 最大日期       | `Date \| null`                                                      | -      |
| pickerDisabled      | 是否禁用日期选择器点击 | `boolean`                                                   | -      |
| pickerComboRender   | 选择器组合渲染 | `(value: DatePickerTypeSwitcherValue, ctx: { onChange: (d: Date) => void }) => ReactNode` | -    |
| onChange            | 变化事件       | `(value: DatePickerTypeSwitcherValue) => void`                      | -      |

#### Ref

| 属性       | 说明       | 类型                   |
| ---------- | ---------- | ---------------------- |
| element    | 根元素     | `HTMLDivElement`       |
## DatePicker.RangeSelector

日期范围快捷选择器组件。

### 何时使用

- 需要快捷选择日期范围时
- 需要提供预设日期范围选项时

### 代码演示

<code src="./demos/DatePickerRangeSelector.tsx"></code>

### API

#### 属性

| 属性          | 说明           | 类型                                                               | 默认值   |
| ------------- | -------------- | ------------------------------------------------------------------ | -------- |
| value         | 选中的值       | `(Date \| null)[] \| null`                                         | -        |
| autoSwapValue | 自动交换值     | `boolean`                                                          | `true`   |
| type          | 日期类型       | `string`                                                           | -        |
| rangeId       | 当前选中的范围 | `string \| null`                                                   | -        |
| ranges        | 范围配置       | `DatePickerRangesMap`                                              | -        |
| min           | 最小日期       | `Date \| null`                                                     | -        |
| max           | 最大日期       | `Date \| null`                                                     | -        |
| hourStep      | 小时步长       | `number`                                                           | -        |
| minuteStep    | 分钟步长       | `number`                                                           | -        |
| startDisabled | 禁用开始日期   | `boolean`                                                          | -        |
| endDisabled   | 禁用结束日期   | `boolean`                                                          | -        |
| allowClear    | 允许清除       | `boolean`                                                          | -        |
| style         | 自定义样式     | `CSSProperties`                                                    | -        |
| className     | 自定义类名     | `string`                                                           | -        |
| portal        | 挂载节点       | `HTMLElement \| null`                                              | -        |
| onChange      | 变化事件       | `(value: (Date \| null)[] \| null, options?: DatePickerRangeChangeMeta) => void` | -        |
| onOk          | 确认事件       | `(value: (Date \| null)[] \| null) => void`                        | -        |
