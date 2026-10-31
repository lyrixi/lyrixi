import React from 'react'

import { DatePicker, Page } from 'lyrixi-mobile'

import { DATE_TYPE_LIST } from '../utils/constants'
import type { HeaderProps } from './types'

// 头部：周期 Tab + 日期切换
const Header = ({ dateType, onDateTypeChange }: HeaderProps) => {
  return (
    <Page.Header style={{ padding: '8px 12px', backgroundColor: '#fff' }}>
      <DatePicker.TypeSwitcher
        value={dateType || undefined}
        types={DATE_TYPE_LIST}
        pickerDisabled
        onChange={onDateTypeChange}
      />
    </Page.Header>
  )
}

export default Header
