import React, { type ReactNode } from 'react'

// 转换 API 返回数据为页面所需格式
function localData(result: unknown) {
  const r = result as { rows?: Array<Record<string, unknown>>; totalPage?: number }
  if (!r?.rows) return null

  let list = r.rows.map((item) => {
    return {
      id: item.id,
      // 左侧图片
      imageUrl: item.imageUrl || '',
      // 头像
      avatarUrl: item.avatarUrl || '',
      // 第一行文字
      title: item.name,
      // 第二行文字
      description: item.description,
      // 第一行右上角文字
      note: item.note,
      // 第三行文字
      content: item.content,
      // 右侧操作按钮
      actionRender: ({ item: row }: { item: Record<string, unknown> }) => {
        return <div>Click {row.name as ReactNode}</div>
      },
      // 原始数据
      item: item
    }
  })

  return {
    list: list,
    totalPage: r.totalPage
  }
}

export default localData
