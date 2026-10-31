import { KEY_PREFIX } from './constants'

// 内库使用-start
import Storage from './../Storage'
import DateUtil from './../DateUtil'
// 内库使用-end

/* 测试使用-start
import { Storage, DateUtil } from 'lyrixi-mobile'
测试使用-end */

/**
 * 获取当前存储的日志
 * @param {Date} logDate - 指定日期，可选参数
 * @returns {Object} 返回对象格式 {key: value, key: value}
 */
async function getLogs(logDate?: Date): Promise<Record<string, unknown>> {
  try {
    // 获取所有存储的键名
    const allKeys = await Storage.keys()

    // 筛选出日志相关的键名
    const logKeys = allKeys.filter((key) => key.startsWith(KEY_PREFIX))

    if (logKeys.length === 0) {
      return {}
    }

    const result: Record<string, unknown> = {}

    // 如果指定了日期，只返回该日期的日志
    if (logDate instanceof Date && !Number.isNaN(logDate.getTime())) {
      const dateKey = DateUtil.format(logDate, 'YYYY-MM-DD')
      const key = `${KEY_PREFIX}${dateKey}`

      if (logKeys.includes(key)) {
        const logContent = await Storage.getItem(key)
        if (logContent) {
          result[dateKey] = logContent
        }
      }

      return result
    }

    // 如果没有指定日期，返回所有日期的日志
    for (const key of logKeys) {
      const logContent = await Storage.getItem(key)
      if (logContent) {
        const dateStr = key.replace(KEY_PREFIX, '')
        result[dateStr] = logContent
      }
    }

    return result
  } catch (error) {
    console.warn('获取存储日志失败:', error)
    return {}
  }
}

export default getLogs
