import React from 'react'
import { Page, Chat } from 'lyrixi-mobile'

export default function ChatItemDemo() {
  return (
    <Page>
      <Page.Main>
        <Chat.Item
          avatarUrl="https://api.dicebear.com/7.x/miniavs/svg"
          authorRender={() => '用户名'}
          content="这是一条聊天消息内容"
          placement="left"
        />
        <Chat.Item
          avatarUrl="https://api.dicebear.com/7.x/miniavs/svg"
          authorRender={() => '用户名'}
          content="这是一条聊天消息内容"
          placement="right"
        />
      </Page.Main>
    </Page>
  )
}
