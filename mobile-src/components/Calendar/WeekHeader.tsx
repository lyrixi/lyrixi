import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import type { CSSProperties } from 'react'
import { Weeks } from './utils'

import type { CalendarWeekStart } from './types'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil } from 'lyrixi-mobile'
测试使用-end */

export interface CalendarWeekHeaderRef {
  element: HTMLDivElement | null
}

export interface CalendarWeekHeaderProps {
  // Value & Display Value
  weekStart?: CalendarWeekStart
  // Style
  className?: string
  style?: CSSProperties
}

// 日历周标题
const WeekHeader = forwardRef<CalendarWeekHeaderRef, CalendarWeekHeaderProps>(
  (
    {
      // Value & Display Value
      weekStart = 'Monday',
      // Style
      className,
      style
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    const weekNames = Weeks.getWeekNames(weekStart)

    return (
      <div
        ref={rootRef}
        style={style}
        className={DOMUtil.classNames('lyrixi-calendar-days', className)}
      >
        {weekNames.map((dayName) => {
          return (
            <div key={String(dayName)} className="lyrixi-calendar-day">
              {dayName}
            </div>
          )
        })}
      </div>
    )
  }
)

export default WeekHeader
