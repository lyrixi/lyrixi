import type { CSSProperties, ReactNode } from 'react'

export interface ListAsyncMainLoadingProps {
  // Value & Display Value
  type?: string
  loadingPortal?: HTMLElement
  // Style
  loadingModalStyle?: CSSProperties
  loadingModalClassName?: string
  loadingMaskStyle?: CSSProperties
  loadingMaskClassName?: string
  // Elements
  loadingRender?: (options: { action?: string }) => ReactNode
}

export interface ListAsyncRetryButtonProps {
  // Value & Display Value
  status?: string
  errorRetry?: boolean
  emptyRetry?: boolean
  // Events
  onClick?: () => void
}
