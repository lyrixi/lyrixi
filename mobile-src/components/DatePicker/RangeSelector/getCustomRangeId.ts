import type { DatePickerRangesMap } from './../types'

// 获取自定义key
function getCustomRangeId(ranges: DatePickerRangesMap) {
  // 获取自定义项的key，不是数组则为自定义项:
  let customRangeId: string | null = null
  for (let id in ranges) {
    if (!Array.isArray((ranges as Record<string, unknown>)[id])) {
      customRangeId = id
      break
    }
  }
  return customRangeId
}

export default getCustomRangeId
