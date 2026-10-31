import type { CardItem } from '../../Header/types'

export type DataResult = {
  status?: string
  message?: string
  data?: unknown
}

export type ReportCardUpdateDataParams = {
  tabId?: string | number
  slideId?: string | number
}

export type QueryTabsResult = DataResult & { data?: CardItem[] }

export type QuerySlidesResult = DataResult & { data?: CardItem[] }
