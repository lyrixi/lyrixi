import React, { useEffect, useState } from 'react'
import { Picker, Page, type PickerItem } from 'lyrixi-mobile'

export default function PickerModalDemo() {
  const [list, setList] = useState<PickerItem[]>([])
  const [value, setValue] = useState<PickerItem[] | null>([
    { id: '8571532967972181136', name: '0507-打印' }
  ])

  useEffect(() => {
    setTimeout(() => {
      setList([
        {
          name: '0507-打印',
          id: '8571532967972181136'
        },
        {
          name: '0507-打印_副本',
          id: '8421508242493921754'
        }
      ])
    }, 3000)
  }, [])
  return (
    <Page>
      <Page.Main>
        <Picker.Modal
          open
          value={value}
          list={list}
          onChange={(newValue) => {
            console.log('onChange:', newValue)
            setValue(newValue)
          }}
          onClose={() => {
            console.log('onClose')
          }}
        />
      </Page.Main>
    </Page>
  )
}
