import React, { forwardRef, useRef, useImperativeHandle, type MouseEvent } from 'react'

import type { SelectorItemProps, SelectorItemRef } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import Icon from './../../Icon'
import Icons from '../../../icons'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// 按钮选择
const Item = forwardRef<SelectorItemRef, SelectorItemProps>(
  (
    {
      id,
      children,

      // Status
      disabled = false,
      checked = false,

      // Style
      className,
      style,

      // Events
      onChange
    },
    ref
  ) => {
    // 节点
    const rootRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        },
        get inputElement() {
          return inputRef.current
        }
      }
    })

    // 点击回调
    function handleClick(e: MouseEvent<HTMLDivElement>) {
      if (disabled) return
      onChange?.(e.currentTarget.getAttribute('data-checked') !== 'true')
    }

    return (
      <div
        ref={rootRef}
        id={id}
        // Status
        data-disabled={disabled ? 'true' : 'false'}
        data-checked={checked}
        // Style
        style={style}
        className={DOMUtil.classNames('lyrixi-selector-item', className)}
        // Events
        onClick={handleClick}
      >
        {/* Elements: Name */}
        <div className="lyrixi-selector-item-name">{children}</div>

        {/* Elements: Checked Mark */}
        <div className="lyrixi-selector-item-checked-mark">
          <Icon
            svg={Icons.Ok}
            size="xxxs"
            color="white"
            className="lyrixi-selector-item-checked-mark-icon"
          />
        </div>
      </div>
    )
  }
)
export default Item
