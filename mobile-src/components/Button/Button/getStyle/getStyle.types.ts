import type { CSSProperties } from 'react'

import type { ButtonColor } from '../../types/Button.Color.types'
import type { ButtonSize } from '../../types/Button.Size.types'
import type { ButtonVariant } from '../../types/Button.Variant.types'

// 内库使用-start
import type { FontSize, Radius } from './../../../../utils/VariablesUtil/types'
// 内库使用-end

/* 测试使用-start
import type { FontSize, Radius } from 'lyrixi-mobile'
测试使用-end */

export interface ButtonGetStyleParams {
  direction?: string
  block?: boolean
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize | string | number
  square?: boolean
  fontSize?: FontSize | string | number
  radius?: Radius | string | number
  style?: CSSProperties
  className?: string
}
