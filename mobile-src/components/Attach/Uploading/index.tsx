import React from 'react'

import type { AttachUploadingProps } from '../types'

// 内库使用-start
import Loading from './../../Loading'
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { Loading } from 'lyrixi-mobile'
测试使用-end */

// 上传中图标
const Uploading = ({
  // Value & Display Value
  id,
  uploadingType,
  className,
  uploadingRender
}: AttachUploadingProps) => {
  // 上传中node
  function renderUploading() {
    if (typeof uploadingRender === 'function') {
      return uploadingRender({ uploadingType })
    }
    return (
      <div id={id} className="lyrixi-attach-uploading-icon">
        <Loading.Ouroboros className="lyrixi-attach-uploading-icon-loading" />
      </div>
    )
  }

  return (
    <div className={DOMUtil.classNames('lyrixi-attach-uploading', className)}>
      {renderUploading()}
    </div>
  )
}

export default Uploading
