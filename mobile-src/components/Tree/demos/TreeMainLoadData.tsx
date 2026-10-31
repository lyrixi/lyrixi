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

export default function TreeMainLoadDataDemo() {
  const [value, setValue] = useState<TreeItem[]>([{ id: 'a', name: 'A文件夹' }])

  function loadData(node: TreeItem | null): Promise<TreeLoadDataResult> {
    return new Promise((resolve) => {
      Loading.open()
      setTimeout(() => {
        Loading.close()
        treeDemoLoadData(node).then(resolve)
      }, 200)
    })
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

  function handleChange(next: TreeItem | TreeItem[] | null) {
    if (Array.isArray(next)) {
      setValue(next)
      return
    }
    setValue(next ? [next] : [])
  }

  return (
    <Page style={{ height: 480 }}>
      <Tree.Main
        loadData={loadData}
        loadSearchData={loadSearchData}
        value={value}
        checkable
        searchVisible
        defaultParentAvatarUrl="default"
        defaultLeafAvatarUrl="default"
        onChange={handleChange}
      />
    </Page>
  )
}
