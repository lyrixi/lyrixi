import type { TooltipGetRelativePositionParams, TooltipPosition } from './../types'

// 内库使用-start
import getClassNameByAnimation from './../../Modal/api/getClassNameByAnimation'
// 内库使用-end

/* 测试使用-start
import { Modal } from 'lyrixi-mobile'
const getClassNameByAnimation = Modal.getClassNameByAnimation
测试使用-end */

/**
 * 计算目标元素相对于参考元素的坐标位置和尺寸
 * @param {HTMLElement} targetElement - 目标元素
 * @param {HTMLElement} parentElement - 参考元素（坐标系基准）
 * @returns {Object} 包含 left, top, width, height 的相对位置对象
 */
function getRelativePosition({
  targetElement,
  parentElement,
  animation
}: TooltipGetRelativePositionParams): TooltipPosition {
  // 获取元素在视口中的绝对位置和尺寸
  const targetRect = targetElement.getBoundingClientRect()
  const parentRect = parentElement.getBoundingClientRect()

  // 计算相对位置
  let rect = {
    left: targetRect.left - parentRect.left, // 水平相对坐标
    top: targetRect.top - parentRect.top, // 垂直相对坐标
    width: targetRect.width, // 目标元素宽度
    height: targetRect.height // 目标元素高度
  }

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

export default getRelativePosition
