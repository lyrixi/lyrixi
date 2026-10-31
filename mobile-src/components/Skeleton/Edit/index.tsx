import React from 'react'

import type { SkeletonEditProps } from '../types'

import Paragraph from './../components/Paragraph'

// 内库使用-start
import Page from './../../Page'
// 内库使用-end

const Edit = ({
  // Value & Display Value
  id,
  listLength = 8,
  itemLength = 6,

  // Status
  animated,
  safeArea,

  // Style
  className,
  style,
  divider,
  animation
}: SkeletonEditProps) => {
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
          <Paragraph
            key={index}
            divider={divider}
            length={itemLength}
            animated={animated}
            titleStyle={{
              width: '75px'
            }}
            oddStyle={{ width: '106px', marginTop: '16px' }}
          />
        ))}
      </Page.Main>
    </Page>
  )
}

export default Edit
