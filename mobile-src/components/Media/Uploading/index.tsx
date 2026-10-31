import React from 'react'

import type { MediaUploadingProps } from './Media.Uploading.types'

// 内库使用-start
import Loading from './../../Loading'
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { Loading, DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// 上传中图标
const Uploading = ({
  // Value & Display Value
  uploadingType,
  item = {},
  // Style
  className,
  // Elements
  uploadingRender
}: MediaUploadingProps) => {
  // 上传中node
  function renderUploading() {
    if (typeof uploadingRender === 'function') {
      return uploadingRender({ ...item, uploadingType })
    }
    return (
      <div className="lyrixi-media-uploading-icon">
        <Loading.Ouroboros className="lyrixi-media-uploading-icon-loading" />
      </div>
    )
  }

  return (
    <div className={DOMUtil.classNames('lyrixi-media-uploading', className)}>
      {renderUploading()}
    </div>
  )
}
export default Uploading
