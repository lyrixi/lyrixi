import React, { useState, useEffect } from 'react'

import type { MediaItemImgProps } from './Media.Item.Img.types'

// 内库使用-start
import DOMUtil from './../../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// 图片显示
const Img = ({
  // Value & Display Value
  fileUrl = '',
  // 重新加载的key
  reloadKey
}: MediaItemImgProps) => {
  const [loadStatus, setLoadStatus] = useState('loading') // 'loading' | 'success' | 'error'

  useEffect(() => {
    // 当 fileUrl 改变时，重置加载状态
    setLoadStatus('loading')
  }, [fileUrl])

  const handleLoad = () => {
    setLoadStatus('success')
  }

  const handleError = () => {
    setLoadStatus('error')
  }

  const separator = fileUrl?.includes('?') ? '&' : '?'

  return (
    <img
      src={`${fileUrl}${reloadKey ? `${separator}_reloadKey=${reloadKey}` : ''}`}
      alt=""
      // Style
      className={DOMUtil.classNames(
        'lyrixi-media-item-img',
        loadStatus === 'error' ? 'lyrixi-error' : null
      )}
      // Events
      onLoad={handleLoad}
      onError={handleError}
    />
  )
}
export default Img
