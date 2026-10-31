import Months from './Months'

import type {
  CalendarUtilsSlideYOp,
  CalendarUtilsSlideYParams
} from './Calendar.utils.slideY.types'

// 上下拉动
function slideY(op: CalendarUtilsSlideYOp, params: CalendarUtilsSlideYParams) {
  const { duration, currentPage, drawDate, cellHeight, bodyHeight, body, bodyY } = params
  if (!body || !bodyY) {
    return
  }

  body.style.transitionDuration = duration + 'ms'

  let height: number | string
  let translateY: number | string
  const drawDateRowIndex = drawDate ? Months.getDateRowIndex(drawDate, currentPage) : 0

  if (op === 'expand') {
    height = bodyHeight
    translateY = 0
    bodyY.setAttribute('data-translateY', String(translateY))
  } else if (op === 'collapse') {
    height = cellHeight

    translateY = -drawDateRowIndex * cellHeight
    bodyY.setAttribute('data-translateY', String(translateY))
  } else {
    const h = body.getAttribute('data-height')
    const t = bodyY.getAttribute('data-translateY')
    height = h !== null && h !== '' ? h : '0'
    translateY = t !== null && t !== '' ? t : 0
  }
  body.style.height = (typeof height === 'number' ? String(height) : height) + 'px'
  bodyY.style.transform = 'translateY(' + translateY + 'px)'

  setTimeout(() => {
    body.style.transitionDuration = '0ms'

    body.removeAttribute('data-height')
  }, duration)
}

export default slideY
