import formatOpenLocationPoint from './utils/formatOpenLocationPoint'
import Browser from './Browser'
import WeChat from './WeChat'
import Alipay from './Alipay'
import DingTalk from './DingTalk'
import Lark from './Lark'
import Lyrixi from './Lyrixi'

import type {
  BridgeAdapter,
  BridgeChooseMediaParams,
  BridgeConfigParams,
  BridgeDetectFaceParams,
  BridgeGetPhoneNumberParams,
  BridgeGetBrowserLocationParams,
  BridgeGetLocationParams,
  BridgeLoadParams,
  BridgeNavigateBackParams,
  BridgeNavigateParams,
  BridgeOnBackParams,
  BridgeOpenLocationParams,
  BridgePreviewFileParams,
  BridgePreviewMediaParams,
  BridgeScanCodeParams,
  BridgeSetTitleParams,
  BridgeShareParams,
  BridgeTelParams,
  BridgeUploadFileParams
} from './types'

// 内库使用-start
import Device from './../Device'
// 内库使用-end

/* 测试使用-start
import { Device } from 'lyrixi-mobile'
测试使用-end */

let Bridge = {
  // 存储自定义 Bridge
  _customBridges: {} as Record<string, Record<string, unknown>>,
  // 添加自定义 Bridge
  addBridge(platform: string, customBridge: Record<string, unknown>) {
    if (!platform || !customBridge) {
      console.error('Bridge.addBridge: platform and customBridge are required')
      return
    }
    this._customBridges[platform] = customBridge
  },
  // 内部方法：获取当前 Bridge
  _getCurrentBridge(currentPlatform?: string): BridgeAdapter {
    const platform = currentPlatform || Device.platform

    // 1. 先检查自定义 Bridge
    if (this._customBridges?.[platform]) {
      return { ...Browser, ...this._customBridges[platform] } as BridgeAdapter
    }

    // 2. 再使用默认 Bridge 选择逻辑
    if (
      platform === 'wechat' ||
      platform === 'wecom' ||
      platform === 'wechatMiniProgram' ||
      platform === 'wecomMiniProgram'
    ) {
      return { ...Browser, ...WeChat } as BridgeAdapter
    } else if (platform === 'alipay' || platform === 'alipayMiniProgram') {
      return { ...Browser, ...Alipay } as BridgeAdapter
    } else if (platform === 'dingtalk') {
      return { ...Browser, ...DingTalk } as BridgeAdapter
    } else if (platform === 'lark') {
      return { ...Browser, ...Lark } as BridgeAdapter
    } else if (platform === 'lyrixi') {
      return { ...Browser, ...Lyrixi } as BridgeAdapter
    } else {
      return Browser as BridgeAdapter
    }
  },

  // 方法转发
  /**
   * 加载平台 SDK
   * @param {Object} params - 配置选项（可选）
   * @param {String} params.getScriptSrc - 平台脚本地址, function({ platform: String }) => String
   * @param {Function} params.onSuccess - 成功回调
   * @param {Function} params.onError - 失败回调
   * @returns {void}
   */
  load(params?: BridgeLoadParams, platform?: string) {
    const bridge = this._getCurrentBridge(platform)
    return bridge.load(params)
  },
  /**
   * 配置鉴权
   * @param {Object} params - 配置鉴权参数
   * @param {String} params.getConfigUrl - 获取signature请求地址
   * @param {Object} params.formatHeaders - 格式化请求头, function({ 'Content-Type': 'application/json' }, { platform: String }) => Object
   * @param {Object} params.formatPayload - 微信鉴权参数, function(payload, { platform: String }), 返回 {appId: String, url: String, suiteType: String, lowerAppId: String}
   * @param {Object} params.formatResponse - 格式化上传结果 function(payload, { platform: String }), 返回 {status: 'success|error', appId: String, timestamp: Number, nonceStr: String, signature: String}
   * @param {Function} params.onSuccess - 成功回调
   * @param {Function} params.onError - 失败回调
   * @returns {void}
   */
  config(params?: BridgeConfigParams, platform?: string) {
    const bridge = this._getCurrentBridge(platform)
    return bridge.config(params)
  },
  /**
   * 监听物理返回键或手势返回
   * @param {Object} params - 监听返回参数
   * @param {Function} params.onSuccess - 阻止返回成功回调, 返回true表示允许返回, false表示不允许返回
   * @param {Function} params.onError - 阻止返回失败回调
   * @returns {void}
   */
  onBack(params?: BridgeOnBackParams, platform?: string) {
    const bridge = this._getCurrentBridge(platform)
    return bridge.onBack(params)
  },
  /**
   * 修改原生标题
   * @param {Object} params - 标题参数
   * @param {String} params.title - 标题文本或返回标题的函数
   * @param {Function} params.onSuccess - 成功回调
   * @param {Function} params.onError - 失败回调
   * @returns {void}
   */
  setTitle(params?: BridgeSetTitleParams, platform?: string) {
    const bridge = this._getCurrentBridge(platform)
    if (bridge.setTitle) {
      return bridge.setTitle(params)
    }
    return undefined
  },
  /**
   * 打开新页面（压入页面栈）
   * @param {Object} params - 跳转参数
   * @param {String} params.type - 目标类型，'webview'|'native'，默认为 'webview'
   * @param {String} params.url - 要打开的 URL / 原生路径
   * @param {Function} params.onSuccess - 成功回调
   * @param {Function} params.onError - 失败回调
   * @returns {void}
   */
  navigatePush(params?: BridgeNavigateParams, platform?: string) {
    const bridge = this._getCurrentBridge(platform)
    if (bridge.navigatePush) {
      return bridge.navigatePush(params)
    }
    return undefined
  },
  /**
   * 替换当前页面
   * @param {Object} params - 跳转参数
   * @param {String} params.type - 目标类型，'webview'|'native'，默认为 'webview'
   * @param {String} params.url - 要打开的 URL / 原生路径
   * @param {Function} params.onSuccess - 成功回调
   * @param {Function} params.onError - 失败回调
   * @returns {void}
   */
  navigateReplace(params?: BridgeNavigateParams, platform?: string) {
    const bridge = this._getCurrentBridge(platform)
    if (bridge.navigateReplace) {
      return bridge.navigateReplace(params)
    }
    return undefined
  },
  /**
   * 返回上一页或多级页面
   * @param {Object} params - 返回参数
   * @param {Number} params.steps - 返回的页面数，默认为 1；browser 使用 history.go(-steps)
   * @param {Function} params.onSuccess - 成功回调
   * @param {Function} params.onError - 失败回调
   * @returns {void}
   */
  navigateBack(params?: BridgeNavigateBackParams, platform?: string) {
    const bridge = this._getCurrentBridge(platform)
    if (bridge.navigateBack) {
      return bridge.navigateBack(params)
    }
    return undefined
  },
  /**
   * 关闭所有页面并打开新页面
   * @param {Object} params - 跳转参数
   * @param {String} params.type - 目标类型，'webview'|'native'，默认为 'webview'
   * @param {String} params.url - 要打开的 URL / 原生路径
   * @param {Function} params.onSuccess - 成功回调
   * @param {Function} params.onError - 失败回调
   * @returns {void}
   */
  navigateLaunch(params?: BridgeNavigateParams, platform?: string) {
    const bridge = this._getCurrentBridge(platform)
    if (bridge.navigateLaunch) {
      return bridge.navigateLaunch(params)
    }
    return undefined
  },
  /**
   * 拨打电话
   * @param {Object} params - 拨打电话参数
   * @param {String|Number} params.number - 电话号码
   * @param {Function} params.onSuccess - 成功回调
   * @param {Function} params.onError - 失败回调
   * @returns {void}
   */
  tel(params?: BridgeTelParams, platform?: string) {
    const bridge = this._getCurrentBridge(platform)
    if (bridge.tel) {
      return bridge.tel(params)
    }
    return undefined
  },
  /**
   * 打开地图查看位置
   * @param {Object} params - 地图参数
   * @param {Object} params.from - 起点（可选，一般 SDK 不需要）
   * @param {Number} params.from.latitude - 起点纬度
   * @param {Number} params.from.longitude - 起点经度
   * @param {String} params.from.type - 起点坐标类型，'wgs84'|'gcj02'，默认为 'wgs84'
   * @param {String} params.from.name - 起点名称
   * @param {String} params.from.address - 起点地址
   * @param {Object} params.to - 终点
   * @param {Number} params.to.latitude - 终点纬度
   * @param {Number} params.to.longitude - 终点经度
   * @param {String} params.to.type - 终点坐标类型，'wgs84'|'gcj02'，默认为 'wgs84'
   * @param {String} params.to.name - 终点名称
   * @param {String} params.to.address - 终点地址
   * @param {Number} params.scale - 地图缩放级别
   * @param {Function} params.onSuccess - 成功回调
   * @param {Function} params.onError - 失败回调
   * @returns {void}
   */
  openLocation(params?: BridgeOpenLocationParams, platform?: string) {
    return this._getCurrentBridge(platform).openLocation(params)
  },
  /**
   * 获取当前地理位置
   * @param {Object} params - 定位参数
   * @param {String} params.type - 坐标类型，'wgs84'|'gcj02'，默认为 'wgs84'
   * @param {Function} params.onSuccess - 成功回调，返回 { status: 'success', code, message, data: { latitude, longitude, speed, accuracy, type } }
   * @param {Function} params.onError - 失败回调，返回 {status: 'error', code: String, message: String}
   * @param {Function} params.onCancel - 取消回调，返回 {status: 'cancel', code: String, message: String}
   * @returns {void}
   */
  getLocation(params?: BridgeGetLocationParams, platform?: string) {
    const { type = 'wgs84', onSuccess, onError, onCancel } = params || {}
    return this._getCurrentBridge(platform).getLocation({ type, onSuccess, onError, onCancel })
  },
  /**
   * 获取浏览器地理位置（所有平台都可以调用）
   * @param {Object} params - 定位参数
   * @param {String} params.type - 坐标类型，'wgs84'|'gcj02'，默认为 'gcj02'
   * @param {Function} params.onSuccess - 成功回调，返回 { status: 'success', code, message, data }
   * @param {Function} params.onError - 失败回调，返回 {status: 'error', code: String, message: String}
   * @returns {void}
   */
  getBrowserLocation(params?: BridgeGetBrowserLocationParams, platform?: string) {
    const bridge = this._getCurrentBridge(platform)
    if (bridge.getBrowserLocation) {
      return bridge.getBrowserLocation(params)
    }
    return undefined
  },
  /**
   * 扫描二维码并返回结果
   * @param {Object} params - 扫码参数
   * @param {Array<String>} params.scanType - 扫码类型，['qrCode', 'barCode']，默认为 ['qrCode', 'barCode']
   * @param {Function} params.onSuccess - 成功回调，返回 { status: 'success', code, message, data: { resultStr } }
   * @param {Function} params.onError - 失败回调
   * @param {Function} params.onCancel - 取消回调
   * @returns {void}
   */
  scanCode(params?: BridgeScanCodeParams, platform?: string) {
    const bridge = this._getCurrentBridge(platform)
    if (bridge.scanCode) {
      return bridge.scanCode(params)
    }
    return undefined
  },
  /**
   * 媒体操作: 视频图片选择
   * @param {Object} params - 选择图片参数
   * @param {Number} params.count - 最多可以选择的图片张数，默认为 9
   * @param {Array<String>} params.sizeType - 图片大小，['original', 'compressed']，默认为 ['original', 'compressed']
   * @param {Array<String>} params.sourceType - 图片来源，['camera', 'album']，默认为 ['camera', 'album']
   * @param {Array<String>} params.mediaType - 媒体类型，['image', 'video', 'mix']，默认为 ['image']
   * @param {Number} params.maxDuration - 视频最大时长，单位秒，默认为 10
   * @param {Function} params.onSuccess - 成功回调，返回 { status: 'success', code, message, data: { localFiles: Array<{fileUrl: 预览url, filePath: 上传url或id, fileType: 文件类型(image|video|file)}> } }
   * @param {Function} params.onError - 失败回调
   * @param {Function} params.onCancel - 取消回调
   * @returns {void}
   */
  chooseMedia(params?: BridgeChooseMediaParams, platform?: string) {
    const bridge = this._getCurrentBridge(platform)
    if (bridge.chooseMedia) {
      return bridge.chooseMedia(params)
    }
    return undefined
  },
  /**
   * 文件操作: 文件上传
   * @param {Object} params - 上传图片参数
   * @param {Object} params.localFile - 需要上传的图片的本地文件, { path: String, type: String } (必填)
   * @param {String} params.getUploadUrl - 上传地址 (必填), function({ platform: String }) => String
   * @param {Object} params.formatHeaders - 格式化请求头, function({ 'Content-Type': 'multipart/form-data' }, { platform: String }) => Object
   * @param {Object} params.formatPayload - 格式化表单数据 function(payload, { platform: String }), 返回 {Object}
   * @param {Object} params.formatResponse - 格式化上传结果 function(payload, { platform: String }), 返回 {status: 'success|error', data: Object}
   * @param {Function} params.onSuccess - 成功回调，返回 {status: 'success', code, message, data: Object}
   * @param {Function} params.onError - 失败回调
   * @param {Function} params.onCancel - 取消回调
   * @returns {void}
   */
  uploadFile(params?: BridgeUploadFileParams, platform?: string) {
    const bridge = this._getCurrentBridge(platform)
    if (bridge.uploadFile) {
      return bridge.uploadFile(params)
    }
    return undefined
  },
  /**
   * 媒体操作: 预览视频图片
   * @param {Object} params - 预览图片参数
   * @param {Number} params.index - 当前显示图片索引，默认 0
   * @param {Array<String>} params.sources - 需要预览的图片 http 链接列表，[{fileUrl: '全路径', fileType: 'image|video', poster: '视频封面图片全路径'}]
   * @param {Function} params.onSuccess - 成功回调
   * @param {Function} params.onError - 失败回调
   * @param {Function} params.onCancel - 取消回调
   * @returns {void}
   */
  previewMedia(params?: BridgePreviewMediaParams, platform?: string) {
    return this._getCurrentBridge(platform).previewMedia(params)
  },
  /**
   * 文件操作: 预览文件
   * @param {Object} params - 预览文件参数
   * @param {String} params.fileUrl - 需要预览文件的地址(必填)
   * @param {String} params.fileName - 需要预览文件的文件名(不填的话取url的最后部分)
   * @param {Number} params.fileSize - 需要预览文件的字节大小
   * @param {Function} params.onSuccess - 成功回调
   * @param {Function} params.onError - 失败回调
   * @returns {void}
   */
  previewFile(params?: BridgePreviewFileParams, platform?: string) {
    const bridge = this._getCurrentBridge(platform)
    if (bridge.previewFile) {
      return bridge.previewFile(params)
    }
    return undefined
  },
  /**
   * 消息分享
   * @param {Object} params - 分享参数
   * @param {Array<String>} params.platforms - 分享平台, 微信、企微、飞书、钉钉都不支持, 默认分享到当前平台
   * @param {String} params.title - 分享标题(必填)
   * @param {String} params.description - 分享副标题
   * @param {String} params.url - 分享链接
   * @param {String} params.imageUrl - 分享链接配图
   * @param {Function} params.onSuccess - 分享成功回调
   * @param {Function} params.onError - 分享失败回调
   * @returns {void}
   */
  share(params?: BridgeShareParams, platform?: string) {
    const bridge = this._getCurrentBridge(platform)
    if (bridge.share) {
      return bridge.share(params)
    }
    return undefined
  },
  /**
   * 人脸识别活体检测（钉钉 dd.biz.ATMBle.exclusiveLiveCheck 等）
   * @param {Object} params - 调用参数
   * @param {Function} params.getConfig - 返回原生接口入参对象 function({ platform }) => Record 或 Promise<Record>，会展开传入底层 API
   * @param {Function} params.onSuccess - 成功回调，data 含 match、confidence 等
   * @param {Function} params.onError - 失败回调
   * @returns {void}
   */
  detectFace(params?: BridgeDetectFaceParams, platform?: string) {
    const bridge = this._getCurrentBridge(platform)
    if (typeof bridge.detectFace === 'function') {
      return bridge.detectFace(params)
    }
    return undefined
  },
  /**
   * 获取手机号（当前仅 Lyrixi App 支持）
   * @param {Object} params - 调用参数
   * @param {Function} params.onSuccess - 成功回调，返回 { status: 'success', code, message, data: { code, phoneNumber } }
   * @param {Function} params.onError - 失败回调
   * @param {Function} params.onCancel - 取消回调
   * @returns {void}
   */
  getPhoneNumber(params?: BridgeGetPhoneNumberParams, platform?: string) {
    const bridge = this._getCurrentBridge(platform)
    if (typeof bridge.getPhoneNumber === 'function') {
      return bridge.getPhoneNumber(params)
    }
    return undefined
  },

  utils: {
    formatOpenLocationPoint
  }
}

export default Bridge
