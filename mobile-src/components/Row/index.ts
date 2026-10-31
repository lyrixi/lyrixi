import _Row from './Row'
import Col from './Col'

import type { RowComponents } from './types/Row.modules.types'

const Row = _Row as RowComponents

Row.Col = Col

export default Row
