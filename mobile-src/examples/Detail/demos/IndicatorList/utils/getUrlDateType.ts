import { DateUtil, Device, type DatePickerTypeSwitcherValue } from 'lyrixi-mobile'

import { DATE_TYPE_LIST } from './constants'

function toUrlString(value: unknown): string {
  if (typeof value === 'string') return value
  if (value == null) return ''
  return String(value)
}

// 获取 URL 中的 dateType 配置
function getUrlDateType(): DatePickerTypeSwitcherValue | null {
  if (!Array.isArray(DATE_TYPE_LIST) || DATE_TYPE_LIST.length === 0) return null

  const dateId = toUrlString(Device.getUrlParameter('dateId'))
  const urlDate = toUrlString(Device.getUrlParameter('date'))
  const matchDateType = DATE_TYPE_LIST.find((item) => item.id === dateId) || DATE_TYPE_LIST[0]
  const currentDateType: DatePickerTypeSwitcherValue = { ...matchDateType }

  if (urlDate) {
    const currentDate = DateUtil.toDate(urlDate)
    if (currentDate && !Number.isNaN(currentDate.getTime())) {
      currentDateType.value = currentDate
    }
  }

  return currentDateType
}

export default getUrlDateType
