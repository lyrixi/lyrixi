import variableClassNames from './variableClassNames'
import type { FontWeight } from './types'

function getFontWeightClass(name: FontWeight | string): string {
  return (variableClassNames.fontWeights as string[]).includes(name)
    ? `lyrixi-font-weight-${name}`
    : ''
}

export default getFontWeightClass
