import variableClassNames from './variableClassNames'
import type { BackgroundColor } from './types'

function getBgColorClass(name: BackgroundColor | string): string {
  return (variableClassNames.backgroundColors as string[]).includes(name) ? `lyrixi-bg-${name}` : ''
}

export default getBgColorClass
