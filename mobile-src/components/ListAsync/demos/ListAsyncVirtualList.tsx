import React, { useRef, useState } from 'react'
import { Page, ListAsync, FooterBar, type ListAsyncRef } from 'lyrixi-mobile'
import listData from './listData'

// 虚拟滚动列表：传入 virtual={{ getItemHeight }}，列表项高度需固定以便计算可视区
const ITEM_HEIGHT = 72

export default function ListAsyncVirtualListDemo() {
  const mainRef = useRef<ListAsyncRef>(null)
  const [value, setValue] = useState<Record<string, unknown> | Record<string, unknown>[] | null>(
    null
  )

  function handleScrollToLocation(id: string) {
    mainRef.current?.scrollToLocation?.({ id })
  }

  return (
    <Page>
      <ListAsync
        ref={mainRef}
        itemLayout="vertical"
        value={value}
        virtual={{
          getItemHeight: () => ITEM_HEIGHT
        }}
        loadData={() =>
          Promise.resolve({
            status: 'noMore',
            message: '没有更多了',
            data: { list: listData }
          })
        }
        onChange={(v) => setValue(v)}
        onItemVisibleChange={(item) => {
          console.log('onItemVisibleChange', item)
        }}
        checkable
        allowClear
      />
      <Page.Footer>
        <FooterBar>
          <FooterBar.Button block variant="filled" onClick={() => handleScrollToLocation('1')}>
            滚动到第 1 项
          </FooterBar.Button>
          <FooterBar.Button block variant="filled" onClick={() => handleScrollToLocation('20')}>
            滚动到第 20 项
          </FooterBar.Button>
          <FooterBar.Button
            block
            variant="solid"
            color="primary"
            onClick={() => handleScrollToLocation('40')}
          >
            滚动到第 40 项
          </FooterBar.Button>
        </FooterBar>
      </Page.Footer>
    </Page>
  )
}
