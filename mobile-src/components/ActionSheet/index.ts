import Combo from './Combo'
import Modal from './Modal'
import Main from './Main'

import open from './api/open'
import close from './api/close'

import type { ActionSheetComponents } from './types/ActionSheet.modules.types'

const ActionSheet = {} as ActionSheetComponents

ActionSheet.Combo = Combo
ActionSheet.Modal = Modal
ActionSheet.Main = Main
ActionSheet.open = open
ActionSheet.close = close

export default ActionSheet
