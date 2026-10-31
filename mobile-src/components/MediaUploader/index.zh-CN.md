---
group:
  title: 数据展示
  order: 5
order: 1
title: MediaUploader
toc: content
---

# MediaUploader

媒体上传器组件，用于上传图片、视频等媒体文件。

## 何时使用

- 需要上传图片、视频时
- 需要管理媒体上传状态时
- 需要显示媒体上传进度时

## 代码演示

<code src="./demos/general/index.tsx"></code>

## API

### 属性

| 属性                   | 说明           | 类型                                                                                                                              | 默认值                |
| ---------------------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| mediaType              | 媒体类型       | `('image' \| 'video' \| 'mix') \| ('image' \| 'video' \| 'mix')[]`                                                                | `['image']`           |
| list                   | 媒体列表       | `Array<{fileThumbnail: string, fileUrl: string, filePath: string, status: 'choose' \| 'uploading' \| 'error' \| 'success'}>`      | `[]`                  |
| maxCount               | 最大数量       | `number`                                                                                                                          | -                     |
| maxChooseCount         | 最大选择数量   | `number`                                                                                                                          | -                     |
| platform               | 强制上传平台   | `string`                                                                                                                          | -                     |
| ellipsis               | 省略配置       | `boolean`                                                                                                                         | -                     |
| sourceType             | 来源类型       | `('album' \| 'camera')[]`                                                                                                         | `['album', 'camera']` |
| sizeType               | 尺寸类型       | `('original' \| 'compressed')[]`                                                                                                  | `['compressed']`      |
| maxDuration            | 视频最大时长   | `number`                                                                                                                          | -                     |
| isSaveToAlbum          | 是否保存到本地 | `number`                                                                                                                          | `0`                   |
| compressConfig         | 图片压缩配置   | `{maxWidth: number, quality: number}`                                                                                             | -                     |
| async                  | 是否异步上传   | `boolean`                                                                                                                         | `false`               |
| verifyImage            | 校验图片       | `boolean`                                                                                                                         | `true`                |
| reUpload               | 支持重新上传   | `boolean`                                                                                                                         | `true`                |
| allowClear             | 允许清除       | `boolean`                                                                                                                         | `false`               |
| allowChoose            | 允许选择       | `boolean`                                                                                                                         | `false`               |
| previewAllowChoose     | 预览允许选择   | `boolean`                                                                                                                         | -                     |
| previewAllowClear      | 预览允许清除   | `boolean`                                                                                                                         | -                     |
| compatible             | 兼容模式       | `boolean \| string`                                                                                                               | `true`                |
| timeout                | 超时时间       | `number`                                                                                                                          | -                     |
| style                  | 自定义样式     | `CSSProperties`                                                                                                                   | -                     |
| className              | 自定义类名     | `string`                                                                                                                          | -                     |
| uploadPlacement        | 上传位置       | `'start' \| 'end'`                                                                                                                | -                     |
| navBarStyle            | 导航栏样式     | `CSSProperties`                                                                                                                   | -                     |
| navBarClassName        | 导航栏类名     | `string`                                                                                                                          | -                     |
| previewSafeArea        | 预览安全区     | `boolean`                                                                                                                         | -                     |
| previewNavBarStyle     | 预览导航栏样式 | `CSSProperties`                                                                                                                   | -                     |
| previewNavBarClassName | 预览导航栏类名 | `string`                                                                                                                          | -                     |
| previewModalStyle      | 预览模态框样式 | `CSSProperties`                                                                                                                   | -                     |
| previewModalClassName  | 预览模态框类名 | `string`                                                                                                                          | -                     |
| previewMaskStyle       | 预览遮罩样式   | `CSSProperties`                                                                                                                   | -                     |
| previewMaskClassName   | 预览遮罩类名   | `string`                                                                                                                          | -                     |
| uploadRender           | 上传按钮渲染   | `ReactNode`                                                                                                                       | -                     |
| uploadingRender        | 上传中渲染     | `ReactNode`                                                                                                                       | -                     |
| itemRender             | 项渲染         | `ReactNode`                                                                                                                       | -                     |
| previewPortal          | 预览挂载节点   | `HTMLElement`                                                                                                                     | -                     |
| previewCancelPlacement | 预览取消位置   | `string`                                                                                                                          | -                     |
| chooseExtraParams      | 选择额外参数   | `Record<string, unknown>`                                                                                                         | -                     |
| getItemExtra           | 获取项额外数据 | `(params: { platform: string }) => Promise<Record<string, unknown> \| false \| null> \| Record<string, unknown> \| false \| null` | -                     |
| getUploadUrl           | 获取上传地址   | `(ctx: { platform: string }) => Record<string, unknown> \| undefined`                                                             | -                     |
| formatChoose           | 格式化选择     | `(params: Record<string, unknown>, extra: { platform: string }) => Promise<Record<string, unknown>> \| Record<string, unknown>`   | -                     |
| formatHeaders          | 格式化请求头   | `(h: Record<string, unknown>, ctx: { platform: string }) => Record<string, unknown> \| Promise<Record<string, unknown>>`          | -                     |
| formatPayload          | 格式化请求体   | `(p: Record<string, unknown>, ctx: { platform: string }) => Record<string, unknown> \| Promise<Record<string, unknown>>`          | -                     |
| formatResponse         | 格式化响应     | `(r: unknown, ctx: { platform: string }) => MediaUploaderUploadResponse \| Promise<MediaUploaderUploadResponse>`                  | -                     |
| onBeforeChoose         | 选择前事件     | `() => Promise<boolean \| null \| undefined> \| boolean \| null \| undefined`                                                     | -                     |
| onUpload               | 上传事件       | `(item: FileItem) => Promise<FileItem>`                                                                                           | -                     |
| onChange               | 变化事件       | `(list: FileItem[]) => void`                                                                                                      | -                     |
| onPreview              | 预览事件       | `(item: FileItem, index: number) => Promise<unknown>`                                                                             | -                     |
| onNavigateTo           | 导航事件       | `(params: Record<string, unknown>) => Promise<boolean \| void>`                                                                   | -                     |

### Ref

| 属性         | 说明     | 类型                                       |
| ------------ | -------- | ------------------------------------------ |
| element      | 根元素   | `HTMLElement \| null`                      |
| updateStatus | 更新状态 | `() => void`                               |
| chooseFile   | 选择文件 | `(...args: unknown[]) => Promise<unknown>` |
| choose       | 选择     | `(...args: unknown[]) => Promise<unknown>` |
| uploadList   | 上传列表 | `() => unknown`                            |
| showLoading  | 显示加载 | `(options?: unknown) => void`              |
| hideLoading  | 隐藏加载 | `(options?: unknown) => void`              |
