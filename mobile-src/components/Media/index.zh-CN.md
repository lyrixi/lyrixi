---
group:
  title: 数据展示
  order: 5
order: 1
title: Media
toc: content
---

# Media

媒体组件，用于显示和管理图片、视频等媒体文件。

## Media

### 何时使用

- 需要显示图片、视频时
- 需要上传图片、视频时
- 需要预览图片、视频时

### 代码演示

<code src="./demos/Media.tsx"></code>

### API

#### 属性

| 属性                   | 说明           | 类型                                                                                                                                                                         | 默认值                |
| ---------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| list                   | 媒体列表       | `Array<{fileThumbnail: string, fileUrl: string, filePath: string, status: 'choose' \| 'uploading' \| 'error' \| 'success'}>`                                                 | `[]`                  |
| maxCount               | 最大数量       | `number`                                                                                                                                                                     | -                     |
| mediaType              | 媒体类型       | `('image' \| 'video' \| 'mix')[]`                                                                                                                                            | `['image']`           |
| ellipsis               | 省略配置       | `{ maxCount?: number }`                                                                                                                                                         | -                     |
| sourceType             | 来源类型       | `('album' \| 'camera')[]`                                                                                                                                                    | `['album', 'camera']` |
| sizeType               | 尺寸类型       | `('original' \| 'compressed')[]`                                                                                                                                             | `['compressed']`      |
| maxDuration            | 视频最大时长   | `number`                                                                                                                                                                     | -                     |
| compressConfig         | 图片压缩配置   | `{maxWidth: number, quality: number}`                                                                                                                                        | -                     |
| allowChoose            | 允许选择       | `boolean`                                                                                                                                                                    | `false`               |
| allowClear             | 允许清除       | `boolean \| ((item: FileItem) => boolean)`                                                                                                                                   | `false`               |
| async                  | 是否异步上传   | `boolean`                                                                                                                                                                    | `false`               |
| reUpload               | 支持重新上传   | `boolean`                                                                                                                                                                    | `true`                |
| previewAllowChoose     | 预览允许选择   | `boolean`                                                                                                                                                                    | -                     |
| previewAllowClear      | 预览允许清除   | `boolean`                                                                                                                                                                    | -                     |
| itemStyle              | 单项样式       | `{ width?: number, height?: number, borderRadius?: number }`                                                                                                                 | `85/85/10`            |
| chooseIconSize         | 选择图标大小   | `number`                                                                                                                                                                     | `22`                  |
| ellipsisStyle          | 省略样式       | `{ fontSize?: number }`                                                                                                                                                      | `16`                  |
| style                  | 自定义样式     | `CSSProperties`                                                                                                                                                              | -                     |
| className              | 自定义类名     | `string`                                                                                                                                                                     | -                     |
| uploadPlacement        | 上传位置       | `'start' \| 'end'`                                                                                                                                                           | `'end'`               |
| previewSafeArea        | 预览安全区     | `boolean`                                                                                                                                                                    | -                     |
| previewNavBarStyle     | 预览导航栏样式 | `CSSProperties`                                                                                                                                                              | -                     |
| previewNavBarClassName | 预览导航栏类名 | `string`                                                                                                                                                                     | -                     |
| previewModalStyle      | 预览模态框样式 | `CSSProperties`                                                                                                                                                              | -                     |
| previewModalClassName  | 预览模态框类名 | `string`                                                                                                                                                                     | -                     |
| previewMaskStyle       | 预览遮罩样式   | `CSSProperties`                                                                                                                                                              | -                     |
| previewMaskClassName   | 预览遮罩类名   | `string`                                                                                                                                                                     | -                     |
| uploadRender           | 上传按钮渲染   | `(ctx: { uploadType: string }) => ReactNode`                                                                                                                                 | -                     |
| uploadingRender        | 上传中渲染     | `(ctx: FileItem & { uploadingType: string }) => ReactNode`                                                                                                                   | -                     |
| itemRender             | 项渲染         | `(item: FileItem) => ReactNode`                                                                                                                                              | -                     |
| previewPortal          | 预览挂载节点   | `HTMLElement`                                                                                                                                                                | -                     |
| previewCancelPlacement | 预览取消位置   | `string`                                                                                                                                                                     | -                     |
| onBeforeChoose         | 选择前事件     | `(e: React.MouseEvent) => boolean \| void \| Promise<boolean \| void>`                                                                                                       | -                     |
| onChoose               | 选择事件       | `(e?: React.MouseEvent) => void \| Promise<unknown>`                                                                                                                         | -                     |
| onFileChange           | 文件变化事件   | `(fileItems: FileItem[]) => FileItem[] \| Promise<FileItem[] \| unknown>`                                                                                                    | -                     |
| onUpload               | 上传事件       | `(item: FileItem) => void \| Promise<unknown>`                                                                                                                               | -                     |
| onChange               | 变化事件       | `(list: FileItem[], options: { action: string }) => void \| Promise<unknown>`                                                                                                | -                     |
| onPreview              | 预览事件       | `(item: FileItem, index: number) => void \| boolean \| 'nativeMedia' \| 'nativeFile' \| 'browser' \| Promise<void \| boolean \| 'nativeMedia' \| 'nativeFile' \| 'browser'>` | -                     |

#### Ref

| 属性              | 说明         | 类型                                                                                     |
| ----------------- | ------------ | ---------------------------------------------------------------------------------------- |
| element           | 根元素       | `HTMLDivElement \| null`                                                                 |
| updateStatus      | 更新状态     | `() => void`                                                                             |
| chooseFile        | 选择文件     | `(e?: SyntheticEvent) => Promise<unknown>`                                               |
| choose            | 选择         | `(e?: SyntheticEvent) => Promise<unknown>`                                               |
| uploadList        | 上传列表     | `(newList?: FileItem[], opts?: { action?: string }) => Promise<FileItem[] \| undefined>` |
| showLoading       | 显示加载     | `(options?: { content?: string; index?: number }) => void`                               |
| hideLoading       | 隐藏加载     | `(options?: { failIndexes?: number[] }) => void`                                         |
| setPreviewVisible | 设置预览可见 | `Dispatch<SetStateAction<number \| null>>`                                               |

### Media 静态方法

| 方法               | 说明             | 类型                                                                                                                           |
| ------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| validateListStatus | 校验列表上传状态 | `(list: Array<{ status?: string }> \| null \| undefined) => true \| ReactNode`                                                 |
| isAllowClear       | 判断是否允许清除 | `(allowClear: boolean \| ((item: Record<string, unknown>) => boolean) \| undefined, item: Record<string, unknown>) => boolean` |

## Media.List

媒体列表组件。

### 何时使用

- 需要显示媒体列表时

### 代码演示

<code src="./demos/MediaList.tsx"></code>

### API

#### 属性

| 属性            | 说明         | 类型                                                       | 默认值 |
| --------------- | ------------ | ---------------------------------------------------------- | ------ |
| list            | 媒体列表     | `Array<object>`                                            | -      |
| mediaType       | 媒体类型     | `('image' \| 'video' \| 'mix')[]`                          | -      |
| ellipsis        | 省略配置     | `{ maxCount?: number }`                                       | -      |
| ellipsisStyle   | 省略样式     | `{ fontSize?: number }`                                       | `16`   |
| allowClear      | 允许清除     | `boolean \| ((item: FileItem) => boolean)`                 | -      |
| uploadingRender | 上传中渲染   | `(ctx: FileItem & { uploadingType: string }) => ReactNode` | -      |
| itemRender      | 项渲染       | `(item: FileItem) => ReactNode`                            | -      |
| onChange        | 变化事件     | `(list: FileItem[], options: { action: string }) => void`  | -      |
| onReUpload      | 重新上传事件 | `(item: object, index: number) => void`                    | -      |
| onPreview       | 预览事件     | `(item: object, index: number) => void`                    | -      |

#### Ref

| 属性    | 说明   | 类型             |
| ------- | ------ | ---------------- |
| element | 根元素 | `HTMLDivElement` |

## Media.PreviewModal

媒体预览模态框组件。

### 何时使用

- 需要预览媒体时

### 代码演示

<code src="./demos/MediaPreviewModal.tsx"></code>

### API

#### 属性

| 属性            | 说明         | 类型                                                               | 默认值 |
| --------------- | ------------ | ------------------------------------------------------------------ | ------ |
| list            | 媒体列表     | `FileItem[]`                                                       | -      |
| index           | 当前索引     | `number`                                                           | -      |
| current         | 当前页索引   | `number`                                                           | -      |
| mediaType       | 媒体类型     | `('image' \| 'video' \| 'mix') \| ('image' \| 'video' \| 'mix')[]` | -      |
| maxCount        | 最大数量     | `number`                                                           | -      |
| sourceType      | 来源类型     | `('album' \| 'camera')[]`                                          | -      |
| sizeType        | 尺寸类型     | `('original' \| 'compressed')[]`                                   | -      |
| compressConfig  | 图片压缩配置 | `{maxWidth: number, quality: number}`                              | -      |
| open            | 是否显示     | `boolean`                                                          | -      |
| allowChoose     | 允许选择     | `boolean`                                                          | -      |
| allowClear      | 允许清除     | `boolean \| ((item: FileItem) => boolean)`                         | -      |
| mainStyle       | 主区域样式   | `CSSProperties`                                                    | -      |
| mainClassName   | 主区域类名   | `string`                                                           | -      |
| safeArea        | 是否安全区   | `boolean`                                                          | -      |
| navBarStyle     | 导航栏样式   | `CSSProperties`                                                    | -      |
| navBarClassName | 导航栏类名   | `string`                                                           | -      |
| modalStyle      | 模态框样式   | `CSSProperties`                                                    | -      |
| modalClassName  | 模态框类名   | `string`                                                           | -      |
| maskStyle       | 遮罩样式     | `CSSProperties`                                                    | -      |
| maskClassName   | 遮罩类名     | `string`                                                           | -      |
| portal          | 挂载节点     | `HTMLElement`                                                      | -      |
| cancelPlacement | 取消按钮位置 | `'left' \| 'right'`                                                | -      |
| onBeforeChoose  | 选择前事件   | 同 `Media.onBeforeChoose`                                          | -      |
| onChoose        | 选择事件     | 同 `Media.onChoose`                                                | -      |
| onFileChange    | 文件变化事件 | 同 `Media.onFileChange`                                            | -      |
| onUpload        | 上传事件     | 同 `Media.onUpload`                                                | -      |
| onChange        | 变化事件     | 同 `Media.onChange`                                                | -      |
| onClose         | 关闭事件     | `() => void`                                                       | -      |

#### Ref

| 属性           | 说明           | 类型                      |
| -------------- | -------------- | ------------------------- |
| mainElement    | 预览主区域实例 | `SwiperRef \| null`       |
| getMainElement | 获取主区域实例 | `() => SwiperRef \| null` |

## Media.PreviewMain

媒体预览主组件。

### 何时使用

- 需要直接使用媒体预览主组件时

### 代码演示

<code src="./demos/MediaPreviewMain.tsx"></code>

### API

#### 属性

| 属性           | 说明         | 类型                                                               | 默认值 |
| -------------- | ------------ | ------------------------------------------------------------------ | ------ |
| list           | 媒体列表     | `FileItem[]`                                                       | -      |
| index          | 当前索引     | `number`                                                           | -      |
| mediaType      | 媒体类型     | `('image' \| 'video' \| 'mix') \| ('image' \| 'video' \| 'mix')[]` | -      |
| sourceType     | 来源类型     | `('album' \| 'camera')[]`                                          | -      |
| sizeType       | 尺寸类型     | `('original' \| 'compressed')[]`                                   | -      |
| maxCount       | 最大数量     | `number`                                                           | -      |
| compressConfig | 图片压缩配置 | `{maxWidth: number, quality: number}`                              | -      |
| open           | 是否显示     | `boolean`                                                          | -      |
| closable       | 是否可关闭   | `boolean`                                                          | -      |
| allowChoose    | 允许选择     | `boolean`                                                          | -      |
| allowClear     | 允许清除     | `boolean \| ((item: FileItem) => boolean)`                         | -      |
| async          | 是否异步上传 | `boolean`                                                          | -      |
| reUpload       | 支持重新上传 | `boolean`                                                          | -      |
| className      | 自定义类名   | `string`                                                           | -      |
| style          | 自定义样式   | `CSSProperties`                                                    | -      |
| safeArea       | 是否安全区   | `boolean`                                                          | -      |
| onBeforeChoose | 选择前事件   | 同 `Media.onBeforeChoose`                                          | -      |
| onChoose       | 选择事件     | 同 `Media.onChoose`                                                | -      |
| onFileChange   | 文件变化事件 | 同 `Media.onFileChange`                                            | -      |
| onUpload       | 上传事件     | 同 `Media.onUpload`                                                | -      |
| onChange       | 变化事件     | 同 `Media.onChange`                                                | -      |
| onClose        | 关闭事件     | `() => void`                                                       | -      |

#### Ref

| 属性           | 说明           | 类型                      |
| -------------- | -------------- | ------------------------- |
| mainElement    | 预览主区域实例 | `SwiperRef \| null`       |
| getMainElement | 获取主区域实例 | `() => SwiperRef \| null` |

## Media.Mark

媒体标记组件。

### 何时使用

- 需要在媒体上显示标记时

### 代码演示

<code src="./demos/MediaMark.tsx"></code>

### API

#### 属性

| 属性      | 说明         | 类型            | 默认值 |
| --------- | ------------ | --------------- | ------ |
| labels    | 标记文案列表 | `ReactNode[]`   | -      |
| style     | 自定义样式   | `CSSProperties` | -      |
| className | 自定义类名   | `string`        | -      |
