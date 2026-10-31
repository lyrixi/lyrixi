import type { CSSProperties } from 'react'

export type ProgressBarStyle = CSSProperties & { [key: string]: string | number | undefined }

export interface ProgressBarProps {
  // Value & Display Value
  id?: string
  percent?: number
  // Style
  className?: string
  style?: ProgressBarStyle
}

export interface ProgressBarRef {
  element: HTMLDivElement | null
}
