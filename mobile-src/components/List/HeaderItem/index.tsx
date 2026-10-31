import React from 'react'

import type { ListHeaderItemProps } from './../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// 获取分组标题
function HeaderItem({
  // Value & Display Value
  id,
  // Style
  style,
  className,

  // Elements
  title,
  description
}: ListHeaderItemProps) {
  return (
    <div id={id} className={DOMUtil.classNames('lyrixi-list-divider', className)} style={style}>
      {title && <div className="lyrixi-list-title">{title}</div>}
      {description && <div className="lyrixi-list-description">{description}</div>}
    </div>
  )
}

export default HeaderItem
