import React, { useState, forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import {
  getTitle,
  formatDrawDate,
  isDisabledDate,
  isCurrentDate,
  slideX,
  slideY,
  sortRangeValue,
  Months
} from './utils'
import Header from './Header'
import WeekHeader from './WeekHeader'
import Body from './Body'

import type { CalendarRef, CalendarProps, CalendarCellDate, CalendarType } from './types'

// 内库使用-start
import DOMUtil from './../../utils/DOMUtil'
import DateUtil from './../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DOMUtil, DateUtil } from 'lyrixi-mobile'
测试使用-end */

const cellHeight = 40
const duration = 300

const Calendar = forwardRef<CalendarRef, CalendarProps>(
  (
    {
      // Modal: Status
      open,
      // Value & Display Value
      id,
      value,
      selectionMode, // single | multiple | range
      type = 'month', // week | month
      weekStart = 'Monday', // Monday | Sunday

      // Style
      style,
      className,

      // Status
      min, // 禁用之前日期
      max, // 禁用之后日期
      allowClear = true, // 是否允许清空
      draggable = ['horizontal', 'vertical'], // 是否允许垂直拖动

      // Elements
      titleRender,
      // 头部渲染
      headerRender,
      // 单个日期渲染
      dateRender,
      // Event: click date
      onChange,
      // Event: page change
      onPageChange,
      // Event: view change
      onError
    }: CalendarProps,
    ref: React.ForwardedRef<CalendarRef>
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)

    const [drawDate, setDrawDate] = useState<Date | null>(null)

    const [pages, setPages] = useState<CalendarCellDate[][][] | null>(null)

    const [currentType, setCurrentType] = useState<CalendarType | null>(null)

    useEffect(() => {
      const newDrawDate = formatDrawDate(value, { min, max })
      setDrawDate(newDrawDate)
      // eslint-disable-next-line
    }, [value])

    useEffect(() => {
      if (drawDate === null || drawDate === undefined || !(drawDate instanceof Date)) {
        return
      }

      if (pages && isCurrentDate(drawDate, pages[1])) {
        return
      }

      updatePages(drawDate)
      // eslint-disable-next-line
    }, [drawDate])

    useEffect(() => {
      if (!Array.isArray(pages)) {
        return
      }
      onPageChange?.(drawDate, {
        action: 'change',
        type: currentType,
        pages: pages
      })

      if (!currentType) {
        setCurrentType(type)
        void handleSlideY(type === 'week' ? 'collapse' : 'expand')
      }
      // eslint-disable-next-line
    }, [pages])

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        },
        getCurrentType: () => currentType,
        slideCollapse: async () => {
          await handleSlideY('collapse')
        },
        slideExpand: async () => {
          await handleSlideY('expand')
        },
        slidePrevious: async () => {
          await handlePreviousMonth()
        },
        slideNext: async () => {
          await handleNextMonth()
        }
      }
    })

    async function handleSlideY(action: 'expand' | 'collapse' | '') {
      if (action === 'expand') {
        setCurrentType('month')
      } else if (action === 'collapse') {
        setCurrentType('week')
      }

      slideY(action, {
        duration: duration,
        currentPage: pages?.[1],
        cellHeight: cellHeight,
        bodyHeight: cellHeight * 6,
        drawDate: drawDate,
        body: rootRef.current?.querySelector?.('.lyrixi-calendar-body') as HTMLDivElement | null,
        bodyY: rootRef.current?.querySelector?.('.lyrixi-calendar-body-y') as HTMLDivElement | null
      })
    }

    async function handleSlideX(action: 'previous' | 'next' | '') {
      const newDrawDate = await slideX(action, {
        type: currentType,
        min: min,
        max: max,
        duration: duration,
        currentPage: pages?.[1],
        drawDate: drawDate,
        container: rootRef.current,
        bodyX: rootRef.current?.querySelector?.('.lyrixi-calendar-body-x') as HTMLDivElement | null,
        bodyY: rootRef.current?.querySelector?.('.lyrixi-calendar-body-y') as HTMLDivElement | null,
        cellHeight: cellHeight,
        onError: onError
      })

      return newDrawDate
    }

    async function handlePreviousMonth(e?: React.MouseEvent) {
      e?.stopPropagation()
      const newDrawDate = await handleSlideX('previous')
      setDrawDate(newDrawDate)
    }

    async function handleNextMonth(e?: React.MouseEvent) {
      e?.stopPropagation()
      const newDrawDate = await handleSlideX('next')
      setDrawDate(newDrawDate)
    }

    function handlePreviousYear(e?: React.MouseEvent) {
      e?.stopPropagation()
      if (drawDate === null || drawDate === undefined || !(drawDate instanceof Date)) {
        return
      }
      const lastYear = DateUtil.add(drawDate, -1, 'year')
      const newDrawDate = lastYear

      const err = isDisabledDate(newDrawDate, { min, max })
      if (err) {
        if (err && typeof err === 'object' && 'message' in err) {
          console.log(err.message)
        }
        return
      }

      setDrawDate(newDrawDate)
    }

    function handleNextYear(e?: React.MouseEvent) {
      e?.stopPropagation()
      if (drawDate === null || drawDate === undefined || !(drawDate instanceof Date)) {
        return
      }
      const nextYear = DateUtil.add(drawDate, 1, 'year')
      const newDrawDate = nextYear

      const err = isDisabledDate(newDrawDate, { min, max })
      if (err) {
        if (err && typeof err === 'object' && 'message' in err) {
          console.log(err.message)
        }
        return
      }

      setDrawDate(newDrawDate)
    }

    function updatePages(newDrawDate: Date | null) {
      let d: Date
      if (newDrawDate) {
        d = newDrawDate
      } else {
        const fromValue = Array.isArray(value) ? value[value.length - 1] : value
        d = fromValue instanceof Date ? fromValue : new Date()
      }

      const months = Months.getMonths(d, { weekStart: weekStart })
      if (!months) {
        return
      }
      const newPages = Months.paginateMonths(months, {
        weekStart: weekStart,
        drawDate: d,
        type: currentType
      }) as CalendarCellDate[][][]

      setPages(newPages)
    }

    return (
      <div
        id={id}
        ref={rootRef}
        style={style}
        className={DOMUtil.classNames(
          'lyrixi-calendar',
          className,
          selectionMode ? `lyrixi-calendar-mode-${selectionMode}` : '',
          currentType === 'month' ? 'lyrixi-expand' : 'lyrixi-collapse'
        )}
      >
        {typeof headerRender === 'function' ? (
          headerRender({
            onPreviousMonth: handlePreviousMonth,
            onNextMonth: handleNextMonth,
            onPreviousYear: handlePreviousYear,
            onNextYear: handleNextYear,
            drawDate,
            title: drawDate ? getTitle(drawDate, { type: currentType }) : undefined
          })
        ) : (
          <Header
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onPreviousYear={handlePreviousYear}
            onNextYear={handleNextYear}
          >
            {typeof titleRender === 'function'
              ? titleRender(drawDate, { type: currentType })
              : getTitle(drawDate, { type: currentType })}
          </Header>
        )}
        <WeekHeader weekStart={weekStart} />
        <Body
          id={`${id}-body`}
          open={open}
          pages={pages}
          selectionMode={selectionMode}
          value={value}
          cellHeight={cellHeight}
          min={min}
          max={max}
          draggable={draggable}
          allowClear={allowClear}
          dateRender={dateRender}
          onChange={(date, { action } = { action: 'select' }) => {
            if (action === 'clear') {
              if (selectionMode === 'multiple' && Array.isArray(value)) {
                onChange?.(
                  (value as Date[]).filter(
                    (selectedDate) => DateUtil.compare(selectedDate, date, 'date') !== 0
                  ),
                  { currentDate: date, action: 'clear' }
                )
              } else {
                onChange?.(null, { currentDate: date, action: 'clear' })
              }
              return
            }
            let newValue: typeof value = date

            if (selectionMode === 'range') {
              newValue = sortRangeValue(date, value) as Date[]
              onChange?.(newValue, { currentDate: date, action: 'select' })
            } else if (selectionMode === 'multiple') {
              newValue = [...((value as Date[] | null | undefined) || []), date] as Date[]
              onChange?.(newValue, { currentDate: date, action: 'select' })
            } else {
              onChange?.(newValue, { currentDate: date, action: 'select' })
            }
          }}
          onSlideX={async (slideAction) => {
            if (slideAction === 'previous') {
              await handlePreviousMonth()
            } else if (slideAction === 'next') {
              await handleNextMonth()
            } else {
              await handleSlideX('')
            }
          }}
          onSlideY={async (yAction) => {
            let act: 'expand' | 'collapse' | '' = yAction
            if (!yAction) {
              if (currentType === 'week') {
                act = 'collapse'
              } else {
                act = 'expand'
              }
            }
            if (act === 'expand') {
              await handleSlideY('expand')
            } else if (act === 'collapse') {
              await handleSlideY('collapse')
            }
          }}
          onToggle={(ev) => {
            if (currentType === 'month') {
              void handleSlideY('collapse')
            } else {
              void handleSlideY('expand')
            }
            ev.stopPropagation()
          }}
        />
      </div>
    )
  }
)

export default Calendar
