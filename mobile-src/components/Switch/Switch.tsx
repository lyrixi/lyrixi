import React, { useImperativeHandle, forwardRef, useRef } from 'react'

import type { SwitchProps, SwitchRef } from './types'
import { SwitchSizeClasses } from './types/Switch.Size.types'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// 开关控件
const Switch = forwardRef<SwitchRef, SwitchProps>(
  (
    {
      // Value & Display Value
      id,
      checked,

      // Status
      readOnly,
      disabled,

      // Style
      size = 'm',
      style,
      className,

      // Elements
      on,
      off,

      // Events
      onChange
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)

    // 节点
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    const sizeClass =
      typeof size === 'string' && size in SwitchSizeClasses
        ? SwitchSizeClasses[size as keyof typeof SwitchSizeClasses].className
        : ''

    return (
      <div
        id={id}
        ref={rootRef}
        // Style
        style={style}
        className={DOMUtil.classNames(
          'lyrixi-switch',
          sizeClass,
          className,
          checked ? 'lyrixi-active' : '',
          readOnly ? 'lyrixi-readOnly' : '',
          disabled ? 'lyrixi-disabled' : disabled === false ? '' : ''
        )}
        // Events
        onClick={(e) => {
          if (onChange) onChange(!checked)
          e.stopPropagation()
        }}
      >
        {/* Elements: Handle */}
        <div className="lyrixi-switch-handle"></div>

        {/* Elements: Inner */}
        <div className="lyrixi-switch-inner">
          <div className="lyrixi-switch-on">{on}</div>
          <div className="lyrixi-switch-off">{off}</div>
        </div>
      </div>
    )
  }
)

export default Switch
