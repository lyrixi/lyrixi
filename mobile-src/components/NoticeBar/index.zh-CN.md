---
group:
  title: 数据展示
  order: 5
order: 1
title: NoticeBar
toc: content
---

# NoticeBar

通告栏组件，用于显示重要通知、提示信息。

## 何时使用

- 需要显示通知、提示、警告等信息时
- 需要在页面顶部或内容区域显示重要信息时
- 需要吸引用户注意但不强制交互时

## 代码演示

<code src="./demos/NoticeBar.tsx"></code>

## API

### 属性

| 属性                | 说明           | 类型                                          | 默认值   |
| ------------------- | -------------- | --------------------------------------------- | -------- |
| title               | 通知标题       | `ReactNode`                                   | -        |
| description         | 通知描述       | `ReactNode`                                   | -        |
| type                | 通知类型       | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` |
| closable            | 是否可关闭     | `boolean`                                     | -        |
| style               | 自定义样式     | `CSSProperties`                               | -        |
| className           | 自定义类名     | `string`                                      | -        |
| iconStyle           | 图标样式       | `CSSProperties`                               | -        |
| titleStyle          | 标题样式       | `CSSProperties`                               | -        |
| descriptionStyle    | 描述样式       | `CSSProperties`                               | -        |
| iconRender          | 自定义图标渲染 | `() => ReactNode`                             | -        |
| iconClassName       | 图标类名       | `string`                                      | -        |
| iconColor           | 图标颜色       | `string`                                      | -        |
| iconVariant         | 图标外观变体   | `'solid' \| 'text' \| 'outlined' \| 'filled' \| 'dashed'` | `'text'` |
| iconSize            | 图标大小       | `string \| number`                            | `'m'`    |

### Ref

| 属性       | 说明       | 类型                          |
| ---------- | ---------- | ----------------------------- |
| element    | 根元素     | `HTMLDivElement \| null`      |
| close      | 关闭通告栏 | `() => void`                  |
| open       | 打开通告栏 | `() => void`                  |
