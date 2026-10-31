import type { MapPoint } from '../../../types'

export interface CreateCurrentMapParams {
  center?: MapPoint
}

export interface CreateLeafletMapParams {
  center?: MapPoint
  minZoom?: number
  maxZoom?: number
  zoom?: number
}
