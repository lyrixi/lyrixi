import React from 'react'

import type { MediaItemReloadProps } from './Media.Item.Reload.types'

// 内库使用-start
import Icon from '../../../Icon'
import Icons from '../../../../icons'
// 内库使用-end

// 失败重传图标
const Reload = ({
  // Value & Display Value
  id,
  // Events
  onClick
}: MediaItemReloadProps) => {
  return (
    <div
      id={id}
      // Style
      className="lyrixi-media-reload"
      // Events
      onClick={(e) => {
        e.stopPropagation()
        const parent = e.currentTarget.parentElement
        // 上传失败允许重新上传
        if (parent?.classList.contains('lyrixi-error')) {
          onClick?.(e)
        }
      }}
    >
      <div className="lyrixi-media-reload-icon">
        <Icon svg={Icons.Redo} size="xxxs" color="primary" />
      </div>
    </div>
  )
}
export default Reload
