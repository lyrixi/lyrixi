---
group:
  title: 反馈
  order: 4
order: 1
title: Modal
toc: content
---

# Modal

模态框组件，用于显示对话框、确认框等。

## 何时使用

- 需要显示对话框时
- 需要用户确认操作时
- 需要显示重要信息时

## 代码演示

### Modal（基础）

<code src="./demos/Modal/index.tsx"></code>

### NavBarModal

<code src="./demos/NavBarModal/index.tsx"></code>

### DropdownModal

<code src="./demos/DropdownModal/index.tsx"></code>

### FilterModal

<code src="./demos/FilterModal/index.tsx"></code>

## API

### 属性

| 属性           | 说明         | 类型                                                                                    | 默认值   |
| -------------- | ------------ | --------------------------------------------------------------------------------------- | -------- |
| open           | 是否显示     | `boolean`                                                                               | -        |
| maskClosable   | 点击遮罩关闭 | `boolean`                                                                               | `true`   |
| safeArea       | 是否安全区   | `boolean`                                                                               | `true`   |
| animation      | 动画效果     | `'none' \| 'slideLeft' \| 'slideRight' \| 'slideUp' \| 'slideDown' \| 'zoom' \| 'fade'` | `'zoom'` |
| modalStyle     | 模态框样式   | `object`                                                                                | -        |
| modalClassName | 模态框类名   | `string`                                                                                | -        |
| maskStyle      | 遮罩样式     | `object`                                                                                | -        |
| maskClassName  | 遮罩类名     | `string`                                                                                | -        |
| portal         | 挂载节点     | `HTMLElement \| null \| false`                                                          | -        |
| children       | 模态框内容   | `ReactNode`                                                                             | -        |
| onClose        | 关闭事件     | `(e: Event) => void`                                                                    | -        |

### Ref

| 属性            | 说明           | 类型                   |
| --------------- | -------------- | ---------------------- |
| maskElement     | 遮罩元素       | `HTMLDivElement`       |
| modalElement    | 模态框元素     | `HTMLDivElement`       |
## Modal.NavBarModal

带导航栏的模态框。继承基础 Modal 的遮罩与挂载相关属性，并扩展导航栏配置。

### API

#### 属性

| 属性            | 说明         | 类型                           | 默认值    |
| --------------- | ------------ | ------------------------------ | --------- |
| open            | 是否显示     | `boolean`                      | -         |
| maskClosable    | 点击遮罩关闭 | `boolean`                      | -         |
| safeArea        | 是否安全区   | `boolean`                      | -         |
| modalStyle      | 模态框样式   | `CSSProperties`                | -         |
| modalClassName  | 模态框类名   | `string`                       | -         |
| maskStyle       | 遮罩样式     | `CSSProperties`                | -         |
| maskClassName   | 遮罩类名     | `string`                       | -         |
| portal          | 挂载节点     | `HTMLElement \| null \| false` | -         |
| children        | 模态框内容   | `ReactNode`                    | -         |
| navBarStyle     | 导航栏样式   | `CSSProperties`                | -         |
| navBarClassName | 导航栏类名   | `string`                       | -         |
| title           | 标题         | `ReactNode`                    | -         |
| ok          | 确认按钮     | `ReactNode`                    | -         |
| okVisible       | 确认按钮可见 | `boolean`                      | -         |
| okPlacement     | 确认按钮位置 | `'left' \| 'right'`            | `'right'` |
| cancel      | 取消按钮     | `ReactNode`                    | -         |
| cancelVisible   | 取消按钮可见 | `boolean`                      | `true`    |
| cancelPlacement | 取消按钮位置 | `'left' \| 'right'`            | `'left'`  |
| onClose         | 关闭事件     | `(e: Event) => void`           | -         |
| onCancel        | 取消事件     | `() => void`                   | -         |
| onOk            | 确认事件     | `() => boolean \| void \| Promise<boolean \| void>` | - |

#### Ref

同 Modal 组件 Ref。
