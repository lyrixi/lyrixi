import React, { forwardRef } from 'react'

import type { InputIconProps, InputIconRef } from '../types/Input.Icon.types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import Icon from './../../Icon'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Icon } from 'lyrixi-mobile'
测试使用-end */

const InputIcon = forwardRef<InputIconRef, InputIconProps>(
  (
    {
      // Value & Display Value
      id,
      svg,
      variant,
      color = 'quaternary',
      size = 20,
      radius,
      style = { padding: 4 },
      className,
      disabled,
      onClick,
      onTouchStart
    },
    ref
  ) => {
    return (
      <Icon
        id={id}
        ref={ref}
        svg={svg}
        variant={variant}
        color={color}
        size={size}
        radius={radius}
        style={style}
        disabled={disabled}
        onClick={onClick}
        onTouchStart={onTouchStart}
        className={(DOMUtil.classNames as (...args: unknown[]) => string)(
          'lyrixi-input-icon',
          className
        )}
      />
    )
  }
)

export default InputIcon
