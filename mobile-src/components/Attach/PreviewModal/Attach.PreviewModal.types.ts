// 内库使用-start
import type { ModalProps } from '../../Modal/types/index'
// 内库使用-end

export interface AttachPreviewModalProps {
  // Value & Display Value
  fileName?: string
  previewServerUrl?: string
  fileUrl?: string
  previewServerSourceType?: string[]
  // Status
  open?: boolean
  // Elements
  portal?: ModalProps['portal']
  // Events
  onClose?: ModalProps['onClose']
}
