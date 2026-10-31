import React, { forwardRef } from 'react'

import type { MediaMarkProps } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

// 照片标识
const Mark = forwardRef<HTMLDivElement, MediaMarkProps>(
  (
    {
      // Value & Display Value
      id,
      // Elements
      labels,

      // Style
      style,
      className
    },
    ref
  ) => {
    return (
      <div
        id={id}
        ref={ref}
        // Style
        style={style}
        className={DOMUtil.classNames('lyrixi-media-item-mark', className)}
      >
        {Array.isArray(labels) && labels.length
          ? labels.map((label, index) => {
              return (
                <div className="lyrixi-media-item-mark-label" key={index}>
                  {label}
                </div>
              )
            })
          : null}
      </div>
    )
  }
)
export default Mark
