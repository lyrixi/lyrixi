import React from 'react'
import { Page, Map } from 'lyrixi-mobile'

export default function MapZoomControlDemo() {
  return (
    <Page>
      <Page.Main>
        <Map.Provider
          config={{
            bmapKeys: {
              android: '',
              ios: '',
              web: ''
            },
            googleKeys: {
              android: '',
              ios: '',
              web: ''
            },
            amapKeys: {
              android: '',
              ios: '',
              web: ''
            },
            type: 'bmap'
          }}
          // config={{
          //   bmapKeys: { android: '', ios: '', web: '' },
          //   googleKeys: { android: '', ios: '', web: '' },
          //   amapKeys: { android: '', ios: '', web: '' },
          //   type: 'google'
          // }}
        >
          <div style={{ position: 'relative', width: '100%', height: '500px' }}>
            <Map.MapContainer
              center={{
                latitude: 39.909187,
                longitude: 116.397451,
                type: 'gcj02'
              }}
              zoom={14}
            >
              <Map.ZoomControl
                style={{ bottom: '20px', right: '20px' }}
                onZoomIn={(zoom) => {
                  console.log('放大，当前缩放级别:', zoom)
                }}
                onZoomOut={(zoom) => {
                  console.log('缩小，当前缩放级别:', zoom)
                }}
              />
            </Map.MapContainer>
          </div>
        </Map.Provider>
      </Page.Main>
    </Page>
  )
}
