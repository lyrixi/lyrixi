import type { ReactNode } from 'react'

// 内库使用-start
import type { BridgeUploadFileParams } from '../../../utils/Bridge/types'
import type { AttachProps } from './../../Attach/types'
import type { FileItem } from './../../../utils/Bridge/types'
import type { ModalProps } from '../../Modal/types'
// 内库使用-end

export interface UploadFormatContext {
  platform: string
  uploadItem: FileItem
  result?: unknown
}

export type GetUploadUrlFn = (options: UploadFormatContext) => string | Promise<string>
export type FormatHeadersFn = (
  headers: Record<string, string>,
  ctx: { platform: string }
) => Record<string, string> | Promise<Record<string, string>>
export type FormatPayloadFn = (payload: unknown, options: { platform: string }) => unknown
export type FormatResponseFn = (response: unknown, options: { platform: string }) => unknown

export interface AttachUploaderProps {
  // Value & Display Value

  list?: FileItem[]
  maxCount?: number
  maxChooseCount?: number
  /** 与 sourceType 二选一，简写为文件大类如 image、具体后缀如 jpg */
  extension?: string[]
  sourceType?: string | string[]
  maxSize?: number
  async?: boolean
  reUpload?: boolean
  allowClear?: boolean
  allowChoose?: boolean
  className?: string
  uploadPlacement?: 'start' | 'end'
  uploadRender?: (options: { uploadingType: string }) => ReactNode
  uploadingRender?: (options: { uploadingType: string }) => ReactNode
  itemRender?: (item: FileItem, options: { index: number }) => ReactNode
  previewPortal?: ModalProps['portal']
  previewServerUrl?: string
  previewServerSourceType?: string | string[]
  getUploadUrl?: BridgeUploadFileParams['getUploadUrl']
  formatHeaders?: BridgeUploadFileParams['formatHeaders']
  formatPayload?: BridgeUploadFileParams['formatPayload']
  formatResponse?: BridgeUploadFileParams['formatResponse']
  onBeforeChoose?: () => boolean | void | Promise<boolean | void>
  onFileChange?: AttachProps['onFileChange']
  onUpload?: (item: FileItem) => unknown
  onChange?: (list: FileItem[], options?: { action?: string }) => void
  onPreview?: (item: FileItem, options: { index: number }) => unknown
}
