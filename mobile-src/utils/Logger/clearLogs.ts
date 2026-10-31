import { KEY_PREFIX } from './constants'

// 内库使用-start
import DateUtil from './../DateUtil'
import Storage from './../Storage'
// 内库使用-end

/* 测试使用-start
import { DateUtil, Storage } from 'lyrixi-mobile'
测试使用-end */

/**
 * 清空本地日志
 * @param {Date} logDate 可选，传入则仅清除该日期日志；不传则清除全部
 */
async function clearLogs(logDate?: Date): Promise<boolean | void> {
  try {
    // 获取所有存储的键名
    const allKeys = await Storage.keys()

    // 筛选出日志相关的键名
    let logKeys = allKeys.filter((key) => key.startsWith(KEY_PREFIX))

    // 如果传入了日期，则只删除该日期
    if (logDate instanceof Date && !Number.isNaN(logDate.getTime())) {
      const dateKey = DateUtil.format(logDate, 'YYYY-MM-DD')
      logKeys = logKeys.filter((key) => key === `${KEY_PREFIX}${dateKey}`)
    }

    // 删除所有日志
    const deletePromises = logKeys.map((key) => Storage.removeItem(key))
    await Promise.all(deletePromises)

    console.log(`已清空 ${logKeys.length} 份本地日志`)

    return true
  } catch (error) {
    console.warn('清空日志失败:', error)
    return false
  }
}

export default clearLogs
