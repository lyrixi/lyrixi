import React from 'react'

import Avatar from './Avatar'
import Item from './Item'
import Title from './Title'

import type { SkeletonParagraphProps } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, LocaleUtil, SafeArea } from 'lyrixi-mobile'
测试使用-end */

const Paragraph = ({
  // Value & Display Value
  id,
  length,
  divider = 'card',

  // Status
  animated = true,

  // Style
  className,
  style,
  avatarVisible,
  avatarClassName,
  avatarStyle,
  titleVisible,
  titleClassName,
  titleStyle,
  itemClassName,
  itemStyle,
  oddClassName,
  oddStyle,
  evenClassName,
  evenStyle
}: SkeletonParagraphProps) => {
  return (
    <div
      id={id}
      // Style
      style={style}
      className={DOMUtil.classNames('lyrixi-skeleton-paragraph', divider, className)}
    >
      {/* Elements: Avatar */}
      {(avatarVisible || avatarClassName || avatarStyle) && (
        <Avatar animated={animated} style={avatarStyle} className={avatarClassName} />
      )}

      {/* Elements: Content */}
      <div className="lyrixi-skeleton-paragraph-content">
        {/* Elements: Title */}
        {(titleVisible || titleClassName || titleStyle) && (
          <Title animated={animated} style={titleStyle} className={titleClassName} />
        )}

        {/* Elements: Items */}
        {Array.from({ length: length ?? 2 }).map((_, index) => {
          const isEven = (index + 1) % 2 === 0
          const currentItemClassName = [itemClassName, isEven ? evenClassName : oddClassName]
            .filter(Boolean)
            .join(' ')
          const currentItemStyle = { ...itemStyle, ...(isEven ? evenStyle : oddStyle) }

          return (
            <Item
              key={index}
              animated={animated}
              style={currentItemStyle}
              className={currentItemClassName}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Paragraph
