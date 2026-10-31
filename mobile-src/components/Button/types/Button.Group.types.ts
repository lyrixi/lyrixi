import type { CSSProperties, ReactNode } from 'react'

import type { ButtonItem } from './Button.common.types'
import type { ButtonProps } from './Button.types'

// 内库使用-start
import type { Radius } from './../../../utils/VariablesUtil/types'
// 内库使用-end

/* 测试使用-start
import type { Radius } from 'lyrixi-mobile'
测试使用-end */

export interface ButtonGroupRef {
  element: HTMLDivElement | null
}

export interface ButtonGroupProps {
  // Value & Display Value
  id?: string
  list?: ButtonItem[]
  separator?: ReactNode | boolean
  block?: boolean
  variant?: ButtonProps['variant']
  color?: ButtonProps['color']
  size?: ButtonProps['size']
  radius?: Radius | string
  // Style
  style?: CSSProperties
  className?: string
}
