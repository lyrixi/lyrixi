import React, { useImperativeHandle, forwardRef, useRef, type CSSProperties, type Ref } from 'react'

import type { ProgressCircleProps, ProgressCircleRef } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const ProgressCircle = forwardRef<ProgressCircleRef, ProgressCircleProps>(
  (
    {
      // Value & Display Value
      id,
      percent = 0,
      children,
      size = 50,
      style,
      className
    },
    ref: Ref<ProgressCircleRef>
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

    // 1. 优先从 style 里获取
    let trackWidth = 4 // 默认值
    if (style && style['--lyrixi-progress-track-width'] !== undefined) {
      // 兼容 '8', '8px', '8.5', '8.5px'
      const val = style['--lyrixi-progress-track-width']
      const num = typeof val === 'string' ? parseFloat(val) : Number(val)
      if (!isNaN(num)) trackWidth = num
    }

    // 2. 计算半径
    const radius = (size - trackWidth) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (availablePercent / 100) * circumference
    const mergedStyle: CSSProperties = {
      width: size,
      height: size,
      ...(style && typeof style === 'object' ? style : {})
    }

    return (
      <div
        id={id}
        className={DOMUtil.classNames('lyrixi-progress-circle', className)}
        ref={rootRef}
        style={mergedStyle}
      >
        {/* SVG环形进度条 */}
        <svg
          width={size}
          height={size}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'rotate(-90deg)' // 从顶部开始
          }}
        >
          {/* 背景圆环 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--lyrixi-progress-bg-color, #f0f0f0)"
            strokeWidth={trackWidth}
          />
          {/* 进度圆环 */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--lyrixi-progress-fill-color, green)"
            strokeWidth={trackWidth}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="lyrixi-progress-circle-stroke"
          />
        </svg>

        {/* 垂直居中的内容 */}
        <div className="lyrixi-progress-circle-content">{children}</div>
      </div>
    )
  }
)

export default ProgressCircle
