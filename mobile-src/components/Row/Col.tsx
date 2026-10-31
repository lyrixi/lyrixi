import React, { useRef, forwardRef, useImperativeHandle } from 'react'

import type { RowColProps, RowColRef } from './types'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
// 内库使用-end

const Col = forwardRef<RowColRef, RowColProps>(
  (
    {
      // Value & Display Value
      id,
      span,
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
        className={(DOMUtil.classNames as (...args: unknown[]) => string)(
          'lyrixi-col',
          `lyrixi-col-${span ?? 0}`,
          className
        )}
      >
        {children}
      </div>
    )
  }
)

export default Col
