import Combo from './Combo'
import MainFooter from './Main/Footer'
import Modal from './Modal'
import Main from './Main'

import type { TreeComponents } from './types/Tree.modules.types'

const Tree = {} as TreeComponents

Tree.Combo = Combo
Tree.Modal = Modal
Tree.Main = Main
Tree.MainFooter = MainFooter

export default Tree
