export type MetricItem = {
  id: string
  title: string
  target: string
  complete: string
  rate: string
}

export type IndicatorListViewData = {
  mainTarget: MetricItem | null
  subTargets: MetricItem[]
}

export type MainProps = {
  data: IndicatorListViewData
}
