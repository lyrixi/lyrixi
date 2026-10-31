import React from 'react'

import type { CascaderDistrictMainLoadingProps } from './Cascader.DistrictMain.Loading.types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
import Skeleton from './../../Skeleton'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Skeleton } from 'lyrixi-mobile'
测试使用-end */

const DistrictMainLoading = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  result: _result,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onReload: _onReload,
  style,
  className
}: CascaderDistrictMainLoadingProps) => {
  return (
    <div className="lyrixi-cascader-page">
      <div style={style} className={DOMUtil.classNames('lyrixi-cascader-main', className)}>
        <Skeleton.List animated={false} />
      </div>
    </div>
  )
}

export default DistrictMainLoading
