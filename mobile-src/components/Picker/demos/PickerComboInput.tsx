import React, { useState } from 'react'
import { Card, Page, Picker, type PickerItem } from 'lyrixi-mobile'

export default function PickerComboInputDemo() {
  const [value, setValue] = useState<PickerItem[] | null>(null)
  const list: PickerItem[] = [
    { id: '1', name: '选项1' },
    { id: '2', name: '选项2' },
    { id: '3', name: '选项3' }
  ]
  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>结合输入框和选择器</Card.Header>
          <Card.Main>
            <Picker.Combo
              list={list}
              value={value}
              onChange={(v) => setValue(v)}
              placeholder="请选择"
              allowClear
            />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}
