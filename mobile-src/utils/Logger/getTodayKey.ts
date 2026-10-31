import { KEY_PREFIX } from './constants'

// 内库使用-start
import DateUtil from './../DateUtil'
// 内库使用-end

/* 测试使用-start
import { DateUtil } from 'lyrixi-mobile'
测试使用-end */

// 获取当前日期的存储键名，格式: logs-YYYY-MM-DD
function getTodayKey() {
  const today = DateUtil.format(new Date(), 'YYYY-MM-DD')
  return `${KEY_PREFIX}${today}`
}

export default getTodayKey
