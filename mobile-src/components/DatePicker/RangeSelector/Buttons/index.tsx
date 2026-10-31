import React from 'react'
import getSelectorOptions from './../../RangeMain/getSelectorOptions'
import type { DatePickerRangeSelectorButtonsProps } from './DatePicker.RangeSelector.Buttons.types'

// 内库使用-start
import ValidatorUtil from './../../../../utils/ValidatorUtil'
import Selector from './../../../Selector/Selector'
import type { SelectorItem } from './../../../Selector/types'
// 内库使用-end

/* 测试使用-start
import { ValidatorUtil, Selector } from 'lyrixi-mobile'
测试使用-end */

// 日期快捷选择
function Buttons({
  value,
  onChange,
  rangeId,
  ranges = {},
  allowClear
}: DatePickerRangeSelectorButtonsProps) {
  return (
    <>
      {/* 快捷选择 */}
      <Selector
        columns={3}
        allowClear={allowClear}
        value={rangeId !== null && rangeId !== '' ? [{ id: rangeId }] : []}
        list={getSelectorOptions(ranges)}
        onChange={(newRange: SelectorItem[]) => {
          if (ValidatorUtil.isEmpty(newRange)) {
            onChange?.(null, {
              rangeId: null
            })
            return
          }

          const newRangeId = (newRange?.[0]?.id as string) || ''
          const r = ranges as Record<string, (Date | null)[]>
          const newValue =
            newRangeId && Array.isArray(r[newRangeId]) && r[newRangeId].length === 2
              ? r[newRangeId]
              : value

          onChange?.(newValue ?? null, {
            rangeId: newRangeId
          })
        }}
      />
    </>
  )
}

export default Buttons
