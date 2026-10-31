/**
 * 日志工具函数
 * 提供console.info覆盖和日志上报功能
 */
import config from './config'
import setLogs from './setLogs'
import getLogs from './getLogs'
import clearLogs from './clearLogs'
import uploadLogs from './uploadLogs'

// 导出所有方法
const Logger = {
  config,
  setLogs,
  getLogs,
  clearLogs,
  uploadLogs
}

export default Logger
