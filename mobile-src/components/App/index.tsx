import React, { useEffect, useState } from 'react'

import type { AppLoadResult, AppProps } from './types'
import Loading from './Loading'
import Result from './Result'

// 内库使用-start
import Theme from './../../utils/Theme'
import LocaleUtil from './../../utils/LocaleUtil'
import Message from './../Message'
// 内库使用-end

/* 测试使用-start
import { Theme, LocaleUtil, Message } from 'lyrixi-mobile'
测试使用-end */

// Route change to destroy Modal
window.addEventListener(
  'popstate',
  () => {
    Message.close()
  },
  false
)

// 顶层容器
function App({
  // Value & Display Value
  id,
  language = null, // 语言配置 'zh_CN|en_US|ja_JP...'
  preload = null, // 预加载函数, 返回 {status: 'success'|'error', message: string}
  themeName = 'default', // 主题名，调用 Theme.setTheme
  children
}: AppProps) {
  // result: null 加载中；{status: 'error'|'success', message?: string}
  const [result, setResult] = useState<AppLoadResult | null>(null)

  async function load() {
    setResult(null)

    // 加载语言文件
    if (language) {
      const langResult = await LocaleUtil.loadLocale(language)
      if (langResult.status === 'error') {
        setResult({ status: 'error', message: langResult.message })
        return
      }
    }

    // 加载必要的库
    if (preload) {
      const preloadResult = await preload()
      if (preloadResult.status === 'error') {
        setResult(preloadResult)
        return
      }
    }

    // 全部加载完成
    setResult({
      status: 'success',
      message: 'success'
    })
  }

  // Execute only once
  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- 仅挂载时执行一次初始化
  }, [])

  useEffect(() => {
    Theme.setTheme(themeName)
  }, [themeName])

  // 未加载完成：全屏转圈
  if (result === null) {
    return <Loading />
  }

  // 加载失败：Result + 重试
  if (result.status === 'error') {
    return <Result id={id} result={result} onReload={() => void load()} />
  }

  // 加载成功：正常显示
  // 不能直接返回 children，必须用 <> 包裹，否则会报错
  return <>{children}</>
}

export default App
