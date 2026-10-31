/**
 * @overview 地理工具函数集，统一使用 MapPoint { latitude, longitude }
 * @param {MapPoint} 格式: { latitude, longitude }
 * @param {MapPoint[]} 格式: [{ latitude, longitude }, { latitude, longitude }]
 * @param {Line} 格式: [{ latitude, longitude }, { latitude, longitude }]
 */

import transformPoints from './transformPoints'
import transformPoint from './transformPoint'
import getDistance from './getDistance'
import getMiddlePoint from './getMiddlePoint'
import isInChina from './isInChina'
import isPoint from './isPoint'
import isSamePoint from './isSamePoint'
import isPolygon from './isPolygon'
import isLineIntersect from './isLineIntersect'
import isPointInsidePolygon from './isPointInsidePolygon'
import isPointOnLine from './isPointOnLine'
import isPolygonInsidePolygon from './isPolygonInsidePolygon'
import polygonToLines from './polygonToLines'
import sortPolygonPoints from './sortPolygonPoints'

import type { GeoUtilType } from './types'

const GeoUtil = {
  polygonToLines,
  isPointInsidePolygon,
  isLineIntersect,
  isPolygonInsidePolygon,
  isPoint,
  getMiddlePoint,
  isPolygon,
  isPointOnLine,
  getDistance,
  sortPolygonPoints,
  transformPoint,
  transformPoints,
  isInChina,
  isSamePoint
} as GeoUtilType

export default GeoUtil
