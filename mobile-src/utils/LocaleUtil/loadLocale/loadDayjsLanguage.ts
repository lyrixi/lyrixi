import dayjs from 'dayjs'
import languageMap from '../languageMap'

// 加载dayjs本地文件
async function loadDayjsLanguage(language: string) {
  return new Promise((resolve) => {
    let lang = languageMap?.[language as keyof typeof languageMap]
    // 设置dayjs语言
    if (!lang?.dayjs) {
      resolve({
        status: 'error',
        message: 'Dayjs language not found'
      })
      return
    }

    // 动态引入国际化文件
    import(`dayjs/locale/${lang.dayjs}.js`)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((jsFile) => {
        let result = {
          status: 'success',
          message: 'Local js file loaded successfully'
        }
        dayjs.locale(lang?.dayjs)
        resolve(result)
      })
      .catch(() => {
        let error = {
          status: 'error',
          message: 'Local js file loaded failed'
        }
        resolve(error)
      })
  })
}

export default loadDayjsLanguage
