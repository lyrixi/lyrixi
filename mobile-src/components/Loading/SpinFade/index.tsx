import React, { forwardRef, useRef, useImperativeHandle, type CSSProperties } from 'react'

import type { LoadingSpinFadeProps, LoadingSpinFadeRef } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import VariablesUtil from './../../../utils/VariablesUtil'
// 内库使用-end

const SpinFade = forwardRef<LoadingSpinFadeRef, LoadingSpinFadeProps>(
  (
    {
      // Value & Display Value
      id,
      color,
      size,
      style,
      className
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

    const newStyle: CSSProperties = style ? { ...style } : {}
    if (color) {
      newStyle.color = color
    }
    const resolvedSize = VariablesUtil.getHeightValue(size)
    if (resolvedSize !== undefined) {
      newStyle.width = resolvedSize
      newStyle.height = resolvedSize
    }

    return (
      <div
        id={id}
        style={newStyle}
        className={DOMUtil.classNames('lyrixi-loading-spinfade', className)}
        ref={rootRef}
      >
        <div className="lyrixi-loading-spinfade-item"></div>
        <div className="lyrixi-loading-spinfade-item"></div>
        <div className="lyrixi-loading-spinfade-item"></div>
        <div className="lyrixi-loading-spinfade-item"></div>
        <div className="lyrixi-loading-spinfade-item"></div>
        <div className="lyrixi-loading-spinfade-item"></div>
        <div className="lyrixi-loading-spinfade-item"></div>
        <div className="lyrixi-loading-spinfade-item"></div>
        <div className="lyrixi-loading-spinfade-item"></div>
        <div className="lyrixi-loading-spinfade-item"></div>
        <div className="lyrixi-loading-spinfade-item"></div>
        <div className="lyrixi-loading-spinfade-item"></div>
      </div>
    )
  }
)

export default SpinFade
