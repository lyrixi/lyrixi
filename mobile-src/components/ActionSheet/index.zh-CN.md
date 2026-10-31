---
group:
  title: 反馈
  order: 4
order: 1
title: ActionSheet
toc: content
---

# ActionSheet

动作面板组件，用于显示操作选项。提供命令式 API（`ActionSheet.open` / `ActionSheet.close`）与组合式子组件（`ActionSheet.Modal`、`ActionSheet.Combo` 等）。

## ActionSheet.open

命令式打开动作面板。全局同时仅存在一个实例，再次调用会先关闭上一个。

### 何时使用

- 需要命令式唤起全局动作面板（如操作菜单、选项列表）时
- 需要从底部弹出操作选项时

### 代码演示

<code src="./demos/ActionSheetApi.tsx"></code>

### API

#### 参数

| 属性           | 说明         | 类型                                         | 默认值          |
| -------------- | ------------ | -------------------------------------------- | --------------- |
| value          | 选中的值     | `ListItem \| null`                           | -               |
| list           | 选项列表     | `ListItem[]`                                 | -               |
| maskClosable   | 点击遮罩关闭 | `boolean`                                    | `true`          |
| allowClear     | 允许清除     | `boolean`                                    | -               |
| safeArea       | 是否安全区   | `boolean`                                    | -               |
| modalStyle     | 模态框样式   | `CSSProperties`                              | -               |
| modalClassName | 模态框类名   | `string`                                     | -               |
| maskStyle      | 遮罩样式     | `CSSProperties`                              | -               |
| maskClassName  | 遮罩类名     | `string`                                     | -               |
| itemStyle      | 选项样式     | `CSSProperties`                              | -               |
| itemClassName  | 选项类名     | `string`                                     | -               |
| groupStyle     | 组样式       | `CSSProperties`                              | -               |
| groupClassName | 组类名       | `string`                                     | -               |
| portal         | 挂载节点     | `HTMLElement \| null \| false`               | `document.body` |
| title          | 标题         | `ReactNode`                                  | -               |
| cancel         | 取消按钮     | `ReactNode`                                  | -               |
| cancelVisible  | 取消按钮可见 | `boolean`                                    | -               |
| itemRender     | 项渲染       | `(item, helpers: { onChange }) => ReactNode` | -               |
| onChange       | 变化事件     | `(value: ListItem \| null) => void`          | -               |
| onCancel       | 取消事件     | `() => void`                                 | -               |
| onClose        | 关闭事件     | `() => void`                                 | -               |

#### 返回值

无返回值。

## ActionSheet.close

关闭当前由 `ActionSheet.open` 打开的动作面板。

### 何时使用

- 需要手动关闭命令式打开的动作面板时

### 代码演示

见 ActionSheet.open

### API

#### 参数

| 参数     | 说明             | 类型      | 默认值 |
| -------- | ---------------- | --------- | ------ |
| animated | 是否播放关闭动画 | `boolean` | `true` |

#### 返回值

无返回值。

## ActionSheet.Combo

动作面板组合组件，结合输入框和动作面板。

### 何时使用

- 需要结合输入框和动作面板时
- 需要从输入框触发动作面板时

### 代码演示

<code src="./demos/ActionSheetCombo.tsx"></code>

### API

#### 属性

| 属性            | 说明           | 类型                                                                                                  | 默认值 |
| --------------- | -------------- | ----------------------------------------------------------------------------------------------------- | ------ |
| value           | 选中的值       | `ListItem \| null`                                                                                    | -      |
| placeholder     | 占位符         | `string`                                                                                              | -      |
| formatter       | 格式化函数     | `(...args: unknown[]) => string`                                                                      | -      |
| autoSize        | 自动调整大小   | `boolean`                                                                                             | -      |
| separator       | 分隔符         | `string`                                                                                              | -      |
| mode            | 模式           | `string`                                                                                              | -      |
| readOnly        | 是否只读       | `boolean`                                                                                             | -      |
| disabled        | 是否禁用       | `boolean`                                                                                             | -      |
| allowClear      | 允许清除       | `boolean`                                                                                             | -      |
| style           | 自定义样式     | `object`                                                                                              | -      |
| className       | 自定义类名     | `string`                                                                                              | -      |
| comboRender     | 自定义组合渲染 | `(props: { comboRef: RefObject<ComboRef \| null>; open: boolean; onClick: () => void }) => ReactNode` | -      |
| children        | 子元素         | `ReactNode`                                                                                           | -      |
| leftIconRender  | 左侧图标渲染   | `() => ReactNode`                                                                                     | -      |
| leftIconSvg     | 左侧 SVG 图标  | `ComponentType<SVGProps<SVGSVGElement>>`                                                              | -      |
| rightIconRender | 右侧图标渲染   | `() => ReactNode`                                                                                     | -      |
| rightIconSvg    | 右侧 SVG 图标  | `ComponentType<SVGProps<SVGSVGElement>>`                                                              | -      |
| clearRender     | 清除按钮渲染   | `() => ReactNode`                                                                                     | -      |
| list            | 选项列表       | `ListItem[]`                                                                                          | -      |
| maskClosable    | 点击遮罩关闭   | `boolean`                                                                                             | -      |
| safeArea        | 是否安全区     | `boolean`                                                                                             | -      |
| modalStyle      | 模态框样式     | `object`                                                                                              | -      |
| modalClassName  | 模态框类名     | `string`                                                                                              | -      |
| maskStyle       | 遮罩样式       | `object`                                                                                              | -      |
| maskClassName   | 遮罩类名       | `string`                                                                                              | -      |
| portal          | 挂载节点       | `HTMLElement \| null \| false`                                                                        | -      |
| title           | 标题           | `ReactNode`                                                                                           | -      |
| cancel          | 取消按钮       | `ReactNode`                                                                                           | -      |
| cancelVisible   | 取消按钮可见   | `boolean`                                                                                             | -      |
| itemRender      | 项渲染         | `(item, helpers: { onChange }) => ReactNode`                                                          | -      |
| onBeforeOpen    | 打开前事件     | `() => Promise<boolean \| void>`                                                                      | -      |
| onOpen          | 打开事件       | `() => void`                                                                                          | -      |
| onClose         | 关闭事件       | `() => void`                                                                                          | -      |
| onClick         | 点击事件       | `() => void`                                                                                          | -      |
| onChange        | 变化事件       | `(value: ListItem \| null) => void`                                                                   | -      |

#### Ref

| 属性  | 说明     | 类型         |
| ----- | -------- | ------------ |
| close | 关闭面板 | `() => void` |
| open  | 打开面板 | `() => void` |

## ActionSheet.Modal

动作面板模态框组件，内部使用 `ActionSheet.Main` 渲染选项列表。

### 何时使用

- 需要以模态框形式显示动作面板时
- 需要从底部弹出操作选项时

### 代码演示

<code src="./demos/ActionSheetModal.tsx"></code>

### API

#### 属性

| 属性           | 说明         | 类型                                         | 默认值  |
| -------------- | ------------ | -------------------------------------------- | ------- |
| value          | 选中的值     | `ListItem \| null`                           | -       |
| list           | 选项列表     | `ListItem[]`                                 | -       |
| open           | 是否显示     | `boolean`                                    | `false` |
| maskClosable   | 点击遮罩关闭 | `boolean`                                    | `true`  |
| allowClear     | 允许清除     | `boolean`                                    | -       |
| safeArea       | 是否安全区   | `boolean`                                    | -       |
| modalStyle     | 模态框样式   | `object`                                     | -       |
| modalClassName | 模态框类名   | `string`                                     | -       |
| maskStyle      | 遮罩样式     | `object`                                     | -       |
| maskClassName  | 遮罩类名     | `string`                                     | -       |
| itemStyle      | 选项样式     | `object`                                     | -       |
| itemClassName  | 选项类名     | `string`                                     | -       |
| groupStyle     | 组样式       | `object`                                     | -       |
| groupClassName | 组类名       | `string`                                     | -       |
| portal         | 挂载节点     | `HTMLElement \| null \| false`               | -       |
| title          | 标题         | `ReactNode`                                  | -       |
| cancel         | 取消按钮     | `ReactNode`                                  | -       |
| cancelVisible  | 取消按钮可见 | `boolean`                                    | -       |
| itemRender     | 项渲染       | `(item, helpers: { onChange }) => ReactNode` | -       |
| onChange       | 变化事件     | `(value: ListItem \| null) => void`          | -       |
| onCancel       | 取消事件     | `() => void`                                 | -       |
| onClose        | 关闭事件     | `() => void`                                 | -       |

#### Ref

同 Modal 组件 Ref。

## ActionSheet.Main

动作面板主体，渲染选项列表。`ActionSheet.Modal` 在未自定义主体结构时，内部会自动渲染 `ActionSheet.Main`。

### 何时使用

- 需要直接使用动作面板选项列表时
- 需要自定义动作面板主体结构时

### 代码演示

<code src="./demos/ActionSheetMain.tsx"></code>

### API

#### 属性

| 属性           | 说明     | 类型                                         | 默认值 |
| -------------- | -------- | -------------------------------------------- | ------ |
| value          | 选中的值 | `ListItem \| null`                           | -      |
| list           | 选项列表 | `ListItem[]`                                 | -      |
| itemStyle      | 选项样式 | `object`                                     | -      |
| itemClassName  | 选项类名 | `string`                                     | -      |
| groupStyle     | 组样式   | `object`                                     | -      |
| groupClassName | 组类名   | `string`                                     | -      |
| itemRender     | 项渲染   | `(item, helpers: { onChange }) => ReactNode` | -      |
| onChange       | 变化事件 | `(item: ListItem) => void`                   | -      |
