import _Modal from './Modal'
import NavBarModal from './NavBarModal'
import DropdownModal from './DropdownModal'
import FilterModal from './FilterModal'

import getClassNameByAnimation from './api/getClassNameByAnimation'

import type { ModalComponents } from './types/Modal.modules.types'

const Modal = _Modal as ModalComponents

Modal.NavBarModal = NavBarModal
Modal.DropdownModal = DropdownModal
Modal.FilterModal = FilterModal
Modal.getClassNameByAnimation = getClassNameByAnimation

export default Modal
