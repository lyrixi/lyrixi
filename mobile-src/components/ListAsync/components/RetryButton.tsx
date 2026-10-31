import React from 'react'

import type { ListAsyncRetryButtonProps } from './ListAsync.modules.types'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Button from './../../Button'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Button } from 'lyrixi-mobile'
测试使用-end */

// 暂无数据或者错误
const RetryButton = ({ status, errorRetry, emptyRetry, onClick }: ListAsyncRetryButtonProps) => {
  if (status === 'error') {
    if (!errorRetry) {
      return null
    }
    return (
      <Button
        radius="l"
        variant="solid"
        color="primary"
        style={{ margin: '10px 12px' }}
        onClick={onClick}
      >
        {LocaleUtil.locale('重试', 'lyrixi_132c5cdcceb0f1f17c8c088a42959aa4')}
      </Button>
    )
  }
  if (status === 'empty') {
    if (!emptyRetry) {
      return null
    }
    return (
      <Button
        radius="l"
        variant="solid"
        color="primary"
        style={{ margin: '10px 12px' }}
        onClick={onClick}
      >
        {LocaleUtil.locale('刷新', 'lyrixi_694fc5efa9e1d1c2c5eb6525e1c7fb29')}
      </Button>
    )
  }
  return null
}

export default RetryButton
