// 内库使用-start
import Toast from './../../components/Toast'
import LocaleUtil from './../LocaleUtil'
import Storage from './../Storage'
// 内库使用-end

/* 测试使用-start
import { Toast, Storage } from 'lyrixi-mobile'
测试使用-end */

type VConsoleInstance = {
  destroy?: () => void
}

const DEBUG_KEY = '_debug_'

// 如果 Storage 里存有 debug，则默认开启 debug 模式
void Storage.getItem(DEBUG_KEY).then((value) => {
  if (value) {
    const topWin = window.top ?? window
    topWin._debug_ = true
  }
})

// Debugger Tools
const Debugger: {
  instance?: VConsoleInstance | null
  open: () => Promise<boolean>
  close: () => void
  exists: () => boolean
} = {
  instance: null,
  // 显示 vconsole
  open: function () {
    if (this.instance) return Promise.resolve(true)
    return new Promise((resolve) => {
      import('vconsole')
        .then((mod) => {
          const VConsoleCtor = mod.default as new () => VConsoleInstance
          const topWin = window.top ?? window
          topWin._debug_ = true
          void Storage.setItem(DEBUG_KEY, '1')
          this.instance = new VConsoleCtor()
          resolve(true)
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((error) => {
          Toast.open({
            content: LocaleUtil.locale(
              '打开调试面板失败',
              'lyrixi_577dd0de7cc745dc0fcce18b2d9d909a',
              undefined
            ) as string,
            maskClickable: true
          })
          resolve(false)
        })
    })
  },
  // 隐藏 vconsole
  close: function () {
    if (!this.instance) return
    this.instance.destroy?.()
    this.instance = null
    const topWin = window.top ?? window
    topWin._debug_ = false
    void Storage.removeItem(DEBUG_KEY)
  },
  // 判断是否处于 debug 模式
  exists: function () {
    const topWin = window.top ?? window
    return !!topWin._debug_
  }
}

export default Debugger
