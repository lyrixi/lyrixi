import React from 'react'

import type { MediaItemDeleteProps } from './Media.Item.Delete.types'

// 内库使用-start
import Icon from '../../../Icon'
import Icons from '../../../../icons'
// 内库使用-end

// 照片视频预览
const Delete = ({
  // Value & Display Value
  id,
  // Events
  onClick
}: MediaItemDeleteProps) => {
  return (
    <div
      id={id}
      // Style
      className="lyrixi-media-delete"
      // Events
      onClick={(e) => {
        e.stopPropagation()

        onClick?.(e)
      }}
    >
      <Icon svg={Icons.Close} size="xxxs" color="white" className="lyrixi-media-delete-icon" />
    </div>
  )
}
export default Delete
