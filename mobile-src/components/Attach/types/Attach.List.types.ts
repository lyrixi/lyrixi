import type { ReactNode } from 'react'

// 内库使用-start
import type { FileItem } from '../../../utils/Bridge/types'
// 内库使用-end

export interface AttachListProps {
  // Value & Display Value
  id?: string
  list?: FileItem[]
  // Status
  allowClear?: boolean | ((item: unknown) => boolean)
  // Elements
  uploadingRender?: (options: { uploadingType: string }) => ReactNode
  itemRender?: (item: FileItem, options: { index: number }) => ReactNode
  // Events
  onChange?: (list: FileItem[], options: { action: string }) => void
  onReUpload?: (item: FileItem, options: { index: number }) => void
  onPreview?: (item: FileItem, options: { index: number }) => unknown
}
