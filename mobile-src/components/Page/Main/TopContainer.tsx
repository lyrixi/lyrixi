import React, { forwardRef } from 'react'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

const TopContainer = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className="lyrixi-page-main-pull-push">
      <div className="lyrixi-page-main-pull-push-wrapper">
        <div className="lyrixi-page-main-pull-push-icon"></div>
        <div className="lyrixi-page-main-pull-push-text">
          {LocaleUtil.locale('下拉可以刷新', 'lyrixi_76985db7270fb8bc2add09291b637964', undefined)}
        </div>
      </div>
    </div>
  )
})

export default TopContainer
