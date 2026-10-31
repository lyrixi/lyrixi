import React from 'react'

import type { StepsNodeProps } from '../Steps.Node.types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// 步骤条
const Step = ({
  iconChildren,
  iconRender,
  // 状态： active, finish, error, wait
  status,
  rail,
  title,
  description
}: StepsNodeProps) => {
  // 获取图标节点
  function renderIcon() {
    if (typeof iconRender === 'function') {
      return iconRender({
        children: iconChildren,
        className: 'lyrixi-steps-item-icon-circle',
        status
      })
    }
    return <div className="lyrixi-steps-item-icon-circle">{iconChildren}</div>
  }
  const IconNode = renderIcon()

  return (
    <div
      className={DOMUtil.classNames(
        'lyrixi-steps-item lyrixi-horizontal lyrixi-center',
        status ? `lyrixi-${status}` : ''
      )}
    >
      {/* Icon */}
      <div className="lyrixi-steps-item-icon">{IconNode}</div>

      {/* 连接线 */}
      {rail && <div className="lyrixi-steps-item-rail"></div>}

      {/* Content */}
      <div className="lyrixi-steps-item-content">
        <div className="lyrixi-steps-item-title">{title}</div>
        <div className="lyrixi-steps-item-description">{description}</div>
      </div>
    </div>
  )
}

export default Step
