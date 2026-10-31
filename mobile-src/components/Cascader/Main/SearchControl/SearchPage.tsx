import React, { useState, type ReactNode } from 'react'
import type { CascaderItem } from './../../types'
import type {
  CascaderMainSearchPagePathNode,
  CascaderMainSearchPageProps,
  CascaderMainSearchPageSearchActiveBarProps,
  CascaderMainSearchPageSearchResult
} from './Cascader.Main.SearchControl.SearchPage.types'
// 内库使用-start
import ArrayUtil from './../../../../utils/ArrayUtil'
import LocaleUtil from '../../../../utils/LocaleUtil'
import Page from './../../../Page'
import ToolBar from './../../../ToolBar'
import SearchActive from './../../../ToolBar/SearchActive'
import Result from './../../../Result'
import List from './../../../List'
import Text from './../../../Text'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, ArrayUtil, Page, ToolBar, Result, List, Text } from 'lyrixi-mobile'
测试使用-end */

// 搜索页面
const SearchPage = ({
  list: externalList,
  onSearch,
  onChange,
  onClose
}: CascaderMainSearchPageProps) => {
  const [result, setResult] = useState<CascaderMainSearchPageSearchResult | null>(null)
  const [keyword, setKeyword] = useState('')

  async function handleSearch(newKeyword: string) {
    setKeyword(newKeyword)
    if (typeof onSearch === 'function') {
      const newResult = await onSearch(newKeyword, { list: externalList })
      if (newResult !== null && newResult !== undefined) {
        setResult(newResult)
      }
      return
    }

    const currentList =
      newKeyword && newKeyword.trim()
        ? ArrayUtil.getDeepTreeNodes(externalList as never, (node) => {
            return String((node as CascaderItem).name).includes(newKeyword)
          })
        : []

    if (currentList.length > 0) {
      setResult({
        status: 'success',
        message: '',
        data: {
          list: (currentList as CascaderMainSearchPagePathNode[]).map((node) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { children, ...restNode } = node
            const path = (
              ArrayUtil.getDeepTreePredecessorNodes(
                externalList as never,
                (node as CascaderItem).id
              ) as CascaderItem[]
            ).concat(node as CascaderItem)
            return {
              ...restNode,
              path
            }
          })
        }
      })
    } else {
      setResult({
        status: 'empty',
        message: !newKeyword?.trim?.()
          ? LocaleUtil.locale('请输入关键字', 'lyrixi_db91cb073ee4c9b76289e93ae2b4aa04')
          : LocaleUtil.locale('暂无数据', 'lyrixi_21efd88b67a39834582ad99aabb9dc60'),
        data: { list: [] }
      })
    }
  }

  if (!Array.isArray(externalList) || !externalList.length) {
    return null
  }

  function renderList() {
    const list = result?.data?.list
    if (result !== null && Array.isArray(list) && list.length > 0) {
      return (
        <List
          list={list.map((node) => {
            const pathName = (node.path ?? [])
              .map((option) => {
                return (option as CascaderItem).name
              })
              .join('/')
            return {
              id: node.id,
              path: node.path,
              title: <Text highlight={keyword}>{pathName}</Text>
            }
          })}
          onChange={(item) => {
            if (
              item !== null &&
              !Array.isArray(item) &&
              Array.isArray((item as { path?: CascaderItem[] }).path)
            ) {
              onChange?.((item as { path: CascaderItem[] }).path)
            }
          }}
        />
      )
    }

    if (result === null || result === undefined || result?.status !== 'success') {
      return (
        <Result
          title={
            (result?.message as ReactNode) ||
            LocaleUtil.locale('请输入关键字', 'lyrixi_db91cb073ee4c9b76289e93ae2b4aa04')
          }
          status={result?.status || 'empty'}
          className="lyrixi-cascader-main-result"
        />
      )
    }
    return null
  }

  return (
    <Page className="lyrixi-cascader-search-page">
      <Page.Header className="lyrixi-cascader-search-header">
        <ToolBar variant="filled">
          <SearchActive
            {...({
              value: keyword,
              compositionEndEnabled: true,
              allowClear: true,
              onChange: handleSearch,
              onCancel: () => {
                onClose?.()
              }
            } as unknown as CascaderMainSearchPageSearchActiveBarProps)}
          />
        </ToolBar>
      </Page.Header>

      <Page.Main>{renderList()}</Page.Main>
    </Page>
  )
}

export default SearchPage
