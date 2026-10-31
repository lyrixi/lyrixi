import type { MediaChooseProps } from '../../Choose/Media.Choose.types'
import type { MediaSourceType, MediaType } from '../../types/Media.types'

export interface MediaPreviewChooseProps {
  // Value & Display Value
  id?: string
  mediaType?: MediaType | MediaType[]
  sourceType: MediaSourceType[]
  // Events
  onBeforeChoose?: MediaChooseProps['onBeforeChoose']
  onChoose?: MediaChooseProps['onChoose']
  onFileChange?: MediaChooseProps['onFileChange']
}
