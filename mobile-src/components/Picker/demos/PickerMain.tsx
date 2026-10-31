import React, { useState } from 'react'
import { Picker, Page, type PickerItem } from 'lyrixi-mobile'

export default function PickerMainDemo() {
  const list: PickerItem[] = [
    { id: '1', name: '1' },
    { id: '2', name: '2' }
  ]
  const [value, setValue] = useState<PickerItem[] | null>(null)
  return (
    <Page>
      <Page.Main>
        <Picker.Main
          value={value}
          list={list}
          onChange={(newValue) => {
            console.log('onChange:', newValue)
            setValue(newValue)
          }}
        />
      </Page.Main>
    </Page>
  )
}
