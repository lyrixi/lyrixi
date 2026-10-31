import React, { useState } from 'react'
import { Page, Card, Input } from 'lyrixi-mobile'

export default function InputSearchDemo() {
  const [compositionValue, setCompositionValue] = useState('')
  const [searchValue, setSearchValue] = useState('keyword')
  const [changeValue, setChangeValue] = useState('')
  const [debounceValue, setDebounceValue] = useState('')
  const [debounceLogAt, setDebounceLogAt] = useState('')
  const [keyword, setKeyword] = useState('')
  const [searchedKeyword, setSearchedKeyword] = useState('')
  const [changeLogAt, setChangeLogAt] = useState('')
  const [searchLogAt, setSearchLogAt] = useState('')

  return (
    <Page>
      <Page.Main>
        <Card>
          <Card.Header>compositionEndEnabled（输入法落字后触发 onChange，默认为true）</Card.Header>
          <Card.Main>
            <div style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>
              关闭后，中文输入法下打拼音时每次按键都触发 onChange，不会在落字后才触发。
            </div>
            <Input.Search
              placeholder="可输入中文测试，如输入 wang 选「王」"
              value={compositionValue}
              compositionEndEnabled={false}
              allowClear
              onChange={(val) => {
                console.log('compositionEndEnabled onChange:', val)
                setCompositionValue(val)
              }}
            />
            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              当前值: {compositionValue || '空'}
            </div>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>onSearch</Card.Header>
          <Card.Main>
            <Input.Search
              trim
              precision={2}
              placeholder="Search"
              value={searchValue}
              allowClear
              onSearch={(val) => {
                console.log('onSearch', val)
                setSearchValue(val)
              }}
            />
            Your search keyword: {searchValue}
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>onChange</Card.Header>
          <Card.Main>
            <Input.Search
              placeholder="Type to trigger onChange"
              value={changeValue}
              allowClear
              onChange={(val) => {
                console.log('onChange', val)
                setChangeValue(val)
              }}
            />
            onChange value: {changeValue || 'empty'}
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>debounceDelay</Card.Header>
          <Card.Main>
            <Input.Search
              placeholder="debounceDelay 500ms"
              value={debounceValue}
              debounceDelay={1500}
              allowClear
              onChange={(val) => {
                console.log('debounced onChange', val)
                setDebounceValue(val)
                setDebounceLogAt(new Date().toLocaleTimeString())
              }}
            />
            <div>Debounced value: {debounceValue || 'empty'}</div>
            <div>Last debounced onChange: {debounceLogAt || '-'}</div>
          </Card.Main>
        </Card>

        <Card>
          <Card.Header>onChange & onSearch</Card.Header>
          <Card.Main>
            <Input.Search
              placeholder="Change while typing, search on Enter"
              value={keyword}
              debounceDelay={300}
              allowClear
              onChange={(val) => {
                console.log('onChange', val)
                setKeyword(val)
                setChangeLogAt(new Date().toLocaleTimeString())
              }}
              onSearch={(val) => {
                console.log('onSearch', val)
                setSearchedKeyword(val)
                setSearchLogAt(new Date().toLocaleTimeString())
              }}
            />
            <div>Keyword (onChange, debounced): {keyword || 'empty'}</div>
            <div>Submitted (onSearch): {searchedKeyword || 'empty'}</div>
            <div>Last onChange: {changeLogAt || '-'}</div>
            <div>Last onSearch: {searchLogAt || '-'}</div>
          </Card.Main>
        </Card>
      </Page.Main>
    </Page>
  )
}
