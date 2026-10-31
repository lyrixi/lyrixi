import React from 'react'

import type { SkeletonListProps } from '../types'

import Paragraph from './../components/Paragraph'

// 内库使用-start
import Page from './../../Page'
// 内库使用-end

const List = ({
  // Value & Display Value
  id,
  listLength = 8,
  itemLength = 2,

  // Status
  animated,
  safeArea,

  // Style
  className,
  style,
  divider,
  animation
}: SkeletonListProps) => {
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
        {Array.from({ length: listLength }).map((_, index) => (
          <Paragraph divider={divider} key={index} length={itemLength} animated={animated} />
        ))}
      </Page.Main>
    </Page>
  )
}

export default List
