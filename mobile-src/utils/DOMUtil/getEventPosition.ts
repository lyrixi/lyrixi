import type { TouchEvent, MouseEvent } from 'react'

/**
 * 获取事件的坐标位置(兼容touch和mouse事件)
 * @param {Event} e - 事件对象
 * @returns {{clientX: number, clientY: number}} 坐标对象
 */
function getEventPosition(e: TouchEvent | MouseEvent) {
  // touchstart & touchmove & touchend
  if ('changedTouches' in e && e.changedTouches[0]) {
    return {
      clientX: e.changedTouches[0].clientX,
      clientY: e.changedTouches[0].clientY
    }
  }

  // 兼容touchmove
  if ('touches' in e && e.touches[0]) {
    return {
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY
    }
  }

  const mouse = e as MouseEvent
  return {
    clientX: mouse.clientX,
    clientY: mouse.clientY
  }
}

export default getEventPosition
