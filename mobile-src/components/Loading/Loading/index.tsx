import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import { createPortal } from 'react-dom'
import SpinFade from './../SpinFade'

import type { LoadingProps, LoadingRef } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

const Loading = forwardRef<LoadingRef, LoadingProps>(
  (
    {
      // Value & Display Value
      content,
      // Style
      modalStyle,
      modalClassName,
      maskStyle,
      maskClassName,
      // Elements
      portal,
      iconRender,
      children
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

    function renderIcon(): React.ReactNode {
      if (typeof iconRender === 'function') {
        return iconRender()
      }
      return <SpinFade />
    }

    const IconNode = renderIcon()

    const Node = (
      <div
        ref={rootRef}
        className={DOMUtil.classNames(
          'lyrixi-mask-loading lyrixi-mask lyrixi-active',
          maskClassName
        )}
        style={maskStyle}
      >
        {children !== undefined ? (
          children
        ) : (
          <div className={DOMUtil.classNames('lyrixi-loading', modalClassName)} style={modalStyle}>
            <div className="lyrixi-loading-icon">{IconNode}</div>
            <div className="lyrixi-loading-content">
              {content ||
                `${LocaleUtil.locale('加载中', 'lyrixi_f013ea9dcba3f5ca1278aa850931fec8')}...`}
            </div>
          </div>
        )}
      </div>
    )

    if (portal) {
      return createPortal(Node, portal)
    }
    return Node
  }
)

export default Loading
