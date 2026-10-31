import React, { useImperativeHandle, forwardRef, useRef } from 'react'

import type { SafeAreaProps, SafeAreaRef } from './types'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const SafeArea = forwardRef<SafeAreaRef, SafeAreaProps>(
  ({ type = 'height', placement = 'bottom', style, className }, ref) => {
    const rootRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    const mergedClassName = (DOMUtil.classNames as (...args: unknown[]) => string)(
      'lyrixi-safe-area',
      `lyrixi-${type}-${placement}`,
      className
    )

    return <div ref={rootRef} style={style} className={mergedClassName} />
  }
)

export default SafeArea
