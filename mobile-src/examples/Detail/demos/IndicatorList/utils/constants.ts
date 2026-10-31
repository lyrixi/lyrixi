import { LocaleUtil, type DatePickerTypeSwitcherValue } from 'lyrixi-mobile'

const locale = LocaleUtil.locale

// 日期类型选项列表（月/季/年/YTM）
export const DATE_TYPE_LIST: DatePickerTypeSwitcherValue[] = [
  {
    type: 'month',
    id: 'month',
    name: locale('月', 'datetype_unit_month'),
    value: new Date()
  },
  {
    type: 'quarter',
    id: 'quarter',
    name: locale('季', 'datetype_unit_quarter'),
    value: new Date()
  },
  {
    type: 'year',
    id: 'year',
    name: locale('年', 'datetype_unit_year'),
    value: new Date()
  },
  {
    type: 'month',
    id: 'YTM',
    name: 'YTM',
    value: new Date()
  }
]
