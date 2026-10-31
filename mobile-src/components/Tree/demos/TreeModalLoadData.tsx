import React, { useState } from 'react'
import {
  Page,
  Tree,
  Loading,
  type ListLoadResult,
  type TreeItem,
  type TreeLoadDataResult
} from 'lyrixi-mobile'

import { treeDemoLoadData, treeDemoLoadSearchData } from './treeDemoLoadData'

export default function TreeModalLoadDataDemo() {
  const [value, setValue] = useState<TreeItem[]>([
    { id: 'a', name: 'A文件夹' },
    { id: 'b', name: 'B文件夹' }
  ])

  function loadData(node: TreeItem | null): Promise<TreeLoadDataResult> {
    return new Promise((resolve) => {
      Loading.open()
      setTimeout(() => {
        Loading.close()
        treeDemoLoadData(node).then(resolve)
      }, 200)
    })
  }

  function handleChange(next: TreeItem | TreeItem[] | null) {
    if (Array.isArray(next)) {
      setValue(next)
      return
    }
    setValue(next ? [next] : [])
  }

  function loadSearchData(keyword: string): Promise<ListLoadResult> {
    return new Promise((resolve) => {
      Loading.open()
      setTimeout(() => {
        Loading.close()
        treeDemoLoadSearchData(keyword).then(resolve)
      }, 200)
    })
  }

  return (
    <Page>
      <Tree.Modal
        open
        title="树选择"
        searchVisible
        checkable
        loadData={loadData}
        loadSearchData={loadSearchData}
        value={value}
        defaultParentAvatarUrl="default"
        defaultLeafAvatarUrl="default"
        onChange={handleChange}
        safeArea
      />
    </Page>
  )
}
