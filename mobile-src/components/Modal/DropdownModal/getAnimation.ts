import type { ModalAnimation } from '../types'

function getAnimation(
  left: string | number | undefined | null,
  right: string | number | undefined | null
): ModalAnimation {
  if (left !== null && left !== undefined) {
    return 'slideDownLeft'
  }
  if (right !== null && right !== undefined) {
    return 'slideDownRight'
  }
  return 'slideDown'
}

export default getAnimation
