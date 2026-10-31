import type { CSSProperties, ReactNode } from 'react'

export type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
export type FlexAlign = 'start' | 'center' | 'end'
export type FlexDirection = 'horizontal' | 'vertical'

export interface FlexProps {
  // Value & Display Value
  id?: string
  gap?: number
  justify?: FlexJustify
  align?: FlexAlign
  direction?: FlexDirection
  wrap?: boolean | 'scroll'
  flex?: CSSProperties['flex']
  block?: boolean
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  children?: ReactNode
}

export interface FlexRef {
  element: HTMLDivElement | null
}
