import React, { useEffect, useState } from 'react'

import { Bridge, Device, LocaleUtil, Result } from 'lyrixi-mobile'

import {
  queryData,
  querySlides,
  queryTabs,
  type DataResult,
  type ReportCardUpdateDataParams
} from './api'
import type { CardItem } from './Header/types'
import Content from './Content'
import Header from './Header'

const locale = LocaleUtil.locale

// 日报报表卡片组件（日报分析）
const DailyCard = () => {
  // Tabs
  const [tabs, setTabs] = useState<CardItem[] | null>(null)
  const [tab, setTab] = useState<CardItem | null>(null)

  // Slides
  const [slides, setSlides] = useState<CardItem[] | null>(null)
  const [slide, setSlide] = useState<CardItem | null>(null)

  // 数据: { status: 'empty|500', message: '', data: {  } }
  const [result, setResult] = useState<DataResult | null>(null)

  const title = String(
    decodeURIComponent(decodeURIComponent((Device.getUrlParameter('title') as string) || '')) ||
      locale('部门报表')
  )

  // 加载数据
  async function initData() {
    // 加载tabs
    const tabsResult = (await queryTabs()) as DataResult & { data?: CardItem[] }
    if (tabsResult.status) {
      setResult(tabsResult)
      return
    }

    setTabs(tabsResult.data ?? null)
    setTab(tabsResult.data?.[0] ?? null)

    // 加载slides
    const slidesResult = (await querySlides()) as DataResult & { data?: CardItem[] }
    if (slidesResult.status) {
      setResult(slidesResult)
      return
    }

    setSlides(slidesResult.data ?? null)
    setSlide(slidesResult.data?.[0] ?? null)

    // 加载数据
    await updateData({
      tabId: tabsResult.data?.[0]?.id,
      slideId: slidesResult.data?.[0]?.id
    })
  }

  // 更新数据
  async function updateData(params: ReportCardUpdateDataParams) {
    const dataResult = (await queryData(params)) as DataResult
    setResult(dataResult)
  }

  useEffect(() => {
    // 初始化数据
    void initData()

    // eslint-disable-next-line
  }, [])

  // Slide Change
  function handleSlideChange(newSlide: CardItem) {
    setSlide(newSlide)
    void updateData({
      tabId: tab?.id,
      slideId: newSlide?.id
    })
  }

  // Tab Change
  function handleTabChange(newTab: CardItem[]) {
    setTab(newTab[0] ?? null)
    void updateData({
      tabId: newTab[0]?.id,
      slideId: slide?.id
    })
  }

  return (
    <>
      {/* 头部 */}
      <Header
        title={title}
        tabs={tabs}
        tab={tab}
        slides={slides}
        slide={slide}
        onTabChange={handleTabChange}
        onSlideChange={handleSlideChange}
      />

      {/* Data success */}
      {result?.data && (
        <Content
          data={result.data}
          onClick={() => {
            Bridge.navigatePush({
              type: 'webview',
              url: `xx?title=${encodeURIComponent(encodeURIComponent(title))}`
            })
          }}
        />
      )}

      {/* Data error */}
      {result?.status && (
        <Result status={String(result.status)} title={String(result.message ?? '')} />
      )}
    </>
  )
}

export default DailyCard
