import React, { useState } from 'react'
import { Page, ToolBar, Card } from 'lyrixi-mobile'

export default function ToolBarSearchActiveDemo() {
  const [keyword, setKeyword] = useState('')
  const [keywordComposition, setKeywordComposition] = useState('')

  return (
    <Page>
      <Page.Main>
        <Card style={{ marginBottom: '16px' }}>
          <Card.Header>普通示例</Card.Header>
          <Card.Main>
            <ToolBar.SearchActive
              value={keyword}
              placeholder="搜索"
              onChange={(val) => setKeyword(val)}
              onSearch={(val) => console.log('搜索:', val)}
              onCancel={() => setKeyword('')}
              allowClear
            />
            {keyword ? (
              <div style={{ padding: '12px', fontSize: '14px', color: '#666' }}>
                当前关键词: {keyword}
              </div>
            ) : null}
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>compositionEndEnabled 示例（输入法落字后触发 onChange）</Card.Header>
          <Card.Main>
            <ToolBar.SearchActive
              value={keywordComposition}
              compositionEndEnabled
              placeholder="可输入中文测试，落字后触发"
              onChange={(val) => {
                console.log('ToolBar.SearchActive onChange:', val)
                setKeywordComposition(val)
              }}
              onSearch={(val) => console.log('搜索:', val)}
              onCancel={() => setKeywordComposition('')}
              allowClear
            />
            {keywordComposition ? (
              <div style={{ padding: '12px', fontSize: '14px', color: '#666' }}>
                当前关键词: {keywordComposition}
              </div>
            ) : null}
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}
