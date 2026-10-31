import React from 'react'

import type { KeyboardNumberButtonActionProps } from './Keyboard.Number.ButtonAction.types'

// 内库使用-start
import DOMUtil from '../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const ButtonAction = ({
  id,
  onClick,
  className = '',
  children
}: KeyboardNumberButtonActionProps) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <div
      id={id}
      className={DOMUtil.classNames(
        'lyrixi-keyboard-button lyrixi-keyboard-button-action',
        className
      )}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

export default ButtonAction
