import React, { useRef, forwardRef, useImperativeHandle } from 'react'

import StepHorizontalCenter from './StepHorizontalCenter'
import StepHorizontalLeft from './StepHorizontalLeft'
import StepVerticalCenter from './StepVerticalCenter'
import StepVerticalLeft from './StepVerticalLeft'

import type { StepsItem, StepsProps, StepsRef } from './types'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

// 步骤条
const Steps = forwardRef<StepsRef, StepsProps>(
  (
    {
      value,
      list,

      // Style
      style,
      className,
      iconSize = 8,
      align = 'center',
      direction = 'vertical'
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)

    // Expose
    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    // 获取每项的状态
    function getItemStatus(item: StepsItem, index: number): string {
      // 没有索引, 也没有id, 则没有选中项
      if (typeof value?.index !== 'number' && !value?.id) return 'wait'

      let activeStatus = value?.status || 'active'

      // 根据id判断选中项
      if (value?.id) {
        if (item?.id === value?.id) {
          if (value) value.activeIndex = index
          return activeStatus
        }

        if (!value?.activeIndex) {
          return 'finish'
        }

        return 'wait'
      }

      // 根据索引判断选中项
      if (typeof value?.index === 'number') {
        return index < value.index ? 'finish' : value.index === index ? 'active' : 'wait'
      }

      return 'wait'
    }

    // 获取Step
    function renderStep(item: StepsItem, index: number, params: Record<string, unknown>) {
      if (direction === 'vertical') {
        if (align === 'center') {
          return <StepVerticalCenter key={index} {...params} />
        }
        if (align === 'left') {
          return <StepVerticalLeft key={index} {...params} />
        }
      }
      if (direction === 'horizontal') {
        if (align === 'center') {
          return <StepHorizontalCenter key={index} {...params} />
        }
        if (align === 'left') {
          return <StepHorizontalLeft key={index} {...params} />
        }
      }
      return null
    }

    return (
      <div
        style={
          {
            ...style,
            '--lyrixi-steps-title-height':
              typeof iconSize === 'number' && iconSize > 24 ? iconSize + 'px' : '24px',
            '--lyrixi-steps-icon-size': typeof iconSize === 'number' ? iconSize + 'px' : '8px'
          } as React.CSSProperties
        }
        className={DOMUtil.classNames(
          'lyrixi-steps',
          className,
          align ? `lyrixi-steps-${align}` : 'lyrixi-steps-center',
          direction ? `lyrixi-steps-${direction}` : 'lyrixi-steps-vertical'
        )}
        ref={rootRef}
      >
        {Array.isArray(list) &&
          list.map((item, index) => {
            return renderStep(item, index, {
              iconChildren: iconSize >= 24 ? '' + index : '',
              icon: item?.icon,
              rail: index < list.length - 1,
              status: item?.status || getItemStatus(item, index),
              title: item?.title,
              description: item?.description
            })
          })}
      </div>
    )
  }
)

export default Steps
