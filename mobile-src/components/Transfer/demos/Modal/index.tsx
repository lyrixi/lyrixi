import React, { useState } from 'react'
import { Page, Transfer, Divider, type TransferItem } from 'lyrixi-mobile'

export default function TransferModalDemo() {
  const [value, setValue] = useState<TransferItem[]>([
    { id: '1', name: '1' },
    { id: '2', name: '2' }
  ])
  return (
    <Page>
      <Page.Header className="lyrixi-text-center">Transfer.Modal</Page.Header>
      <Page.Main className="lyrixi-bg-white">
        <Divider>Transfer Modal</Divider>
        <Transfer.Modal
          open={true}
          list={[
            { id: '1', name: '1' },
            { id: '2', name: '2' },
            { id: '3', name: '3' },
            { id: '4', name: '4' },
            { id: '5', name: '5' },
            { id: '6', name: '6' }
          ]}
          value={value}
          titles={{ source: '待选择', target: '已选择' }}
          onChange={(newValue) => {
            console.log('newValue:', newValue)
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
