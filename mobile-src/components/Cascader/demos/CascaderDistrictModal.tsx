import React, { useState } from 'react'
import { Page, Cascader, type CascaderItem } from 'lyrixi-mobile'

export default function CascaderDistrictModalDemo() {
  const [value, setValue] = useState<CascaderItem[] | null>(null)

  return (
    <Page>
      <Page.Main>
        <Cascader.DistrictModal
          open
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
