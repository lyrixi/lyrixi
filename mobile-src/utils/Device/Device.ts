import getKernel from './getKernel'
import getDevice from './getDevice'
import getOS from './getOS'
import defaultGetPlatform from './getPlatform'
import getUrlParameter from './getUrlParameter'
import { getScreenWidth, getScreenHeight } from './getScreenSize'
import getModel from './getModel'
import compareVersion from './compareVersion'

// Device
let Device = {
  // 存储自定义平台检测函数
  _getCustomPlatforms: [] as Array<
    (ua: string) => { platform?: string; platformVersion?: string } | null | undefined
  >,
  /**
   * 添加平台检测函数
   * @param {Function} getCustomPlatform - 自定义平台检测函数，返回 {platform: String, platformVersion: String} 或 null
   * @example
   * Device.addPlatform(() => {
   *   let ua = navigator.userAgent.toLowerCase()
   *   if (ua.indexOf('customapp') > -1) {
   *     const match = ua.match(/customapp\/([\w.]*)/)
   *     return {
   *       platform: 'customApp',
   *       platformVersion: match?.[1] || ''
   *     }
   *   }
   *   return null
   * })
   */
  addPlatform(
    getCustomPlatform: (
      ua: string
    ) => { platform?: string; platformVersion?: string } | null | undefined
  ): void {
    if (typeof getCustomPlatform === 'function') {
      this._getCustomPlatforms.push(getCustomPlatform)
    }
  },
  // 内部方法：检测平台（整合自定义检测和默认检测）
  _getPlatform() {
    let ua = navigator.userAgent.toLowerCase()

    // 先执行自定义检测
    for (let getCustomPlatform of this._getCustomPlatforms) {
      const result = getCustomPlatform(ua)
      if (result && result.platform) {
        return {
          platform: result.platform,
          platformVersion: result.platformVersion || ''
        }
      }
    }

    // 再执行默认检测
    return defaultGetPlatform()
  },
  get userAgent() {
    return navigator.userAgent
  },
  get language() {
    return window.navigator.browserLanguage || window.navigator.language
  },
  get isOnLine() {
    return window.navigator.onLine || true
  },
  get protocol() {
    return window.location.protocol
  },
  get host() {
    return window.location.host
  },
  get domain() {
    return window.location.protocol + '//' + window.location.host
  },
  // 内核: 'trident' | 'presto' | 'webkit' | 'gecko' | ''
  get kernel() {
    return getKernel()
  },
  // 设备: 'mobile' | 'pc'
  get device() {
    return getDevice()
  },
  // 系统: 'android' | 'ios' | 'harmony'
  get os() {
    return getOS().os
  },
  get osVersion() {
    return getOS().osVersion
  },
  // 型号
  get model() {
    return getModel()
  },
  // 平台
  get platform() {
    return this._getPlatform().platform
  },
  get platformVersion() {
    return this._getPlatform().platformVersion
  },
  // 屏幕宽高
  get screenWidth() {
    return getScreenWidth()
  },
  get screenHeight() {
    return getScreenHeight()
  },

  // 获取url参数
  getUrlParameter: getUrlParameter,
  compareVersion: compareVersion
}

export default Device
