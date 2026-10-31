import React from 'react'
import { Page, Map } from 'lyrixi-mobile'

export default function MapLocationControlDemo() {
  return (
    <Page>
      <Page.Main>
        <Map.Provider
          config={{
            bmapKeys: {
              android: '',
              ios: '',
              web: '7b6e260fc45a67b31a265e22575f1c5e'
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
          //   googleKeys: { android: '', ios: '', web: 'AIzaSyCpl3yp1f43HzwS1WBUCjBVdjb7IxXCXns' },
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
              <Map.LocationControl
                style={{ bottom: '20px', right: '20px' }}
                onChange={(result) => {
                  console.log('定位结果:', result)
                }}
              />
            </Map.MapContainer>
          </div>
        </Map.Provider>
      </Page.Main>
    </Page>
  )
}
