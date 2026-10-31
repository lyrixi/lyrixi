import React, { forwardRef } from 'react'

import type { NavBarProps } from '../types'
import Left from './../Left'
import Right from './../Right'
import Title from './../Title'
import NavBarButton from './../Button'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import Button from './../../Button'
import Icons from './../../../icons'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const NavBar = forwardRef<HTMLDivElement, NavBarProps>(
  (
    {
      // Value & Display Value
      id,
      // Style
      style,
      className,

      // Elements
      title,
      children,
      leftRender,
      rightRender,

      // Events
      onBack
    },
    ref
  ) => {
    const defaultLeftRender = () => {
      if (!onBack) return null
      return (
        <NavBarButton id={id} onClick={onBack}>
          <Button.Icon svg={Icons.ArrowLeft} />
        </NavBarButton>
      )
    }

    return (
      <div
        ref={ref}
        // Style
        style={style}
        className={DOMUtil.classNames('lyrixi-navbar', className)}
      >
        <Left>{typeof leftRender === 'function' ? leftRender() : defaultLeftRender()}</Left>
        {title ? <Title>{title}</Title> : children}
        <Right>{typeof rightRender === 'function' && rightRender()}</Right>
      </div>
    )
  }
)

export default NavBar
