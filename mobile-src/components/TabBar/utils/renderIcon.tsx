import React from 'react'

import type { TabBarItem } from '../types'

// 内库使用-start
import Icon from './../../Icon'
// 内库使用-end

/* 测试使用-start
import { Icon } from 'lyrixi-mobile'
测试使用-end */

// 渲染图标（iconRender 优先，否则 iconSvg）
function renderIcon(
  item: TabBarItem,
  options: { checked: boolean },
  className?: string
): React.ReactNode {
  if (typeof item.iconRender === 'function') {
    return item.iconRender({ checked: options.checked })
  }

  if (item.iconSvg) {
    return (
      <Icon
        className={className}
        svg={item.iconSvg}
        size={item.iconSize ?? 'xxxs'}
        color={item.iconColor}
      />
    )
  }

  return null
}

export default renderIcon
