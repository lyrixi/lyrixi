import type { AttachComponents } from './types/Attach.modules.types'
import _Attach from './Attach'
import supportTypes from './utils/supportTypes'
import List from './List'
import Button from './Choose/Button'
import Uploading from './Uploading'

// 内库使用-start
import Media from './../Media'
// 内库使用-end

const Attach = _Attach as AttachComponents

Attach.validateListStatus = Media.validateListStatus
Attach.supportTypes = supportTypes
Attach.List = List
Attach.Button = Button
Attach.Uploading = Uploading

export default Attach
