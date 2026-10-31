import variableClassNames from './variableClassNames'
import type { FontColor } from './types'

function getColorClass(name: FontColor | string): string {
  return (variableClassNames.fontColors as string[]).includes(name) ? `lyrixi-color-${name}` : ''
}

export default getColorClass
