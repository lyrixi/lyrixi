import React, { useImperativeHandle, forwardRef, useRef } from 'react'

import type { FooterBarProps, FooterBarRef } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const FooterBar = forwardRef<FooterBarRef, FooterBarProps>(
  (
    {
      // Value & Display Value
      id,
      // Style
      className,
      style,

      // Elements
      children
    },
    ref
  ) => {
    const rootRef = useRef<HTMLElement>(null)

    // Expose tools
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    return (
      <footer
        id={id}
        ref={rootRef}
        // Style
        style={style}
        className={(DOMUtil.classNames as (...args: unknown[]) => string)(
          'lyrixi-footerbar',
          className
        )}
      >
        {children}
      </footer>
    )
  }
)

export default FooterBar
