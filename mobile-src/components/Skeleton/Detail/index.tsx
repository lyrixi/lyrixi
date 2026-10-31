import React from 'react'

import type { SkeletonDetailProps } from '../types'

import Paragraph from './../components/Paragraph'
import Tabs from './../components/Tabs'

// 内库使用-start
import Page from './../../Page'
// 内库使用-end

const Detail = ({
  // Value & Display Value
  id,
  listLength = 2,
  itemLength = 10,

  // Status
  animated,
  safeArea,

  // Style
  className,
  style,
  divider,
  animation
}: SkeletonDetailProps) => {
  return (
    <Page
      id={id}
      // Status
      safeArea={safeArea}
      // Style
      className={className}
      style={style}
      animation={animation}
    >
      <Page.Main className="lyrixi-overflow-hidden">
        <Paragraph
          divider={divider}
          titleStyle={{
            width: '100px'
          }}
          avatarClassName=""
        />
        <Tabs />
        {Array.from({ length: listLength }).map((_, index) => (
          <Paragraph
            divider={divider}
            key={index}
            length={itemLength}
            animated={animated}
            oddStyle={{ width: '73px' }}
          />
        ))}
      </Page.Main>
    </Page>
  )
}

export default Detail
