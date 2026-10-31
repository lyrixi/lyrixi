---
group:
  title: 数据展示
  order: 5
order: 1
title: Text
toc: content
---

# Text

文本组件。

### 何时使用

- 需要显示文本时

### 代码演示

<code src="./demos/Text.tsx"></code>

### API

#### 属性

| 属性      | 说明       | 类型                                                                               | 默认值 |
| --------- | ---------- | ---------------------------------------------------------------------------------- | ------ |
| highlight | 高亮文本   | `string \| Array<string>`                                                          | -      |
| ellipsis  | 省略配置   | `{rows: number, expandable: boolean, defaultExpanded: boolean}` | -      |
| block     | 是否为块级元素 | `boolean`                                                                      | `false` |
| color     | 字体颜色   | `string`                                                                           | -      |
| fontSize  | 字体大小   | `string \| number`                                                                  | -      |
| fontWeight| 字体粗细   | `string \| number`                                                                  | -      |
| style     | 自定义样式 | `CSSProperties`                                                                    | -      |
| className | 自定义类名 | `string`                                                                           | -      |
| children  | 文本内容   | `ReactNode`                                                                        | -      |
| onClick   | 点击事件   | `MouseEventHandler<HTMLDivElement>`                                                | -      |

#### Ref

| 属性       | 说明       | 类型                            |
| ---------- | ---------- | ------------------------------- |
| element    | 根元素     | `HTMLDivElement \| null`        |
#### 静态方法

| 方法               | 说明         | 类型                                     |
| ------------------ | ------------ | ---------------------------------------- |
| Text.getDisplayValue | 获取显示值 | `(value: unknown, options?: { maxCount?: number; precision?: number }) => string \| number` |
