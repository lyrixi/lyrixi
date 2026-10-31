import { getTitle, getDefaultRanges, getRangeId } from '../utils'

import Combo from '../Combo'
import Modal from '../Modal'
import Main from '../Main'
import MultipleCombo from '../MultipleCombo'
import MultipleModal from '../MultipleModal'
import MultipleMain from '../MultipleMain'
import RangeCombo from '../RangeCombo'
import RangeModal from '../RangeModal'
import RangeMain from '../RangeMain'
import RangeSelector from '../RangeSelector'
import WeekCombo from '../WeekCombo'
import WeekModal from '../WeekModal'
import WeekMain from '../WeekMain'
import TypeSwitcher from '../TypeSwitcher'

export type DatePickerComponents = {
  getTitle: typeof getTitle
  getDefaultRanges: typeof getDefaultRanges
  getRangeId: typeof getRangeId
  Combo: typeof Combo
  Modal: typeof Modal
  Main: typeof Main
  MultipleCombo: typeof MultipleCombo
  MultipleModal: typeof MultipleModal
  MultipleMain: typeof MultipleMain
  RangeCombo: typeof RangeCombo
  RangeModal: typeof RangeModal
  RangeMain: typeof RangeMain
  RangeSelector: typeof RangeSelector
  WeekCombo: typeof WeekCombo
  WeekModal: typeof WeekModal
  WeekMain: typeof WeekMain
  TypeSwitcher: typeof TypeSwitcher
}
