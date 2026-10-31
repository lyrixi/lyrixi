import type { CSSProperties, ReactNode } from 'react'

export interface ResultProps {
  // Value & Display Value
  id?: string
  status: string
  description?: ReactNode
  full?: boolean
  imageUrl?: string | null
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  title?: string | null | ReactNode
  imageRender?: (() => ReactNode) | null
  children?: ReactNode
}
