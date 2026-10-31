import React, { useContext, useState } from 'react'
import queryNearby from '../../../utils/queryNearby'
import MapContainerContext from '../MapContainer/MapContainerContext'
import type { MapPointType } from '../../../types'
import type { MapSearchControlPageActiveListComponent } from './Map.SearchControl.Page.ActiveList.types'
import type {
  MapSearchControlPageProps,
  MapSearchControlSearchQueryNearbyResult
} from './Map.SearchControl.Page.types'
// 内库使用-start
import LocaleUtil from './../../../../../utils/LocaleUtil'
import Loading from './../../../../Loading'
import SearchActive from './../../../../ToolBar/SearchActive'
import List from './../../../../List'
import type { ListItem, ListViewItem } from './../../../../List/types'
import Page from './../../../../Page'
import Result from './../../../../Result'
import Text from './../../../../Text'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Loading, ToolBar, List, Page, Result, Text } from 'lyrixi-mobile'
测试使用-end */

const MapSearchActive = SearchActive as unknown as MapSearchControlPageActiveListComponent

function isQueryResult(v: unknown): v is MapSearchControlSearchQueryNearbyResult {
  return typeof v === 'object' && v !== null
}

// 搜索
function SearchPage({ open, onClose, onChange }: MapSearchControlPageProps) {
  const [result, setResult] = useState<MapSearchControlSearchQueryNearbyResult | null>(null)
  const [keyword, setKeyword] = useState('')
  const mapContainerContext = useContext(MapContainerContext)

  function handleBack() {
    setResult(null)
    onClose?.()
  }

  async function handleSearch(keywordVal: string) {
    if (!keywordVal || !mapContainerContext) {
      return
    }
    const center = mapContainerContext.getCenter()
    if (!center) {
      return
    }
    const loadMsg = LocaleUtil.locale('搜索中', 'lyrixi_9bc4c05af0d6d8e8fcad313f7614006b')
    Loading.open({
      content: typeof loadMsg === 'string' ? loadMsg : '…'
    })
    const newResult = (await queryNearby({
      keyword: keywordVal,
      latitude: center.latitude as number,
      longitude: center.longitude as number,
      type: (center.type || 'wgs84') as MapPointType
    })) as unknown
    Loading.close()

    setResult(
      isQueryResult(newResult)
        ? (newResult as MapSearchControlSearchQueryNearbyResult)
        : { status: 'error', message: 'Invalid result' }
    )
  }

  function handleClick(item: unknown) {
    if (onChange) onChange(item)
    handleBack()
  }

  if (!open) {
    return null
  }

  const list = result?.data?.list
  const hasList = Array.isArray(list) && list.length > 0

  return (
    <Page className="lyrixi-map-searchControl-page">
      <Page.Header className="lyrixi-map-searchControl-header">
        <MapSearchActive
          value={keyword}
          allowClear
          onSearch={(kw: string) => {
            setKeyword(kw)
            void handleSearch(kw)
          }}
          onCancel={() => {
            handleBack()
          }}
        />
      </Page.Header>

      <div className="lyrixi-map-searchControl-main">
        {hasList && list ? (
          <List
            list={list}
            onChange={handleClick}
            formatViewItem={(item: ListItem): ListViewItem => {
              const name = typeof item.name === 'string' ? item.name : ''
              const address = typeof item.address === 'string' ? item.address : undefined
              return {
                ...item,
                title: <Text highlight={keyword || ''}>{name}</Text>,
                description: address
              } as ListViewItem
            }}
          />
        ) : null}

        {typeof result?.message === 'string' && (
          <Result
            className="lyrixi-map-main-result"
            status={result?.status || 'error'}
            title={result?.message}
          />
        )}
      </div>
    </Page>
  )
}

export default SearchPage
