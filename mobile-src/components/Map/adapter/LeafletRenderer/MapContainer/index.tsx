import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useContext
} from 'react'
import type { L } from '../../../Map.leaflet.types'

import createLeafletMap from './createLeafletMap'
import createCurrentMap from './createCurrentMap'
import filterPoints from '../../../utils/filterPoints'
import pointsToMapPoints from './../../../utils/pointsToMapPoints'
import MapProviderContext from '../../../components/Provider/MapProviderContext'
import MapContainerContext from './MapContainerContext'

import type {
  MapPoint,
  MapContainerAPI,
  MapContainerContextValue,
  MapContainerProps
} from '../../../types'

import MapChangeEvents from './MapChangeEvents'
import getCenter from './getCenter'

// 内库使用-start
import GeoUtil from './../../../../../utils/GeoUtil'
import LocaleUtil from './../../../../../utils/LocaleUtil'
import DOMUtil from './../../../../../utils/DOMUtil'
import Result from './../../../../Result'
import ValidatorUtil from './../../../../../utils/ValidatorUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, GeoUtil, Result } from 'lyrixi-mobile'
测试使用-end */

const MapContainer = forwardRef<MapContainerAPI | null, MapContainerProps>(
  (
    {
      // Value & Display Value
      center: externalCenter,
      zoom,
      minZoom,
      maxZoom,
      // Style
      style,
      className,
      // Elements
      children,
      // Events
      onLoad,
      onMapChange
    },
    ref
  ) => {
    const mapProviderContext = useContext(MapProviderContext)

    let center: MapPoint
    if (externalCenter) {
      center = externalCenter
    } else if (mapProviderContext?.config?.center) {
      center = mapProviderContext?.config?.center
    } else {
      center = pointsToMapPoints({
        latitude: 39.909187,
        longitude: 116.397451,
        type: 'gcj02'
      } as MapPoint) as MapPoint
    }

    const rootRef = useRef<HTMLDivElement>(null)
    const mapChangeEventsRef = useRef(new MapChangeEvents())

    let [leafletMap, setLeafletMap] = useState<L.Map | string | null>(null)

    const APIRef = useRef<MapContainerContextValue>({
      get element() {
        return rootRef.current
      },
      // 当前地图实例，仅 Map 内部使用，业务侧请勿依赖: start
      _currentMap: null,
      _leafletMap: null,
      // 当前地图实例，仅 Map 内部使用，业务侧请勿依赖: end
      panTo: (points: MapPoint | MapPoint[]) => {
        if (!leafletMap || typeof leafletMap === 'string') return
        const lmap = leafletMap as L.Map
        mapChangeEventsRef.current.currentAction = 'pan'
        mapChangeEventsRef.current.actionType = 'programmatic'
        mapChangeEventsRef.current.previousCenter = getCenter(lmap)
        mapChangeEventsRef.current.previousZoom = lmap.getZoom()
        // 中心点坐标未移动则不用触发
        if (
          points &&
          !Array.isArray(points) &&
          GeoUtil.isPoint(points) &&
          points.type &&
          GeoUtil.isSamePoint(mapChangeEventsRef.current.previousCenter, points)
        ) {
          return
        }

        if (Array.isArray(points)) {
          let latLngs = filterPoints(points).map((point: MapPoint) => {
            const mapPoint = pointsToMapPoints(point) as MapPoint
            return GeoUtil.isPoint(mapPoint)
              ? ([mapPoint.latitude, mapPoint.longitude] as [number, number])
              : null
          })
          if (!latLngs.length) {
            return
          }

          lmap.fitBounds(latLngs as L.LatLngBoundsExpression, { padding: [1, 1] })
        } else if (ValidatorUtil.isPlainObject(points)) {
          if (!GeoUtil.isPoint(points) || !points.type) {
            console.error('MapContainer panTo invalid parameter:', points)
            return
          }
          const mapPoint = pointsToMapPoints(points) as MapPoint
          if (GeoUtil.isPoint(mapPoint)) {
            lmap.panTo([mapPoint.latitude as number, mapPoint.longitude as number])
          }
        }
      },
      getCenter: () => {
        return getCenter(leafletMap as L.Map)
      },
      zoomIn: () => {
        let lmap = leafletMap as L.Map
        mapChangeEventsRef.current.currentAction = 'zoom'
        mapChangeEventsRef.current.actionType = 'programmatic'
        mapChangeEventsRef.current.previousCenter = getCenter(lmap)
        mapChangeEventsRef.current.previousZoom = lmap.getZoom()

        lmap?.zoomIn()
        return new Promise<number>((resolve) => {
          setTimeout(() => {
            resolve(lmap.getZoom())
          }, 300)
        })
      },
      zoomOut: () => {
        let lmap = leafletMap as L.Map
        mapChangeEventsRef.current.currentAction = 'zoom'
        mapChangeEventsRef.current.actionType = 'programmatic'
        mapChangeEventsRef.current.previousCenter = getCenter(lmap)
        mapChangeEventsRef.current.previousZoom = lmap.getZoom()

        lmap?.zoomOut()
        return new Promise<number>((resolve) => {
          setTimeout(() => {
            resolve(lmap.getZoom())
          }, 300)
        })
      },
      getZoom: () => {
        return (leafletMap as L.Map)?.getZoom?.() || null
      },
      setZoom: (zoom: number) => {
        const lmap = leafletMap as L.Map
        if (!lmap?.setZoom) return
        mapChangeEventsRef.current.currentAction = 'zoom'
        mapChangeEventsRef.current.actionType = 'programmatic'
        mapChangeEventsRef.current.previousCenter = getCenter(lmap)
        mapChangeEventsRef.current.previousZoom = lmap.getZoom()

        lmap.setZoom(zoom)
        return new Promise<number>((resolve) => {
          setTimeout(() => {
            resolve(lmap.getZoom())
          }, 300)
        })
      }
    })
    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define -- loadData 声明在组件后部，与既有结构一致
      loadData()
      // eslint-disable-next-line
    }, [])

    useImperativeHandle(ref, () => {
      return APIRef.current
    })

    function localeToErrorString(node: string | React.ReactNode): string {
      return typeof node === 'string' ? node : 'Error'
    }

    async function loadData() {
      if (!rootRef.current?.querySelector) {
        setLeafletMap(
          localeToErrorString(
            LocaleUtil.locale('No Container', 'lyrixi_6a9144880f91a917d142206c4ecf2103')
          )
        )
        return
      }

      const tileLayerEx = window.L?.tileLayer as
        | (NonNullable<typeof window.L>['tileLayer'] & {
            currentTileLayer?: (() => L.TileLayer) & { config?: Record<string, unknown> }
          })
        | undefined

      leafletMap = (await createLeafletMap(
        rootRef.current?.querySelector?.('.lyrixi-map-container') as HTMLElement,
        {
          center,
          zoom,
          minZoom,
          maxZoom
        }
      )) as L.Map | null
      APIRef.current._leafletMap = leafletMap as L.Map | null

      const currentMapContainer = rootRef?.current?.querySelector?.(
        '.lyrixi-map-api-container'
      ) as HTMLElement | null
      if (!currentMapContainer) {
        setLeafletMap(
          localeToErrorString(
            LocaleUtil.locale('No Container', 'lyrixi_6a9144880f91a917d142206c4ecf2103')
          )
        )
        return
      }

      const currentMap = await createCurrentMap(currentMapContainer, { center })
      APIRef.current._currentMap = currentMap

      if (!window.L || !tileLayerEx?.currentTileLayer) {
        const errorMessage = !window.L
          ? LocaleUtil.locale(
              '请使用 Map.Provider 包裹地图组件',
              'lyrixi_b434b4f7a03c64428fa64fca379025c0'
            )
          : LocaleUtil.locale(
              '缺少必要地图资源, 请检查 Map.Provider 参数是否正确, 或者key是否过期',
              'lyrixi_2677c02f801357b6042704840c4b680c'
            )
        setLeafletMap(leafletMap)
        onLoad?.({
          status: 'error',
          message: localeToErrorString(errorMessage)
        })
        return
      }

      // 绑定地图变化事件
      mapChangeEventsRef.current.initEvents(leafletMap as L.Map, {
        onMapChange
      })

      setLeafletMap(leafletMap)

      onLoad?.({
        status: 'success',
        data: { map: APIRef.current }
      })
    }

    let newChildren: React.ReactNode = null

    if (!leafletMap) {
      newChildren = null
    } else if (typeof leafletMap === 'string') {
      newChildren = (
        <Result className="lyrixi-map-container-result" status="500" title={leafletMap} />
      )
    } else {
      newChildren = children
    }

    return (
      <div ref={rootRef} style={style} className={DOMUtil.classNames('lyrixi-map', className)}>
        <div className="lyrixi-map-container"></div>
        <div className="lyrixi-map-api-container"></div>
        <MapContainerContext.Provider value={APIRef.current}>
          {leafletMap ? newChildren : null}
        </MapContainerContext.Provider>
      </div>
    )
  }
)

export default MapContainer
