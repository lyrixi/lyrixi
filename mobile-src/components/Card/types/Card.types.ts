import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

// 内库使用-start
import type { Radius } from './../../../utils/VariablesUtil/types'
// 内库使用-end

/* 测试使用-start
import type { Radius } from 'lyrixi-mobile'
测试使用-end */

export interface CardProps {
  // Value & Display Value
  id?: string
  radius?: Radius | string | number
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  children?: ReactNode
  // Events
  onClick?: MouseEventHandler<HTMLDivElement>
}

export interface CardRef {
  element: HTMLDivElement | null
}
