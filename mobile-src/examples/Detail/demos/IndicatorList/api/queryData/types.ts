import type { DatePickerTypeSwitcherValue } from 'lyrixi-mobile'

import type { IndicatorListViewData } from '../../Main/types'

export type QueryDataParams = {
  dateType?: DatePickerTypeSwitcherValue | null
}

export type IndicatorListQueryResultView = {
  data?: IndicatorListViewData
  status?: string
  message?: string
} | null
