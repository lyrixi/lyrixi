import Tooltip from '../Tooltip'
import updatePositionByReferenceElement from '../api/updatePositionByReferenceElement'

export type TooltipComponents = typeof Tooltip & {
  updatePositionByReferenceElement: typeof updatePositionByReferenceElement
}
