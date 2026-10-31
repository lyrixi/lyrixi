import React, { useImperativeHandle, forwardRef, useRef } from 'react'

import type { MessageTitleProps, MessageTitleRef } from './Message.Title.types'

// 内库使用-start
import DOMUtil from './../../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const ConfirmTitle = forwardRef<MessageTitleRef, MessageTitleProps>(
  (
    {
      // Elements
      children,
      // Style
      className,
      style
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    return (
      <div
        style={style}
        className={DOMUtil.classNames('lyrixi-message-title', className)}
        ref={rootRef}
      >
        {children}
      </div>
    )
  }
)

export default ConfirmTitle
