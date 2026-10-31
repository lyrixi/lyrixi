import type { CSSProperties, ReactNode } from 'react'

// 内库使用-start
import type { FontColor } from './../../../utils/VariablesUtil/types'
// 内库使用-end

/* 测试使用-start
import type { FontColor } from 'lyrixi-mobile'
测试使用-end */

export interface StampProps {
  // Value & Display Value
  id?: string
  shape?: string
  color?: FontColor | string
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  children?: ReactNode
}

export interface StampRef {
  element: HTMLDivElement | null
}

export interface StampStyleInput {
  color?: FontColor | string
  style?: CSSProperties
}
