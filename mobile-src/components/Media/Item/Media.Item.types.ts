import type { ReactNode } from 'react'

import type { MediaEllipsisStyle, MediaItemStyle } from '../types/Media.types'
import type { MediaUploadingProps } from '../Uploading/Media.Uploading.types'

// 内库使用-start
import type { FileItem } from './../../../utils/Bridge/types'
// 内库使用-end

export interface MediaItemProps {
  // Value & Display Value
  item: FileItem
  index: number
  ellipsisText?: string | null
  // Style
  style?: MediaItemStyle
  ellipsisStyle?: MediaEllipsisStyle
  // Elements
  uploadingRender?: MediaUploadingProps['uploadingRender']
  itemRender?: (item: FileItem) => ReactNode
  // Events
  onDelete?: (item: FileItem, options: { index: number }) => void
  onReUpload?: (item: FileItem, options: { index: number }) => void
  onPreview?: (item: FileItem, options: { index: number }) => void
}
