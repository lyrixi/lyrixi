import React from 'react'

import type { CheckboxIconProps } from './Checkbox.Icon.types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import LyrixiIcon from './../../Icon'
import Icons from '../../../icons'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Icon as LyrixiIcon, Icons } from 'lyrixi-mobile'
测试使用-end */

function getCheckIconSize(variant: CheckboxIconProps['variant']): string {
  return variant === 'text' ? 'xs' : 'xxxs'
}

function getCheckIconColor(variant: CheckboxIconProps['variant']): string | undefined {
  if (variant === 'solid') return 'white'
  if (variant === 'filled' || variant === 'outlined' || variant === 'text') {
    return 'primary'
  }
  return undefined
}

function Icon({ checked, variant = 'solid' }: CheckboxIconProps) {
  return (
    <span
      className={DOMUtil.classNames(
        'lyrixi-checkbox-icon',
        `lyrixi-checkbox-icon-${variant}`,
        checked ? 'lyrixi-checked' : ''
      )}
    >
      {checked ? (
        <LyrixiIcon
          svg={Icons.Ok}
          size={getCheckIconSize(variant)}
          color={getCheckIconColor(variant)}
        />
      ) : null}
    </span>
  )
}

export default Icon
