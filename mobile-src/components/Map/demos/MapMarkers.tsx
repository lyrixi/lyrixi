import React, { useState } from 'react'
import { Page, Map, Button, type MapPoint } from 'lyrixi-mobile'

const initialPoints = (Map.pointsToWgs84([
  {
    id: 'm1',
    latitude: 31.982686517043174,
    longitude: 118.73538657912759,
    markerIcon: {
      backgroundColor: '#000000',
      text: 'm1',
      width: 32,
      height: 32,
      color: '#ffffff'
    },
    type: 'gcj02'
  },
  {
    id: 'm2',
    markerIcon: {
      backgroundImage: `https://cdn-icons-png.flaticon.com/128/13484/13484859.png`,
      text: 'm2',
      width: 32,
      height: 32
    },
    type: 'gcj02',
    latitude: 31.982723,
    longitude: 118.735298
  },
  {
    id: 'm3',
    markerIcon: {
      backgroundImage: `https://cdn-icons-png.flaticon.com/128/10096/10096738.png`,
      text: 'm3',
      width: 32,
      height: 32
    },
    type: 'gcj02',
    latitude: 31.982594,
    longitude: 118.735184
  },
  {
    id: 'm4',
    markerIcon: {
      backgroundImage: `https://cdn-icons-png.flaticon.com/128/14463/14463613.png`,
      text: 'm4',
      width: 32,
      height: 32,
      fontSize: 12,
      fontWeight: 600
    },
    type: 'gcj02',
    latitude: 31.98766,
    longitude: 118.732237
  }
]) || []) as MapPoint[]

export default function MapMarkersDemo() {
  const [points, setPoints] = useState<MapPoint[]>(initialPoints)

  // 将指定点移到数组末尾，后绘制的标记在上层
  function handleBringToFront(pointId: string) {
    setPoints((prev) => {
      const target = prev.find((item) => item.id === pointId)
      if (!target) return prev
      return [...prev.filter((item) => item.id !== pointId), target]
    })
  }

  console.log('points:', points)
  return (
    <Page>
      <Page.Header>
        <Button onClick={() => handleBringToFront('m1')}>Bring m1 to front</Button>
      </Page.Header>
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
            <Map.MapContainer
              center={
                Map.pointsToWgs84({
                  latitude: 31.982723,
                  longitude: 118.735298,
                  type: 'gcj02'
                }) ?? undefined
              }
              zoom={16}
            >
              <Map.Markers
                points={points}
                onCheck={(point) => {
                  console.log('点击标记:', point)
                  if (!point.id) return
                  setPoints((prev) =>
                    prev.map((item) =>
                      item.id === point.id
                        ? {
                            ...item,
                            markerIcon: {
                              backgroundImage: `https://lyrixi.github.io/lyrixi/assets/plugin/leaflet/images/marker-icon.bak.png`,
                              text: String(item.id),
                              width: 20,
                              height: 33
                            }
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
