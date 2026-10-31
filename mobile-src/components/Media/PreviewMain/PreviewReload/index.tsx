import React from 'react'

// 内库使用-start
import Icon from '../../../Icon'
import Icons from '../../../../icons'
// 内库使用-end

const PreviewReload = ({ id, onReUpload }: { id?: string; onReUpload?: () => void }) => {
  return (
    <div
      id={id}
      className="lyrixi-media-preview-main-reload"
      onClick={(e) => {
        e.stopPropagation()
        onReUpload?.()
      }}
    >
      <div className="lyrixi-media-preview-main-reload-icon">
        <Icon svg={Icons.Redo} size="xxxs" color="primary" />
      </div>
    </div>
  )
}

export default PreviewReload
