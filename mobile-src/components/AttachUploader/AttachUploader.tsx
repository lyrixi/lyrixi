import React, { forwardRef } from 'react'

// 内库使用-start
import type { AttachRef } from './../Attach/types'
// 内库使用-end

// 内部组件
import Browser from './Browser'

import type { AttachUploaderProps } from './types'

// 照片上传
const AttachUploader = forwardRef<AttachRef, AttachUploaderProps>((props, ref) => {
  const {
    list = [],
    maxCount,
    maxChooseCount,
    extension,
    sourceType: externalSourceType,
    maxSize,
    async = false,
    reUpload = true,
    allowClear = true,
    allowChoose = true,
    className,
    uploadPlacement,
    uploadRender,
    uploadingRender,
    itemRender,
    previewPortal,
    previewServerUrl,
    previewServerSourceType,
    getUploadUrl,
    formatHeaders,
    formatPayload,
    formatResponse,
    onBeforeChoose,
    onChange,
    onPreview
  } = props
  const sourceType = externalSourceType ?? extension
  return (
    <Browser
      ref={ref}
      list={list}
      maxCount={maxCount}
      maxChooseCount={maxChooseCount}
      sourceType={sourceType}
      maxSize={maxSize}
      async={async}
      reUpload={reUpload}
      allowClear={allowClear}
      allowChoose={allowChoose}
      className={className}
      uploadPlacement={uploadPlacement}
      uploadRender={uploadRender}
      uploadingRender={uploadingRender}
      itemRender={itemRender}
      previewPortal={previewPortal}
      previewServerUrl={previewServerUrl}
      previewServerSourceType={previewServerSourceType}
      getUploadUrl={getUploadUrl}
      formatHeaders={formatHeaders}
      formatPayload={formatPayload}
      formatResponse={formatResponse}
      onBeforeChoose={onBeforeChoose}
      onChange={onChange}
      onPreview={onPreview}
    />
  )
})

export default AttachUploader
