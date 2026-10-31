import { KEY_PREFIX } from './constants'
import getTodayKey from './getTodayKey'

// 内库使用-start
import DateUtil from './../DateUtil'
import Storage from './../Storage'
// 内库使用-end

/* 测试使用-start
import { DateUtil, Storage } from 'lyrixi-mobile'
测试使用-end */

// 清理超过20天的日志
async function clearExpireLogs() {
  try {
    // 获取所有存储的键名
    const allKeys = await Storage.keys()

    // 筛选出日志相关的键名
    const logKeys = allKeys.filter((key) => key.startsWith(KEY_PREFIX))

    if (logKeys.length === 0) {
      return true
    }

    // 计算20天前的日期
    const minDate = new Date()
    minDate.setDate(minDate.getDate() - 20)
    const expireDate = DateUtil.toDate(DateUtil.format(minDate, 'YYYY-MM-DD'))
    if (!expireDate) {
      return true
    }

    // 找出需要删除的旧日志
    const expireKeys = logKeys.filter((key) => {
      const logDate = DateUtil.toDate(key.replace(KEY_PREFIX, ''))
      if (!logDate) return false
      return (DateUtil.compare(logDate, expireDate, 'date') ?? 0) < 0
    })

    // 删除旧日志
    if (expireKeys.length > 0) {
      for (let expireKey of expireKeys) {
        await Storage.removeItem(expireKey)
      }
      console.log(`已清理 ${expireKeys.length} 份超过20天的旧日志`)
    }
    return true
  } catch (error) {
    console.warn('清理旧日志失败:', error)
    return false
  }
}

/**
 * 记录日志到存储
 * @param {Array} args - console.info的参数
 */
async function _saveStorage(args: unknown): Promise<boolean | void> {
  try {
    // 获取当前时间
    const timestamp = DateUtil.format(new Date(), 'YYYY-MM-DD hh:mm:ss')

    // 格式化日志内容
    let logContent = ''
    if (typeof args === 'object') {
      logContent = JSON.stringify(args)
    } else {
      logContent = String(args)
    }

    // 构建完整的日志条目
    logContent = `[${timestamp}] ${logContent}`

    // 获取今日的存储键名
    const todayKey = getTodayKey()

    // 获取现有日志
    let existingLogs = ''
    try {
      const raw = await Storage.getItem(todayKey)
      existingLogs =
        typeof raw === 'string' ? raw : raw !== null && raw !== undefined ? String(raw) : ''
    } catch (error) {
      console.warn('获取存储日志失败:', error)
    }

    // 追加新日志
    const newLogs = existingLogs ? `${existingLogs}\n${logContent}` : logContent

    // 存储到本地
    await Storage.setItem(todayKey, newLogs)

    // 清理超过20天的旧日志
    await clearExpireLogs()

    return true
  } catch (error) {
    console.warn('记录日志到存储失败:', error)
    return false
  }
}

// 日志队列（使用头指针避免逐项删除导致的开销与错误）
let queueArgs: unknown[] = []
let queueHead = 0
let isProcessing = false

// 执行队列
async function drainQueue() {
  if (isProcessing) return
  isProcessing = true
  try {
    // 处理期间可能有新项进入，使用 queueHead 指向未处理的起点
    while (queueHead < queueArgs.length) {
      const args = queueArgs[queueHead++]
      await _saveStorage(args)
    }
  } finally {
    // 压缩队列，避免无限增长
    if (queueHead > 0) {
      queueArgs.splice(0, queueHead)
      queueHead = 0
    }
    isProcessing = false
    // 如果在释放期间有新日志进入，继续处理，防止竞态遗漏
    if (queueArgs.length > 0) {
      // 不 await，立即排队下一轮
      drainQueue()
    }
  }
}

/**
 * 记录日志到存储（队列版本）
 * @param {Array} args - console.info的参数
 */
async function setLogs(args: unknown): Promise<void> {
  queueArgs.push(args)
  // 触发处理（幂等）
  drainQueue()
}

export default setLogs
