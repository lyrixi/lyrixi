import type { ReactNode } from 'react'

export interface AttachUploadingProps {
  // Value & Display Value
  id?: string
  uploadingType: string
  // Style
  className?: string
  // Elements
  uploadingRender?: (options: { uploadingType: string }) => ReactNode
}
