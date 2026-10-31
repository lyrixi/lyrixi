import { DateUtil, type DatePickerTypeSwitcherValue } from 'lyrixi-mobile'

// 将 dateType 转为接口入参（生成业务页时按真实接口调整）
function serverData({ dateType }: { dateType?: DatePickerTypeSwitcherValue | null }) {
  if (!dateType?.value) return null

  return {
    dateType: dateType.id || dateType.type,
    date: DateUtil.format(dateType.value, 'YYYY-MM-DD')
  }
}

export default serverData
