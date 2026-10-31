import type { CalendarCellDate } from '../types/Calendar.common.types'

export type CalendarUtilsSlideYOp = 'expand' | 'collapse' | ''

export interface CalendarUtilsSlideYParams {
  duration: number
  currentPage: CalendarCellDate[][] | undefined
  drawDate: Date | null
  cellHeight: number
  bodyHeight: number
  body: HTMLDivElement | null
  bodyY: HTMLDivElement | null
}
