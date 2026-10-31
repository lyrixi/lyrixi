import React from 'react'

import type { KeyboardNumberButtonQuickProps } from './Keyboard.Number.ButtonQuick.types'

// 内库使用-start
import DOMUtil from '../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const ButtonQuick = ({ id, onClick, className = '', children }: KeyboardNumberButtonQuickProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <div
      id={id}
      className={DOMUtil.classNames('lyrixi-keyboard-button-quick', className)}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

export default ButtonQuick
