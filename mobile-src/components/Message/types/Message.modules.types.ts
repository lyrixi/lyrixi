import Combo from '../Combo'
import Modal from '../Modal'
import Main from '../Main'
import open from '../api/open'
import close from '../api/close'

export type MessageComponents = {
  Combo: typeof Combo
  Modal: typeof Modal
  Main: typeof Main
  open: typeof open
  close: typeof close
}
