import React, { useEffect, useRef, useState } from 'react'
import {
  Page,
  Map,
  Button,
  Debugger,
  type GetLocationResult,
  type MapContainerAPI,
  type MapPoint
} from 'lyrixi-mobile'

const beijingPoint = Map.pointsToWgs84({
  latitude: 39.909187,
  longitude: 116.397451,
  type: 'gcj02',
  address: '天安门'
}) as MapPoint | null

export default function MapMapContainerDemo() {
  const mapRef = useRef<MapContainerAPI | null>(null)

  const [center, setCenter] = useState<MapPoint | null>(beijingPoint)

  useEffect(() => {
    void Debugger.open()
  }, [])

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
          onSuccess={() => {
            console.log('地图加载成功')
          }}
        >
          <div style={{ position: 'relative', width: '100%', height: '500px' }}>
            <Map.MapContainer
              ref={mapRef}
              center={center ?? undefined}
              zoom={16}
              minZoom={10}
              maxZoom={18}
              onLoad={(result) => {
                console.log('地图加载完成:', result)
              }}
              onMapChange={(event) => {
                console.log('视图变化:', event)
              }}
            >
              {/* MapContainer 会自动将 map 注入到子组件中 */}
            </Map.MapContainer>
          </div>
        </Map.Provider>
        <div style={{ padding: '10px' }}>
          <Button
            onClick={() => {
              if (mapRef.current && center) {
                mapRef.current.panTo(center)
                console.log('移动到中心点')
              }
            }}
          >
            移动到中心点
          </Button>
          <Button
            onClick={() => {
              if (mapRef.current) {
                const zoom = mapRef.current.getZoom()
                if (!zoom) {
                  return
                }
                mapRef.current.setZoom(zoom + 1)
                console.log('放大，当前缩放级别:', mapRef.current.getZoom())
              }
            }}
          >
            放大
          </Button>
          <Button
            onClick={() => {
              if (mapRef.current) {
                const zoom = mapRef.current.getZoom()
                if (!zoom) {
                  return
                }
                mapRef.current.setZoom(zoom - 1)
                console.log('缩小，当前缩放级别:', mapRef.current.getZoom())
              }
            }}
          >
            缩小
          </Button>
          <Button
            onClick={async () => {
              if (mapRef.current) {
                const location = (await Map.getLocation({ type: 'wgs84' })) as GetLocationResult
                console.log('移动到当前位置:', location)
                if (location?.status !== 'error' && location?.data) {
                  setCenter(location.data)
                  mapRef.current.panTo(location.data)
                }
              }
            }}
          >
            移动到当前位置
          </Button>
          <Button
            onClick={async () => {
              if (mapRef.current) {
                const address = await Map.getAddress(center as MapPoint)
                console.log('获取地址:', address)
              }
            }}
          >
            获取地址
          </Button>
        </div>
      </Page.Main>
    </Page>
  )
}
