import validateListStatus from '../utils/validateListStatus'
import isAllowClear from '../utils/isAllowClear'
import getRemainCount from '../utils/getRemainCount'
import uploadItem from '../utils/uploadItem'
import showLoading from '../utils/showLoading'
import hideLoading from '../utils/hideLoading'
import Media from '../Media'
import Mark from '../Mark'
import PreviewModal from '../PreviewModal'
import PreviewMain from '../PreviewMain'
import List from '../List'

export type MediaComponents = typeof Media & {
  validateListStatus: typeof validateListStatus
  isAllowClear: typeof isAllowClear
  getRemainCount: typeof getRemainCount
  uploadItem: typeof uploadItem
  showLoading: typeof showLoading
  hideLoading: typeof hideLoading
  Mark: typeof Mark
  PreviewModal: typeof PreviewModal
  PreviewMain: typeof PreviewMain
  List: typeof List
}
