import React, { forwardRef, useRef, useImperativeHandle, type CSSProperties } from 'react'

import type { LoadingOuroborosProps, LoadingOuroborosRef } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import VariablesUtil from './../../../utils/VariablesUtil'
// 内库使用-end

const Ouroboros = forwardRef<LoadingOuroborosRef, LoadingOuroborosProps>(
  ({ color = 'var(--lyrixi-color-tertiary)', size, style, className }, ref) => {
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
      newStyle.color = VariablesUtil.getColorValue(color) || color
    }
    const resolvedSize = VariablesUtil.getHeightValue(size)
    if (resolvedSize !== undefined) {
      newStyle.width = resolvedSize
      newStyle.height = resolvedSize
    }

    return (
      <div
        className={DOMUtil.classNames('lyrixi-loading-ouroboros', className)}
        style={newStyle}
        ref={rootRef}
      >
        <svg viewBox="25 25 50 50">
          <circle cx="50" cy="50" r="20"></circle>
        </svg>
      </div>
    )
  }
)

export default Ouroboros
