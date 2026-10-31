import _FooterBar from './FooterBar'
import Button from './Button'

import type { FooterBarComponents } from './types/FooterBar.modules.types'

const FooterBar = _FooterBar as FooterBarComponents

FooterBar.Button = Button

export default FooterBar
