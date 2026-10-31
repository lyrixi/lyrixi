import type { MapPoint } from '../../types'

// 内库使用-start
import ValidatorUtil from '../../../../utils/ValidatorUtil'
// 内库使用-end

// 格式化地图点 id；无 id 时用「经度,纬度」作为稳定标识
function formatPointId(point: Pick<MapPoint, 'id' | 'longitude' | 'latitude'>): string {
  if (!ValidatorUtil.isEmpty(point.id)) {
    return String(point.id)
  }
  return `${point.longitude},${point.latitude}`
}

export default formatPointId
