import React, { useRef, useState } from 'react'

import type { TreeMainSearchPageProps } from './Tree.Main.SearchControl.SearchPage.types'
import type { TreeItem } from '../../types'
import type { ListAsyncRef, ListLoadResult } from '../../../ListAsync/types'
import type { ListItem } from '../../../List/types'

// 内库使用-start
import ArrayUtil from '../../../../utils/ArrayUtil'
import LocaleUtil from '../../../../utils/LocaleUtil'
import ListAsync from '../../../ListAsync'
import Page from '../../../Page'
import Text from '../../../Text'
import SearchActive from '../../../ToolBar/SearchActive'
import ToolBar from '../../../ToolBar'
// 内库使用-end

const SearchPage = ({
  list: externalList,
  loadSearchData,
  value,
  multiple = true,
  virtual,
  searchAction = 'submit',
  searchNodeTitle,
  searchGroupTitle,
  footerVisible,
  formatViewItem,
  onChange,
  onClose
}: TreeMainSearchPageProps) => {
  const listAsyncRef = useRef<ListAsyncRef | null>(null)
  const keywordRef = useRef('')

  const [keyword, setKeyword] = useState('')
  const locale = LocaleUtil.locale

  // 对搜索结果列表进行分组
  function getGroupList(matchedList: ListItem[]): ListItem[] {
    const nodes = matchedList.filter(
      (item): item is TreeItem =>
        (typeof item.id === 'string' || typeof item.id === 'number') &&
        typeof item.name === 'string'
    )
    const leafList = nodes.filter((item) => item.isLeaf)
    const groupList = nodes.filter((item) => !item.isLeaf)
    const displayList: ListItem[] = []

    if (leafList.length) {
      displayList.push({
        id: 'node',
        type: 'group',
        name:
          searchNodeTitle || (locale('节点', 'lyrixi_3bf3c0a8d631d93aee55e4e47e2b2109') as string)
      })
      displayList.push(...leafList)
    }
    if (groupList.length) {
      displayList.push({
        id: 'group',
        type: 'group',
        name:
          searchGroupTitle || (locale('分组', 'lyrixi_829abe5a8dcd0579a340d20636b59276') as string)
      })
      displayList.push(...groupList)
    }
    return displayList
  }

  async function loadData(): Promise<ListLoadResult> {
    const searchValue = keywordRef.current.trim()

    if (!searchValue) {
      return {
        status: 'empty',
        message: locale('请输入关键字', 'lyrixi_db91cb073ee4c9b76289e93ae2b4aa04') as string,
        data: { list: [] }
      }
    }

    // 在线搜索
    if (typeof loadSearchData === 'function') {
      let result = await loadSearchData(searchValue)
      if (result.status === 'noMore') {
        return {
          status: 'noMore',
          data: { list: getGroupList(result.data?.list ?? []) }
        }
      }
      return result
    }

    // 离线搜索
    const sourceList = Array.isArray(externalList) ? externalList : []
    const matchedList = ArrayUtil.getDeepTreeNodes(
      sourceList as Parameters<typeof ArrayUtil.getDeepTreeNodes>[0],
      (node) => {
        const name = (node as TreeItem).name
        return typeof name === 'string' && name.includes(searchValue)
      }
    ).map((node) => {
      const item = { ...(node as TreeItem) }
      delete item.children
      return item
    })

    if (matchedList.length) {
      return {
        status: 'noMore',
        data: { list: getGroupList(matchedList) }
      }
    }

    return {
      status: 'empty',
      message: locale('暂无数据', 'lyrixi_21efd88b67a39834582ad99aabb9dc60') as string,
      data: { list: [] }
    }
  }

  function handleKeywordChange(newKeyword: string) {
    setKeyword(newKeyword)
    keywordRef.current = newKeyword
    if (searchAction === 'input') {
      listAsyncRef.current?.reload?.('reload')
    }
  }

  function handleSearch(newKeyword: string) {
    setKeyword(newKeyword)
    keywordRef.current = newKeyword
    listAsyncRef.current?.reload?.('reload')
  }

  return (
    <Page className="lyrixi-tree-search-page" style={{ bottom: footerVisible ? '45px' : '0' }}>
      <Page.Header className="lyrixi-tree-search-header">
        <ToolBar variant="filled">
          <SearchActive
            value={keyword}
            compositionEndEnabled
            allowClear
            debounceDelay={searchAction === 'input' ? 500 : undefined}
            onChange={handleKeywordChange}
            onSearch={handleSearch}
            onCancel={onClose}
          />
        </ToolBar>
      </Page.Header>

      <ListAsync
        ref={listAsyncRef}
        className="lyrixi-tree-list"
        initialLoad
        topRefreshEnabled={false}
        bottomRefreshEnabled={false}
        emptyRetry={false}
        loadData={loadData}
        multiple={multiple}
        virtual={virtual}
        value={value}
        formatViewItem={(item, options) => {
          const viewItem = formatViewItem?.(item, options)
          if (!viewItem) {
            return item
          }
          delete viewItem.arrowVisible
          const name = typeof item.name === 'string' ? item.name : ''
          return {
            ...viewItem,
            title: <Text highlight={keyword.trim()}>{name}</Text>
          }
        }}
        onChange={(newValue) => {
          onChange?.(newValue as TreeItem | TreeItem[] | null)
        }}
      />
    </Page>
  )
}

export default SearchPage
