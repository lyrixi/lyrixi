import Combo from './Combo'
import Modal from './Modal'
import Main from './Main'

import open from './api/open'
import close from './api/close'

import type { MessageComponents } from './types/Message.modules.types'

const Message = {} as MessageComponents

Message.Combo = Combo
Message.Modal = Modal
Message.Main = Main
Message.open = open
Message.close = close

export default Message
