import React, { forwardRef, useRef, useImperativeHandle } from 'react'

import type { BadgeProps, BadgeRef } from './types'

// 内库使用-start
import MathUtil from './../../utils/MathUtil'
import DOMUtil from './../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { MathUtil, DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// 数值标
const Badge = forwardRef<BadgeRef, BadgeProps>(
  (
    {
      // Value & Display Value
      id,
      count,

      // Style
      style,
      className,

      // Elements
      children,
      maxCount = 99,
      ellipsis = '+' // 有maxLength属性时ellipsis才生效
    },
    ref
  ) => {
    // 节点
    const rootRef = useRef<HTMLSpanElement | null>(null)
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    // 标题
    let countText: string = MathUtil.isNumber(count) ? String(count) : ''
    if (MathUtil.isNumber(count) && MathUtil.isNumber(maxCount) && Number(count) > maxCount) {
      countText = String(maxCount) + ellipsis
    }

    if (!children && !countText) {
      return null
    }

    return (
      <span
        id={id}
        ref={rootRef}
        // Style
        style={style}
        className={DOMUtil.classNames('lyrixi-badge', className)}
      >
        {children}
        {countText}
      </span>
    )
  }
)

export default Badge
