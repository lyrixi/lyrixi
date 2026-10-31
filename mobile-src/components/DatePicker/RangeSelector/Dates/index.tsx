import React from 'react'
import RangeCombo from './../../RangeCombo'
import type { DatePickerRangeSelectorCustomDatesProps } from './DatePicker.RangeSelector.Dates.types'
import type { DatePickerRangeComboProps } from './../../types'

// 内库使用-start
import LocaleUtil from './../../../../utils/LocaleUtil'
import Input from './../../../Input'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Input } from 'lyrixi-mobile'
测试使用-end */

// 自定义日期选择弹窗: 两框选择
export default function CustomDates({
  value,
  // Status
  type,
  min,
  max,
  hourStep,
  minuteStep,
  startDisabled,
  endDisabled,
  allowClear,
  // Style
  maskClassName,
  maskStyle,
  modalClassName,
  modalStyle,
  // Elements
  portal,
  // Events
  onChange,
  onOk
}: DatePickerRangeSelectorCustomDatesProps) {
  return (
    <div className="lyrixi-datepicker-rangeselector-date">
      <RangeCombo
        // Value & Display Value
        value={value}
        placeholder={String(LocaleUtil.locale('请选择', 'lyrixi_708c9d6d2ad108ab2c560530810deae9'))}
        // Status
        type={type as DatePickerRangeComboProps['type']}
        allowClear={allowClear}
        startDisabled={startDisabled}
        endDisabled={endDisabled}
        min={min}
        max={max}
        hourStep={hourStep}
        minuteStep={minuteStep}
        // Style
        maskClassName={maskClassName}
        maskStyle={maskStyle}
        modalClassName={modalClassName}
        modalStyle={modalStyle}
        // Elements
        portal={portal}
        separator="-"
        clearRender={({ clearable, onClear }) => {
          return clearable ? <Input.IconClear onClick={onClear} /> : <Input.IconRightArrow />
        }}
        // Events
        onChange={onChange as DatePickerRangeComboProps['onChange']}
        onOk={onOk as DatePickerRangeComboProps['onOk']}
      />
    </div>
  )
}
