import { KEY_PREFIX } from './constants'

// 内库使用-start
import DateUtil from './../DateUtil'
import LocaleUtil from './../LocaleUtil'
import Storage from './../Storage'
// 内库使用-end

/* 测试使用-start
import { DateUtil, LocaleUtil, Storage } from 'lyrixi-mobile'
测试使用-end */

// 上报日志到服务器
async function uploadLogs(upload: (data: unknown) => Promise<unknown>): Promise<unknown> {
  // 获取所有存储的键名
  const allKeys = await Storage.keys()

  // 筛选出日志相关的键名
  const logKeys = allKeys.filter((key) => key.startsWith(KEY_PREFIX))

  if (logKeys.length === 0) {
    console.warn('没有找到需要上报的日志')
    return
  }

  // 处理每个日期的日志
  const uploadPromises = logKeys.map(async (key) => {
    // 提取日期信息
    const logDate = key.replace(KEY_PREFIX, '')

    // 获取该日期的日志
    const logContent = await Storage.getItem(key)

    if (!logContent) {
      console.log(`日期 ${logDate} 的日志为空`)
      return new Promise((resolve) => {
        resolve(true)
      })
    }

    // 构建完整的日志内容
    if (typeof upload === 'function') {
      return upload({
        content: logContent,
        date: DateUtil.toDate(logDate)
      })
    }
  })

  // 等待所有日志上报完成
  const results = await Promise.all(uploadPromises)

  const successCount = results.filter((result) => result === true).length

  const failCount = results.length - successCount

  return {
    errMsg: LocaleUtil.locale(
      `日志上报完成: 成功 ${successCount} 份, 失败 ${failCount} 份`,
      'lyrixi_64737bc007cea801c7dd7af8fbefc98e',
      [successCount, failCount]
    ),
    successCount: successCount,
    failCount: failCount
  }
}

export default uploadLogs
