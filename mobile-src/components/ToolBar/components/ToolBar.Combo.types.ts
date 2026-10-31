import type { CSSProperties, MouseEventHandler, ReactNode, ComponentType, SVGProps } from 'react'

// 内库使用-start
import type { ButtonProps } from '../../Button/types'
// 内库使用-end

export interface ToolBarComboProps {
  // Value & Display Value
  direction?: string
  block?: boolean
  color?: ButtonProps['color']
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  square?: boolean
  fontSize?: ButtonProps['fontSize']
  radius?: ButtonProps['radius']
  // Status
  open?: boolean | null
  // Style
  style?: CSSProperties
  className?: string
  // Elements
  arrowRender?: (options: { open: boolean | null }) => ReactNode
  arrowSvg?: ComponentType<SVGProps<SVGSVGElement>> | null
  children?: ReactNode
  // Events
  onClick?: MouseEventHandler<HTMLDivElement>
}
