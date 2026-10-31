import variableClassNames from './variableClassNames'
import type { Radius } from './types'

function getRadiusClass(name: Radius | string): string {
  return (variableClassNames.radiuses as string[]).includes(name) ? `lyrixi-radius-${name}` : ''
}

export default getRadiusClass
