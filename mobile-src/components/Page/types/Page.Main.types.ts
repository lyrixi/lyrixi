import type { CSSProperties, ReactNode, UIEvent } from 'react'

export interface PageMainProps {
  // Value & Display Value
  id?: string
  threshold?: number
  touchStopPropagation?: boolean
  // Status
  safeArea?: boolean
  // Style
  className?: string
  style?: CSSProperties
  // Elements
  children?: ReactNode
  // Events
  onTopRefresh?: () => undefined | Promise<boolean | string | undefined>
  onBottomRefresh?: () => void | Promise<boolean | string | undefined | void>
  onScroll?: (e: UIEvent<HTMLElement>) => void
  onScrollEnd?: (e: UIEvent<HTMLElement>) => void
}

export interface PageMainRef {
  element: HTMLElement | null
}

export interface PageMainTouchesState {
  isTop: boolean
  startY: number
  currentY: number
  diffY: number
}
