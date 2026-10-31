---
group:
  title: 布局
  order: 3
order: 1
title: SafeArea
toc: content
---

# SafeArea

安全区组件，用于适配安全区域。

## 何时使用

- 需要适配安全区域时
- 需要在有刘海屏的设备上显示内容时
- 需要避免内容被遮挡时

## 代码演示

<code src="./demos/SafeArea.tsx"></code>

## API

### 属性

| 属性      | 说明       | 类型                                                                   | 默认值     |
| --------- | ---------- | ---------------------------------------------------------------------- | ---------- |
| type      | 类型       | `'height' \| 'padding' \| 'margin' \| 'border' \| 'before' \| 'after'` | `'height'` |
| placement | 位置       | `'top' \| 'bottom'`                                                    | `'bottom'` |
| style     | 自定义样式 | `CSSProperties`                                                        | -          |
| className | 自定义类名 | `string`                                                               | -          |

### Ref

| 属性       | 说明       | 类型                          |
| ---------- | ---------- | ----------------------------- |
| element    | 根元素     | `HTMLDivElement \| null`      |
