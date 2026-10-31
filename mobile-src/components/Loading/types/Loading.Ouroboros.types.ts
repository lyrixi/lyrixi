import type { CSSProperties } from 'react'

import type { LoadingIconSize } from './Loading.Size.types'

// 内库使用-start
import type { FontColor } from './../../../utils/VariablesUtil/types'
// 内库使用-end

/* 测试使用-start
import type { FontColor } from 'lyrixi-mobile'
测试使用-end */

export interface LoadingOuroborosProps {
  // Value & Display Value
  id?: string
  color?: FontColor | string
  size?: LoadingIconSize | string | number
  // Style
  style?: CSSProperties
  className?: string
}

export interface LoadingOuroborosRef {
  element: HTMLDivElement | null
}
