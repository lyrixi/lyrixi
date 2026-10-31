import React, { useMemo, useRef, useState } from 'react'
import { Page, IndexBar, ListAsync, type ListAsyncRef, type ListItem } from 'lyrixi-mobile'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

function buildList(letters: string[]): ListItem[] {
  const newList: ListItem[] = []
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i]
    newList.push({
      id: letter,
      name: letter,
      letter,
      type: 'group'
    })
    for (let j = 0; j < 12; j++) {
      newList.push({
        id: `${letter}-${j}`,
        name: `${letter}姓人名${j + 1}`,
        letter
      })
    }
  }
  return newList
}

export default function IndexBarDemo() {
  const listRef = useRef<ListAsyncRef>(null)
  const [anchor, setAnchor] = useState<ListItem | null>({ id: 'A', name: 'A' })

  const data = useMemo(() => buildList(LETTERS), [])

  const indexList = useMemo<ListItem[]>(() => {
    return LETTERS.map((letter) => ({ id: letter, name: letter }))
  }, [])

  function handleIndexChange(item: ListItem) {
    setAnchor(item)
    if (item.id === undefined) return
    listRef.current?.scrollToLocation?.({ id: item.id })
  }

  return (
    <Page>
      <ListAsync
        ref={listRef}
        topRefreshEnabled={false}
        bottomRefreshEnabled={false}
        loadData={() =>
          Promise.resolve({
            status: 'noMore',
            data: { list: data }
          })
        }
        formatViewItem={(item) => {
          if (item.type === 'group') {
            return {
              _raw: item,
              id: item.id,
              type: 'group',
              title: item.name
            }
          }
          return {
            _raw: item,
            id: item.id,
            title: item.name
          }
        }}
        onItemVisibleChange={(item) => {
          const next =
            item.type === 'group' ? String(item.id ?? '') : String(item.letter ?? item.anchor ?? '')
          if (next) setAnchor({ id: next, name: next })
        }}
      />
      <IndexBar list={indexList} value={anchor} onChange={handleIndexChange} />
    </Page>
  )
}
