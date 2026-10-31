import React from 'react'
import { Page, Map } from 'lyrixi-mobile'

/**
 * Map.Provider 用法示例（原 App mapConfig 能力）
 * 业务侧用 Provider 包裹地图相关子树，传入 type + key 即可预加载地图 SDK
 */
export default function MapProviderDemo() {
  const mapConfig = {
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
    type: 'bmap' as const
  }
  // const mapConfig = {
  //   bmapKeys: { android: '', ios: '', web: '' },
  //   googleKeys: { android: '', ios: '', web: 'AIzaSyCpl3yp1f43HzwS1WBUCjBVdjb7IxXCXns' },
  //   amapKeys: { android: '', ios: '', web: '' },
  //   type: 'google' as const
  // }

  return (
    <Page>
      <Page.Main>
        <Map.Provider
          config={mapConfig}
          onSuccess={() => {
            console.log('地图资源加载成功')
          }}
          onError={(loadError) => {
            console.error('地图资源加载失败', loadError)
          }}
        >
          {/* 地图加载完成后才会渲染 children */}
          <div style={{ position: 'relative', width: '100%', height: '500px' }}>
            <Map.MapContainer
              center={
                Map.pointsToWgs84({
                  latitude: 39.909187,
                  longitude: 116.397451,
                  type: 'gcj02',
                  address: '天安门'
                }) ?? undefined
              }
              zoom={16}
            />
          </div>
        </Map.Provider>
      </Page.Main>
    </Page>
  )
}
