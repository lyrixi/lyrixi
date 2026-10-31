import { getTitle, getDefaultRanges, getRangeId } from './utils'

import Combo from './Combo'
import Modal from './Modal'
import Main from './Main'
import MultipleCombo from './MultipleCombo'
import MultipleModal from './MultipleModal'
import MultipleMain from './MultipleMain'
import RangeCombo from './RangeCombo'
import RangeModal from './RangeModal'
import RangeMain from './RangeMain'
import RangeSelector from './RangeSelector'
import WeekCombo from './WeekCombo'
import WeekModal from './WeekModal'
import WeekMain from './WeekMain'
import TypeSwitcher from './TypeSwitcher'

import type { DatePickerComponents } from './types/DatePicker.modules.types'

const DatePicker = {} as DatePickerComponents

DatePicker.getTitle = getTitle
DatePicker.getDefaultRanges = getDefaultRanges
DatePicker.getRangeId = getRangeId
DatePicker.Combo = Combo
DatePicker.Modal = Modal
DatePicker.Main = Main
DatePicker.MultipleCombo = MultipleCombo
DatePicker.MultipleModal = MultipleModal
DatePicker.MultipleMain = MultipleMain
DatePicker.RangeCombo = RangeCombo
DatePicker.RangeModal = RangeModal
DatePicker.RangeMain = RangeMain
DatePicker.RangeSelector = RangeSelector
DatePicker.WeekCombo = WeekCombo
DatePicker.WeekModal = WeekModal
DatePicker.WeekMain = WeekMain
DatePicker.TypeSwitcher = TypeSwitcher

export default DatePicker
