import Tabs from './Tabs'
import Group from './Group'
import Slide from './Slide'
import Menus from './Menus'

import type { TabBarComponents } from './types/TabBar.modules.types'

const TabBar = {} as TabBarComponents

TabBar.Tabs = Tabs
TabBar.Group = Group
TabBar.Slide = Slide
TabBar.Menus = Menus

export default TabBar
