import type { CSSProperties } from 'react'

import type { SignatureComboAddRef } from '../Combo/Add/Signature.Combo.Add.types'
import type { SignatureComboEditRef } from '../Combo/Edit/Signature.Combo.Edit.types'

export interface SignatureComboProps {
  // Value & Display Value
  id?: string
  value?: string
  // Status
  allowClear?: boolean
  // Style
  className?: string
  style?: CSSProperties
  modalClassName?: string
  modalStyle?: CSSProperties
  maskStyle?: CSSProperties
  maskClassName?: string
  // Elements
  portal?: Element
  color?: string
  backgroundColor?: string
  // Events
  onChange?: (base64: string | null) => void
  onPreview?: (src: string) => Promise<boolean | string | void>
}

export type SignatureComboRef = SignatureComboAddRef | SignatureComboEditRef
