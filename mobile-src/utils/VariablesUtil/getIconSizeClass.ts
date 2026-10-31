import variableClassNames from './variableClassNames'
import type { IconSize } from './types'

function getIconSizeClass(name: IconSize | string): string {
  return (variableClassNames.iconSizes as string[]).includes(name) ? `lyrixi-icon-size-${name}` : ''
}

export default getIconSizeClass
