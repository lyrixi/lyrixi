import validateListStatus from './utils/validateListStatus'
import isAllowClear from './utils/isAllowClear'
import getRemainCount from './utils/getRemainCount'
import uploadItem from './utils/uploadItem'
import showLoading from './utils/showLoading'
import hideLoading from './utils/hideLoading'
import _Media from './Media'
import Mark from './Mark'
import PreviewModal from './PreviewModal'
import PreviewMain from './PreviewMain'
import List from './List'

import type { MediaComponents } from './types/Media.modules.types'

const Media = _Media as MediaComponents

Media.validateListStatus = validateListStatus
Media.isAllowClear = isAllowClear
Media.getRemainCount = getRemainCount
Media.uploadItem = uploadItem
Media.showLoading = showLoading
Media.hideLoading = hideLoading
Media.Mark = Mark
Media.PreviewModal = PreviewModal
Media.PreviewMain = PreviewMain
Media.List = List

export default Media
