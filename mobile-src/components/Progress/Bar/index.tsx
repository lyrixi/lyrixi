import React, { useImperativeHandle, forwardRef, useRef, type Ref } from 'react'

import type { ProgressBarProps, ProgressBarRef } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const ProgressBar = forwardRef<ProgressBarRef, ProgressBarProps>(
  (
    {
      // Value & Display Value
      id,
      percent = 0,
      className,
      style
    },
    ref: Ref<ProgressBarRef>
  ) => {
    const rootRef = useRef<HTMLDivElement | null>(null)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    // 确保percent在0-100范围内
    const availablePercent = Math.max(0, Math.min(100, Number(percent) || 0))

    return (
      <div
        id={id}
        style={style}
        className={DOMUtil.classNames('lyrixi-progress-bar', className)}
        ref={rootRef}
      >
        <div
          className="lyrixi-progress-bar-fill"
          style={{
            width: `${availablePercent}%`
          }}
        />
      </div>
    )
  }
)

export default ProgressBar
