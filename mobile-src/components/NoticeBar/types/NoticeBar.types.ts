import type { CSSProperties, ReactNode } from 'react'

// 内库使用-start
import type { IconProps } from '../../Icon/types'
// 内库使用-end

/* 测试使用-start
import type { IconProps } from 'lyrixi-mobile'
测试使用-end */

export interface NoticeBarRef {
  element: HTMLDivElement | null
  close: () => void
  open: () => void
}

export interface NoticeBarProps {
  // Value & Display Value
  id?: string
  title?: ReactNode
  description?: ReactNode
  // Status
  type?: 'success' | 'info' | 'warning' | 'error'
  closable?: boolean
  // Style
  style?: CSSProperties
  className?: string
  iconStyle?: CSSProperties
  titleStyle?: CSSProperties
  descriptionStyle?: CSSProperties
  // Elements
  iconRender?: () => ReactNode
  iconClassName?: string
  iconColor?: IconProps['color']
  iconVariant?: IconProps['variant']
  iconSize?: IconProps['size']
}
