import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

// 内库使用-start
import type { FontColor, FontSize, FontWeight } from './../../../utils/VariablesUtil/types'
// 内库使用-end

/* 测试使用-start
import type { FontColor, FontSize, FontWeight } from 'lyrixi-mobile'
测试使用-end */

export interface TextEllipsisConfig {
  rows?: number
  expandable?: boolean
  defaultExpanded?: boolean
}

export interface TextProps {
  // Value & Display Value
  id?: string
  highlight?: string | string[]
  // Status
  ellipsis?: TextEllipsisConfig
  // Style
  block?: boolean
  color?: FontColor | string
  fontSize?: FontSize | string | number
  fontWeight?: FontWeight | string | number
  style?: CSSProperties
  className?: string
  // Elements
  children?: ReactNode
  // Events
  onClick?: MouseEventHandler<HTMLDivElement>
}

export interface TextRef {
  element: HTMLDivElement | null
}

export interface TextGetDisplayValueParams {
  maxCount?: number
  precision?: number
}
