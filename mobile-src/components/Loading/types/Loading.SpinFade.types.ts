import type { CSSProperties } from 'react'

import type { LoadingIconSize } from './Loading.Size.types'

export interface LoadingSpinFadeProps {
  // Value & Display Value
  id?: string
  color?: string
  size?: LoadingIconSize | string | number
  // Style
  style?: CSSProperties
  className?: string
}

export interface LoadingSpinFadeRef {
  element: HTMLDivElement | null
}
