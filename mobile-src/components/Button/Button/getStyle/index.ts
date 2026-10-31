import type { CSSProperties } from 'react'

import type { ButtonGetStyleParams } from './getStyle.types'
import getVariantClassName from './getVariantClassName'
import { ButtonSizeClasses } from './../../types/Button.Size.types'
import type { ButtonVariant } from './../../types/Button.Variant.types'
import type { ButtonColor } from './../../types/Button.Color.types'

// 内库使用-start
import VariablesUtil from './../../../../utils/VariablesUtil'
import DOMUtil from './../../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { VariablesUtil, DOMUtil } from 'lyrixi-mobile'
测试使用-end */

export default function getStyle({
  direction,
  block,
  color,
  variant,
  size,
  square,
  fontSize,
  radius,
  style,
  className
}: ButtonGetStyleParams): { style: CSSProperties; className: string } {
  const sizeClass =
    typeof size === 'string' && size in ButtonSizeClasses
      ? ButtonSizeClasses[size as keyof typeof ButtonSizeClasses].className
      : ''
  const radiusClass = typeof radius === 'string' ? VariablesUtil.getRadiusClass(radius) : ''
  const fontSizeClass = typeof fontSize === 'string' ? VariablesUtil.getFontSizeClass(fontSize) : ''

  const newStyle = {
    ...(!sizeClass && size
      ? { height: size as string | number, width: square ? (size as string | number) : 'auto' }
      : {}),
    ...(!radiusClass && radius ? { borderRadius: radius as string | number } : {}),
    ...(!fontSizeClass && fontSize ? { fontSize: fontSize as string | number } : {}),
    ...style
  } as CSSProperties

  const newClassName = (DOMUtil.classNames as (...args: unknown[]) => string)(
    'lyrixi-button',
    direction === 'vertical' && `lyrixi-flex-vertical`,
    getVariantClassName(variant as ButtonVariant, color as ButtonColor),
    block && `lyrixi-button-block`,
    sizeClass,
    radiusClass,
    fontSizeClass,
    square && `lyrixi-size-equal`,
    className
  )

  return { style: newStyle, className: newClassName }
}
