import React from 'react'

import type { ListInfiniteScrollProps } from './../types'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Loading from './../../Loading'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Loading } from 'lyrixi-mobile'
测试使用-end */

// status: loading | noMore | [error|自定义错误信息]
const InfiniteScroll = ({
  // Value & Display Value
  id,
  // Status
  status,

  // Elements
  content
}: ListInfiniteScrollProps) => {
  function renderStatus() {
    if (!status || typeof status !== 'string') return null

    if (status === 'loading') {
      return (
        <div className="lyrixi-list-infinitescroll-wrapper">
          <div className="lyrixi-list-infinitescroll-text">
            {content || LocaleUtil.locale('加载中', 'lyrixi_f013ea9dcba3f5ca1278aa850931fec8')}
          </div>
          <div className="lyrixi-list-infinitescroll-icon">
            <Loading.BallWave />
          </div>
        </div>
      )
    }
    if (status === 'noMore') {
      return (
        <div className="lyrixi-list-infinitescroll-wrapper">
          <div className="lyrixi-list-infinitescroll-text">
            {content || LocaleUtil.locale('没有更多了', 'lyrixi_1fe9009c96c23be837d9d52feda9c23e')}
          </div>
        </div>
      )
    }

    return (
      <div id={id} className="lyrixi-list-infinitescroll-wrapper">
        <div className="lyrixi-list-infinitescroll-text">
          {content ||
            LocaleUtil.locale(
              '获取数据失败，请稍后再试！',
              'lyrixi_f4ae45effbbfb4b71e6690bd1ce12904'
            )}
        </div>
      </div>
    )
  }

  return <div className="lyrixi-list-infinitescroll">{renderStatus()}</div>
}

export default InfiniteScroll
