import React from 'react'

import getList from './getList'

import type { MediaUploaderCompatibleToggleProps } from './MediaUploader.CompatibleToggle.types'

// 内库使用-start
import LocaleUtil from './../../../utils/LocaleUtil'
import Icon from './../../Icon'
import Icons from './../../../icons'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Icon, Icons } from 'lyrixi-mobile'
测试使用-end */

function CompatibleToggle({
  // Value & Display Value
  compatible,
  compatiblePlatform,
  onCompatiblePlatformChange
}: MediaUploaderCompatibleToggleProps) {
  const list = getList()

  const currentItem = getList(compatiblePlatform || 'browser')

  const otherItem = list.find((item) => item.id !== currentItem.id)

  const handleToggle = () => {
    if (otherItem && onCompatiblePlatformChange) {
      onCompatiblePlatformChange(otherItem.id)
    }
  }

  if (!compatible) {
    return null
  }

  return (
    <span className="lyrixi-media-compatible-toggle">
      {typeof compatible === 'string'
        ? compatible
        : LocaleUtil.locale(
            '如果无法拍照，请切换拍照方式',
            'lyrixi_58ec7924f08282da3bf37ac0ad7f857c'
          )}
      <span
        style={{ textDecoration: 'none' }}
        onClick={(e) => {
          e.preventDefault()
          handleToggle()
        }}
      >
        <Icon svg={Icons.Sort} size="xxxs" style={{ transform: 'rotate(90deg)' }} />
        <span style={{ marginLeft: '4px' }}>{currentItem.name as React.ReactNode}</span>
      </span>
    </span>
  )
}

export default CompatibleToggle
