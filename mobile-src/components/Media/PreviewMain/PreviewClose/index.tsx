import React from 'react'

// 内库使用-start
import Icon from '../../../Icon'
import Icons from '../../../../icons'
// 内库使用-end

const PreviewClose = ({ id, onClose }: { id?: string; onClose?: () => void }) => {
  return (
    <div
      id={id}
      className="lyrixi-media-preview-main-close"
      onClick={(e) => {
        e.stopPropagation()
        onClose?.()
      }}
    >
      <Icon svg={Icons.Close} size="xxxs" color="white" />
    </div>
  )
}

export default PreviewClose
