---
group:
  title: 导航
  order: 6
order: 1
title: TabBar
toc: content
---

# TabBar

标签栏组件，用于显示标签页。

## TabBar.Tabs

标签页组件。

### 何时使用

- 需要显示内容标签页（页面分区、内容切换）时
- **不要**用于日 / 月 / 季 / 年 / 周等日期类型或周期切换；此类场景用 `DatePicker.TypeSwitcher`

### 代码演示

<code src="./demos/TabBarTabs.tsx"></code>

### API

#### 属性

| 属性                 | 说明           | 类型                                                                                                                                                                                                                                                                                                                                                 | 默认值     |
| -------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| value                | 选中的值       | `TabBarItem`                                                                                                                                                                                                                                                                                                                                         | -          |
| list                 | 标签列表       | `Array<{id?: string \| number, name?: ReactNode, description?: ReactNode, placeholder?: ReactNode, disabled?: boolean, iconSvg?: ComponentType<SVGProps<SVGSVGElement>>, iconSize?: string \| number, iconColor?: string, iconRender?: (options: { checked: boolean }) => ReactNode, contentRender?: (options: { checked: boolean }) => ReactNode}>` | `[]`       |
| separator            | 分隔符         | `ReactNode`                                                                                                                                                                                                                                                                                                                                          | -          |
| gap                  | 间距           | `number`                                                                                                                                                                                                                                                                                                                                             | -          |
| size                 | 尺寸           | `TabBarSize \| string \| number`                                                                                                                                                                                                                                                                                                                     | `'m'`      |
| block                | 是否占满一整行 | `boolean`                                                                                                                                                                                                                                                                                                                                            | `false`    |
| style                | 自定义样式     | `CSSProperties`                                                                                                                                                                                                                                                                                                                                      | -          |
| className            | 自定义类名     | `string`                                                                                                                                                                                                                                                                                                                                             | -          |
| itemStyle            | Tab 项样式     | `CSSProperties`                                                                                                                                                                                                                                                                                                                                      | -          |
| itemClassName        | Tab 项类名     | `string`                                                                                                                                                                                                                                                                                                                                             | -          |
| disabled             | 是否禁用       | `boolean`                                                                                                                                                                                                                                                                                                                                            | -          |
| descriptionPlacement | 描述位置       | `string`                                                                                                                                                                                                                                                                                                                                             | `'bottom'` |
| onChange             | 变化事件       | `(item: TabBarItem) => void`                                                                                                                                                                                                                                                                                                                         | -          |

#### Ref

| 属性    | 说明   | 类型                     |
| ------- | ------ | ------------------------ |
| element | 根元素 | `HTMLDivElement \| null` |

## TabBar.Slide

滑动标签栏组件。

### 何时使用

- 需要显示滑动标签栏时

### 代码演示

<code src="./demos/TabBarSlide.tsx"></code>

### API

#### 属性

| 属性                 | 说明           | 类型                                                                                                                                                                                                                                                                                                                                                 | 默认值     |
| -------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| value                | 选中的值       | `TabBarItem`                                                                                                                                                                                                                                                                                                                                         | -          |
| list                 | 标签列表       | `Array<{id?: string \| number, name?: ReactNode, description?: ReactNode, placeholder?: ReactNode, disabled?: boolean, iconSvg?: ComponentType<SVGProps<SVGSVGElement>>, iconSize?: string \| number, iconColor?: string, iconRender?: (options: { checked: boolean }) => ReactNode, contentRender?: (options: { checked: boolean }) => ReactNode}>` | `[]`       |
| gap                  | 间距           | `number`                                                                                                                                                                                                                                                                                                                                             | -          |
| size                 | 尺寸           | `TabBarSize \| string \| number`                                                                                                                                                                                                                                                                                                                     | `'m'`      |
| block                | 是否占满一整行 | `boolean`                                                                                                                                                                                                                                                                                                                                            | `false`    |
| style                | 自定义样式     | `CSSProperties`                                                                                                                                                                                                                                                                                                                                      | -          |
| className            | 自定义类名     | `string`                                                                                                                                                                                                                                                                                                                                             | -          |
| itemStyle            | Tab 项样式     | `CSSProperties`                                                                                                                                                                                                                                                                                                                                      | -          |
| itemClassName        | Tab 项类名     | `string`                                                                                                                                                                                                                                                                                                                                             | -          |
| disabled             | 是否禁用       | `boolean`                                                                                                                                                                                                                                                                                                                                            | -          |
| descriptionPlacement | 描述位置       | `string`                                                                                                                                                                                                                                                                                                                                             | `'bottom'` |
| onChange             | 变化事件       | `(item: TabBarItem) => void`                                                                                                                                                                                                                                                                                                                         | -          |

#### Ref

| 属性    | 说明   | 类型                     |
| ------- | ------ | ------------------------ |
| element | 根元素 | `HTMLDivElement \| null` |

## TabBar.Menus

菜单标签栏组件。

### 何时使用

- 需要显示菜单标签栏时

### 代码演示

<code src="./demos/TabBarMenus.tsx"></code>

### API

#### 属性

| 属性                 | 说明           | 类型                                                                                                                                                                                                                                                                                                                                                 | 默认值     |
| -------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| value                | 选中的值       | `TabBarItem`                                                                                                                                                                                                                                                                                                                                         | -          |
| list                 | 标签列表       | `Array<{id?: string \| number, name?: ReactNode, description?: ReactNode, placeholder?: ReactNode, disabled?: boolean, iconSvg?: ComponentType<SVGProps<SVGSVGElement>>, iconSize?: string \| number, iconColor?: string, iconRender?: (options: { checked: boolean }) => ReactNode, contentRender?: (options: { checked: boolean }) => ReactNode}>` | `[]`       |
| separator            | 分隔符         | `ReactNode`                                                                                                                                                                                                                                                                                                                                          | -          |
| gap                  | 间距           | `number`                                                                                                                                                                                                                                                                                                                                             | -          |
| size                 | 尺寸           | `TabBarSize \| string \| number`                                                                                                                                                                                                                                                                                                                     | `'m'`      |
| block                | 是否占满一整行 | `boolean`                                                                                                                                                                                                                                                                                                                                            | `false`    |
| style                | 自定义样式     | `CSSProperties`                                                                                                                                                                                                                                                                                                                                      | -          |
| className            | 自定义类名     | `string`                                                                                                                                                                                                                                                                                                                                             | -          |
| itemStyle            | Tab 项样式     | `CSSProperties`                                                                                                                                                                                                                                                                                                                                      | -          |
| itemClassName        | Tab 项类名     | `string`                                                                                                                                                                                                                                                                                                                                             | -          |
| disabled             | 是否禁用       | `boolean`                                                                                                                                                                                                                                                                                                                                            | -          |
| descriptionPlacement | 描述位置       | `string`                                                                                                                                                                                                                                                                                                                                             | `'bottom'` |
| onChange             | 变化事件       | `(item: TabBarItem) => void`                                                                                                                                                                                                                                                                                                                         | -          |

#### Ref

| 属性    | 说明   | 类型                     |
| ------- | ------ | ------------------------ |
| element | 根元素 | `HTMLDivElement \| null` |

## TabBar.Group

分组标签栏组件。

### 何时使用

- 需要显示分组标签栏时

### 代码演示

<code src="./demos/TabBarGroup.tsx"></code>

### API

#### 属性

| 属性                 | 说明           | 类型                                                                                                                                                                                                                                                                                                                                                 | 默认值     |
| -------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| value                | 选中的值       | `TabBarItem`                                                                                                                                                                                                                                                                                                                                         | -          |
| list                 | 标签列表       | `Array<{id?: string \| number, name?: ReactNode, description?: ReactNode, placeholder?: ReactNode, disabled?: boolean, iconSvg?: ComponentType<SVGProps<SVGSVGElement>>, iconSize?: string \| number, iconColor?: string, iconRender?: (options: { checked: boolean }) => ReactNode, contentRender?: (options: { checked: boolean }) => ReactNode}>` | `[]`       |
| gap                  | 间距           | `number`                                                                                                                                                                                                                                                                                                                                             | -          |
| size                 | 尺寸           | `TabBarSize \| string \| number`                                                                                                                                                                                                                                                                                                                     | `'m'`      |
| block                | 是否占满一整行 | `boolean`                                                                                                                                                                                                                                                                                                                                            | `false`    |
| style                | 自定义样式     | `CSSProperties`                                                                                                                                                                                                                                                                                                                                      | -          |
| className            | 自定义类名     | `string`                                                                                                                                                                                                                                                                                                                                             | -          |
| itemStyle            | Tab 项样式     | `CSSProperties`                                                                                                                                                                                                                                                                                                                                      | -          |
| itemClassName        | Tab 项类名     | `string`                                                                                                                                                                                                                                                                                                                                             | -          |
| disabled             | 是否禁用       | `boolean`                                                                                                                                                                                                                                                                                                                                            | -          |
| descriptionPlacement | 描述位置       | `string`                                                                                                                                                                                                                                                                                                                                             | `'bottom'` |
| onChange             | 变化事件       | `(item: TabBarItem) => void`                                                                                                                                                                                                                                                                                                                         | -          |

#### Ref

| 属性    | 说明   | 类型                     |
| ------- | ------ | ------------------------ |
| element | 根元素 | `HTMLDivElement \| null` |
