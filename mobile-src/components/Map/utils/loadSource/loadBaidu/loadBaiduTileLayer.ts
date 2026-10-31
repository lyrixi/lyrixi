import type { L } from '../../../Map.leaflet.types'

// Leaflet Baidu layer: class extend & internal TileLayer APIs are not representable in strict types.
const mapUrl =
  'https://maponline{s}.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=2&udt='

// 加载crs
function getCrs(Leaf: NonNullable<typeof window.L>) {
  // CRS
  const projection = Leaf.Util.extend({}, Leaf.Projection.Mercator, {
    R: 6378206, //百度椭球赤道半径 a=6378206，相当于在 WGS84 椭球赤道半径上加了 69 米
    R_MINOR: 6356584.314245179, //百度椭球极半径 b=6356584.314245179，相当于在 WGS84 椭球极半径上减了 168 米
    bounds: new Leaf.Bounds(
      [-20037725.11268234, -19994619.55417086],
      [20037725.11268234, 19994619.55417086]
    ) //数据覆盖范围在经度[-180°,180°]，纬度[-85.051129°, 85.051129°]之间
  })

  return Leaf.Util.extend({}, Leaf.CRS.Earth, {
    code: 'EPSG:Baidu',
    projection: projection,
    // Leaflet: factory L.transformation(a, b, c, d), not a constructor
    transformation: (
      Leaf as { transformation: (a: number, b: number, c: number, d: number) => object }
    ).transformation(1, 0.5, -1, 0.5),
    scale: function (zoom: number) {
      return 1 / Math.pow(2, 18 - zoom)
    },
    zoom: function (scale: number) {
      return 18 - Math.log(1 / scale) / Math.LN2
    },
    wrapLng: undefined
  })
}
// 加载百度插件
function loadBaiduTileLayer() {
  const Leaf = window.L
  if (!Leaf || Leaf.tileLayer?.currentTileLayer) {
    return
  }

  // 瓦片
  const TileLayerProto = Leaf.TileLayer as typeof Leaf.TileLayer & {
    prototype: {
      initialize: (this: unknown, url: string, options: Record<string, unknown>) => void
    }
  }

  const BaiduTileLayer = Leaf.TileLayer.extend({
    initialize: function (this: unknown, options: Record<string, unknown>) {
      // eslint-disable-next-line
      options = Leaf.extend(
        {
          getUrlArgs: (o: { x: number; y: number; z: number }) => {
            return { x: o.x, y: -1 - o.y, z: o.z }
          },
          subdomains: ['0', '1', '2', '3'],
          minZoom: 0,
          maxZoom: 23,
          minNativeZoom: 1,
          maxNativeZoom: 18
        },
        options
      ) as Record<string, unknown>
      TileLayerProto.prototype.initialize.call(this, mapUrl, options)
    },
    getTileUrl: function (
      this: {
        options: {
          getUrlArgs?: (c: { x: number; y: number; z: number }) => {
            x: number
            y: number
            z: number
          }
        }
        _url: string
        _getSubdomain: (c: { x: number; y: number; z: number }) => string
      },
      coords: { x: number; y: number; z: number }
    ) {
      if (this.options.getUrlArgs) {
        return Leaf.Util.template(
          this._url,
          Leaf.extend(
            { s: this._getSubdomain(coords), r: Leaf.Browser.retina ? '@2x' : '' },
            this.options.getUrlArgs(coords),
            this.options
          )
        )
      } else {
        return Leaf.TileLayer.prototype.getTileUrl.call(this, coords as never)
      }
    }
  }) as new () => L.TileLayer

  // 出口样式
  Leaf.tileLayer.currentTileLayer = function () {
    return new BaiduTileLayer()
  }

  // crs
  const crs = getCrs(Leaf)

  // maxBounds
  let southWest = Leaf.latLng(-80, -180)
  let northEast = Leaf.latLng(84, 180)
  const maxBounds = Leaf.latLngBounds(southWest, northEast)

  // maxZoom, minZoom
  Leaf.tileLayer.currentTileLayer.config = {
    crs,
    maxBounds,
    maxZoom: 19,
    minZoom: 3
  }
}

export default loadBaiduTileLayer
