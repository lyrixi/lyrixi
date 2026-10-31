import React, { useState } from 'react'
import { Page, Card, DatePicker, LocaleUtil, type DatePickerTypeSwitcherValue } from 'lyrixi-mobile'

const quickSelectList = [
  {
    type: 'date',
    id: 'yesterday',
    name: LocaleUtil.locale('昨'),
    value: new Date('2026-03-05')
  },
  {
    type: 'date',
    id: 'today',
    name: LocaleUtil.locale('今'),
    value: new Date('2026-03-06')
  },
  {
    type: 'date',
    id: 'tomorrow',
    name: LocaleUtil.locale('明'),
    value: new Date('2026-03-07')
  }
]

export default function DatePickerTypeSwitcherDemo() {
  const [value, setValue] = useState<unknown>(undefined)
  const [quickValue, setQuickValue] = useState<unknown>(undefined)

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>日期类型切换（日/月/季/年/周）</Card.Header>
          <Card.Main>
            <DatePicker.TypeSwitcher
              value={value as DatePickerTypeSwitcherValue | undefined}
              types={[
                {
                  type: 'date',
                  id: 'date',
                  name: LocaleUtil.locale('日', 'datetype_unit_date')
                },
                {
                  type: 'month',
                  id: 'month',
                  name: LocaleUtil.locale('月', 'datetype_unit_month')
                },
                {
                  type: 'quarter',
                  id: 'quarter',
                  name: LocaleUtil.locale('季', 'datetype_unit_quarter')
                },
                {
                  type: 'year',
                  id: 'year',
                  name: LocaleUtil.locale('年', 'datetype_unit_year')
                },
                {
                  type: 'week',
                  id: 'week',
                  name: LocaleUtil.locale('周', 'datetype_unit_week')
                }
              ]}
              onChange={(newValue: unknown) => {
                console.log('修改:', newValue)
                setValue(newValue)
              }}
              pickerComboClassName="lyrixi-flex lyrixi-flex-justify-flex-start"
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>快捷选择（昨/今/明）</Card.Header>
          <Card.Main>
            <DatePicker.TypeSwitcher
              value={quickValue as DatePickerTypeSwitcherValue | undefined}
              types={quickSelectList}
              onChange={(newValue: unknown) => {
                console.log('快捷选择:', newValue)
                setQuickValue(newValue)
              }}
              pickerComboClassName="lyrixi-flex lyrixi-flex-justify-flex-start"
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}
