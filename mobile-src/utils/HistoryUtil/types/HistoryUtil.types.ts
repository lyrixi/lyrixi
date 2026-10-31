export type HistoryUtilBackHandler = (() => void) | null | undefined

export interface HistoryUtilNavigateParams {
  onBack?: () => void
}

export interface HistoryUtilInstance {
  back: () => void
  onBack: HistoryUtilBackHandler
  urlParameter?: string
  navigate: (urlParameter: string, params: HistoryUtilNavigateParams) => void
}
