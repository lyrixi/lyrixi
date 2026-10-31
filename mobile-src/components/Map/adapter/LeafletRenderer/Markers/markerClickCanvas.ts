import type { MapPoint, MapPointCheckHandler } from '../../../types'
import type { CanvasMarkerLayer } from './addMarkers.types'

// 点击canvas绘制的marker
function markerClickCanvas({
  layerGroup,
  onCheck
}: {
  layerGroup: CanvasMarkerLayer
  onCheck: MapPointCheckHandler
}): void {
  layerGroup.addOnClickListener((e: unknown, data: unknown) => {
    void e
    const dataArr = data as {
      data: { options?: { mapPoint?: MapPoint } }
    }[]
    const mapPoint = dataArr[0]?.data?.options?.mapPoint
    if (!mapPoint) return
    onCheck(mapPoint)
  })
}

export default markerClickCanvas
