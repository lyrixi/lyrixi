import Text from '../Text'
import getDisplayValue from '../getDisplayValue'

export type TextComponents = typeof Text & {
  getDisplayValue: typeof getDisplayValue
}
