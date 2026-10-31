import { DateUtil } from 'lyrixi-mobile'

// 将 dateType、rankType、sortType 等转换为 API 参数
function serverData(opts: {
  dateType?: { id?: string; value?: unknown; cycle?: string }
  rankType?: { id?: string }
  sortType?: string
  page?: number
}) {
  const { dateType, rankType, sortType, page = 1 } = opts
  if (!dateType || !rankType) return null

  const params: Record<string, unknown> = {
    rankType: rankType.id,
    sort: sortType || '2',
    page
  }

  // 处理日期参数
  if (dateType.value) {
    const raw = dateType.value as Date | string
    const date = raw instanceof Date ? raw : new Date(raw)
    params.year = DateUtil.format(date, 'YYYY')
    params.cycle = dateType.cycle

    if (dateType.id === 'month' || dateType.id === 'YTM') {
      params.month = DateUtil.format(date, 'MM')
    } else if (dateType.id === 'quarter') {
      params.quarter = DateUtil.format(date, 'Q')
    }
  }

  return params
}

export default serverData
