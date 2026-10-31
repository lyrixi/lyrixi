import React from 'react'

import type { CascaderDistrictMainResultProps } from './Cascader.DistrictMain.Result.types'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import DOMUtil from './../../../utils/DOMUtil'
import Button from './../../Button'
import Result from './../../Result'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Button, Result } from 'lyrixi-mobile'
测试使用-end */

const DistrictMainResult = ({
  result,
  onReload,
  style,
  className
}: CascaderDistrictMainResultProps) => {
  return (
    <div className="lyrixi-cascader-page">
      <div style={style} className={DOMUtil.classNames('lyrixi-cascader-main', className)}>
        <Result
          title={result?.message !== null ? String(result?.message) : ''}
          status={result?.status !== null ? String(result?.status) : 'empty'}
          full
          description={undefined}
          style={undefined}
          className={undefined}
          imageRender={undefined}
          imageUrl={undefined}
        >
          {result?.status === 'error' ? (
            <Button
              radius="l"
              variant="solid"
              color="primary"
              style={{ margin: '10px 12px' }}
              onClick={onReload}
            >
              {LocaleUtil.locale('重新加载', 'lyrixi_64ca9bab920a2983bcf270320d850d00')}
            </Button>
          ) : null}
        </Result>
      </div>
    </div>
  )
}

export default DistrictMainResult
