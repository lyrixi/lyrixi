import type { CSSProperties } from 'react'

import type { IconClassStyle } from './types'
import type { IconVariant } from './types/Icon.Variant.types'

// 内库使用-start
import VariablesUtil from './../../utils/VariablesUtil'
import DOMUtil from './../../utils/DOMUtil'
import type { ButtonColor } from './../Button/types'
import getVariantClassName from './../Button/Button/getStyle/getVariantClassName'
// 内库使用-end

/* 测试使用-start
import { VariablesUtil, DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const BUTTON_COLORS: ButtonColor[] = [
  'default',
  'secondary',
  'tertiary',
  'quaternary',
  'primary',
  'info',
  'warning',
  'danger',
  'success'
]

function isButtonColor(color?: string): color is ButtonColor {
  return !!color && (BUTTON_COLORS as string[]).includes(color)
}

function getStyle({ variant = 'text', color, size, radius, style, className }: IconClassStyle): {
  style: CSSProperties
  className: string
} {
  const sizeClass = typeof size === 'string' ? VariablesUtil.getIconSizeClass(size) : ''
  const radiusClass = typeof radius === 'string' ? VariablesUtil.getRadiusClass(radius) : ''

  let variantClassName = ''
  let colorClass = ''

  if (variant !== 'text' || isButtonColor(color)) {
    variantClassName = getVariantClassName(
      variant as IconVariant,
      (isButtonColor(color) ? color : 'default') as ButtonColor
    )
  } else if (color) {
    colorClass = VariablesUtil.getColorClass(color)
  }

  const newStyle: CSSProperties = {
    ...(!colorClass && color && !variantClassName ? { color } : {}),
    ...(!sizeClass && size ? { width: size, height: size, fontSize: size } : {}),
    ...(!radiusClass && radius ? { borderRadius: radius } : {}),
    ...style
  }

  const newClassName = (DOMUtil.classNames as (...args: unknown[]) => string)(
    'lyrixi-icon',
    variantClassName,
    colorClass,
    sizeClass,
    radiusClass,
    className
  )

  return { style: newStyle, className: newClassName }
}

export default getStyle
