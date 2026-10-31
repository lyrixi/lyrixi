import type { ModalAnimation } from '../types'

// 根据动画判定方向（Tooltip 等仍可能传入 string）
function getClassNameByAnimation(animation?: ModalAnimation | string): string {
  // 构建动画
  let position = ''
  switch (animation) {
    case 'slideLeft':
      position = 'lyrixi-right-middle'
      break
    case 'slideRight':
      position = 'lyrixi-left-middle'
      break
    case 'slideUp':
      position = 'lyrixi-bottom-center'
      break
    case 'slideDown':
      position = 'lyrixi-top-center'
      break
    case 'zoom':
      position = 'lyrixi-middle'
      break
    case 'fade':
      position = 'lyrixi-middle'
      break
    // Tooltip弹窗特有属性
    case 'slideUpLeft':
    case 'zoomUpLeft':
    case 'fadeUpLeft':
      position = 'lyrixi-bottom-left'
      break
    case 'slideDownLeft':
    case 'zoomDownLeft':
    case 'fadeDownLeft':
      position = 'lyrixi-top-left'
      break
    case 'slideUpRight':
    case 'zoomUpRight':
    case 'fadeUpRight':
      position = 'lyrixi-bottom-right'
      break
    case 'slideDownRight':
    case 'zoomDownRight':
    case 'fadeDownRight':
      position = 'lyrixi-top-right'
      break
    default:
      position = 'lyrixi-middle'
  }
  return position
}

export default getClassNameByAnimation
