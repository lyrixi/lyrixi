import type {
  CSSProperties,
  ComponentType,
  MouseEventHandler,
  SVGProps,
  TouchEventHandler
} from 'react'

import type { IconVariant } from './Icon.Variant.types'

// 内库使用-start
import type { FontColor, IconSize, Radius } from './../../../utils/VariablesUtil/types'
// 内库使用-end

/* 测试使用-start
import type { FontColor, IconSize, Radius } from 'lyrixi-mobile'
测试使用-end */

export interface IconProps {
  // Value & Display Value
  id?: string
  svg?: ComponentType<SVGProps<SVGSVGElement>>
  src?: string
  variant?: IconVariant
  color?: FontColor | string
  size?: IconSize | string | number
  radius?: Radius | string
  // Status
  disabled?: boolean
  // Style
  style?: CSSProperties
  className?: string
  // Events
  onClick?: MouseEventHandler<HTMLElement>
  onTouchStart?: TouchEventHandler<HTMLElement>
}

export interface IconRef {
  element: HTMLElement | null
}

export interface IconClassStyle {
  variant?: IconVariant
  color?: FontColor | string
  size?: IconSize | string | number
  radius?: Radius | string
  style?: CSSProperties
  className?: string
}
