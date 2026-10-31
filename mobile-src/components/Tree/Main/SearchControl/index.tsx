import React, { useState } from 'react'
import SearchPage from './SearchPage'

import type { TreeMainSearchControlProps } from './Tree.Main.SearchControl.types'

// 内库使用-start
import Page from '../../../Page'
import ToolBar from '../../../ToolBar'
import SearchBar from '../../../ToolBar/Search'
// 内库使用-end

function SearchControl({
  list,
  loadSearchData,
  value,
  multiple,
  virtual,
  formatViewItem,
  searchAction,
  searchNodeTitle,
  searchGroupTitle,
  footerVisible,
  onChange
}: TreeMainSearchControlProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Page.Header className="lyrixi-tree-search-header">
        <ToolBar variant="filled">
          <SearchBar
            readOnly
            onClick={() => {
              setOpen(!open)
            }}
          />
        </ToolBar>
      </Page.Header>

      {open ? (
        <SearchPage
          list={list}
          loadSearchData={loadSearchData}
          value={value}
          multiple={multiple}
          virtual={virtual}
          formatViewItem={formatViewItem}
          searchAction={searchAction}
          searchNodeTitle={searchNodeTitle}
          searchGroupTitle={searchGroupTitle}
          footerVisible={footerVisible}
          onClose={() => setOpen(false)}
          onChange={onChange}
        />
      ) : null}
    </>
  )
}

export default SearchControl
