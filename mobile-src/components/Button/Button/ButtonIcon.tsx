import React, { forwardRef } from 'react'

import type { ButtonIconProps } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import Icon from './../../Icon'
import type { IconRef } from './../../Icon/types'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Icon } from 'lyrixi-mobile'
测试使用-end */

const ButtonIcon = forwardRef<IconRef, ButtonIconProps>(
  ({ svg, variant, color, size = 'xxs', radius, style, className, onClick }, ref) => {
    return (
      <Icon
        ref={ref}
        svg={svg}
        variant={variant}
        color={color}
        size={size}
        radius={radius}
        style={style}
        className={(DOMUtil.classNames as (...args: unknown[]) => string)(
          'lyrixi-button-icon',
          className
        )}
        onClick={onClick}
      />
    )
  }
)

export default ButtonIcon
