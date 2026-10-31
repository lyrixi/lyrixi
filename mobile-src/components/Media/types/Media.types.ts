import type { CSSProperties, ReactNode, Dispatch, SetStateAction, SyntheticEvent } from 'react'

// 内库使用-start
import type { AttachProps } from './../../Attach/types'
import type { BridgeChooseMediaParams, FileItem } from './../../../utils/Bridge/types'
// 内库使用-end

export type MediaSourceType = 'album' | 'camera'
export type MediaSizeType = 'original' | 'compressed'
export type MediaType = 'image' | 'video' | 'mix'

export interface MediaCompressConfig {
  maxWidth: number
  quality: number
}

export interface MediaItemStyle {
  width?: number
  height?: number
  borderRadius?: number
}

export interface MediaEllipsisStyle {
  fontSize?: number
}

export interface MediaProps {
  // Value & Display Value
  id?: string

  onBeforeChoose?: (e: React.MouseEvent) => boolean | void | Promise<boolean | void>
  onChoose?: (e?: React.MouseEvent) => void | Promise<unknown>
  onFileChange?: AttachProps['onFileChange']
  list?: FileItem[]
  maxCount?: number
  mediaType?: MediaType[]
  ellipsis?: { maxCount?: number }
  sourceType?: MediaSourceType[]
  sizeType?: MediaSizeType[]
  maxDuration?: BridgeChooseMediaParams['maxDuration']
  compressConfig?: MediaCompressConfig
  allowChoose?: boolean
  allowClear?: boolean | ((item: FileItem) => boolean)
  async?: boolean
  reUpload?: boolean
  previewAllowChoose?: boolean
  previewAllowClear?: boolean
  itemStyle?: MediaItemStyle
  chooseIconSize?: number
  ellipsisStyle?: MediaEllipsisStyle
  style?: CSSProperties
  className?: string
  uploadPlacement?: 'start' | 'end'
  previewSafeArea?: boolean
  previewNavBarStyle?: CSSProperties
  previewNavBarClassName?: string
  previewModalStyle?: CSSProperties
  previewModalClassName?: string
  previewMaskStyle?: CSSProperties
  previewMaskClassName?: string
  uploadRender?: (options: { uploadType: string }) => ReactNode
  uploadingRender?: (options: FileItem & { uploadingType: string }) => ReactNode
  itemRender?: (item: FileItem) => ReactNode
  previewPortal?: HTMLElement | null
  previewCancelPlacement?: 'left' | 'right'
  onUpload?: (item: FileItem) => void | Promise<unknown>
  onChange?: (list: FileItem[], options: { action: string }) => void | Promise<unknown>
  onPreview?: (
    item: FileItem,
    options: { index: number }
  ) =>
    | void
    | boolean
    | 'nativeMedia'
    | 'nativeFile'
    | 'browser'
    | Promise<void | boolean | 'nativeMedia' | 'nativeFile' | 'browser'>
}

export interface MediaRef {
  element: HTMLDivElement | null
  updateStatus: () => void
  chooseFile: (e?: SyntheticEvent) => Promise<unknown>
  choose: (e?: SyntheticEvent) => Promise<unknown>
  uploadList: (list?: FileItem[], options?: { action?: string }) => Promise<FileItem[] | undefined>
  showLoading: (options?: { content?: string; index?: number }) => void
  hideLoading: (options?: { failIndexes?: number[] }) => void
  setPreviewVisible: Dispatch<SetStateAction<number | null>>
}
