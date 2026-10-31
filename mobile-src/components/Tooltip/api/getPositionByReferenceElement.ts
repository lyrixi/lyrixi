import type { TooltipGetPositionByReferenceParams, TooltipPosition } from './../types'

// 内库使用-start
import getClassNameByAnimation from './../../Modal/api/getClassNameByAnimation'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'lyrixi-mobile'
const getClassNameByAnimation = Modal.getClassNameByAnimation
测试使用-end */

// 根据源位置计算弹框位置
function getPositionByReferenceElement({
  referenceElement,
  animation
}: TooltipGetPositionByReferenceParams): TooltipPosition | null {
  if (
    !referenceElement ||
    Object.prototype.toString.call(referenceElement).indexOf('[object HTML') === -1
  )
    return null
  // 获取子元素的位置
  let rect = referenceElement.getBoundingClientRect()
  let top: number | null = null
  let bottom: number | null = null
  let left: number | null = null
  let right: number | null = null
  // 根据不同位置的弹窗，计算位置
  // position 形如 lyrixi-bottom-left / lyrixi-top-center，不能用 indexOf === 0
  let position = getClassNameByAnimation(animation)
  // 从下往上弹
  if (position.includes('bottom')) {
    bottom = window.innerHeight - rect.top
  }
  // 从上往下弹
  else {
    top = rect.top + rect.height
  }

  // 左侧弹出
  if (position.indexOf('left') !== -1) {
    left = rect.left
  }
  // 右侧弹出
  else if (position.indexOf('right') !== -1) {
    right = window.innerWidth - rect.left - rect.width
  }
  return {
    bottom,
    top,
    left,
    right
  }
}

export default getPositionByReferenceElement
