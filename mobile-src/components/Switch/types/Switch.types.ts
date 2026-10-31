import type { CSSProperties, ReactNode } from 'react'

import type { SwitchSize } from './Switch.Size.types'

export type { SwitchSize } from './Switch.Size.types'

export interface SwitchProps {
  // Value & Display Value
  id?: string
  checked?: boolean
  // Status
  readOnly?: boolean
  disabled?: boolean
  // Style
  size?: SwitchSize
  style?: CSSProperties
  className?: string
  // Elements
  on?: ReactNode
  off?: ReactNode
  // Events
  onChange?: (checked: boolean) => void
}

export interface SwitchRef {
  element: HTMLDivElement | null
}
