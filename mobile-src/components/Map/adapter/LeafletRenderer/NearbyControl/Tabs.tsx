import React from 'react'
import getTabs from './utils/getTabs'

import type { MapNearbyControlTabsProps } from './Map.NearbyControl.Tabs.types'

// 内库使用-start
import Button from './../../../../Button'
// 内库使用-end

/* 测试使用-start
import { Button } from 'lyrixi-mobile'
测试使用-end */

// 选项卡
function Tabs({ tab, onChange }: MapNearbyControlTabsProps) {
  const tabs = getTabs()
  return (
    <div className="lyrixi-map-nearbyControl-tabs">
      {tabs.map((item, index) => {
        return (
          <Button
            key={index}
            id={typeof item.id === 'string' ? item.id : undefined}
            variant="filled"
            color={tab.name === item.name ? 'primary' : 'default'}
            size="s"
            radius="s"
            onClick={() => {
              onChange(item)
            }}
          >
            {item.name}
          </Button>
        )
      })}
    </div>
  )
}

export default Tabs
