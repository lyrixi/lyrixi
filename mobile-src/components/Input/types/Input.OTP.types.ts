import type { CSSProperties } from 'react'

import type { InputSize } from './Input.Size.types'

export interface InputOTPRef {
  element: HTMLDivElement | null
  focus: (itemIndex?: number) => void
  blur: () => void
}

/**
 * OTP：与 Node 系控件一致的展示类字段（className / style / disabled / readOnly），
 * 受控值为 `string[]`（每位一段 string）。
 */
export interface InputOTPProps {
  type?: string
  // Value & Display Value
  id?: string
  value?: string[]
  maxLength?: number
  // Events
  onChange?: (value: string[]) => void
  onComplete?: (value: string[]) => void
  // Style
  className?: string
  style?: CSSProperties
  size?: InputSize
  // Status
  disabled?: boolean
  readOnly?: boolean
}
