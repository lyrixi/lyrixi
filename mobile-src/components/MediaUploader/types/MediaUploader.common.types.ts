import type { CSSProperties, ReactNode } from 'react'

// 内库使用-start
import type {
  BridgeChooseMediaParams,
  BridgeUploadFileParams,
  FileItem
} from '../../../utils/Bridge/types'
import type {
  MediaCompressConfig,
  MediaSizeType,
  MediaSourceType,
  MediaType
} from '../../Media/types'
// 内库使用-end

export interface MediaUploaderUploadResponse {
  status: string
  message?: string
  data?: FileItem
  code?: string
  [key: string]: unknown
}

export interface MediaHandle {
  element?: HTMLElement | null
  choose?: (...args: unknown[]) => Promise<unknown>
  chooseFile?: (...args: unknown[]) => Promise<unknown>
  /** May return false when the environment does not support programmatic capture (e.g. browser). */
  chooseMedia?: (...args: unknown[]) => Promise<unknown> | boolean | undefined
  showLoading?: (options?: unknown) => void
  hideLoading?: (options?: unknown) => void
  uploadList?: () => unknown
  [key: string]: unknown
}

export interface MediaUploaderCommonProps extends BridgeUploadFileParams {
  // Value & Display Value

  list?: FileItem[]
  maxCount?: number
  maxChooseCount?: number
  mediaType?: MediaType | MediaType[]
  ellipsis?: boolean
  sourceType?: MediaSourceType[]
  sizeType?: MediaSizeType[]
  maxDuration?: BridgeChooseMediaParams['maxDuration']
  isSaveToAlbum?: number
  compressConfig?: MediaCompressConfig
  async?: boolean
  reUpload?: boolean
  allowClear?: boolean
  allowChoose?: boolean
  previewAllowChoose?: boolean
  previewAllowClear?: boolean
  style?: CSSProperties
  className?: string
  uploadPlacement?: string
  previewSafeArea?: boolean
  navBarStyle?: CSSProperties
  navBarClassName?: string
  previewNavBarStyle?: CSSProperties
  previewNavBarClassName?: string
  previewModalStyle?: CSSProperties
  previewModalClassName?: string
  previewMaskStyle?: CSSProperties
  previewMaskClassName?: string
  uploadRender?: ReactNode
  uploadingRender?: ReactNode
  itemRender?: ReactNode
  previewPortal?: HTMLElement
  previewCancelPlacement?: string
  getItemExtra?: (options: {
    platform: string
  }) => Promise<Record<string, unknown> | false | null> | Record<string, unknown> | false | null
  formatChoose?: (
    params: Record<string, unknown>,
    options: { platform: string }
  ) => Promise<Record<string, unknown>> | Record<string, unknown>
  onBeforeChoose?: () => Promise<boolean | null | undefined> | boolean | null | undefined
  onUpload?: (item: FileItem) => Promise<FileItem>
  onChange?: (list: FileItem[]) => void
  onPreview?: (item: FileItem, options: { index: number }) => Promise<unknown>
}
