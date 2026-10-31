import React from 'react'
import { Storage, Page, Button, Card, Divider } from 'lyrixi-mobile'

import type { StorageDemoCacheState } from './Storage.demos.types'

export default function UseStorageDemo() {
  const [exampleData, setExampleData] = Storage.useStorage<StorageDemoCacheState>(null, {
    name: 'cache-state-pageName-futureName'
  })
  return (
    <Page>
      <Page.Main>
        <Card>
          <Divider>useStorage</Divider>
          <div style={{ margin: '0 12px' }}>
            <p>{JSON.stringify(exampleData)}</p>
            <Button
              className="lyrixi-flex lyrixi-primary"
              onClick={() => {
                setExampleData({ name: 'morpheus' })
              }}
            >
              Set
            </Button>
            <Button
              className="lyrixi-flex"
              onClick={() => {
                setExampleData(null)
              }}
            >
              Remove
            </Button>
            <Button
              className="lyrixi-flex"
              onClick={() => {
                alert(JSON.stringify(exampleData))
              }}
            >
              Get
            </Button>
          </div>
        </Card>
      </Page.Main>
    </Page>
  )
}
