import React, { useState } from 'react'
import { Page, Loading, Button } from 'lyrixi-mobile'

type LoadingDemoType = 'default' | 'customIcon' | 'customContent' | null

export default function LoadingDemo() {
  const [type, setType] = useState<LoadingDemoType>(null)

  const showLoading = (loadingType: Exclude<LoadingDemoType, null>) => {
    setType(loadingType)
    setTimeout(() => {
      setType(null)
    }, 1000)
  }

  return (
    <Page>
      <Page.Main>
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Button className="lyrixi-flex" color="primary" onClick={() => showLoading('default')}>
            Default
          </Button>

          <Button className="lyrixi-flex" color="info" onClick={() => showLoading('customIcon')}>
            Custom Icon
          </Button>

          <Button className="lyrixi-flex" color="info" onClick={() => showLoading('customContent')}>
            Custom Content
          </Button>
        </div>

        {type === 'default' && <Loading />}

        {type === 'customIcon' && (
          <Loading iconRender={() => <Loading.Ouroboros color="white" />} />
        )}

        {type === 'customContent' && <Loading content="Custom content..." />}
      </Page.Main>
    </Page>
  )
}
