import type { CSSProperties, ReactNode } from 'react'

export interface AttachButtonRef {
  element: HTMLDivElement | null
}

export interface AttachButtonProps {
  // Value & Display Value
  id?: string

  // Status
  disabled?: boolean
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  uploadingRender?: (options: { uploadingType: string }) => ReactNode
}
