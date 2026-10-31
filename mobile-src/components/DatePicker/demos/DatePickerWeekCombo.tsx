import React, { useRef, useState } from 'react'
import { DatePicker, type DatePickerWeekComboRef } from 'lyrixi-mobile'

export default function DatePickerWeekComboDemo() {
  const date1Ref = useRef<DatePickerWeekComboRef | null>(null)
  const date2Ref = useRef<DatePickerWeekComboRef | null>(null)
  const [value, setValue] = useState<Date | null>(null)

  return (
    <>
      <DatePicker.WeekCombo
        ref={date1Ref}
        className="lyrixi-border-b"
        placeholder="Please select WeekCombo"
        type="datetime"
        allowClear
        onBeforeOpen={() => {
          if (document.querySelector('.lyrixi-mask.lyrixi-active')) {
            date1Ref.current?.close?.()
            date2Ref.current?.close?.()
            return false
          }
          return true
        }}
        maskStyle={{
          zIndex: 999
        }}
        onChange={(newValue) => {
          console.log(newValue)
          setValue(newValue ?? null)
        }}
        value={value}
      />
    </>
  )
}
