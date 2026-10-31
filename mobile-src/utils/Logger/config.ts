import setLogs from './setLogs'

// 全局变量
let originalConsoleInfo: typeof console.info | null = null
let initialized = false

// 初始化日志功能，覆盖console.info
function config() {
  if (initialized) {
    return true
  }

  // 保存原始的console.info方法
  originalConsoleInfo = console.info

  // 覆盖console.info方法
  console.info = async (...args) => {
    // 调用原始方法，保持原有功能
    if (originalConsoleInfo) {
      originalConsoleInfo.apply(console, args)
    }

    // 记录日志到存储
    await setLogs(
      args
        .map((arg) => {
          if (typeof arg === 'object') {
            return JSON.stringify(arg)
          }
          return String(arg)
        })
        .join(' ')
    )
  }

  initialized = true
  return true
}

export default config
