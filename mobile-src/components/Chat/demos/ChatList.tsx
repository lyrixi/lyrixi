import React from 'react'
import { Page, Chat, type ChatItem } from 'lyrixi-mobile'

const ChatListDemo = () => {
  const list: ChatItem[] = [
    {
      id: '1',
      placement: 'left',
      avatarUrl: 'https://api.dicebear.com/7.x/miniavs/svg',
      name: '用户A',
      content: '这是一条来自用户A的消息',
      time: new Date()
    },
    {
      id: '2',
      placement: 'right',
      avatarUrl: 'https://api.dicebear.com/7.x/miniavs/svg',
      name: '我',
      content: '这是一条我发送的消息',
      time: new Date()
    }
  ]

  // 使用 formatViewItem 格式化单个项
  function formatViewItem(item: ChatItem, { index }: { index: number }): ChatItem {
    return {
      ...item,
      authorRender: () => (typeof item.name === 'string' ? item.name : null) || `用户${index + 1}`
    }
  }

  return (
    <Page>
      <Page.Main>
        <Chat.List list={list} formatViewItem={formatViewItem} />
      </Page.Main>
    </Page>
  )
}

export default ChatListDemo
