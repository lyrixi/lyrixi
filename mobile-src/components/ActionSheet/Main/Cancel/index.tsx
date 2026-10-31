import React from 'react'

import type { ActionSheetCancelProps } from './ActionSheet.Cancel.types'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

const Cancel = ({
  // Value & Display Value
  id,
  cancel,
  cancelVisible,
  onCancel,
  onClose
}: ActionSheetCancelProps) => {
  if (cancelVisible === false) return null

  return (
    <div
      id={id ? `${id}-cancel` : undefined}
      className="lyrixi-actionsheet-cancel"
      onClick={() => {
        if (onCancel) onCancel()
        if (onClose) onClose()
      }}
    >
      {cancel || LocaleUtil.locale('取消', 'lyrixi_625fb26b4b3340f7872b411f401e754c')}
    </div>
  )
}

export default Cancel
