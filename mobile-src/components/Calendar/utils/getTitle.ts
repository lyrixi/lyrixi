// 内库使用-start
import DateUtil from './../../../utils/DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

// 获取标题字符串
function getTitle(drawDate: Date | null | undefined, { type }: { type?: string | null } = {}) {
  if (!drawDate) {
    return ''
  }
  let format = 'YYYY-MM'
  if (type === 'week') {
    format = 'YYYY-MM-DD wo'
  }
  return DateUtil.format(drawDate, format)
}
export default getTitle
