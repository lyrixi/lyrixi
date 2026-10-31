import Button from '../Button'
import Icon from '../Button/ButtonIcon'
import Text from '../Button/ButtonText'
import Group from '../Group'

export type ButtonComponents = typeof Button & {
  Icon: typeof Icon
  Text: typeof Text
  Group: typeof Group
}
