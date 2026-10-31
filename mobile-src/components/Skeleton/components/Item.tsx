import React, { forwardRef } from 'react'

import Block from './Block'

import type { SkeletonItemProps } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

const Item = forwardRef<HTMLDivElement, SkeletonItemProps>(
  (
    {
      // Value & Display Value
      id,
      animated = true,
      // Style
      className,
      style
    },
    ref
  ) => {
    return (
      <Block
        id={id}
        ref={ref}
        animated={animated}
        style={style}
        className={DOMUtil.classNames('lyrixi-skeleton-block-item', className)}
      />
    )
  }
)

export default Item
