---
group:
  title: 数据展示
  order: 5
order: 1
title: Float
toc: content
---

# Float

悬浮按钮组件，用于显示可拖动的悬浮按钮。

## 何时使用

- 需要显示悬浮按钮时
- 需要可拖动的按钮时
- 需要固定在页面上的按钮时

## 代码演示

<code src="./demos/Float.tsx"></code>

## API

### 属性

| 属性      | 说明         | 类型                                            | 默认值                                                |
| --------- | ------------ | ----------------------------------------------- | ----------------------------------------------------- |
| draggable | 是否可拖动   | `boolean`                                       | -                                                     |
| gap       | 边距         | `GapOption`                                     | `{ top: 8, right: 8, bottom: 8, left: 8 }`           |
| safeArea  | 是否安全区   | `boolean`                                       | `true`                                                |
| style     | 自定义样式   | `CSSProperties`                                 | -                                                     |
| className | 自定义类名   | `string`                                        | -                                                     |
| portal    | 挂载节点     | `Element \| DocumentFragment`                   | -                                                     |
| children  | 悬浮按钮内容 | `ReactNode`                                     | -                                                     |
| onDragEnd | 拖动结束事件 | `(data: { position: SnapPosition }) => void`    | -                                                     |

### Ref

| 属性       | 说明       | 类型                          |
| ---------- | ---------- | ----------------------------- |
| element    | 根元素     | `HTMLDivElement \| null`      |
