import React from 'react'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

function getDefaultStatus(status: string) {
  if (status === 'empty') {
    return {
      title: LocaleUtil.locale('暂无数据', 'lyrixi_21efd88b67a39834582ad99aabb9dc60'),
      image: <div className="lyrixi-result-image lyrixi-result-image-empty"></div>
    }
  }
  if (status === 'error' || status === '500') {
    return {
      title: LocaleUtil.locale(
        '获取数据失败，请稍后再试！',
        'lyrixi_f4ae45effbbfb4b71e6690bd1ce12904'
      ),
      image: <div className="lyrixi-result-image lyrixi-result-image-500"></div>
    }
  }
  return null
}

export default getDefaultStatus
