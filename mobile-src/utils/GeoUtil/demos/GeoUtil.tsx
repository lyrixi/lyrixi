import React from 'react'
import { Card, Divider, GeoUtil, Page } from 'lyrixi-mobile'

import type { MapPoint } from 'lyrixi-mobile'

const beijing: MapPoint = { latitude: 39.9042, longitude: 116.4074 }
const shanghai: MapPoint = { latitude: 31.2304, longitude: 121.4737 }
const tiananmen: MapPoint = { latitude: 39.9087, longitude: 116.3975 }
const invalidPoint = { latitude: 91, longitude: 116.4074 }

const rectangle: MapPoint[] = [
  { latitude: 39.9, longitude: 116.39 },
  { latitude: 39.9, longitude: 116.42 },
  { latitude: 39.92, longitude: 116.42 },
  { latitude: 39.92, longitude: 116.39 }
]

const shuffledPolygon: MapPoint[] = [
  { latitude: 39.92, longitude: 116.42 },
  { latitude: 39.9, longitude: 116.39 },
  { latitude: 39.92, longitude: 116.39 },
  { latitude: 39.9, longitude: 116.42 }
]

const line0: [MapPoint, MapPoint] = [
  { latitude: 39.9, longitude: 116.39 },
  { latitude: 39.92, longitude: 116.42 }
]

const line1: [MapPoint, MapPoint] = [
  { latitude: 39.9, longitude: 116.42 },
  { latitude: 39.92, longitude: 116.39 }
]

const line2: [MapPoint, MapPoint] = [
  { latitude: 39.91, longitude: 116.39 },
  { latitude: 39.91, longitude: 116.42 }
]

const innerPolygon: MapPoint[] = [
  { latitude: 39.905, longitude: 116.395 },
  { latitude: 39.905, longitude: 116.405 },
  { latitude: 39.915, longitude: 116.405 },
  { latitude: 39.915, longitude: 116.395 }
]

function formatPoint(point: MapPoint | null | undefined) {
  if (!point) return 'null'
  return `{ lat: ${point.latitude}, lng: ${point.longitude} }`
}

function formatPoints(points: MapPoint[] | Array<MapPoint | null> | undefined) {
  if (!points) return 'undefined'
  return JSON.stringify(
    points.map((point) => (point ? { latitude: point.latitude, longitude: point.longitude } : null))
  )
}

export default function GeoUtilDemo() {
  const middlePoint = GeoUtil.getMiddlePoint(beijing, shanghai)
  const wgs84Point = GeoUtil.transformPoint(beijing, 'gcj02', 'wgs84')
  const batchTransformed = GeoUtil.transformPoints([beijing, shanghai], 'gcj02', 'wgs84')
  const polygonLines = GeoUtil.polygonToLines(rectangle, true)
  const sortedPolygon = GeoUtil.sortPolygonPoints(shuffledPolygon)

  return (
    <Page>
      <Page.Main>
        <Card>
          <Divider>isPoint(point)</Divider>
          <div style={{ margin: '4px 12px' }}>
            GeoUtil.isPoint(beijing) → {String(GeoUtil.isPoint(beijing))}
          </div>
          <div style={{ margin: '4px 12px' }}>
            GeoUtil.isPoint(invalidPoint) → {String(GeoUtil.isPoint(invalidPoint))}
          </div>
        </Card>

        <Card>
          <Divider>getDistance(p0, p1)</Divider>
          <div style={{ margin: '4px 12px' }}>
            北京 → 上海距离（米）→ {GeoUtil.getDistance(beijing, shanghai)}
          </div>
        </Card>

        <Card>
          <Divider>getMiddlePoint(p0, p1)</Divider>
          <div style={{ margin: '4px 12px' }}>{formatPoint(middlePoint)}</div>
        </Card>

        <Card>
          <Divider>isSamePoint(pointA, pointB, distance?)</Divider>
          <div style={{ margin: '4px 12px' }}>
            天安门 vs 北京（100m 内）→ {String(GeoUtil.isSamePoint(tiananmen, beijing, 100))}
          </div>
          <div style={{ margin: '4px 12px' }}>
            北京 vs 上海 → {String(GeoUtil.isSamePoint(beijing, shanghai))}
          </div>
        </Card>

        <Card>
          <Divider>isInChina(point)</Divider>
          <div style={{ margin: '4px 12px' }}>北京 → {String(GeoUtil.isInChina(beijing))}</div>
          <div style={{ margin: '4px 12px' }}>
            纽约 → {String(GeoUtil.isInChina({ latitude: 40.7128, longitude: -74.006 }))}
          </div>
        </Card>

        <Card>
          <Divider>transformPoint(point, from, to)</Divider>
          <div style={{ margin: '4px 12px' }}>gcj02 → wgs84 → {formatPoint(wgs84Point)}</div>
        </Card>

        <Card>
          <Divider>transformPoints(points, from, to)</Divider>
          <div style={{ margin: '4px 12px' }}>{formatPoints(batchTransformed)}</div>
        </Card>

        <Card>
          <Divider>polygonToLines(polygon, isRegular?)</Divider>
          <div style={{ margin: '4px 12px' }}>
            矩形 4 点 + 首尾闭合 → {polygonLines.length} 条线段
          </div>
        </Card>

        <Card>
          <Divider>sortPolygonPoints(points)</Divider>
          <div style={{ margin: '4px 12px' }}>排序前 → {formatPoints(shuffledPolygon)}</div>
          <div style={{ margin: '4px 12px' }}>排序后 → {formatPoints(sortedPolygon)}</div>
        </Card>

        <Card>
          <Divider>isPolygon(polygon)</Divider>
          <div style={{ margin: '4px 12px' }}>矩形 → {String(GeoUtil.isPolygon(rectangle))}</div>
        </Card>

        <Card>
          <Divider>isPointInsidePolygon(point, polygon)</Divider>
          <div style={{ margin: '4px 12px' }}>
            天安门在矩形内 → {String(GeoUtil.isPointInsidePolygon(tiananmen, rectangle))}
          </div>
          <div style={{ margin: '4px 12px' }}>
            上海在矩形内 → {String(GeoUtil.isPointInsidePolygon(shanghai, rectangle))}
          </div>
        </Card>

        <Card>
          <Divider>isPointOnLine(point, line)</Divider>
          <div style={{ margin: '4px 12px' }}>
            点在线段上 →{' '}
            {String(GeoUtil.isPointOnLine({ latitude: 39.91, longitude: 116.405 }, line0))}
          </div>
        </Card>

        <Card>
          <Divider>isLineIntersect(line0, line1)</Divider>
          <div style={{ margin: '4px 12px' }}>
            对角线相交 → {String(GeoUtil.isLineIntersect(line0, line1))}
          </div>
          <div style={{ margin: '4px 12px' }}>
            平行线 → {String(GeoUtil.isLineIntersect(line0, line2))}
          </div>
        </Card>

        <Card>
          <Divider>isPolygonInsidePolygon(py0, py1)</Divider>
          <div style={{ margin: '4px 12px' }}>
            内层矩形在外层矩形内 → {String(GeoUtil.isPolygonInsidePolygon(innerPolygon, rectangle))}
          </div>
        </Card>
      </Page.Main>
    </Page>
  )
}
