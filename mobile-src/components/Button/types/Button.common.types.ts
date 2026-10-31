import type { CSSProperties, MouseEventHandler } from 'react'

import type { ButtonColor } from './Button.Color.types'

export interface ButtonItem {
  id?: string
  name?: string
  color?: ButtonColor
  disabled?: boolean
  style?: CSSProperties
  className?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}
