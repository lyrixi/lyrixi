import type { CSSProperties } from 'react'

import type {
  MediaCompressConfig,
  MediaProps,
  MediaSizeType,
  MediaSourceType,
  MediaType
} from './Media.types'

// 内库使用-start
import type { FileItem } from './../../../utils/Bridge/types'
import type { ModalProps } from '../../Modal/types'
// 内库使用-end

export interface MediaPreviewModalProps {
  // Value & Display Value
  id?: string
  list?: FileItem[]
  index?: number
  current?: number
  mediaType?: MediaType | MediaType[]
  maxCount?: number
  sourceType?: MediaSourceType[]
  sizeType?: MediaSizeType[]
  maxDuration?: MediaProps['maxDuration']
  compressConfig?: MediaCompressConfig
  // Status
  open?: boolean
  allowChoose?: boolean
  allowClear?: boolean | ((item: FileItem) => boolean)
  // Style
  mainStyle?: CSSProperties
  mainClassName?: string
  safeArea?: boolean
  navBarStyle?: CSSProperties
  navBarClassName?: string
  modalStyle?: CSSProperties
  modalClassName?: string
  maskStyle?: CSSProperties
  maskClassName?: string
  // Elements
  portal?: ModalProps['portal']
  cancelPlacement?: 'left' | 'right'
  // Events
  onBeforeChoose?: MediaProps['onBeforeChoose']
  onChoose?: MediaProps['onChoose']
  onFileChange?: MediaProps['onFileChange']
  onUpload?: MediaProps['onUpload']
  onChange?: MediaProps['onChange']
  onClose?: () => void
}
