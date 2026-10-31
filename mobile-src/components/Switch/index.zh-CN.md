---
group:
  title: 数据录入
  order: 2
order: 1
title: Switch
toc: content
---

# Switch

开关组件，用于表示两种状态的切换。

## 何时使用

- 需要表示开关状态时
- 需要切换两种状态时
- 需要表示启用/禁用状态时

## 代码演示

<code src="./demos/Switch.tsx"></code>

## API

### 属性

| 属性      | 说明         | 类型                                         | 默认值 |
| --------- | ------------ | -------------------------------------------- | ------ |
| checked   | 是否选中     | `boolean`                                    | -      |
| readOnly  | 是否只读     | `boolean`                                    | -      |
| disabled  | 是否禁用     | `boolean`                                    | -      |
| size      | 尺寸         | `SwitchSize`                                 | `'m'`  |
| style     | 自定义样式   | `CSSProperties`                              | -      |
| className | 自定义类名   | `string`                                     | -      |
| on        | 开启状态内容 | `ReactNode`                                  | -      |
| off       | 关闭状态内容 | `ReactNode`                                  | -      |
| onChange  | 变化事件     | `(checked: boolean) => void`                 | -      |

### Ref

| 属性       | 说明       | 类型                          |
| ---------- | ---------- | ----------------------------- |
| element    | 根元素     | `HTMLDivElement \| null`      |
