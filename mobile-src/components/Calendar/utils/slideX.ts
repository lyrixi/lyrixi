import isDisabledDate from './isDisabledDate'
import Months from './Months'

import type {
  CalendarCellDate,
  CalendarErrorCallback,
  CalendarType,
  IsDisabledError
} from '../types'
import type { CalendarUtilsSlideXOp } from './Calendar.utils.slideX.types'
// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

// 左右滑动
function slideX(
  op: CalendarUtilsSlideXOp,
  {
    type,
    min,
    max,
    duration,
    currentPage,
    drawDate,
    container,
    bodyX,
    bodyY,
    cellHeight,
    onError
  }: {
    type: CalendarType | null
    min?: Date
    max?: Date
    duration: number
    currentPage: CalendarCellDate[][] | undefined
    drawDate: Date | null
    container: HTMLDivElement | null
    bodyX: HTMLDivElement | null
    bodyY: HTMLDivElement | null
    cellHeight: number
    onError?: CalendarErrorCallback
  }
): Promise<Date | null> {
  if (!container || !bodyX || !bodyY || !drawDate) {
    return Promise.resolve(drawDate)
  }

  bodyX.style.transitionDuration = duration + 'ms'

  let translateX = -container.clientWidth
  let newDrawDate: Date | null = drawDate

  if (op === 'previous') {
    translateX = 0

    if (type === 'month') {
      newDrawDate = DateUtil.add(drawDate, -1, 'month')
    } else {
      newDrawDate = DateUtil.add(drawDate, -7)
    }
  } else if (op === 'next') {
    translateX = -container.clientWidth * 2

    if (type === 'month') {
      newDrawDate = DateUtil.add(drawDate, 1, 'month')
    } else {
      newDrawDate = DateUtil.add(drawDate, 7)
    }
  }

  let err: false | IsDisabledError = isDisabledDate(newDrawDate, { min, max })
  if (err) {
    if (typeof onError === 'function') {
      const isOk = onError(err)
      if (isOk === true) {
        err = false
      }
    }
    if (err) {
      if (err && typeof err === 'object' && 'message' in err) {
        // eslint-disable-next-line no-console
        console.log(err.message)
      }
      newDrawDate = drawDate
      translateX = -container.clientWidth
    }
  }

  bodyX.style.transform = 'translateX(' + translateX + 'px)'

  return new Promise((resolve) => {
    setTimeout(() => {
      bodyX.style.transitionDuration = '0ms'

      resolve(newDrawDate)

      setTimeout(() => {
        bodyX.style.transform = 'translateX(' + -container.clientWidth + 'px)'

        let translateY = 0
        if (type === 'month') {
          translateY = 0
        } else if (newDrawDate) {
          const drawDateRowIndex = Months.getDateRowIndex(newDrawDate, currentPage)
          translateY = -drawDateRowIndex * cellHeight
        }
        bodyY.style.transform = 'translateY(' + translateY + 'px)'
        bodyY.setAttribute('data-translateY', String(translateY))
      }, 0)
    }, duration)
  })
}

export default slideX
