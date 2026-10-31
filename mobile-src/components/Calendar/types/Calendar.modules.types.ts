import _Calendar from '../Calendar'
import Header from '../Header'
import isDisabledDate from '../utils/isDisabledDate'

export type CalendarComponents = typeof _Calendar & {
  Header: typeof Header
  isDisabledDate: typeof isDisabledDate
}
