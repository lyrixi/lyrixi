import _Tooltip from './Tooltip'
import updatePositionByReferenceElement from './api/updatePositionByReferenceElement'

import type { TooltipComponents } from './types/Tooltip.modules.types'

const Tooltip = _Tooltip as TooltipComponents
Tooltip.updatePositionByReferenceElement = updatePositionByReferenceElement

export default Tooltip
