import React, { useState } from 'react'
import { DatePicker, Toast, type DatePickerMultipleValue } from 'lyrixi-mobile'

export default function DatePickerMultipleComboDemo() {
  const [mulValue, setMulValue] = useState<DatePickerMultipleValue>([
    {
      id: 'start',
      description: 'Start',
      value: new Date()
      // disabled: true
    },
    {
      id: 'middle',
      description: 'Middle',
      value: new Date()
    },
    {
      id: 'end',
      description: 'End',
      value: new Date()
    }
  ])

  return (
    <>
      <DatePicker.MultipleCombo
        placeholder="Please select MultipleCombo"
        value={mulValue}
        // year | quarter | month | date | time | datetime | week
        type="datetime"
        onChange={(newValue) => {
          console.log(newValue)
          if (newValue) setMulValue(newValue)
        }}
        allowClear
        min={new Date()}
        hourStep={5}
        minuteStep={5}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onOk={(newValue) => {
          Toast.open({ content: 'Use onOk to stop' })
          return false
        }}
      />
    </>
  )
}
