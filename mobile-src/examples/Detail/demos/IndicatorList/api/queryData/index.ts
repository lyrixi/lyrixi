import { LocaleUtil } from 'lyrixi-mobile'

import localData from './localData'
import type { IndicatorListQueryResultView, QueryDataParams } from './types'

const locale = LocaleUtil.locale

function isEmptyServerData(data: Record<string, unknown> | null | undefined): boolean {
  if (!data) return true

  const { mainTarget, subTargets } = data
  if (
    mainTarget !== null &&
    mainTarget !== undefined &&
    typeof mainTarget === 'object' &&
    Object.keys(mainTarget).length > 0
  ) {
    return false
  }
  if (Array.isArray(subTargets) && subTargets.length > 0) {
    return false
  }

  return true
}

// 示例 mock，生成业务页时换成 Request.post(真实 url, serverData({ dateType }), ...)
const MOCK_RESPONSE = {
  code: '1',
  data: {
    subTargets: [
      {
        dim_name: '饼类',
        unit: null,
        complete: '-',
        dim_id: '8068911127610729541',
        setting_id: '5474282418461017869',
        target: '1.00'
      }
    ],
    mainTarget: {
      setting_name: 'fsdf',
      unit: null,
      complete: '-',
      setting_id: '5474282418461017869',
      target: '1.00'
    }
  },
  success: true,
  message: ''
}

function queryData(_params: QueryDataParams): Promise<IndicatorListQueryResultView> {
  return new Promise((resolve) => {
    const serverData = MOCK_RESPONSE.data

    if (isEmptyServerData(serverData)) {
      resolve({
        status: 'empty',
        message: String(locale('暂无数据'))
      })
      return
    }

    resolve({
      data: localData(serverData)
    })
  })
}

export default queryData
