---
group:
  title: 反馈
  order: 4
order: 1
title: Message
toc: content
---

# Message

消息对话框组件集合，用于展示提示、确认等居中弹窗。提供命令式 API（`Message.open` / `Message.close`）与组合式子组件（`Message.Modal`、`Message.Combo` 等）。

## Message.open

命令式打开消息对话框。全局同时仅存在一个实例，再次调用会先关闭上一个。

### 何时使用

- 需要命令式唤起全局消息框（如操作确认、结果提示）时
- 需要居中展示标题、正文与操作按钮的对话框时

### 代码演示

<code src="./demos/MessageApi.tsx"></code>

### API

#### 参数

| 参数             | 说明                                                     | 类型                                     | 默认值          |
| ---------------- | -------------------------------------------------------- | ---------------------------------------- | --------------- |
| iconSvg          | 图标 SVG 组件                                            | `ComponentType<SVGProps<SVGSVGElement>>` | -               |
| iconSize         | 图标尺寸                                                 | `string`                                 | -               |
| iconColor        | 图标颜色                                                 | `string`                                 | -               |
| iconRender       | 图标区域渲染                                             | `() => ReactNode`                        | -               |
| title            | 标题                                                     | `ReactNode`                              | -               |
| content          | 正文                                                     | `ReactNode`                              | -               |
| buttonsDirection | 底部按钮方向                                             | `'vertical' \| 'horizontal'`             | `'horizontal'`  |
| buttons          | 底部按钮配置，见下方 [按钮配置](#按钮配置-messagebutton) | `MessageButton[]`                        | `[]`            |
| titleClassName   | 标题类名                                                 | `string`                                 | -               |
| titleStyle       | 标题样式                                                 | `CSSProperties`                          | -               |
| contentClassName | 正文类名                                                 | `string`                                 | -               |
| contentStyle     | 正文样式                                                 | `CSSProperties`                          | -               |
| footerClassName  | 底部类名                                                 | `string`                                 | -               |
| footerStyle      | 底部样式                                                 | `CSSProperties`                          | -               |
| open             | 是否显示                                                 | `boolean`                                | -               |
| style            | 自定义样式                                               | `CSSProperties`                          | -               |
| className        | 自定义类名                                               | `string`                                 | -               |
| safeArea         | 安全区                                                   | `boolean`                                | -               |
| modalStyle       | 模态框样式                                               | `CSSProperties`                          | -               |
| modalClassName   | 模态框类名                                               | `string`                                 | -               |
| maskClosable     | 点击遮罩是否关闭                                         | `boolean`                                | `true`          |
| maskClassName    | 遮罩类名                                                 | `string`                                 | -               |
| maskStyle        | 遮罩样式                                                 | `CSSProperties`                          | -               |
| portal           | 挂载节点                                                 | `HTMLElement \| null \| false`           | `document.body` |

按钮 `onClick` 返回 `false`（或 resolve 为 `false`）时不关闭对话框；其余情况会关闭。

#### 返回值

无返回值。

## Message.close

关闭当前由 `Message.open` 打开的消息对话框。

### 何时使用

- 需要手动关闭命令式打开的消息框时

### 代码演示

见 Message.open

### API

#### 参数

无参数。

#### 返回值

无返回值。

## Message.Modal

基于 `Modal` 的消息对话框，受控通过 `open` 显示/隐藏。提供 `iconRender`、`title`、`content` 或 `buttons` 时，会自动渲染 `Message.Main`。

### 何时使用

- 需要受控显示/隐藏的消息对话框时
- 需要自定义对话框结构（图标、标题、内容、底部按钮分区）时

### 代码演示

<code src="./demos/MessageModal.tsx"></code>

### API

#### 属性

| 属性             | 说明           | 类型                                     | 默认值  |
| ---------------- | -------------- | ---------------------------------------- | ------- |
| open             | 是否显示       | `boolean`                                | `false` |
| maskClosable     | 点击遮罩关闭   | `boolean`                                | `true`  |
| safeArea         | 是否启用安全区 | `boolean`                                | -       |
| modalStyle       | 模态框样式     | `CSSProperties`                          | -       |
| modalClassName   | 模态框类名     | `string`                                 | -       |
| maskStyle        | 遮罩样式       | `CSSProperties`                          | -       |
| maskClassName    | 遮罩类名       | `string`                                 | -       |
| portal           | 挂载节点       | `HTMLElement \| null \| false`           | -       |
| onClose          | 关闭事件       | `() => void`                             | -       |
| iconSvg          | 图标 SVG 组件  | `ComponentType<SVGProps<SVGSVGElement>>` | -       |
| iconSize         | 图标尺寸       | `string`                                 | -       |
| iconColor        | 图标颜色       | `string`                                 | -       |
| iconRender       | 图标区域渲染   | `() => ReactNode`                        | -       |
| title            | 标题           | `ReactNode`                              | -       |
| content          | 正文           | `ReactNode`                              | -       |
| buttonsDirection | 底部按钮方向   | `'vertical' \| 'horizontal'`             | -       |
| buttons          | 底部按钮配置   | `MessageButton[]`                        | -       |
| titleClassName   | 标题类名       | `string`                                 | -       |
| titleStyle       | 标题样式       | `CSSProperties`                          | -       |
| contentClassName | 正文类名       | `string`                                 | -       |
| contentStyle     | 正文样式       | `CSSProperties`                          | -       |
| footerClassName  | 底部类名       | `string`                                 | -       |
| footerStyle      | 底部样式       | `CSSProperties`                          | -       |

#### Ref

同 [Modal](/components/modal) 组件 Ref（`maskElement`、`getMaskElement`、`modalElement`、`getModalElement`）。

## Message.Combo

将触发区域与 `Message.Modal` 组合：点击 `children` 打开对话框，适合表单或列表中的确认入口。

### 何时使用

- 需要从触发区域打开消息对话框时
- 与表单或列表中的确认入口搭配时

### 代码演示

<code src="./demos/MessageCombo.tsx"></code>

### API

#### 属性

在 [Message.Modal](#messagemodal) 属性基础上，`open` 仍可用但通常由内部管理，并增加：

| 属性      | 说明                     | 类型            | 默认值 |
| --------- | ------------------------ | --------------- | ------ |
| onOpen    | 打开事件                 | `() => void`    | -      |
| open      | 受控显示                 | `boolean`       | -      |
| className | 触发区域类名             | `string`        | -      |
| style     | 触发区域样式             | `CSSProperties` | -      |
| children  | 触发区域内容（点击打开） | `ReactNode`     | -      |

其余对话框相关属性（`title`、`content`、`buttons`、`maskClosable` 等）与 `Message.Modal` 一致。

#### Ref

| 属性    | 说明           | 类型                     |
| ------- | -------------- | ------------------------ |
| element | 触发区域根元素 | `HTMLDivElement \| null` |
| open    | 打开对话框     | `() => void`             |
| close   | 关闭对话框     | `() => void`             |

另包含 `Message.Modal` 对应 Ref 上的遮罩/模态框方法。

## Message.Main

消息对话框主体，内部组合图标、标题、正文与底部按钮区，通过 props 配置即可，无需单独拼装子组件。

### 何时使用

- 需要自定义消息对话框主体结构时

### 代码演示

<code src="./demos/MessageMain.tsx"></code>

### API

#### 属性

| 属性             | 说明          | 类型                                     | 默认值         |
| ---------------- | ------------- | ---------------------------------------- | -------------- |
| iconSvg          | 图标 SVG 组件 | `ComponentType<SVGProps<SVGSVGElement>>` | -              |
| iconSize         | 图标尺寸      | `string`                                 | -              |
| iconColor        | 图标颜色      | `string`                                 | -              |
| iconRender       | 图标区域渲染  | `() => ReactNode`                        | -              |
| title            | 标题          | `ReactNode`                              | -              |
| content          | 正文          | `ReactNode`                              | -              |
| buttonsDirection | 底部按钮方向  | `'vertical' \| 'horizontal'`             | `'horizontal'` |
| buttons          | 底部按钮配置  | `MessageButton[]`                        | -              |
| titleClassName   | 标题类名      | `string`                                 | -              |
| titleStyle       | 标题样式      | `CSSProperties`                          | -              |
| contentClassName | 正文类名      | `string`                                 | -              |
| contentStyle     | 正文样式      | `CSSProperties`                          | -              |
| footerClassName  | 底部类名      | `string`                                 | -              |
| footerStyle      | 底部样式      | `CSSProperties`                          | -              |
| className        | 根节点类名    | `string`                                 | -              |
| style            | 根节点样式    | `CSSProperties`                          | -              |

#### Ref

| 属性    | 说明   | 类型                  |
| ------- | ------ | --------------------- |
| element | 根元素 | `HTMLElement \| null` |

### 按钮配置 MessageButton

用于 `Message.open`、`Message.Modal`、`Message.Combo`、`Message.Main` 的 `buttons` 数组项：

| 属性      | 说明                              | 类型                                                                                                                  | 默认值    |
| --------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------- |
| id        | 按钮标识                          | `string`                                                                                                              | -         |
| name      | 按钮文案                          | `string`                                                                                                              | -         |
| variant   | 按钮外观变体                      | `'solid' \| 'text' \| 'outlined' \| 'filled' \| 'dashed'`                                                             | `text`    |
| color     | 按钮语义色                        | `'default' \| 'secondary' \| 'tertiary' \| 'quaternary' \| 'primary' \| 'info' \| 'warning' \| 'danger' \| 'success'` | `default` |
| size      | 按钮尺寸                          | `'xs' \| 's' \| 'm' \| 'l' \| 'xl' \| 'xxl' \| string \| number`                                                      | `xl`      |
| disabled  | 是否禁用                          | `boolean`                                                                                                             | -         |
| className | 按钮类名                          | `string`                                                                                                              | -         |
| style     | 按钮样式                          | `CSSProperties`                                                                                                       | -         |
| onClick   | 点击；返回 `false` 时不关闭对话框 | `(e: MouseEvent<HTMLDivElement>) => boolean \| void \| Promise<boolean \| void>`                                      | -         |
