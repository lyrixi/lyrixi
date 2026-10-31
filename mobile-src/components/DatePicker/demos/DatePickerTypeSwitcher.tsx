import React, { useState } from 'react'
import {
  Page,
  Card,
  DatePicker,
  LocaleUtil,
  Icons,
  type DatePickerTypeSwitcherValue
} from 'lyrixi-mobile'

const dateTypes = [
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
]

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
  const [collapsedValue, setCollapsedValue] = useState<unknown>(undefined)
  const [dropdownLeftValue, setDropdownLeftValue] = useState<unknown>(undefined)
  const [dropdownPortalValue, setDropdownPortalValue] = useState<unknown>(undefined)
  const [dropdownStyleValue, setDropdownStyleValue] = useState<unknown>(undefined)
  const [dropdownSizeValue, setDropdownSizeValue] = useState<unknown>(undefined)
  const [dropdownArrowValue, setDropdownArrowValue] = useState<unknown>(undefined)
  const [pickerDisabledValue, setPickerDisabledValue] = useState<unknown>(undefined)

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>日期类型切换（日/月/季/年/周）</Card.Header>
          <Card.Main>
            <DatePicker.TypeSwitcher
              value={value as DatePickerTypeSwitcherValue | undefined}
              types={dateTypes}
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

        <Card>
          <Card.Header>下拉模式（variant=&quot;dropdown&quot;）</Card.Header>
          <Card.Main>
            <DatePicker.TypeSwitcher
              variant="dropdown"
              value={collapsedValue as DatePickerTypeSwitcherValue | undefined}
              types={dateTypes}
              onChange={(newValue: unknown) => {
                console.log('下拉模式:', newValue)
                setCollapsedValue(newValue)
              }}
              pickerComboClassName="lyrixi-flex lyrixi-flex-justify-flex-start"
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>下拉左侧偏移（dropdownLeft）</Card.Header>
          <Card.Main>
            <DatePicker.TypeSwitcher
              variant="dropdown"
              dropdownLeft={12}
              value={dropdownLeftValue as DatePickerTypeSwitcherValue | undefined}
              types={dateTypes}
              onChange={(newValue: unknown) => {
                console.log('dropdownLeft:', newValue)
                setDropdownLeftValue(newValue)
              }}
              pickerComboClassName="lyrixi-flex lyrixi-flex-justify-flex-start"
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>下拉挂载节点（dropdownPortal）</Card.Header>
          <Card.Main>
            <DatePicker.TypeSwitcher
              variant="dropdown"
              dropdownPortal={typeof document !== 'undefined' ? document.body : undefined}
              value={dropdownPortalValue as DatePickerTypeSwitcherValue | undefined}
              types={dateTypes}
              onChange={(newValue: unknown) => {
                console.log('dropdownPortal:', newValue)
                setDropdownPortalValue(newValue)
              }}
              pickerComboClassName="lyrixi-flex lyrixi-flex-justify-flex-start"
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>
            下拉颜色与变体（dropdownColor / dropdownVariant / dropdownRadius）
          </Card.Header>
          <Card.Main>
            <DatePicker.TypeSwitcher
              variant="dropdown"
              dropdownColor="primary"
              dropdownVariant="solid"
              dropdownRadius="m"
              value={dropdownStyleValue as DatePickerTypeSwitcherValue | undefined}
              types={dateTypes}
              onChange={(newValue: unknown) => {
                console.log('dropdownColor / dropdownVariant:', newValue)
                setDropdownStyleValue(newValue)
              }}
            />

            <DatePicker.TypeSwitcher
              variant="dropdown"
              dropdownVariant="filled"
              dropdownRadius="m"
              value={dropdownStyleValue as DatePickerTypeSwitcherValue | undefined}
              types={dateTypes}
              onChange={(newValue: unknown) => {
                console.log('dropdownColor / dropdownVariant:', newValue)
                setDropdownStyleValue(newValue)
              }}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>
            下拉尺寸（dropdownSize / dropdownSizeEqual / dropdownFontSize / dropdownStyle /
            dropdownClassName）
          </Card.Header>
          <Card.Main>
            <DatePicker.TypeSwitcher
              variant="dropdown"
              dropdownSize="m"
              dropdownSizeEqual
              dropdownFontSize={12}
              dropdownStyle={{ minWidth: 72 }}
              dropdownClassName="lyrixi-flex lyrixi-flex-justify-center"
              value={dropdownSizeValue as DatePickerTypeSwitcherValue | undefined}
              types={dateTypes}
              onChange={(newValue: unknown) => {
                console.log('dropdownSize:', newValue)
                setDropdownSizeValue(newValue)
              }}
              pickerComboClassName="lyrixi-flex lyrixi-flex-justify-flex-start"
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>禁用日期选择（pickerDisabled）</Card.Header>
          <Card.Main>
            <DatePicker.TypeSwitcher
              pickerDisabled
              value={pickerDisabledValue as DatePickerTypeSwitcherValue | undefined}
              types={dateTypes}
              onChange={(newValue: unknown) => {
                console.log('pickerDisabled:', newValue)
                setPickerDisabledValue(newValue)
              }}
              pickerComboClassName="lyrixi-flex lyrixi-flex-justify-flex-start"
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>下拉箭头（dropdownArrowSvg）</Card.Header>
          <Card.Main>
            <DatePicker.TypeSwitcher
              variant="dropdown"
              dropdownArrowSvg={null}
              value={dropdownArrowValue as DatePickerTypeSwitcherValue | undefined}
              types={dateTypes}
              onChange={(newValue: unknown) => {
                console.log('dropdownArrowSvg:', newValue)
                setDropdownArrowValue(newValue)
              }}
              pickerComboClassName="lyrixi-flex lyrixi-flex-justify-flex-start"
            />
            <DatePicker.TypeSwitcher
              variant="dropdown"
              dropdownArrowSvg={Icons.TriangleUpFill}
              value={dropdownArrowValue as DatePickerTypeSwitcherValue | undefined}
              types={dateTypes}
              onChange={(newValue: unknown) => {
                console.log('dropdownArrowSvg:', newValue)
                setDropdownArrowValue(newValue)
              }}
              pickerComboClassName="lyrixi-flex lyrixi-flex-justify-flex-start"
              style={{ marginTop: 12 }}
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}
