---
group:
  title: 数据展示
  order: 5
order: 1
title: Badge
toc: content
---

# Badge

徽标组件，用于显示数字、状态等标记。

## 何时使用

- 需要显示数字标记时
- 需要显示状态标记时
- 需要在元素上显示标记时

## 代码演示

<code src="./demos/Badge.tsx"></code>

## API

### 属性

| 属性      | 说明                                     | 类型                            | 默认值 |
| --------- | ---------------------------------------- | ------------------------------- | ------ |
| count     | 徽标数值                                 | `number`                        | -      |
| style     | 自定义样式                               | `object`                        | -      |
| className | 自定义类名                               | `string`                        | -      |
| maxCount  | 最大显示数值，超出时显示 `maxCount + ellipsis` | `number`                        | `99`   |
| ellipsis  | 超出 `maxCount` 时的省略符               | `string`                        | `'+'`  |
| children  | 徽标包裹的内容                           | `ReactNode`                     | -      |

### Ref

| 属性       | 说明       | 类型                    |
| ---------- | ---------- | ----------------------- |
| element    | 根元素     | `HtmlSpanElement`       |
