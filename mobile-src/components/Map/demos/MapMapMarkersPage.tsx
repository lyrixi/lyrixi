import React, { useRef, useState } from 'react'
import { Page, Map, Button, type MapMarkersPageRef, type MapPoint } from 'lyrixi-mobile'

import getPoints from './getPoints'

// 随机生成点, 用于测试性能
const initialPoints = (Map.pointsToWgs84(
  getPoints({
    center: {
      latitude: 39.907783490367706,
      longitude: 116.39120737493609
    },
    // 半径5000000米
    radius: 1000,
    // 生成点数
    count: 101
  })
) || []) as MapPoint[]

// This pointsToWgs84 just example, no practical use
// const points = Map.pointsToWgs84([
//   {
//     markerIcon: {
//       backgroundImage: `https://cdn-icons-png.flaticon.com/128/13484/13484859.png`,
//       width: 32,
//       height: 32
//     },
//     type: 'gcj02',
//     latitude: '31.982723',
//     longitude: '118.735298'
//   }
// ])

export default function MapMapMarkersPageDemo() {
  const mapRef = useRef<MapMarkersPageRef | null>(null)
  const [points, setPoints] = useState<MapPoint[]>(initialPoints)

  // 将指定点移到数组末尾，后绘制的标记在上层
  function handleBringToFront(pointId: MapPoint['id']) {
    if (pointId === null || pointId === undefined) return
    const target = initialPoints.find((item) => item.id === pointId)
    if (!target) return
    const newPoints = [...initialPoints.filter((item) => item.id !== pointId), target]
    console.log('newPoints:', newPoints)
    setPoints(newPoints)
  }

  return (
    <Page>
      <Page.Header>
        <Button onClick={() => handleBringToFront(points[0]?.id)}>Bring first to front</Button>
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
              centerMarkerIcon: {
                backgroundImage: `https://lyrixi.github.io/lyrixi/assets/plugin/leaflet/images/marker-custom-shop.png`,
                width: 30,
                height: 49
              },
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
          onSuccess={() => {
            console.log('地图加载成功')
          }}
          onError={(error) => {
            console.log('地图加载失败:', error.message)
            return {
              status: 'error',
              message: 'Custom error message'
            }
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '500px' }}>
            <Map.MapMarkersPage
              ref={mapRef}
              // 转换为wgs84坐标
              zoomControlStyle={{ bottom: '20px' }}
              // 标注
              markers={points}
              // 折线
              // polyline={points}
              // MapPolylineProps={{
              //   color: '#ff8800'
              // }}
              // 圆圈
              // circles={[
              //   {
              //     latitude: 31.981827992209773,
              //     longitude: 118.73498038509915,
              //     type: 'gcj02',
              //     radius: 500
              //     // color: '#ff8800'
              //   }
              // ]}
              // MapCirclesProps={{
              //   color: '#ff8800'
              // }}
              onMarkerCheck={(point) => {
                console.log('点击marker:', point)
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
              onLoad={(result) => {
                // 地图加载失败
                if (result?.status === 'error') return

                const map = result?.data?.map
                const currentZoom = map?.getZoom()
                if (map && typeof currentZoom === 'number') {
                  map.setZoom(currentZoom - 1)
                }
              }}
            >
              <Map.LocationControl
                style={{ bottom: '20px' }}
                onChange={(result) => {
                  mapRef.current?.panTo(result as MapPoint)
                }}
              />
            </Map.MapMarkersPage>
          </div>
        </Map.Provider>
      </Page.Main>
    </Page>
  )
}
