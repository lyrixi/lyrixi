import React, { useState } from 'react'
import { Page, Tree, type TreeItem } from 'lyrixi-mobile'

import { treeDemoList } from './treeDemoList'

export default function TreeMainListDemo() {
  const [value, setValue] = useState<TreeItem[]>([{ id: 'a', name: 'A文件夹' }])

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
        list={treeDemoList}
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
