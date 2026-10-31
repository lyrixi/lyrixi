import getClassNameByAnimation from '../api/getClassNameByAnimation'
import DropdownModal from '../DropdownModal'
import FilterModal from '../FilterModal'
import Modal from '../Modal'
import NavBarModal from '../NavBarModal'

export type ModalComponents = typeof Modal & {
  NavBarModal: typeof NavBarModal
  DropdownModal: typeof DropdownModal
  FilterModal: typeof FilterModal
  getClassNameByAnimation: typeof getClassNameByAnimation
}
