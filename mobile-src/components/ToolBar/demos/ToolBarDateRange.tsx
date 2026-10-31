import React, { useState } from 'react'
import { Page, ToolBar } from 'lyrixi-mobile'

export default function ToolBarDateRangeDemo() {
  const [dateRange, setDateRange] = useState<(Date | null)[] | null>([new Date(), new Date()])
  return (
    <Page>
      <Page.Main>
        <ToolBar.DateRange
          value={dateRange}
          onChange={(newDateRange) => {
            console.log('修改:', newDateRange)
            setDateRange(newDateRange)
          }}
        />
      </Page.Main>
    </Page>
  )
}
