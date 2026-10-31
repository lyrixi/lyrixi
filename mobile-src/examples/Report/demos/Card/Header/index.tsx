import React from 'react'

import { TabBar, ToolBar } from 'lyrixi-mobile'

import type { CardHeaderProps, CardItem } from './types'

// 头部
const Header = ({
  title: _title,
  tabs,
  tab,
  slides,
  slide,
  onTabChange,
  onSlideChange
}: CardHeaderProps) => {
  return (
    <div
      className="lyrixi-border-b"
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <ToolBar.List
        style={{ paddingLeft: 0, height: 48 }}
        left={0}
        placeholder="List"
        value={tab}
        onChange={(value: unknown) => {
          if (Array.isArray(value)) {
            onTabChange(value as CardItem[])
          } else {
            onTabChange([value as CardItem])
          }
        }}
        list={(tabs ?? []) as { id: string; name: string }[]}
      />
      {slides && (
        <TabBar.Slide
          value={slide ?? undefined}
          list={slides}
          onChange={(item) => onSlideChange(item as CardItem)}
        />
      )}
    </div>
  )
}

export default Header
