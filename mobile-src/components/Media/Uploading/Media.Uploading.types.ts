import type { ReactNode } from 'react'

// 内库使用-start
import type { FileItem } from '../../../utils/Bridge/types/index'
// 内库使用-end

export interface MediaUploadingProps {
  // Value & Display Value
  uploadingType: string
  item?: FileItem
  // Style
  className?: string
  // Elements
  uploadingRender?: (options: FileItem & { uploadingType: string }) => ReactNode
}
