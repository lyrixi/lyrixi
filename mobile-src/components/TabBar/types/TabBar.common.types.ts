import type { ComponentType, ReactNode, SVGProps } from 'react'

// 内库使用-start
import type { IconProps } from './../../Icon/types'
// 内库使用-end

/* 测试使用-start
import type { IconProps } from 'lyrixi-mobile'
测试使用-end */

export interface TabBarItem {
  id?: string | number
  name?: ReactNode
  description?: ReactNode
  placeholder?: ReactNode
  disabled?: boolean
  iconSvg?: ComponentType<SVGProps<SVGSVGElement>>
  iconSize?: IconProps['size']
  iconColor?: IconProps['color']
  iconRender?: (options: { checked: boolean }) => ReactNode
  contentRender?: (options: { checked: boolean }) => ReactNode
}
