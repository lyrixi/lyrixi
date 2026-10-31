import type { ChangeEvent, MouseEvent, ReactNode } from 'react'

import type { MediaItemStyle, MediaSourceType, MediaType } from '../types/Media.types'
import type { MediaUploadingProps } from '../Uploading/Media.Uploading.types'

export interface MediaChooseProps {
  // Value & Display Value
  id?: string
  mediaType?: MediaType[]
  sourceType?: MediaSourceType[]
  // Style
  style?: MediaItemStyle
  iconSize?: number
  className?: string
  // Elements
  uploadRender?: (options: { uploadType: string }) => ReactNode
  uploadingRender?: MediaUploadingProps['uploadingRender']
  // Events
  onBeforeChoose?: (e: MouseEvent) => void | boolean | Promise<void | boolean>
  onChoose?: (e?: MouseEvent) => void
  onFileChange?: (e: ChangeEvent<HTMLInputElement>) => void
}
