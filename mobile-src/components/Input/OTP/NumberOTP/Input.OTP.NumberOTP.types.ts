import type { ClipboardEventHandler } from 'react'

export interface NumberOTPRef {
  focus: (index: number) => void
  blur: () => void
}

export interface NumberOTPProps {
  // Value & Display Value
  id?: string
  values: string[]
  // Status
  disabled?: boolean
  readOnly?: boolean
  // Events
  onChange: (index: number, value: string) => void
  onPaste?: ClipboardEventHandler<HTMLDivElement>
}
