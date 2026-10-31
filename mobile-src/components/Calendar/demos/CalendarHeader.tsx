import React, { useState } from 'react'
import { Page, Calendar, DateUtil } from 'lyrixi-mobile'

export default function CalendarHeaderDemo() {
  const [value, setValue] = useState<Date | null>(null)

  return (
    <Page>
      <Page.Main>
        <Calendar
          value={value}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onChange={(v, _c) => {
            setValue(v as Date | null)
          }}
          headerRender={({
            drawDate,
            onPreviousMonth,
            onNextMonth,
            onPreviousYear,
            onNextYear
          }) => (
            <Calendar.Header
              onPreviousMonth={onPreviousMonth}
              onNextMonth={onNextMonth}
              onPreviousYear={onPreviousYear}
              onNextYear={onNextYear}
            >
              {drawDate ? DateUtil.format(drawDate, 'YYYY年MM月') : ''}
            </Calendar.Header>
          )}
        />
      </Page.Main>
    </Page>
  )
}
