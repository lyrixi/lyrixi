import variableClassNames from './variableClassNames'
import type { FontSize } from './types'

function getFontSizeClass(name: FontSize | string): string {
  return (variableClassNames.fontSizes as string[]).includes(name) ? `lyrixi-font-size-${name}` : ''
}

export default getFontSizeClass
