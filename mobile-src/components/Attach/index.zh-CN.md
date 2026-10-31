---
group:
  title: 数据展示
  order: 5
order: 1
title: Attach
toc: content
---

# Attach

附件组件，用于显示和管理附件文件。
## Attach

### 何时使用

- 需要显示附件文件时
- 需要上传附件文件时
- 需要预览附件文件时

### 代码演示

<code src="./demos/Attach.tsx"></code>

### API

#### 属性

| 属性                    | 说明               | 类型                                                                                             | 默认值  |
| ----------------------- | ------------------ | ------------------------------------------------------------------------------------------------ | ------- |
| list                    | 附件列表           | `FileItem[]`                                                                                     | `[]`    |
| maxCount                | 最大数量           | `number`                                                                                         | -       |
| sourceType              | 来源类型           | `string \| string[]`                                                                             | -       |
| disabled                | 是否禁用           | `boolean`                                                                                        | -       |
| allowChoose             | 允许选择           | `boolean`                                                                                        | `false` |
| allowClear              | 允许清除           | `boolean`                                                                                        | `false` |
| async                   | 是否异步上传       | `boolean`                                                                                        | `false` |
| reUpload                | 支持重新上传       | `boolean`                                                                                        | `true`  |
| maxSize                 | 最大文件大小       | `number`                                                                                         | -       |
| style                   | 自定义样式         | `CSSProperties`                                                                                  | -       |
| className               | 自定义类名         | `string`                                                                                         | -       |
| uploadPlacement          | 上传位置           | `'start' \| 'end'`                                                                               | `'end'` |
| uploadRender            | 上传按钮渲染       | `(ctx: { uploadingType: string }) => ReactNode`                                                  | -       |
| uploadingRender         | 上传中渲染         | `(ctx: { uploadingType: string }) => ReactNode`                                                  | -       |
| itemRender              | 项渲染             | `(item: FileItem, index: number) => ReactNode`                                                   | -       |
| previewPortal           | 预览挂载节点       | `boolean \| Element \| null`                                                                     | -       |
| previewServerUrl        | 预览服务器地址     | `string`                                                                                         | -       |
| previewServerSourceType | 预览服务器来源类型 | `string \| string[]`                                                                             | -       |
| onBeforeChoose          | 选择前事件         | `(e: SyntheticEvent) => boolean \| void \| Promise<boolean \| void>`                              | -       |
| onChoose                | 选择事件           | `(e?: SyntheticEvent) => unknown`                                                                | -       |
| onFileChange            | 文件变化事件       | `(fileItems: FileItem[]) => FileItem[] \| Promise<FileItem[] \| unknown>`                                       | -       |
| onUpload                | 上传事件           | `(item: FileItem) => unknown`                                                                    | -       |
| onChange                | 变化事件           | `(list: FileItem[], options?: { action?: string }) => void`                                         | -       |
| onPreview               | 预览事件           | `(item: FileItem, index: number) => unknown`                                                     | -       |

#### Ref

| 属性         | 说明       | 类型                                                       |
| ------------ | ---------- | ---------------------------------------------------------- |
| element      | 根元素     | `HTMLDivElement \| null`                                   |
| updateStatus | 更新状态   | `() => void`                                               |
| chooseFile   | 选择文件   | `(e: SyntheticEvent) => Promise<unknown>`                  |
| choose       | 选择       | `(e: SyntheticEvent) => Promise<unknown>`                  |
| uploadList   | 上传列表   | `(newList?: FileItem[] \| null, options?: { action?: string }) => Promise<FileItem[]>` |
| showLoading  | 显示加载   | `(options?: { content?: string; index?: number }) => void` |
| hideLoading  | 隐藏加载   | `(options?: { failIndexes?: number[] }) => void`           |

## Attach.List

附件列表组件。

### 何时使用

- 需要显示附件列表时

### 代码演示

<code src="./demos/AttachList.tsx"></code>

### API

#### 属性

| 属性            | 说明         | 类型                                              | 默认值 |
| --------------- | ------------ | ------------------------------------------------- | ------ |
| list            | 附件列表     | `AttachFileItem[]`                                | -      |
| allowClear      | 允许清除     | `boolean \| ((item: unknown) => boolean)`         | -      |
| uploadingRender | 上传中渲染   | `(ctx: {uploadingType: string}) => ReactNode`     | -      |
| itemRender      | 项渲染       | `(item: AttachFileItem, index: number) => ReactNode` | -   |
| onChange        | 变化事件     | `(list: AttachFileItem[], meta: {action: string}) => void` | - |
| onReUpload      | 重新上传事件 | `(item: AttachFileItem, index: number) => void`   | -      |
| onPreview       | 预览事件     | `(item: AttachFileItem, index: number) => unknown` | -     |

## Attach.Button

附件按钮组件。

### 何时使用

- 需要显示附件上传按钮时

### 代码演示

<code src="./demos/AttachButton.tsx"></code>

### API

#### 属性

| 属性            | 说明         | 类型                                          | 默认值 |
| --------------- | ------------ | --------------------------------------------- | ------ |
| disabled        | 是否禁用     | `boolean`                                     | -      |
| style           | 自定义样式   | `CSSProperties`                               | -      |
| className       | 自定义类名   | `string`                                      | -      |
| uploadingRender | 上传中渲染   | `(ctx: {uploadingType: string}) => ReactNode` | -      |

#### Ref

| 属性       | 说明       | 类型                          |
| ---------- | ---------- | ----------------------------- |
| element    | 根元素     | `HTMLDivElement \| null`      |
## Attach.Uploading

附件上传中组件。

### 何时使用

- 需要显示附件上传中状态时

### 代码演示

<code src="./demos/AttachUploading.tsx"></code>

### API

#### 属性

| 属性            | 说明         | 类型                                          | 默认值 |
| --------------- | ------------ | --------------------------------------------- | ------ |
| uploadingType   | 上传状态类型 | `string`                                      | -      |
| className       | 自定义类名   | `string`                                      | -      |
| uploadingRender | 上传中渲染   | `(ctx: {uploadingType: string}) => ReactNode` | -      |

