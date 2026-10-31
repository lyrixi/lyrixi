import React from 'react'

import type { AppLoadResult } from './types'

// 内库使用-start
import LocaleUtil from './../../utils/LocaleUtil'
import Button from './../Button'
import Result from './../Result'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Button, Result } from 'lyrixi-mobile'
测试使用-end */

export interface AppResultProps {
  // Value & Display Value
  id?: string
  result?: AppLoadResult | null
  // Events
  onReload?: () => void
}

// App 预加载失败：全屏 Result + 重试
function AppResult({ id, result, onReload }: AppResultProps) {
  return (
    <Result id={id} status="500" title={result?.message}>
      <Button
        radius="l"
        variant="solid"
        color="primary"
        style={{ margin: '10px 12px' }}
        onClick={onReload}
      >
        {LocaleUtil.locale('重试', 'lyrixi_132c5cdcceb0f1f17c8c088a42959aa4')}
      </Button>
    </Result>
  )
}

export default AppResult
