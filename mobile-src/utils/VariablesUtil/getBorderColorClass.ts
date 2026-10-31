import variableClassNames from './variableClassNames'
import type { BorderColor } from './types'

function getBorderColorClass(name: BorderColor | string): string {
  return (variableClassNames.borderColors as string[]).includes(name)
    ? `lyrixi-border-color-${name}`
    : ''
}

export default getBorderColorClass
