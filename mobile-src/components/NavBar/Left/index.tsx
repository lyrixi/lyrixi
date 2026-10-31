import React, { useImperativeHandle, forwardRef, useRef } from 'react'

import type { NavBarLeftProps, NavBarLeftRef } from './NavBar.Left.types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

const NavBarLeft = forwardRef<NavBarLeftRef, NavBarLeftProps>(
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
        className={DOMUtil.classNames('lyrixi-navbar-left', className)}
        ref={rootRef}
      >
        {children}
      </div>
    )
  }
)
export default NavBarLeft
