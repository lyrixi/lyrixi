import React, { useState } from 'react'

import {
  LocaleUtil,
  Page,
  ToolBar,
  type InputTextProps,
  type ToolBarSearchActiveProps
} from 'lyrixi-mobile'

import type { HeaderProps } from './types'
import Filter from './Filter'

const locale = LocaleUtil.locale

// 筛选栏
const Header = ({ queryParams, onSearch }: HeaderProps) => {
  const [searchActive, setSearchActive] = useState(false)
  const [searchValue, setSearchValue] = useState(queryParams?.keyword || '')

  const handleSearchBarClick = () => {
    setSearchActive(true)
  }

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
  }

  const handleSearch = (keyword: string) => {
    onSearch?.({ ...queryParams, keyword: keyword })
    setSearchActive(false)
  }

  const handleSearchCancel = () => {
    setSearchActive(false)
  }

  const handleSearchBlur = () => {
    setSearchActive(false)
  }

  return (
    <Page.Header>
      <ToolBar>
        {/* 搜索 — ToolBar subcomponents are structurally untyped; narrow at call site */}
        <ToolBar.Search
          {...({
            placeholder: String(locale('按名称/拼音/拼音首字母查询')),
            value: String(queryParams?.keyword ?? ''),
            readOnly: true,
            onClick: handleSearchBarClick
          } as unknown as InputTextProps)}
        />
        {searchActive && (
          <ToolBar.SearchActive
            {...({
              placeholder: String(locale('按名称/拼音/拼音首字母查询')),
              allowClear: true,
              value: searchValue,
              onChange: handleSearchChange,
              onSearch: handleSearch,
              onCancel: handleSearchCancel,
              onBlur: handleSearchBlur
            } as unknown as ToolBarSearchActiveProps)}
          />
        )}
        {/* 筛选弹窗 */}
        <Filter queryParams={queryParams} onSearch={onSearch} />
      </ToolBar>
    </Page.Header>
  )
}

export default Header
