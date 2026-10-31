---
group:
  title: 数据录入
  order: 2
order: 1
title: Checkbox
toc: content
---

# Checkbox

复选框组件，用于多选场景。
## Checkbox

### 何时使用

- 需要从一组选项中选择多个时
- 需要表示开关状态时
- 需要确认操作时

### 代码演示

<code src="./demos/Checkbox.tsx"></code>

### API

#### 属性

| 属性         | 说明           | 类型                                        | 默认值   |
| ------------ | -------------- | ------------------------------------------- | -------- |
| checked      | 是否选中       | `boolean`                                   | -        |
| readOnly     | 是否只读       | `boolean`                                   | -        |
| disabled     | 是否禁用       | `boolean`                                   | -        |
| variant      | 样式变体       | `string`                                    | -        |
| style        | 自定义样式     | `CSSProperties`                             | -        |
| className    | 自定义类名     | `string`                                    | -        |
| children     | 复选框内容     | `ReactNode`                                 | -        |
| iconRender   | 自定义图标渲染 | `(props: { checked?: boolean }) => ReactNode` | -        |
| iconPlacement | 图标位置       | `'left' \| 'right'`                         | `'left'` |
| onChange     | 变化事件       | `(checked: boolean) => void`                | -        |

#### Ref

| 属性       | 说明       | 类型                          |
| ---------- | ---------- | ----------------------------- |
| element    | 根元素     | `HTMLDivElement \| null`      |
## Checkbox.Group

复选框组组件，用于管理多个复选框。

### 何时使用

- 需要管理多个复选框时
- 需要批量选择时
- 需要分组显示复选框时

### 代码演示

<code src="./demos/CheckboxGroup.tsx"></code>

### API

#### 属性

| 属性         | 说明           | 类型                                                | 默认值   |
| ------------ | -------------- | --------------------------------------------------- | -------- |
| value        | 选中的值       | `unknown`                                           | -        |
| list         | 选项列表       | `CheckboxItem[]`                                    | -        |
| placeholder  | 占位符         | `string`                                            | -        |
| disabled     | 是否禁用       | `boolean`                                           | -        |
| readOnly     | 是否只读       | `boolean`                                           | -        |
| allowClear   | 允许清除       | `boolean`                                           | -        |
| multiple     | 是否多选       | `boolean`                                           | -        |
| style        | 自定义样式     | `CSSProperties`                                     | -        |
| className    | 自定义类名     | `string`                                            | -        |
| iconRender   | 自定义图标渲染 | `(props: { checked?: boolean }) => ReactNode`        | -        |
| iconPlacement | 图标位置       | `'left' \| 'right'`                                 | `'left'` |
| onChange     | 变化事件       | `(value: CheckboxItem \| CheckboxItem[] \| null) => void` | -     |

#### Ref

| 属性       | 说明       | 类型                          |
| ---------- | ---------- | ----------------------------- |
| element    | 根元素     | `HTMLDivElement \| null`      |
