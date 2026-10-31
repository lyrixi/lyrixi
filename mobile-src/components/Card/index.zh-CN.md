---
group:
  title: 布局
  order: 3
order: 1
title: Card
toc: content
---

# Card

卡片组件，用于展示内容区块。

## Card

### 何时使用

- 需要展示相关内容区块时
- 需要将信息分组展示时
- 需要带标题和内容的结构化展示时

### 代码演示

<code src="./demos/Card.tsx"></code>
<code src="./demos/CardHeader.tsx"></code>
<code src="./demos/CardMain.tsx"></code>

### API

#### 属性

| 属性      | 说明       | 类型                                | 默认值 |
| --------- | ---------- | ----------------------------------- | ------ |
| id        | 卡片 ID    | `string`                            | -      |
| radius    | 圆角       | `Radius \| string \| number`        | -      |
| style     | 自定义样式 | `CSSProperties`                     | -      |
| className | 自定义类名 | `string`                            | -      |
| children  | 卡片内容   | `ReactNode`                         | -      |
| onClick   | 点击事件   | `MouseEventHandler<HTMLDivElement>` | -      |

#### Ref

| 属性    | 说明   | 类型                     |
| ------- | ------ | ------------------------ |
| element | 根元素 | `HTMLDivElement \| null` |

## Card.Header

卡片头部。

### 代码演示

见上方 CardHeader 示例。

### API

#### 属性

| 属性      | 说明       | 类型            | 默认值 |
| --------- | ---------- | --------------- | ------ |
| style     | 自定义样式 | `CSSProperties` | -      |
| className | 自定义类名 | `string`        | -      |
| children  | 头部内容   | `ReactNode`     | -      |

#### Ref

| 属性    | 说明   | 类型                     |
| ------- | ------ | ------------------------ |
| element | 根元素 | `HTMLDivElement \| null` |

## Card.Main

卡片主体。

### 代码演示

见上方 CardMain 示例。

### API

#### 属性

| 属性      | 说明       | 类型            | 默认值 |
| --------- | ---------- | --------------- | ------ |
| style     | 自定义样式 | `CSSProperties` | -      |
| className | 自定义类名 | `string`        | -      |
| children  | 主体内容   | `ReactNode`     | -      |

#### Ref

| 属性    | 说明   | 类型                     |
| ------- | ------ | ------------------------ |
| element | 根元素 | `HTMLDivElement \| null` |
