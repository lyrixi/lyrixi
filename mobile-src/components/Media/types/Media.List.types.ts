import type { ReactNode } from 'react'

import type { MediaEllipsisStyle, MediaItemStyle } from './Media.types'
import type { MediaUploadingProps } from '../Uploading/Media.Uploading.types'

// 内库使用-start
import type { FileItem } from './../../../utils/Bridge/types'
// 内库使用-end

export interface MediaListMainProps {
  // Value & Display Value
  id?: string
  list: FileItem[]
  ellipsis?: { maxCount?: number }
  // Style
  itemStyle?: MediaItemStyle
  ellipsisStyle?: MediaEllipsisStyle
  // Status
  allowClear?: boolean | ((item: FileItem) => boolean)
  // Elements
  uploadingRender?: MediaUploadingProps['uploadingRender']
  itemRender?: (item: FileItem) => ReactNode
  // Events
  onChange?: (list: FileItem[], options: { action: string }) => void
  onReUpload?: (item: FileItem, options: { index: number }) => void
  onPreview?: (item: FileItem, options: { index: number }) => void
}
