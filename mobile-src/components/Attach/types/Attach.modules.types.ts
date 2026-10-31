import Attach from '../Attach'
import supportTypes from '../utils/supportTypes'
import List from '../List'
import Button from '../Choose/Button'
import Uploading from '../Uploading'

// 内库使用-start
import Media from '../../Media'
// 内库使用-end

export type AttachComponents = typeof Attach & {
  validateListStatus: typeof Media.validateListStatus
  supportTypes: typeof supportTypes
  List: typeof List
  Button: typeof Button
  Uploading: typeof Uploading
}
