import React, { useState } from 'react'
import { Page, Cascader, type CascaderItem } from 'lyrixi-mobile'

export default function CascaderDistrictMainDemo() {
  const [value, setValue] = useState<CascaderItem[] | null>(null)

  return (
    <Page>
      <Page.Main>
        <Cascader.DistrictMain
          value={value}
          onChange={(newValue) => {
            console.log('修改: ', newValue)
            setValue(newValue)
          }}
        />
      </Page.Main>
    </Page>
  )
}
