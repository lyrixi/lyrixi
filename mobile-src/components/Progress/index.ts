import Circle from './Circle'
import Bar from './Bar'

import type { ProgressComponents } from './types/Progress.modules.types'

const Progress = {} as ProgressComponents

Progress.Circle = Circle
Progress.Bar = Bar

export default Progress
