import Combo from './Combo'
import Modal from './Modal'
import Main from './Main'
import DistrictCombo from './DistrictCombo'
import DistrictModal from './DistrictModal'
import DistrictMain from './DistrictMain'
import * as districtUtils from './DistrictMain/utils'

import type { CascaderComponents } from './types/Cascader.modules.types'

const Cascader = {} as CascaderComponents

Cascader.Combo = Combo
Cascader.Modal = Modal
Cascader.Main = Main
Cascader.DistrictCombo = DistrictCombo
Cascader.DistrictModal = DistrictModal
Cascader.DistrictMain = DistrictMain
Cascader.districtUtils = districtUtils

export default Cascader
