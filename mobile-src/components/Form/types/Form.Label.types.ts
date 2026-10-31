import type { CSSProperties, ReactNode } from 'react'

export interface FormLabelProps {
  span?: number | 'auto'
  style?: CSSProperties
  className?: string
  children?: ReactNode
}
