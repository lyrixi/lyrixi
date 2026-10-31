import React from 'react'
import { Page, Map, type MapMarkerIcon } from 'lyrixi-mobile'

function createRouteMarkerIcon(text: string, backgroundColor: string): MapMarkerIcon {
  const size = 20
  return {
    text,
    backgroundColor,
    borderWidth: 3,
    borderColor: '#ffffff',
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    width: size,
    height: size,
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 600
  }
}

export default function MapPolylineDemo() {
  const points = Map.pointsToWgs84([
    {
      latitude: 39.909187,
      longitude: 116.397451,
      type: 'gcj02',
      markerIcon: createRouteMarkerIcon('起', '#20b970')
    },
    {
      latitude: 39.9105,
      longitude: 116.3995,
      type: 'gcj02',
      markerIcon: createRouteMarkerIcon('1', '#2878f0')
    },
    {
      latitude: 39.9095,
      longitude: 116.4015,
      type: 'gcj02',
      markerIcon: createRouteMarkerIcon('2', '#2878f0')
    },
    {
      latitude: 39.911,
      longitude: 116.403,
      type: 'gcj02',
      markerIcon: createRouteMarkerIcon('3', '#2878f0')
    },
    {
      latitude: 39.910187,
      longitude: 116.404451,
      type: 'gcj02',
      markerIcon: createRouteMarkerIcon('4', '#f04438')
    }
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
              <Map.Polyline points={points} color="#2878f0" />
            </Map.MapContainer>
          </div>
        </Map.Provider>
      </Page.Main>
    </Page>
  )
}
