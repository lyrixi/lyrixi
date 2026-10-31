---
group:
  title: 布局
  order: 3
order: 1
title: Flex
toc: content
---

# Flex

弹性布局组件，用于创建灵活的布局。

## Flex

### 何时使用

- 需要创建灵活的布局时
- 需要控制元素对齐方式时
- 需要控制元素间距时

### 代码演示

<code src="./demos/Flex.tsx"></code>

### API

#### 属性

| 属性      | 说明                                                                     | 类型                                                                | 默认值         |
| --------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------- | -------------- |
| direction | 主轴方向                                                                 | `'horizontal' \| 'vertical'`                                        | `'horizontal'` |
| justify   | 主轴对齐方式（水平方向上的分布）                                         | `'start' \| 'end' \| 'center' \| 'between' \| 'around' \| 'evenly'` | `'start'`      |
| align     | 交叉轴对齐方式（垂直于主轴的对齐）                                       | `'start' \| 'end' \| 'center'`                                      | -              |
| wrap      | 是否换行；`true` 换行，`false` 不换行（子项被压缩），`'scroll'` 超出滚动 | `boolean \| 'scroll'`                                               | `false`        |
| gap       | 子项间距（px）                                                           | `number`                                                            | -              |
| flex      | 自身 flex 值                                                             | `CSSProperties['flex']`                                             | -              |
| block     | 是否占满一整行                                                           | `boolean`                                                           | `true`         |
| style     | 自定义样式                                                               | `CSSProperties`                                                     | -              |
| className | 自定义类名                                                               | `string`                                                            | -              |
| children  | 子元素                                                                   | `ReactNode`                                                         | -              |

#### Ref

| 属性    | 说明   | 类型                     |
| ------- | ------ | ------------------------ |
| element | 根元素 | `HTMLDivElement \| null` |
