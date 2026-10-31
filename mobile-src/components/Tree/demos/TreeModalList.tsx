import React, { useState } from 'react'
import { Page, Tree, type TreeItem } from 'lyrixi-mobile'

import { treeDemoList } from './treeDemoList'

export default function TreeModalListDemo() {
  const [value, setValue] = useState<TreeItem[]>([
    { id: 'a', name: 'A文件夹' },
    { id: 'b', name: 'B文件夹' }
  ])

  function handleChange(next: TreeItem | TreeItem[] | null) {
    if (Array.isArray(next)) {
      setValue(next)
      return
    }
    setValue(next ? [next] : [])
  }

  return (
    <Page>
      <Tree.Modal
        open
        title="树选择"
        searchVisible
        checkable
        list={treeDemoList}
        value={value}
        defaultParentAvatarUrl="default"
        defaultLeafAvatarUrl="default"
        onChange={handleChange}
        safeArea
      />
    </Page>
  )
}
