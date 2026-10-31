import React, { useRef, useState } from 'react'
import {
  Page,
  Map,
  Button,
  type GetLocationResult,
  type MapContainerAPI,
  type MapPoint
} from 'lyrixi-mobile'

export default function MapNearbyControlDemo() {
  const mapRef = useRef<MapContainerAPI | null>(null)

  const [value, setValue] = useState<MapPoint>({
    latitude: 39.909187,
    longitude: 116.397451,
    type: 'gcj02',
    address: '天安门'
  })

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
            type: 'bmap',
            markerIcons: {
              markerIcon: {
                backgroundImage: `https://lyrixi.github.io/lyrixi/assets/plugin/leaflet/images/marker-icon.png`,
                width: 20,
                height: 33
              }
            }
          }}
          // config={{
          //   bmapKeys: { android: '', ios: '', web: '' },
          //   googleKeys: { android: '', ios: '', web: 'AIzaSyCpl3yp1f43HzwS1WBUCjBVdjb7IxXCXns' },
          //   amapKeys: { android: '', ios: '', web: '' },
          //   type: 'google'
          // }}
        >
          <div style={{ position: 'relative', width: '100%', height: '500px' }}>
            <Map.MapContainer ref={mapRef} center={value} zoom={16}>
              <Map.Markers points={value ? [value] : []} />
              <Map.NearbyControl
                value={value}
                radius={1000}
                onChange={(item) => {
                  console.log('选择附近地点:', item)
                  if (item && typeof item === 'object') {
                    setValue((prev) => ({ ...prev, ...(item as typeof prev) }))
                  }
                }}
                onSuccess={(result) => {
                  console.log('搜索成功:', result)
                }}
                onError={(error) => {
                  console.log('搜索失败:', error)
                }}
              />
            </Map.MapContainer>
          </div>
        </Map.Provider>
        <div style={{ padding: '10px' }}>
          <Button
            onClick={async () => {
              if (!mapRef.current) return
              const location = (await Map.getLocation({ type: 'wgs84' })) as GetLocationResult
              console.log('移动到当前位置:', location)
              if (location?.status !== 'error' && location?.data) {
                setValue(location?.data)
                mapRef.current.panTo(location.data)
              }
            }}
          >
            移动到当前位置
          </Button>
        </div>
      </Page.Main>
    </Page>
  )
}
