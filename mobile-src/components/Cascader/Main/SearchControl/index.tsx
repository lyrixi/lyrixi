import React, { useState } from 'react'
import SearchPage from './SearchPage'

// 内库使用-start
import Page from './../../../Page'
import ToolBar from './../../../ToolBar'
import SearchBar from './../../../ToolBar/Search'
// 内库使用-end

/* 测试使用-start
import { Page, ToolBar } from 'lyrixi-mobile'
测试使用-end */

import type {
  CascaderMainSearchControlProps,
  CascaderMainSearchControlSearchBarFieldProps
} from './Cascader.Main.SearchControl.types'

// 搜索
function SearchControl({ list, onSearch, onChange }: CascaderMainSearchControlProps) {
  // 搜索结果页面显隐
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Elements: Search Bar */}
      <Page.Header className="lyrixi-cascader-search-header">
        <ToolBar variant="filled">
          <SearchBar
            {...({
              readOnly: true,
              onClick: () => {
                setOpen(!open)
              }
            } as unknown as CascaderMainSearchControlSearchBarFieldProps)}
          />
        </ToolBar>
      </Page.Header>

      {/* Elements: Search Page */}
      {open && (
        <SearchPage
          // Elements
          list={list}
          // Events
          onSearch={onSearch}
          onClose={() => setOpen(false)}
          onChange={(newValue) => {
            onChange?.(newValue)
            setOpen(false)
          }}
        />
      )}
    </>
  )
}
export default SearchControl
