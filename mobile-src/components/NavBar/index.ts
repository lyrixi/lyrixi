import _NavBar from './NavBar'
import Title from './Title'
import Button from './Button'

import type { NavBarComponents } from './types/NavBar.modules.types'

const NavBar = _NavBar as NavBarComponents

NavBar.Title = Title
NavBar.Button = Button

export default NavBar
