import React, { useImperativeHandle, forwardRef, useRef } from 'react'
import getStyle from './getStyle'

import type { StampProps, StampRef } from './types'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// 印章控件
const Stamp = forwardRef<StampRef, StampProps>(
  (
    {
      // Value & Display Value
      id,
      shape = 'round', // 类型: round, rect
      color, // 颜色
      // Style
      style,
      className,
      // Elements
      children
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    const { style: newStyle, className: newClassName } = getStyle({
      // Style
      color,
      style
    })

    return (
      <div
        id={id}
        ref={rootRef}
        className={DOMUtil.classNames(
          'lyrixi-stamp',
          `lyrixi-stamp-${shape}`,
          className,
          newClassName
        )}
        style={newStyle}
      >
        <div className="lyrixi-stamp-inner">{children}</div>
      </div>
    )
  }
)

export default Stamp
