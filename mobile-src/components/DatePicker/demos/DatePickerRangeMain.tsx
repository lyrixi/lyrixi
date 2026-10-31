import React, { useState } from 'react'
import { DatePicker, Page } from 'lyrixi-mobile'

export default function DatePickerRangeMainDemo() {
  const [rangeId, setRangeId] = useState<string | null>(null)
  const [value, setValue] = useState<(Date | null)[]>([new Date(), new Date()])
  return (
    <Page>
      <Page.Header className="lyrixi-text-center">日期快捷选择</Page.Header>
      <Page.Main className="lyrixi-bg-white">
        <DatePicker.RangeMain
          // style={{ padding: 0 }}
          // allowClear
          // titles={{
          //   custom: '自定义选择',
          //   selector: '快捷选择'
          // }}
          // type="datetime"
          // ranges={{
          //   [LocaleUtil.locale('自定义')]: 10
          // }}
          // ranges={{
          //   ['今日']: [new Date(), new Date()],
          //   ['未来一个月']: [new Date(), DateUtil.add(new Date(), 29)],

          //   ['未来三个月']: [new Date(), DateUtil.add(new Date(), 89)],

          //   ['自定义']: 365
          // }}
          // min={new Date('2023-08-08')}
          // max={new Date()}
          open
          rangesVisible={true}
          rangeId={rangeId}
          value={value}
          onChange={(newValue, options) => {
            const id = options?.rangeId
            console.log('修改:', newValue, id)
            if (newValue) setValue(newValue)
            setRangeId(id ?? null)
          }}
        />
      </Page.Main>
    </Page>
  )
}
