import type { CSSProperties, ReactNode } from 'react'

export interface VideoPlayerProps {
  // Value & Display Value
  id?: string
  src?: string
  autoPlay?: boolean
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  portal?: Element
  poster?: string
  children?: ReactNode
  headerRender?: () => ReactNode
  // Events
  onError?: (err: { status: string; message: string; error: unknown }) => void
}

export interface VideoPlayerRef {
  element: HTMLDivElement | null
  pause: () => void
  play: () => void
}
