import type { TooltipUpdatePositionParams } from './../types'

import getPositionByReferenceElement from './getPositionByReferenceElement'
import getRelativePosition from './getRelativePosition'

// 修改元素位置相对于参考元素的定位
function updatePositionByReferenceElement(
  current: HTMLElement,
  params: TooltipUpdatePositionParams = {}
) {
  const {
    referenceElement,
    parentElement,
    animation = '',
    bottom,
    top,
    left,
    right,
    offset
  } = params
  // 自动计算位置
  let position =
    referenceElement && parentElement
      ? getRelativePosition({ targetElement: referenceElement, parentElement, animation })
      : getPositionByReferenceElement({ referenceElement: referenceElement || null, animation })

  if (!position) return

  // 自定义位置
  if (![undefined, null].includes(bottom as null)) {
    current.style.bottom = String(bottom)
  } else if (![undefined, null].includes(top as null)) {
    current.style.top = String(top)
  }
  // 从下往上弹-计算位置
  else if (typeof position.bottom === 'number') {
    current.style.bottom = parseInt(String(position.bottom + (offset?.bottom || 0))) + 'px'
  }
  // 从上往下弹
  else if (typeof position.top === 'number') {
    current.style.top = parseInt(String(position.top + (offset?.top || 0))) + 'px'
  }

  // 自定义位置
  if (![undefined, null].includes(left as null)) {
    current.style.left = String(left)
  } else if (![undefined, null].includes(right as null)) {
    current.style.right = String(right)
  }
  // 左右弹出-计算位置
  // 左侧弹出
  else if (typeof position.left === 'number') {
    current.style.left = parseInt(String(position.left + (offset?.left || 0))) + 'px'
  }
  // 右侧弹出
  else if (typeof position.right === 'number') {
    current.style.right = parseInt(String(position.right + (offset?.right || 0))) + 'px'
  }
}

export default updatePositionByReferenceElement
