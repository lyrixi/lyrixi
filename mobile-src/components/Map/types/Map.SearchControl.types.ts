import type { CSSProperties } from 'react'

// 内库使用-start
import type { InputTextRef } from '../../Input/types'
// 内库使用-end

export type MapSearchControlRef = InputTextRef

export interface MapSearchControlProps {
  // Value & Display Value
  id?: string
  // Style
  style?: CSSProperties
  className?: string
  // Events
  onChange?: (item: unknown) => void
}
