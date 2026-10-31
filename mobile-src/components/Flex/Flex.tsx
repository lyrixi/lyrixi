import React, { useRef, forwardRef, useImperativeHandle } from 'react'

import type { FlexProps, FlexRef } from './types'
import getStyle from './getStyle'
import getClassName from './getClassName'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, Flex } from 'lyrixi-mobile'
测试使用-end */

const Flex = forwardRef<FlexRef, FlexProps>(
  (
    {
      // Value & Display Value
      id,
      style,
      className,
      children,
      gap,
      justify,
      align,
      direction,
      wrap,
      flex,
      block = true
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
        ref={rootRef}
        id={id}
        style={{
          ...getStyle({ gap, flex }),
          ...style
        }}
        className={(DOMUtil.classNames as (...args: unknown[]) => string)(
          getClassName({ wrap, direction, justify, align, flex, block }),
          className
        )}
      >
        {children}
      </div>
    )
  }
)

export default Flex
