import type { CSSProperties, MouseEventHandler, ReactNode } from 'react'

// 内库使用-start
import type { ButtonProps } from '../../Button/types'
// 内库使用-end

export interface NavBarButtonProps {
  // Value & Display Value
  id?: string
  direction?: string
  block?: boolean
  variant?: ButtonProps['variant']
  color?: ButtonProps['color']
  size?: ButtonProps['size']
  square?: boolean
  fontSize?: ButtonProps['fontSize']
  radius?: ButtonProps['radius']
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
