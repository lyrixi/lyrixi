import _Card from './Card'
import Header from './Header'
import Main from './Main'

import type { CardComponents } from './types/Card.modules.types'

const Card = _Card as CardComponents

Card.Header = Header
Card.Main = Main

export default Card
