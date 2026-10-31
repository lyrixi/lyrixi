import React from 'react'

import type { ActionSheetItemProps } from './ActionSheet.Item.types'

// 内库使用-start
import DOMUtil from './../../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const Item = ({
  // Value & Display Value
  id,
  checked,
  disabled,
  style,
  className,
  onClick,
  children
}: ActionSheetItemProps) => {
  return (
    <div
      id={id}
      style={style}
      className={DOMUtil.classNames(
        'lyrixi-actionsheet-item',
        className,
        disabled ? 'lyrixi-disabled' : '',
        checked ? 'lyrixi-checked' : ''
      )}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.(e)
      }}
    >
      {children}
    </div>
  )
}

export default Item
