import React, { useEffect, useState, type CSSProperties } from 'react'

import { Bridge, LocaleUtil, Page, Result, type DatePickerTypeSwitcherValue } from 'lyrixi-mobile'

import { queryData, type IndicatorListQueryResultView } from './api'
import getUrlDateType from './utils/getUrlDateType'
import Header from './Header'
import Main from './Main'

const locale = LocaleUtil.locale

const mainStyle: CSSProperties = {
  background: '#f5f5f5'
}

// 指标卡片列表示例
const IndicatorList = () => {
  const [dateType, setDateType] = useState<DatePickerTypeSwitcherValue | null>(getUrlDateType())
  const [result, setResult] = useState<IndicatorListQueryResultView>(null)

  async function loadData() {
    if (!dateType) return
    const newResult = await queryData({ dateType })
    setResult(newResult)
  }

  useEffect(() => {
    Bridge.setTitle({
      title: String(locale('指标'))
    })
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dateType)])

  return (
    <Page>
      {/* 筛选条件 */}
      <Header dateType={dateType} onDateTypeChange={setDateType} />

      {/* 内容：空/错态放在 Page.Main 内，避免全屏 Result 遮住 Header */}
      <Page.Main style={mainStyle}>
        {result?.data && <Main data={result.data} />}

        {(result?.status === 'empty' || result?.status === 'error') && (
          <Result status={result.status} title={result.message} />
        )}
      </Page.Main>
    </Page>
  )
}

export default IndicatorList
