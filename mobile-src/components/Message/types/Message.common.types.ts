import type { ComponentType, CSSProperties, MouseEvent, ReactNode, SVGProps } from 'react'

// 内库使用-start
import type { IconProps } from './../../Icon/types'
import type { ButtonProps } from './../../Button/types'
// 内库使用-end

/* 测试使用-start
import type { IconProps } from 'lyrixi-mobile'
测试使用-end */

export interface MessageButton {
  id?: string
  name?: string
  variant?: ButtonProps['variant']
  color?: ButtonProps['color']
  size?: ButtonProps['size']
  disabled?: boolean
  style?: CSSProperties
  className?: string
  onClick?: (e: MouseEvent<HTMLDivElement>) => boolean | void | Promise<boolean | void>
}

// Modal / Main 共用的对话框主体（头、内容、底）
export interface MessageBodyProps {
  // Value & Display Value
  content?: ReactNode
  buttonsDirection?: 'vertical' | 'horizontal'
  buttons?: MessageButton[]
  // Style
  titleClassName?: string
  titleStyle?: CSSProperties
  contentClassName?: string
  contentStyle?: CSSProperties
  footerClassName?: string
  footerStyle?: CSSProperties
  // Elements
  iconSvg?: ComponentType<SVGProps<SVGSVGElement>>
  iconSize?: IconProps['size']
  iconColor?: IconProps['color']
  iconRender?: () => ReactNode
  title?: ReactNode
}
