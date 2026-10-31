import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import type { CalendarHeaderProps, CalendarHeaderRef } from './types'

// 内库使用-start
import Icons from '../../icons'
import DOMUtil from './../../utils/DOMUtil'
import Icon from './../Icon'

// 内库使用-end

/* 测试使用-start
import { DOMUtil, Icon, Icons } from 'lyrixi-mobile'
测试使用-end */

// 日历头部
const Header = forwardRef<CalendarHeaderRef, CalendarHeaderProps>(
  (
    {
      // Value & Display Value
      id,
      className,
      onPreviousMonth,
      onNextMonth,
      onPreviousYear,
      onNextYear,
      children,
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

    return (
      <div
        id={id}
        ref={rootRef}
        style={style}
        className={DOMUtil.classNames('lyrixi-calendar-header', className)}
      >
        <div
          id={id ? `${id}-previous-year` : undefined}
          className="lyrixi-calendar-previous-year"
          onClick={onPreviousYear}
        >
          <Icon svg={Icons.ArrowLeft} color="tertiary" size="xxxs" />
          <Icon svg={Icons.ArrowLeft} color="tertiary" size="xxxs" style={{ marginLeft: '-4px' }} />
        </div>
        <div
          id={id ? `${id}-previous-month` : undefined}
          className="lyrixi-calendar-previous-month"
          onClick={onPreviousMonth}
        >
          <Icon svg={Icons.ArrowLeft} color="tertiary" size="xxxs" />
        </div>
        <div className="lyrixi-calendar-title">{children}</div>
        <div
          id={id ? `${id}-next-month` : undefined}
          className="lyrixi-calendar-next-month"
          onClick={onNextMonth}
        >
          <Icon svg={Icons.ArrowRight} color="tertiary" size="xxxs" />
        </div>
        <div
          id={id ? `${id}-next-year` : undefined}
          className="lyrixi-calendar-next-year"
          onClick={onNextYear}
        >
          <Icon
            svg={Icons.ArrowRight}
            color="tertiary"
            size="xxxs"
            style={{ marginRight: '-4px' }}
          />
          <Icon svg={Icons.ArrowRight} color="tertiary" size="xxxs" />
        </div>
      </div>
    )
  }
)

export default Header
