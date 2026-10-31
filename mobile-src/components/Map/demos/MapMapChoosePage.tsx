import React, { useRef, useState } from 'react'
import {
  Page,
  Map,
  Loading,
  type MapChoosePageProps,
  type MapPoint,
  type MapContainerAPI
} from 'lyrixi-mobile'

// 生成随机点
// import getPoints from './getPoints'
// const points = getPoints()

export default function MapMapChoosePageDemo() {
  const mapRef = useRef<MapContainerAPI>(null)
  // Bridge.debug = true
  let [value, setValue] = useState<MapPoint>({
    // address: '美国白宫',
    // latitude: 38.8976763,
    // longitude: -77.0365298,
    // type: 'wgs84'
    // latitude: 34.007479447064824,
    // longitude: -118.5000352126432,
    // type: 'wgs84',
    // address: '太平洋公园'
    // latitude: 39.909187,
    // longitude: 116.397451,
    // type: 'gcj02',
    // address: '天安门'
    // latitude: 39.907783490367706,
    // longitude: 116.39120737493609,
    // type: 'wgs84',
    // address: '天安门'
    latitude: 31.990374883871525,
    longitude: 118.73769931504451,
    type: 'gcj02',
    address: '南京烽火科技'
  })
  /*
  useState()
  useState({
    latitude: 39.907783490367706,
    longitude: 116.39120737493609,
    address: '天安门'
  })
  */

  const handleMapChooseChange: MapChoosePageProps['onChange'] = (newValue) => {
    console.log('newValue:', newValue)
    if (newValue !== null && newValue !== undefined && !Array.isArray(newValue)) {
      setValue((prev) => ({ ...prev, ...newValue }))
    }
  }

  return (
    <Page>
      <Page.Main>
        <Map.Provider
          loadingRender={() => <Loading content="Loading..." />}
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
          // onError={(error) => {
          //   console.log('地图加载失败', error)
          //   return <div>{error.message}</div>
          // }}
        >
          <div style={{ position: 'relative', width: '100%', height: '500px' }}>
            <Map.MapChoosePage
              ref={mapRef}
              // readOnly
              // autoLocation={false}
              zoom={16}
              value={(Map.pointsToWgs84(value) ?? undefined) as MapPoint | undefined}
              onChange={handleMapChooseChange}
              onMarkerCheck={(point) => {
                console.log('点击marker:', point)
              }}
              // getLocation={(data) => {
              //   console.log(data)
              //   return { latitude: 35.689487, longitude: 139.691706 }
              // }}
              // getAddress={(data) => {
              //   return new Promise((resolve) => {
              //     setTimeout(() => {
              //       resolve({
              //         ...data,
              //         province: '江苏省',
              //         provinceNumber: 100010,
              //         address: '江苏省11'
              //       })
              //     }, 1000)
              //   })
              // }}
              // queryNearby={({ map, keyword, longitude, latitude, radius }) => {
              //   console.log('搜索附近:', map, keyword, longitude, latitude, radius)
              //   return [
              //     {
              //       address: '上海市南京东路831号',
              //       latitude: 31.237415229632834,
              //       longitude: 121.47015544295395,
              //       name: '市百一店'
              //     },
              //     {
              //       address: '上海市南京东路832号',
              //       latitude: 31.237415229632834,
              //       longitude: 121.47015544295395,
              //       name: '市百二店'
              //     }
              //   ]
              // }}
              // 生成随机点
              // queryNearby={() => points}
            />
          </div>
        </Map.Provider>
      </Page.Main>
    </Page>
  )
}
