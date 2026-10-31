import type { ReactNode } from 'react'

export interface ActionSheetCancelProps {
  // Value & Display Value
  id?: string

  // Elements
  cancel?: ReactNode
  cancelVisible?: boolean
  // Events
  onCancel?: () => void
  onClose?: () => void
}
