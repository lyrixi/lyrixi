---
group:
  title: 反馈
  order: 4
order: 1
title: Button
toc: content
---

# Button

按钮组件，用于触发操作。

## Button

### 何时使用

- 需要触发一个操作时
- 需要提交表单时
- 需要执行确认、取消等操作时

### 代码演示

<code src="./demos/Button.tsx"></code>

### API

#### 属性

| 属性      | 说明           | 类型                                                                                                                  | 默认值         |
| --------- | -------------- | --------------------------------------------------------------------------------------------------------------------- | -------------- |
| id        | 按钮 ID        | `string`                                                                                                              | -              |
| direction | 方向           | `'horizontal' \| 'vertical' \| string`                                                                                | `'horizontal'` |
| block     | 是否为块级元素 | `boolean`                                                                                                             | -              |
| variant   | 外观变体       | `'solid' \| 'text' \| 'outlined' \| 'filled' \| 'dashed'`                                                             | `'solid'`      |
| color     | 颜色           | `'default' \| 'secondary' \| 'tertiary' \| 'quaternary' \| 'primary' \| 'info' \| 'warning' \| 'danger' \| 'success'` | `'default'`    |
| size      | 高度尺寸       | `ButtonSize \| string \| number`                                                                                      | -              |
| square    | 是否为等宽高   | `boolean`                                                                                                             | -              |
| fontSize  | 字体大小       | `string \| number`                                                                                                    | -              |
| radius    | 圆角           | `string \| number`                                                                                                    | -              |
| style     | 自定义样式     | `CSSProperties`                                                                                                       | -              |
| className | 自定义类名     | `string`                                                                                                              | -              |
| disabled  | 是否禁用       | `boolean`                                                                                                             | -              |
| children  | 按钮内容       | `ReactNode`                                                                                                           | -              |
| onClick   | 点击事件       | `MouseEventHandler<HTMLDivElement>`                                                                                   | -              |

#### Ref

| 属性    | 说明   | 类型                     |
| ------- | ------ | ------------------------ |
| element | 根元素 | `HTMLDivElement \| null` |

## Button.Group

按钮组合，用于将多个按钮紧凑排列。

### 何时使用

- 需要将多个按钮拼接成一组时
- 需要统一控制按钮组的尺寸、圆角时

### 代码演示

<code src="./demos/ButtonGroup.tsx"></code>

### API

#### 属性

| 属性      | 说明           | 类型                             | 默认值       |
| --------- | -------------- | -------------------------------- | ------------ |
| id        | 组件 ID        | `string`                         | -            |
| list      | 按钮列表       | `ButtonItem[]`                   | -            |
| separator | 分隔符         | `ReactNode \| boolean`           | `true`       |
| block     | 是否为块级元素 | `boolean`                        | `false`      |
| variant   | 外观变体       | `ButtonVariant`                  | `'outlined'` |
| color     | 颜色           | `ButtonColor`                    | -            |
| size      | 高度尺寸       | `ButtonSize \| string \| number` | `'m'`        |
| radius    | 圆角           | `Radius \| string`               | `'m'`        |
| style     | 自定义样式     | `CSSProperties`                  | -            |
| className | 自定义类名     | `string`                         | -            |

#### ButtonItem

| 属性      | 说明       | 类型                                |
| --------- | ---------- | ----------------------------------- |
| id        | 按钮 ID    | `string`                            |
| name      | 按钮文案   | `string`                            |
| color     | 按钮颜色   | `ButtonColor`                       |
| disabled  | 是否禁用   | `boolean`                           |
| style     | 自定义样式 | `CSSProperties`                     |
| className | 自定义类名 | `string`                            |
| onClick   | 点击事件   | `MouseEventHandler<HTMLDivElement>` |

#### Ref

| 属性    | 说明   | 类型                     |
| ------- | ------ | ------------------------ |
| element | 根元素 | `HTMLDivElement \| null` |

## Button.Text

按钮文本组件。

### 何时使用

- 需要在按钮中显示文本时

### 代码演示

<code src="./demos/ButtonText.tsx"></code>

### API

#### 属性

| 属性      | 说明       | 类型        | 默认值 |
| --------- | ---------- | ----------- | ------ |
| style     | 自定义样式 | `object`    | -      |
| className | 自定义类名 | `string`    | -      |
| children  | 文本内容   | `ReactNode` | -      |

#### Ref

| 属性    | 说明   | 类型             |
| ------- | ------ | ---------------- |
| element | 根元素 | `HTMLDivElement` |

## Button.Icon

按钮图标组件。

### 何时使用

- 需要在按钮中显示图标时

### 代码演示

<code src="./demos/ButtonIcon.tsx"></code>

### API

#### 属性

同 [Icon](/components/icon) 组件属性（`ButtonIconProps` 继承 `IconProps`，`svg` 为必填）。

#### Ref

同 Icon 组件 Ref。
