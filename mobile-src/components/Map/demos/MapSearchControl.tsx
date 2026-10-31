import React, { useRef, useState } from 'react'
import { Page, Map, type MapContainerAPI, type MapPoint } from 'lyrixi-mobile'

export default function MapSearchControlDemo() {
  const mapRef = useRef<MapContainerAPI | null>(null)
  const [markers, setMarkers] = useState<MapPoint[]>([])

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
              ref={mapRef}
              center={{
                latitude: 39.909187,
                longitude: 116.397451,
                type: 'gcj02'
              }}
              zoom={14}
            >
              <Map.Markers points={markers} />
              <Map.SearchControl
                onChange={(result) => {
                  console.log('搜索结果:', result)
                  const point = result as MapPoint
                  setMarkers([point])
                  mapRef.current?.panTo(point)
                }}
              />
            </Map.MapContainer>
          </div>
        </Map.Provider>
      </Page.Main>
    </Page>
  )
}
