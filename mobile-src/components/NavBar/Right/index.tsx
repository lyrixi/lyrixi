import React, { useImperativeHandle, forwardRef, useRef } from 'react'

import type { NavBarRightProps, NavBarRightRef } from './NavBar.Right.types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

const NavBarRight = forwardRef<NavBarRightRef, NavBarRightProps>(
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
        className={DOMUtil.classNames('lyrixi-navbar-right', className)}
        ref={rootRef}
      >
        {children}
      </div>
    )
  }
)
export default NavBarRight
