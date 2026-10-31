import React, { forwardRef } from 'react'

import type { InputDisplayValueProps } from './Input.DisplayValue.types'
// 内库使用-start
import DOMUtil from './../../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const DisplayValue = forwardRef<HTMLDivElement, InputDisplayValueProps>(
  ({ id, children, style, className, onClick }, ref) => {
    return (
      <div
        ref={ref}
        id={id}
        style={style}
        className={DOMUtil.classNames(className, 'lyrixi-hide-important')}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }
)

export default DisplayValue
