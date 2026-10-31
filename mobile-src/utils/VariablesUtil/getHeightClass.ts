import variableClassNames from './variableClassNames'
import type { Height } from './types'

function getHeightClass(name: Height | string): string {
  return (variableClassNames.heights as string[]).includes(name) ? `lyrixi-height-${name}` : ''
}

export default getHeightClass
