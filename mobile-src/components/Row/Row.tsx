import React, { useRef, forwardRef, useImperativeHandle } from 'react'

import type { RowProps, RowRef } from './types'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const Row = forwardRef<RowRef, RowProps>(
  (
    {
      // Value & Display Value
      id,
      style,
      className,
      children
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

    return (
      <div
        id={id}
        ref={rootRef}
        style={style}
        className={(DOMUtil.classNames as (...args: unknown[]) => string)('lyrixi-row', className)}
      >
        {children}
      </div>
    )
  }
)

export default Row
