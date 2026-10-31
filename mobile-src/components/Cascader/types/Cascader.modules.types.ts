import Combo from '../Combo'
import Modal from '../Modal'
import Main from '../Main'
import DistrictCombo from '../DistrictCombo'
import DistrictModal from '../DistrictModal'
import DistrictMain from '../DistrictMain'
import * as districtUtils from '../DistrictMain/utils'

export type CascaderComponents = {
  Combo: typeof Combo
  Modal: typeof Modal
  Main: typeof Main
  DistrictCombo: typeof DistrictCombo
  DistrictModal: typeof DistrictModal
  DistrictMain: typeof DistrictMain
  districtUtils: typeof districtUtils
}
