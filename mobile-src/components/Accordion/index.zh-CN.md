---
group:
  title: 数据展示
  order: 5
order: 1
title: Accordion
toc: content
---

# Accordion

手风琴组件，用于折叠和展开内容。

## Accordion

### 何时使用

- 需要折叠和展开内容时
- 需要显示可折叠的面板时
- 需要节省页面空间时

### 代码演示

<code src="./demos/Accordion.tsx"></code>

### API

#### 属性

| 属性           | 说明                                 | 类型                                                   | 默认值    |
| -------------- | ------------------------------------ | ------------------------------------------------------ | --------- |
| open           | 是否展开（受控，传入后由外部控制）   | `boolean`                                              | -         |
| defaultOpen    | 默认是否展开（非受控）               | `boolean`                                              | `false`   |
| style          | 自定义样式                           | `CSSProperties`                                        | -         |
| headerStyle    | 头部样式                             | `CSSProperties`                                        | -         |
| titleStyle     | 标题样式                             | `CSSProperties`                                        | -         |
| className      | 自定义类名                           | `string`                                               | -         |
| minHeight      | 最小高度                             | `number`                                               | -         |
| title          | 标题                                 | `ReactNode`                                            | -         |
| headerRender   | 自定义头部渲染                       | `(props: { open, onClick }) => ReactNode`              | -         |
| ellipsis       | 省略配置                             | `{ expandText?: ReactNode, collapseText?: ReactNode }` | -         |
| ellipsisRender | 自定义省略渲染                       | `(props: { open, onClick }) => ReactNode`              | -         |
| arrowClassName | 箭头容器类名（布局用，不用于选图标） | `string`                                               | -         |
| arrowPlacement | 箭头位置                             | `'left' \| 'right'`                                    | `'right'` |
| arrowRender    | 自定义箭头渲染                       | `(props: { open: boolean }) => ReactNode`              | -         |
| children       | 内容                                 | `ReactNode`                                            | -         |
| onOpen         | 展开事件                             | `() => void`                                           | -         |
| onClose        | 收起事件                             | `() => void`                                           | -         |

#### Ref

| 属性    | 说明   | 类型                     |
| ------- | ------ | ------------------------ |
| element | 根元素 | `HTMLDivElement \| null` |
| open    | 展开   | `() => void`             |
| close   | 收起   | `() => void`             |

## Accordion.Group

手风琴分组组件，同一组内仅允许展开一个面板。

### 何时使用

- 需要多个手风琴面板互斥展开时
- 需要统一管理多个面板的展开状态

### 代码演示

<code src="./demos/AccordionGroup.tsx"></code>

### API

#### 属性

| 属性      | 说明           | 类型                              | 默认值 |
| --------- | -------------- | --------------------------------- | ------ |
| value     | 当前展开项索引 | `number \| null`                  | -      |
| style     | 自定义样式     | `CSSProperties`                   | -      |
| className | 自定义类名     | `string`                          | -      |
| children  | 子面板         | `ReactNode`                       | -      |
| onChange  | 展开项变化事件 | `(index: number \| null) => void` | -      |

#### Ref

| 属性           | 说明             | 类型                                |
| -------------- | ---------------- | ----------------------------------- |
| element        | 根元素           | `HTMLDivElement \| null`            |
| getActiveIndex | 获取当前展开索引 | () => `number \| null \| undefined` |
| openIndex      | 展开指定索引     | `(index: number) => void`           |
| close          | 收起当前面板     | `() => void`                        |
