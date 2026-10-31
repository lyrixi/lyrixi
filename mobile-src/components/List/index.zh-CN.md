---
group:
  title: 数据展示
  order: 5
order: 1
title: List
toc: content
---

# List

列表组件，用于展示数据列表。

## List

### 何时使用

- 需要展示数据列表时
- 需要支持单选或多选时
- 需要分组显示数据时

### 代码演示

<code src="./demos/List.tsx"></code>

### API

#### 属性

| 属性              | 说明              | 类型                                                                                                                                  | 默认值 |
| ----------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| id                | 根元素 id         | `string`                                                                                                                              | -      |
| value             | 选中的值          | `ListItem \| ListItem[] \| null`                                                                                                      | -      |
| multiple          | 是否多选          | `boolean`                                                                                                                             | -      |
| allowClear        | 允许清除          | `boolean`                                                                                                                             | -      |
| list              | 列表数据          | `ListItem[]`                                                                                                                          | -      |
| formatViewItem    | 格式化项          | `(item: ListItem, options: { index: number }) => ListViewItem`                                                                        | -      |
| checkable         | 是否展示 Checkbox | `boolean`（`true` 展示且行与 Checkbox 均可切换；`false` 不展示，仅点击行切换）；行级 `formatViewItem` 返回的 `checkable` 优先于本属性 | -      |
| style             | 自定义样式        | `CSSProperties`                                                                                                                       | -      |
| className         | 自定义类名        | `string`                                                                                                                              | -      |
| itemStyle         | 项样式            | `CSSProperties`                                                                                                                       | -      |
| itemClassName     | 项类名            | `string`                                                                                                                              | -      |
| itemLayout        | 项布局            | `string`                                                                                                                              | -      |
| itemRender        | 自定义项渲染      | `(item: ListItem, options: { index: number; checked: boolean; onChange: ListItemOnChange }) => ReactNode`                             | -      |
| checkboxVariant   | 复选框样式变体    | `string`                                                                                                                              | -      |
| checkboxPlacement | 复选框位置        | `string`                                                                                                                              | -      |
| onChange          | 选中值变化        | `(newValue: ListItem \| ListItem[] \| null, options: { action: 'item' \| 'checkbox'; currentItem: ListItem }) => void`                | -      |

`onChange` 在选中态变化时更新受控 `value`；`options.action` 为 `'item'` 表示点击整行，`'checkbox'` 表示点击 Checkbox。`multiple` 时 `newValue` 为数组，`allowClear` 为 true 时单选可清为 `null`。`options.currentItem` 为本次操作的原始项。

#### formatViewItem 与分组

使用 `formatViewItem` 将原始 `ListItem` 转为渲染用的 `ListViewItem`（可映射 `title`、`description`、`checkable`、`actionRender` 等展示字段）。单行 `checkable` 优先于 List 的 `checkable`。

**分组（扁平 list + type）：** List **不接收** `children`，业务在 `formatResponse` / 组装 `list` 时自行拉平：

- `type: 'group'` → 分组头（`HeaderItem`）
- 缺省（不必写 `type: 'item'`）→ 普通项（`Item`）

示例结构：

```ts
;[
  { id: 'g-a', type: 'group', name: '分组 A' },
  { id: '1', name: '项 1' },
  { id: 'g-b', type: 'group', name: '分组 B' },
  { id: '2', name: '项 2' }
]
```

#### Ref

| 属性    | 说明   | 类型             |
| ------- | ------ | ---------------- |
| element | 根元素 | `HTMLDivElement` |

## List.Item

列表项组件。

### 何时使用

- 需要单独使用列表项时

### 代码演示

<code src="./demos/ListItem.tsx"></code>

### API

#### 属性

| 属性              | 说明              | 类型                                                                                          | 默认值 |
| ----------------- | ----------------- | --------------------------------------------------------------------------------------------- | ------ |
| id                | 根元素 id         | `string`                                                                                      | -      |
| \_raw             | 原始数据          | `ListItem`                                                                                    | -      |
| checked           | 是否选中          | `boolean`                                                                                     | -      |
| disabled          | 是否禁用          | `boolean`                                                                                     | -      |
| checkable         | 是否展示 Checkbox | `boolean`                                                                                     | -      |
| style             | 自定义样式        | `CSSProperties`                                                                               | -      |
| className         | 自定义类名        | `string`                                                                                      | -      |
| layout            | 项布局            | `string`                                                                                      | -      |
| imageUrl          | 图片地址          | `string`                                                                                      | -      |
| imageSvg          | 图片 SVG 组件     | `ComponentType<SVGProps<SVGSVGElement>>`                                                      | -      |
| imageRender       | 图片渲染          | `(item: ListItem & { checked?: boolean }) => ReactNode`                                       | -      |
| avatarUrl         | 头像地址          | `string`                                                                                      | -      |
| avatarSvg         | 头像 SVG 组件     | `ComponentType<SVGProps<SVGSVGElement>>`                                                      | -      |
| avatarRender      | 头像渲染          | `(item: ListItem & { checked?: boolean }) => ReactNode`                                       | -      |
| title             | 标题              | `ReactNode`                                                                                   | -      |
| description       | 描述              | `ReactNode`                                                                                   | -      |
| note              | 备注              | `ReactNode`                                                                                   | -      |
| content           | 内容              | `ReactNode`                                                                                   | -      |
| actionRender      | 操作区渲染        | `(item: ListItem & { checked?: boolean }) => ReactNode`                                       | -      |
| checkboxVariant   | 复选框样式        | `string`                                                                                      | -      |
| checkboxPlacement | 复选框位置        | `string`                                                                                      | -      |
| onChange          | 项变化            | `(item: ListItem & { checked?: boolean }, options: { action: 'item' \| 'checkbox' }) => void` | -      |

`onChange` 在点击行或 Checkbox 时触发，第二参数 `options.action` 区分交互来源；单独使用 `List.Item` 时需自行配合 `checked` 做受控。`checkable` 为 `true` 时展示 Checkbox，行与 Checkbox 均可切换选中。

## List.HeaderItem

列表分组标题组件。

### 何时使用

- 需要给列表添加分组标题时

### 代码演示

<code src="./demos/ListHeaderItem.tsx"></code>

### API

#### 属性

| 属性        | 说明       | 类型            | 默认值 |
| ----------- | ---------- | --------------- | ------ |
| id          | 分组标识   | `string`        | -      |
| description | 描述       | `ReactNode`     | -      |
| style       | 自定义样式 | `CSSProperties` | -      |
| className   | 自定义类名 | `string`        | -      |
| title       | 标题       | `ReactNode`     | -      |

## List.InfiniteScroll

无限滚动加载更多组件。

### 何时使用

- 列表使用虚拟滚动时需要显示的加载指示器

### 代码演示

<code src="./demos/ListInfiniteScroll.tsx"></code>

### API

#### 属性

| 属性    | 说明     | 类型        | 默认值 |
| ------- | -------- | ----------- | ------ |
| status  | 加载状态 | `string`    | -      |
| content | 内容     | `ReactNode` | -      |
