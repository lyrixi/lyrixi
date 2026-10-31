---
group:
  title: 导航
  order: 6
order: 1
title: IndexBar
toc: content
---

# IndexBar

索引栏组件，仅负责渲染侧栏索引与触摸切换；列表滚动与定位交由 `ListAsync` 完成。

## IndexBar

### 何时使用

- 需要右侧字母/索引导航时
- 与 `ListAsync` 搭配：`onChange(item)` → `scrollToLocation({ id: item.id })`，`onItemVisibleChange` → 同步 `value`

### 代码演示

<code src="./demos/IndexBar.tsx"></code>

### API

#### 属性

| 属性      | 说明                           | 类型                           | 默认值 |
| --------- | ------------------------------ | ------------------------------ | ------ |
| list      | 索引列表（id 匹配，name 显示） | `ListItem[]`               | -      |
| value     | 当前选中项                     | `ListItem \| null`         | -      |
| onChange  | 用户触摸选中时回调             | `(item: ListItem) => void` | -      |
| style     | 自定义样式                     | `CSSProperties`            | -      |
| className | 自定义类名                     | `string`                   | -      |

列表项类型复用 `List` 的 `ListItem`（`id` 匹配选中，`name` 显示文案）。

#### Ref

| 属性            | 说明     | 类型                     |
| --------------- | -------- | ------------------------ |
| element         | 根元素   | `HTMLDivElement \| null` |
| tooltipElement  | 提示元素 | `HTMLDivElement \| null` |
