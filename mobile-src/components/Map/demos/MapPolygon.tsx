import React from 'react'
import { Page, Map } from 'lyrixi-mobile'

export default function MapPolygonDemo() {
  // 多边形示例：至少 3 个点，首尾自动闭合
  const points = Map.pointsToWgs84([
    { latitude: 39.909187, longitude: 116.397451, type: 'gcj02' },
    { latitude: 39.911, longitude: 116.3995, type: 'gcj02' },
    { latitude: 39.9102, longitude: 116.4025, type: 'gcj02' },
    { latitude: 39.9085, longitude: 116.4005, type: 'gcj02' }
  ])

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
              center={
                Map.pointsToWgs84({
                  latitude: 39.909187,
                  longitude: 116.397451,
                  type: 'gcj02'
                }) ?? undefined
              }
              zoom={14}
            >
              <Map.Polygon points={points} color="#3388ff" fillColor="#3388ff" fillOpacity={0.25} />
            </Map.MapContainer>
          </div>
        </Map.Provider>
      </Page.Main>
    </Page>
  )
}
