import React, { useState } from 'react'
import { Page, Map, type MapPoint } from 'lyrixi-mobile'

const initialPoints = (Map.pointsToWgs84([
  {
    id: 'c1',
    latitude: 39.909187,
    longitude: 116.397451,
    type: 'gcj02',
    radius: 500
  },
  {
    id: 'c2',
    latitude: 39.910187,
    longitude: 116.398451,
    type: 'gcj02',
    radius: 300
  },
  {
    id: 'c3',
    latitude: 39.908187,
    longitude: 116.396451,
    type: 'gcj02',
    radius: 400
  }
]) || []) as MapPoint[]

export default function MapCirclesDemo() {
  const [points, setPoints] = useState<MapPoint[]>(initialPoints)

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
              center={
                Map.pointsToWgs84({
                  latitude: 39.909187,
                  longitude: 116.397451,
                  type: 'gcj02'
                }) ?? undefined
              }
              zoom={14}
            >
              <Map.Circles
                points={points}
                color="#ff8800"
                radius={500}
                onCheck={(point) => {
                  console.log('点击圆形:', point)
                  if (!point.id) return
                  setPoints((prev) =>
                    prev.map((item) =>
                      item.id === point.id
                        ? {
                            ...item,
                            color: '#3388ff',
                            radius: 200
                          }
                        : item
                    )
                  )
                }}
              />
            </Map.MapContainer>
          </div>
        </Map.Provider>
      </Page.Main>
    </Page>
  )
}
