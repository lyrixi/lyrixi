import React, { useImperativeHandle, forwardRef, useRef } from 'react'

import type { MessageFooterProps, MessageFooterRef } from './Message.Footer.types'

// 内库使用-start
import DOMUtil from './../../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const Footer = forwardRef<MessageFooterRef, MessageFooterProps>(
  (
    {
      direction = 'horizontal',
      // Elements
      children,
      // Style
      className,
      style
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
        style={style}
        data-direction={direction}
        className={DOMUtil.classNames('lyrixi-message-footer', className)}
        ref={rootRef}
      >
        {children}
      </footer>
    )
  }
)

export default Footer
