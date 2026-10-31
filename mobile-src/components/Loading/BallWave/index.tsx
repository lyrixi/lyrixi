import React, { forwardRef, useRef, useImperativeHandle, type CSSProperties } from 'react'

import type { LoadingBallWaveProps, LoadingBallWaveRef } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import VariablesUtil from './../../../utils/VariablesUtil'
// 内库使用-end

const BallWave = forwardRef<LoadingBallWaveRef, LoadingBallWaveProps>(
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
        className={DOMUtil.classNames('lyrixi-loading-ballwave', className)}
        ref={rootRef}
      >
        <svg viewBox="20 0 60 40">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-100.000000, -71.000000)">
              <g transform="translate(95.000000, 71.000000)">
                <g transform="translate(5.000000, 0.000000)">
                  {[0, 1, 2].map((i) => (
                    <rect
                      key={i}
                      fill="currentColor"
                      x={20 + i * 26}
                      y="16"
                      width="8"
                      height="8"
                      rx="2"
                    >
                      <animate
                        attributeName="y"
                        from="16"
                        to="16"
                        dur="2s"
                        begin={`${i * 0.2}s`}
                        repeatCount="indefinite"
                        values="16; 6; 26; 16; 16"
                        keyTimes="0; 0.1; 0.3; 0.4; 1"
                      />
                    </rect>
                  ))}
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    )
  }
)

export default BallWave
