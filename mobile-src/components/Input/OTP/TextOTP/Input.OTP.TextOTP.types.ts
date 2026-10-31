import type { ClipboardEventHandler } from 'react'

export interface TextOTPRef {
  focus: (index: number) => void
  blur: () => void
}

export interface TextOTPProps {
  // Value & Display Value
  id?: string
  values: string[]
  // Status
  disabled?: boolean
  readOnly?: boolean
  // Events
  onChange: (index: number, value: string) => void
  onPaste?: ClipboardEventHandler<HTMLInputElement>
}
