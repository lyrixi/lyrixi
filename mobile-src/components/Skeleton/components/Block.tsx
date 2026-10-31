import React, { forwardRef } from 'react'

import type { SkeletonBlockProps } from './Skeleton.Block.types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

const Block = forwardRef<HTMLDivElement, SkeletonBlockProps>(
  (
    {
      // Status
      animated = true,

      // Style
      className,
      style
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        // Style
        style={style}
        className={DOMUtil.classNames(
          'lyrixi-skeleton-block',
          animated ? 'lyrixi-animated' : '',
          className
        )}
      ></div>
    )
  }
)

export default Block
