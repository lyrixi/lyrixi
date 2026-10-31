import type { CSSProperties } from 'react'

export interface CascaderDistrictMainLoadingProps {
  // Value & Display Value
  result?: unknown
  // Style
  style?: CSSProperties
  className?: string
  // Events
  onReload?: () => void
}
