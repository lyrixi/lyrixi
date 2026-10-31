import React, { forwardRef, useRef, useImperativeHandle, type MouseEvent } from 'react'
import Icon from './Icon'

import type { CheckboxProps, CheckboxRef } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// 复选框
const Checkbox = forwardRef<CheckboxRef, CheckboxProps>(
  (
    {
      // Status
      checked,
      readOnly,
      disabled,
      // Value & Display Value
      id,
      variant,
      // Style
      style,
      className,
      // Elements
      children,
      iconRender,
      // Value & Display Value
      iconPlacement = 'left',
      // Events
      onChange
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    function handleClick(e: MouseEvent<HTMLDivElement>) {
      e.stopPropagation()
      if (disabled || readOnly) return
      if (onChange) onChange(!checked)
    }

    function renderIcon() {
      if (typeof iconRender === 'function') {
        return iconRender({ checked })
      }
      return <Icon variant={variant} checked={checked} />
    }
    const IconNode = renderIcon()

    return (
      <div
        id={id}
        ref={rootRef}
        disabled={disabled}
        readOnly={readOnly}
        style={style}
        className={DOMUtil.classNames(
          'lyrixi-checkbox',
          className,
          checked ? 'lyrixi-checked' : ''
        )}
        onClick={handleClick}
      >
        {iconPlacement !== 'right' && IconNode}
        {children && <span className="lyrixi-checkbox-content">{children}</span>}
        {iconPlacement === 'right' && IconNode}
      </div>
    )
  }
)
export default Checkbox
