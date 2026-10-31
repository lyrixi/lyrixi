import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react'
import type { TouchEvent, MouseEvent } from 'react'
import { isSelectedDate, isDisabledDate, getTranslateValue } from './../utils'
import Toggle from './../Toggle'

import type { CalendarCellDate } from './../types'
import type {
  CalendarBodyProps,
  CalendarBodyRef,
  CalendarBodyTouchDirection
} from './Calendar.Body.types'
// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil, DOMUtil } from 'lyrixi-mobile'
测试使用-end */

const threshold = 50

// 日历
const Body = forwardRef<CalendarBodyRef, CalendarBodyProps>(
  (
    {
      id,
      // Status
      open,
      // Value & Display Value
      value,
      selectionMode = 'single',
      pages,
      cellHeight,
      min,
      max,
      draggable = ['horizontal', 'vertical'],
      // Status
      allowClear,
      // Elements
      dateRender,
      // Events
      onChange,
      onSlideX,
      onSlideY,
      onToggle
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)

    const bodyXRef = useRef<HTMLDivElement | null>(null)

    const bodyYRef = useRef<HTMLDivElement | null>(null)

    const isDrawingRef = useRef(false)

    const touchesRef = useRef({
      startX: 0,
      startY: 0,
      direction: 0 as CalendarBodyTouchDirection
    })

    useEffect(() => {
      bodyXRef.current = rootRef.current?.querySelector?.(
        '.lyrixi-calendar-body-x'
      ) as HTMLDivElement | null
      bodyYRef.current = rootRef.current?.querySelector?.(
        '.lyrixi-calendar-body-y'
      ) as HTMLDivElement | null
    }, [])

    useEffect(() => {
      isDrawingRef.current = false
      // eslint-disable-next-line
    }, [open])

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    /* --------------------
    Events handle
    -------------------- */
    function handleTouchStart(e: TouchEvent | MouseEvent) {
      e.stopPropagation()

      isDrawingRef.current = true

      if (e.type === 'touchstart') {
        e.currentTarget.addEventListener('touchmove', DOMUtil.preventDefault, false)
      }
      const pos = DOMUtil.getEventPosition(e)
      touchesRef.current.startX = pos.clientX
      touchesRef.current.startY = pos.clientY
    }

    function handleTouchMove(e: TouchEvent | MouseEvent) {
      e.stopPropagation()

      if (!isDrawingRef.current) {
        return
      }

      const pos = DOMUtil.getEventPosition(e)
      const currentX = pos.clientX
      const currentY = pos.clientY
      const diffX = touchesRef.current.startX - currentX
      const diffY = touchesRef.current.startY - currentY

      if (touchesRef.current.direction === 0) {
        touchesRef.current.direction = (
          Math.abs(diffX) > Math.abs(diffY) ? 'horizontal' : 'vertical'
        ) as CalendarBodyTouchDirection
      }
      if (
        draggable?.includes('horizontal') === false &&
        touchesRef.current.direction === 'horizontal'
      ) {
        touchesRef.current.direction = null
      }
      if (
        draggable?.includes('vertical') === false &&
        touchesRef.current.direction === 'vertical'
      ) {
        touchesRef.current.direction = null
      }

      if (touchesRef.current.direction === 'horizontal' && bodyXRef.current) {
        let translateX = bodyXRef.current.getAttribute('data-translateX')
        if (!translateX) {
          translateX = getTranslateValue(bodyXRef.current.style.transform)
          if (translateX) {
            bodyXRef.current.setAttribute('data-translateX', translateX)
          }
        }
        if (!translateX) {
          return
        }
        const numX = Number(translateX)
        if (Number.isNaN(numX)) {
          return
        }
        const moveX = numX - diffX
        bodyXRef.current.style.transform = 'translateX(' + moveX + 'px)'
      } else if (
        touchesRef.current.direction === 'vertical' &&
        rootRef.current &&
        bodyYRef.current
      ) {
        let heightAttr = rootRef.current.getAttribute('data-height')
        if (!heightAttr) {
          const h = rootRef.current.clientHeight
          if (h) {
            rootRef.current.setAttribute('data-height', String(h))
            heightAttr = String(h)
          }
        }
        if (!heightAttr) {
          return
        }
        const height = Number(heightAttr)
        if (Number.isNaN(height)) {
          return
        }
        const moveY = height - diffY
        if (moveY < 40 || moveY > 240) {
          return
        }
        rootRef.current.style.height = moveY + 'px'

        let initTranslateY = bodyYRef.current.getAttribute('data-translateY')
        if (!initTranslateY) {
          const fromTransform = getTranslateValue(bodyYRef.current.style.transform) ?? '0'
          initTranslateY = fromTransform
          bodyYRef.current.setAttribute('data-translateY', fromTransform)
        }
        const translateY = Number(initTranslateY) + moveY - cellHeight
        if (translateY < 0) {
          bodyYRef.current.style.transform = `translateY(${translateY}px)`
        }
      }
    }

    async function handleTouchEnd(e: TouchEvent | MouseEvent) {
      e.stopPropagation()

      isDrawingRef.current = false

      if (e.type === 'touchend') {
        e.currentTarget.removeEventListener('touchmove', DOMUtil.preventDefault, false)
      }

      const pos = DOMUtil.getEventPosition(e)
      const endX = pos.clientX
      const endY = pos.clientY
      const diffX = touchesRef.current.startX - endX
      const diffY = touchesRef.current.startY - endY
      const direction = touchesRef.current.direction

      touchesRef.current.direction = 0

      if (direction === 'horizontal') {
        if (Math.abs(diffX) < threshold) {
          onSlideX?.('')
          return
        }

        if (diffX > 0) {
          onSlideX?.('next')
        } else {
          onSlideX?.('previous')
        }
      } else if (direction === 'vertical') {
        if (Math.abs(diffY) < threshold) {
          onSlideY?.('')
          return
        }
        if (diffY < 0) {
          onSlideY?.('expand')
        } else {
          onSlideY?.('collapse')
        }
      }
    }

    function handleWindowResize() {
      const width = rootRef.current?.parentElement?.clientWidth
      if (!width) {
        return
      }

      const bodyX = rootRef.current?.querySelector?.(
        '.lyrixi-calendar-body-x'
      ) as HTMLDivElement | null
      if (!bodyX) {
        return
      }
      const translatex = bodyX.getAttribute('data-translatex')
      if (Number(translatex)) {
        return
      }

      bodyX.style.transform = `translateX(-${width}px)`
      bodyX.setAttribute('data-translatex', `-${width}`)

      console.log(`Calendar: 更新x轴位移-${width}`)
    }

    requestAnimationFrame(handleWindowResize)

    const pageList = (pages ?? []) as CalendarCellDate[][][]

    return (
      <>
        <div
          id={id}
          ref={rootRef}
          className="lyrixi-calendar-body"
          style={{ height: cellHeight * 6 }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
        >
          <div className="lyrixi-calendar-body-y">
            <div className="lyrixi-calendar-body-x">
              {pageList.map((page, pageIndex) => {
                return (
                  <div className="lyrixi-calendar-page" key={pageIndex}>
                    {page.map((row, rowIndex) => {
                      return (
                        <div className="lyrixi-calendar-row" key={rowIndex}>
                          {row.map((date, dateIndex) => {
                            const isSelected = isSelectedDate(date, value, selectionMode)
                            const selectedClassNames: string[] = []
                            if (isSelected?.includes('lyrixi-selected')) {
                              selectedClassNames.push('lyrixi-selected')
                            }
                            if (isSelected?.includes('lyrixi-selected-start')) {
                              selectedClassNames.push('lyrixi-selected-start')
                            }
                            if (isSelected?.includes('lyrixi-selected-end')) {
                              selectedClassNames.push('lyrixi-selected-end')
                            }
                            const selectedClassString = selectedClassNames.join(' ')

                            const isDisabled = isDisabledDate(date, { min, max })
                            return (
                              <div
                                key={dateIndex}
                                id={id ? `${id}-${DateUtil.format(date, 'date')}` : undefined}
                                className={DOMUtil.classNames(
                                  'lyrixi-calendar-date',
                                  date.isCurrent
                                    ? 'lyrixi-calendar-date-current-month'
                                    : 'lyrixi-calendar-date-out-month',
                                  DateUtil.compare(new Date(), date, 'date') === 0
                                    ? 'lyrixi-calendar-date-today'
                                    : '',
                                  selectedClassString,
                                  isDisabled ? 'lyrixi-calendar-date-disabled' : ''
                                )}
                                style={{ height: cellHeight + 'px' }}
                                onClick={(ev) => {
                                  ev.stopPropagation()
                                  if (
                                    allowClear &&
                                    ev.currentTarget.classList.contains('lyrixi-selected')
                                  ) {
                                    onChange?.(date, { action: 'clear' })
                                    return
                                  }
                                  onChange?.(date, { action: 'select' })
                                }}
                              >
                                {typeof dateRender === 'function' ? (
                                  dateRender(date, {
                                    isSelected,
                                    isDisabled,
                                    isCurrent: date.isCurrent
                                  })
                                ) : (
                                  <div className="lyrixi-calendar-date-num">{date.getDate()}</div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        {draggable.includes('vertical') && (
          <div
            className="lyrixi-calendar-footer"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
          >
            <Toggle id={id} onClick={onToggle} />
          </div>
        )}
      </>
    )
  }
)

export default Body
