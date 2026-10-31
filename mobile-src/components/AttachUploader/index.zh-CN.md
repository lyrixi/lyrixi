---
group:
  title: 数据展示
  order: 5
order: 1
title: AttachUploader
toc: content
---

# AttachUploader

附件上传器组件，用于上传附件文件。

## 何时使用

- 需要上传附件文件时
- 需要管理附件上传状态时
- 需要显示附件上传进度时

## 代码演示

<code src="./demos/index.tsx"></code>

## API

### 属性

| 属性                    | 说明               | 类型                                                                                                                        | 默认值  |
| ----------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------- | ------- |
| list                    | 附件列表           | `FileItem[]`                                                                                                                | `[]`    |
| maxCount                | 最大数量           | `number`                                                                                                                    | -       |
| maxChooseCount          | 最大选择数量       | `number`                                                                                                                    | -       |
| sourceType              | 来源类型           | `string \| string[]`                                                                                                        | -       |
| extension               | 允许文件扩展名     | `string[]`                                                                                                                  | -       |
| maxSize                 | 最大文件大小       | `number`                                                                                                                    | -       |
| async                   | 是否异步上传       | `boolean`                                                                                                                   | `false` |
| reUpload                | 支持重新上传       | `boolean`                                                                                                                   | `true`  |
| allowClear              | 允许清除           | `boolean`                                                                                                                   | `true`  |
| allowChoose             | 允许选择           | `boolean`                                                                                                                   | `true`  |
| className               | 自定义类名         | `string`                                                                                                                    | -       |
| uploadPlacement          | 上传位置           | `'start' \| 'end'`                                                                                                          | -       |
| uploadRender            | 上传按钮渲染       | `(ctx: { uploadingType: string }) => ReactNode`                                                                             | -       |
| uploadingRender         | 上传中渲染         | `(ctx: { uploadingType: string }) => ReactNode`                                                                             | -       |
| itemRender              | 项渲染             | `(item: FileItem, index: number) => ReactNode`                                                                              | -       |
| previewPortal           | 预览挂载节点       | `boolean \| Element \| null`                                                                                                | -       |
| previewServerUrl        | 预览服务器地址     | `string`                                                                                                                    | -       |
| previewServerSourceType | 预览服务器来源类型 | `string \| string[]`                                                                                                        | -       |
| getUploadUrl            | 获取上传地址       | `(ctx: UploadFormatContext) => string \| Promise<string>`                                                                   | -       |
| formatHeaders           | 格式化请求头       | `(headers: Record<string, string>, ctx: { platform: string }) => Record<string, string> \| Promise<Record<string, string>>` | -       |
| formatPayload           | 格式化请求体       | `(payload: unknown, ctx: { platform: string }) => unknown`                                                                  | -       |
| formatResponse          | 格式化响应         | `(response: unknown, ctx: { platform: string }) => unknown`                                                                 | -       |
| onBeforeChoose          | 选择前事件         | `() => boolean \| void \| Promise<boolean \| void>`                                                                         | -       |
| onFileChange            | 文件变化事件       | `(fileItems: FileItem[]) => FileItem[] \| Promise<FileItem[] \| unknown>`                                                            | -       |
| onUpload                | 上传事件           | `(item: FileItem) => unknown`                                                                                               | -       |
| onChange                | 变化事件           | `(list: FileItem[], options?: { action?: string }) => void`                                                                    | -       |
| onPreview               | 预览事件           | `(item: FileItem, index: number) => unknown`                                                                                | -       |

### Ref

| 属性       | 说明       | 类型                           |
| ---------- | ---------- | ------------------------------ |
| element    | 根元素     | `HTMLDivElement \| null`       |
