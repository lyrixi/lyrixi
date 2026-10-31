import React, { useState } from 'react'
import { Card, DatePicker, Page } from 'lyrixi-mobile'

export default function DatePickerComboInputDemo() {
  const [value, setValue] = useState<Date | null>(null)
  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>结合输入框和日期选择器</Card.Header>
          <Card.Main>
            <DatePicker.Combo
              type="date"
              placeholder="请选择日期"
              value={value}
              onChange={(v) => {
                console.log(v)
                setValue(v ?? null)
              }}
              allowClear
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}
