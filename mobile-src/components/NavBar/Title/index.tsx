import React, { useImperativeHandle, forwardRef, useRef } from 'react'

import type { NavBarTitleProps, NavBarTitleRef } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

const NavBarTitle = forwardRef<NavBarTitleRef, NavBarTitleProps>(
  (
    {
      // Value & Display Value
      id,
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
        id={id}
        style={style}
        className={DOMUtil.classNames('lyrixi-navbar-title', className)}
        ref={rootRef}
      >
        {children}
      </div>
    )
  }
)
export default NavBarTitle
