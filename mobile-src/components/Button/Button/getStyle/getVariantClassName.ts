// 内库使用-start
import DOMUtil from './../../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

import type { ButtonVariant } from './../../types/Button.Variant.types'
import type { ButtonColor } from './../../types/Button.Color.types'

export default function getVariantClassName(variant: ButtonVariant, color: ButtonColor): string {
  // default / secondary / tertiary / quaternary：filled 用 lyrixi-bg-${color}（对应 --lyrixi-bg-*）
  // primary / info / warning / danger / success：filled 用 lyrixi-bg-${color}-lighten（对应 --lyrixi-color-*-lighten）
  if (
    color === 'default' ||
    color === 'secondary' ||
    color === 'tertiary' ||
    color === 'quaternary'
  ) {
    if (variant === 'solid')
      return DOMUtil.classNames(
        `lyrixi-color-${color}`,
        `lyrixi-border-color-${color}`,
        'lyrixi-bg-white',
        'lyrixi-border-width-default',
        'lyrixi-border-style-solid'
      )
    if (variant === 'text')
      return DOMUtil.classNames(
        `lyrixi-color-${color}`,
        `lyrixi-border-color-${color}`,
        'lyrixi-bg-transparent'
      )
    if (variant === 'outlined')
      return DOMUtil.classNames(
        `lyrixi-color-${color}`,
        `lyrixi-border-color-${color}`,
        'lyrixi-bg-transparent',
        'lyrixi-border-width-default',
        'lyrixi-border-style-solid'
      )
    if (variant === 'filled')
      return DOMUtil.classNames(
        `lyrixi-color-${color}`,
        `lyrixi-border-color-${color}`,
        `lyrixi-bg-${color}`
      )
    if (variant === 'dashed')
      return DOMUtil.classNames(
        `lyrixi-color-${color}`,
        `lyrixi-border-color-${color}`,
        'lyrixi-bg-transparent',
        'lyrixi-border-width-default',
        'lyrixi-border-style-dashed'
      )

    return DOMUtil.classNames(
      `lyrixi-color-${color}`,
      `lyrixi-border-color-${color}`,
      'lyrixi-bg-white',
      'lyrixi-border-width-default',
      'lyrixi-border-style-solid'
    )
  }

  if (variant === 'solid')
    return DOMUtil.classNames(
      'lyrixi-color-white',
      `lyrixi-border-color-${color}`,
      `lyrixi-bg-${color}`,
      'lyrixi-border-width-default',
      'lyrixi-border-style-solid'
    )
  if (variant === 'filled')
    return DOMUtil.classNames(
      `lyrixi-color-${color}`,
      `lyrixi-border-color-${color}`,
      `lyrixi-bg-${color}-lighten`
    )
  if (variant === 'text')
    return DOMUtil.classNames(
      `lyrixi-color-${color}`,
      `lyrixi-border-color-${color}`,
      'lyrixi-bg-transparent'
    )
  if (variant === 'outlined')
    return DOMUtil.classNames(
      `lyrixi-color-${color}`,
      `lyrixi-border-color-${color}`,
      'lyrixi-bg-transparent',
      'lyrixi-border-width-default',
      'lyrixi-border-style-solid'
    )
  if (variant === 'dashed')
    return DOMUtil.classNames(
      `lyrixi-color-${color}`,
      `lyrixi-border-color-${color}`,
      'lyrixi-bg-transparent',
      'lyrixi-border-width-default',
      'lyrixi-border-style-dashed'
    )
  return DOMUtil.classNames(
    `lyrixi-color-${color}`,
    `lyrixi-border-color-${color}`,
    'lyrixi-bg-transparent'
  )
}
