import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

import type { ButtonColor } from './Button.Color.types'
import type { ButtonSize } from './Button.Size.types'
import type { ButtonVariant } from './Button.Variant.types'

// 内库使用-start
import type { FontSize, Radius } from './../../../utils/VariablesUtil/types'
// 内库使用-end

/* 测试使用-start
import type { FontSize, Radius } from 'lyrixi-mobile'
测试使用-end */

export interface ButtonProps {
  // Value & Display Value
  id?: string
  direction?: 'horizontal' | 'vertical' | string
  block?: boolean
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize | string | number
  square?: boolean
  fontSize?: FontSize | string | number
  radius?: Radius | string | number
  // Status
  disabled?: boolean
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  children?: ReactNode
  // Events
  onClick?: MouseEventHandler<HTMLDivElement>
}

export interface ButtonRef {
  element: HTMLDivElement | null
}
