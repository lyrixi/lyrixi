---
group:
  title: 导航
  order: 6
order: 2
title: Breadcrumb
toc: content
---

# Breadcrumb

面包屑组件，用于展示当前页面在层级结构中的位置，并支持点击上级节点跳转。

## 何时使用

- 需要展示页面层级路径、方便返回上级时
- **不要**用于同级内容切换；此类场景用 `TabBar.Tabs`

## 代码演示

<code src="./demos/Breadcrumb.tsx"></code>

## API

### 属性

| 属性                 | 说明           | 类型                                 | 默认值     |
| -------------------- | -------------- | ------------------------------------ | ---------- |
| value                | 当前页面对应项 | `BreadcrumbItem`                     | -          |
| list                 | 路径列表       | `BreadcrumbItem[]`                   | `[]`       |
| separator            | 分隔符         | `ReactNode`                          | -          |
| gap                  | 间距（px）     | `number`                             | -          |
| size                 | 尺寸           | `BreadcrumbSize \| string \| number` | `'m'`      |
| block                | 是否占满一整行 | `boolean`                            | `false`    |
| style                | 自定义样式     | `CSSProperties`                      | -          |
| className            | 自定义类名     | `string`                             | -          |
| disabled             | 是否禁用       | `boolean`                            | -          |
| descriptionPlacement | 描述位置       | `string`                             | `'bottom'` |
| onChange             | 点击上级节点   | `(item: BreadcrumbItem) => void`     | -          |

`BreadcrumbItem` 字段与 `TabBarItem` 一致：`id`、`name`、`description`、`disabled`、`iconSvg`、`iconSize`、`iconColor`、`iconRender`。

### Ref

| 属性    | 说明   | 类型                     |
| ------- | ------ | ------------------------ |
| element | 根元素 | `HTMLDivElement \| null` |
