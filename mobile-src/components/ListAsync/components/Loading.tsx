import React from 'react'

import type { ListAsyncMainLoadingProps } from './ListAsync.modules.types'

// 内库使用-start
import Skeleton from './../../Skeleton'
import Loading from './../../Loading'
// 内库使用-end

/* 测试使用-start
import { Skeleton, Loading } from 'lyrixi-mobile'
测试使用-end */

// 暂无数据或者错误
const MainLoading = ({
  type,
  loadingRender,
  loadingModalStyle,
  loadingModalClassName,
  loadingMaskStyle,
  loadingMaskClassName,
  loadingPortal
}: ListAsyncMainLoadingProps) => {
  if (typeof loadingRender === 'function') {
    return <>{loadingRender({ action: type })}</>
  }

  const LoadingNode = (
    <Loading
      portal={loadingPortal || document.getElementById('root') || document.body}
      modalStyle={loadingModalStyle}
      modalClassName={loadingModalClassName}
      maskStyle={loadingMaskStyle}
      maskClassName={loadingMaskClassName}
    />
  )

  if (type === 'load' || type === 'retry') {
    return (
      <>
        {LoadingNode}
        <Skeleton.List animated={false} />
      </>
    )
  }
  if (type === 'reload') {
    return LoadingNode
  }
  return null
}

export default MainLoading
