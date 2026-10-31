import React, { forwardRef } from 'react'

import Block from './Block'

import type { SkeletonTitleProps } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

const Title = forwardRef<HTMLDivElement, SkeletonTitleProps>(
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
        className={DOMUtil.classNames('lyrixi-skeleton-block-title', className)}
      />
    )
  }
)

export default Title
