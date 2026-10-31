import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom'

import type { ToastProps, ToastRef } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

const Toast = forwardRef<ToastRef, ToastProps>(
  (
    {
      // Value & Display Value
      id,
      maskClickable = true,
      placement = 'middle',
      content,
      maskClassName,
      maskStyle,
      modalClassName,
      modalStyle,
      portal
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

    const node = (
      <div
        ref={rootRef}
        id={id}
        className={DOMUtil.classNames(
          'lyrixi-mask',
          'lyrixi-mask-toast',
          maskClassName,
          maskClickable !== false ? 'lyrixi-toast-propagation' : '',
          'lyrixi-active'
        )}
        style={maskStyle}
      >
        <div
          className={DOMUtil.classNames(
            'lyrixi-toast',
            placement ? `lyrixi-${placement}` : 'lyrixi-middle',
            'lyrixi-active'
          )}
        >
          <div
            className={DOMUtil.classNames('lyrixi-toast-wrapper', modalClassName)}
            style={modalStyle}
          >
            <div className="lyrixi-toast-content">{content}</div>
          </div>
        </div>
      </div>
    )

    if (portal) {
      return createPortal(node, portal)
    }
    return node
  }
)

export default Toast
