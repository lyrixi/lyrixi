import React, { useState } from 'react'
import { Page, List, Card, Button, Flex } from 'lyrixi-mobile'

export default function ListInfiniteScrollDemo() {
  const [status, setStatus] = useState('loading')

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>List.InfiniteScroll（status: loading | noMore | error）</Card.Header>
          <Card.Main>
            <div style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>
                切换 status 查看样式
              </div>
              <Flex gap={8} wrap>
                <Button size="s" onClick={() => setStatus('loading')}>
                  loading
                </Button>
                <Button size="s" onClick={() => setStatus('noMore')}>
                  noMore
                </Button>
                <Button size="s" onClick={() => setStatus('error')}>
                  error
                </Button>
              </Flex>
            </div>
            <List.InfiniteScroll
              status={status}
              content={status === 'error' ? '加载失败，点击重试' : undefined}
            />
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>List.InfiniteScroll 自定义 content</Card.Header>
          <Card.Main>
            <List.InfiniteScroll status="noMore" content="已经到底啦" />
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}
