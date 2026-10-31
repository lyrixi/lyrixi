---
group:
  title: 导航
  order: 6
order: 1
title: Steps
toc: content
---

# Steps

步骤条组件，用于显示步骤流程。

## 何时使用

- 需要显示步骤流程时
- 需要显示进度步骤时
- 需要引导用户完成操作时

## 代码演示

<code src="./demos/Active.tsx"></code>

## API

### 属性

| 属性      | 说明       | 类型                                                                          | 默认值       |
| --------- | ---------- | ----------------------------------------------------------------------------- | ------------ |
| value     | 当前步骤   | `{index?: number, id?: string, status?: string, activeIndex?: number, icon?: ReactNode}`                                 | -            |
| list      | 步骤列表   | `Array<{id?: string, icon?: ReactNode, status?: string, title?: ReactNode, description?: ReactNode}>` | -            |
| style     | 自定义样式 | `CSSProperties`                                                               | -            |
| className | 自定义类名 | `string`                                                                      | -            |
| iconSize  | 图标大小   | `number`                                                                      | `8`          |
| align     | 对齐方式   | `string`                                                                      | `'center'`   |
| direction | 方向       | `string`                                                                      | `'vertical'` |

### Ref

| 属性       | 说明       | 类型                   |
| ---------- | ---------- | ---------------------- |
| element    | 根元素     | `HTMLDivElement \| null` |
