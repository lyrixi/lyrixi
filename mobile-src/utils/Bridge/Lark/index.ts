// 官方文档: https://open.feishu.cn/document/client-docs/h5/
// 鉴权: https://open.feishu.cn/document/uYjL24iN/uQjMuQjMuQjM/authentication/h5sdkconfig

import formatOpenLocationPoint from './../utils/formatOpenLocationPoint'
import getConfigPayload from './../utils/getConfigPayload'
import config from './config'

import type { BridgeSDKErrorResponse } from '../WeChat/BridgeSDKErrorResponse.types'
import type {
  BridgeLarkGetLocationSuccessResponse,
  BridgeLarkScanCodeSuccessResponse
} from './Bridge.Lark.types'
import type { MapPointType } from '../../../components/Map/types/Map.common.types'
import type {
  BridgeConfigParams,
  BridgeGetLocationParams,
  BridgeGetLocationResultData,
  BridgeLoadParams,
  BridgeOpenLocationParams,
  BridgePreviewMediaParams,
  BridgePreviewMediaSource,
  BridgeScanCodeParams,
  BridgeShareParams
} from '../types'

// 内库使用-start
import GeoUtil from './../../GeoUtil'
import Clipboard from './../../Clipboard'
import LocaleUtil from './../../LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { GeoUtil, Clipboard, LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

let Bridge = {
  load: function (params?: BridgeLoadParams) {
    const { getScriptSrc, onSuccess, onError } = params || {}
    const top = window.top ?? window
    if (top.tt && top.h5sdk) {
      onSuccess?.({
        status: 'success',
        data: undefined
      })
      return
    }

    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.defer = true
    script.src =
      getScriptSrc?.({ platform: 'lark' }) ||
      '//lf-scm-cn.feishucdn.com/lark/op/h5-js-sdk-1.5.34.js'

    script.onload = function () {
      if (window.tt && window.h5sdk) {
        top.tt = window.tt
        top.h5sdk = window.h5sdk
      }

      onSuccess?.({
        status: 'success',
        data: undefined
      })
    }
    script.onerror = function () {
      onError?.({
        status: 'error',
        message: `Lark js ${LocaleUtil.locale(
          '加载失败',
          'lyrixi_866b795eae73791792b09d33d6595fe5'
        )}`
      })
    }

    if (script.src) document.body.appendChild(script)
  },
  config: async function (params?: BridgeConfigParams) {
    const { getConfigUrl, formatHeaders, formatPayload, formatResponse, onSuccess, onError } =
      params || {}
    // 获取配置url
    let url = ''
    if (typeof getConfigUrl === 'function') {
      url = await getConfigUrl({ platform: 'lark' })
    }
    // 构建payload
    let payload: Record<string, unknown> = (await getConfigPayload()) as Record<string, unknown>
    if (typeof formatPayload === 'function') {
      payload = (await formatPayload(payload, { platform: 'lark' })) as Record<string, unknown>
    }
    // 构建header
    let headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (typeof formatHeaders === 'function') {
      headers = (await formatHeaders(headers, { platform: 'lark' })) as Record<string, string>
    }

    config({ url, headers, payload, formatResponse, onSuccess, onError })
  },
  onBack: function () {
    console.log('飞书不支持监听物理返回')
  },
  openLocation: function (params?: BridgeOpenLocationParams) {
    const { to, scale: scaleIn, onSuccess, onError } = params || {}
    const { latitude, longitude, type = 'wgs84', name, address } = to || {}
    if (typeof latitude !== 'number' || typeof longitude !== 'number') return
    let point = formatOpenLocationPoint({ latitude, longitude, type })
    let scale = scaleIn ?? 12
    console.log('调用飞书地图...', { latitude, longitude, type, name, address, scale })

    if (scale < 5) {
      scale = 5
    } else if (scale > 18) {
      scale = 18
    }

    ;(window.top ?? window).tt?.openLocation?.({
      latitude: point?.latitude ?? 0,
      longitude: point?.longitude ?? 0,
      scale: scale,
      name: name,
      address: address,
      success: () => {
        onSuccess?.({ status: 'success', data: undefined })
      },
      fail: (error: BridgeSDKErrorResponse) => {
        onError?.({
          status: 'error',
          message:
            error?.errMsg ||
            `Lark ${LocaleUtil.locale('打开地图失败', 'lyrixi_3dd680a6b28a8b59516034e54bc595b7')}`
        })
      }
    })
  },
  getLocation: function (params?: BridgeGetLocationParams) {
    const { type, onSuccess, onError } = params || {}
    let targetType = type || 'gcj02'
    console.log('调用飞书定位...', type)
    ;(window.top ?? window).tt?.getLocation?.({
      type: targetType,
      success: (res: BridgeLarkGetLocationSuccessResponse) => {
        console.error('飞书定位成功', res)

        let data: BridgeGetLocationResultData = {
          longitude: res.longitude ?? 0,
          latitude: res.latitude ?? 0,
          type: (res.type as MapPointType) || targetType,
          accuracy: res.accuracy
        }

        if (res.type && res.type !== targetType) {
          const points = GeoUtil.transformPoint(
            {
              longitude: res.longitude ?? 0,
              latitude: res.latitude ?? 0
            },
            res.type ?? 'wgs84',
            targetType
          )

          if (points) {
            data = {
              longitude: points.longitude ?? data.longitude,
              latitude: points.latitude ?? data.latitude,
              type: targetType,
              accuracy: res.accuracy
            }
          }
        }

        onSuccess?.({
          status: 'success',
          code: '',
          message: '',
          data
        })
      },
      fail: (error: BridgeSDKErrorResponse) => {
        console.error('飞书定位失败', error)
        onError?.({
          status: 'error',
          message:
            error?.errMsg ||
            `Lark ${LocaleUtil.locale('定位失败', 'lyrixi_9831baf6b76c1da7b69b463033b924cc')}`
        })
      }
    })
  },
  scanCode: function (params?: BridgeScanCodeParams) {
    const { scanType, onSuccess, onError, onCancel } = params || {}
    ;(window.top ?? window).tt?.scanCode?.({
      scanType: scanType,
      barCodeInput: true,
      success: (res: BridgeLarkScanCodeSuccessResponse) => {
        onSuccess?.({
          status: 'success',
          code: '',
          message: '',
          data: { content: res.resultStr || '' }
        })
      },
      fail: (error: BridgeSDKErrorResponse) => {
        onError?.({ status: 'error', message: error?.errMsg || '' })
      },
      cancel: (error: BridgeSDKErrorResponse) => {
        onCancel?.({ status: 'cancel', message: error?.errMsg || '' })
      }
    })
  },
  chooseMedia: function () {
    console.log('调用飞书选择媒体暂未实现')
  },
  uploadFile: function () {
    console.log('调用飞书上传文件暂未实现')
  },
  previewMedia: function (params?: BridgePreviewMediaParams) {
    const { index, sources, onSuccess, onError, onCancel } = params || {}
    type LarkPreviewSource = BridgePreviewMediaSource & {
      localFile?: { tempFileUrl?: string }
    }
    const srcList = (sources || []) as LarkPreviewSource[]
    let urls = srcList.map((item) => item?.localFile?.tempFileUrl || item?.fileUrl)
    let current = index !== undefined ? srcList[index] : undefined

    // 预览视频
    if (current?.fileType === 'video') {
      Clipboard.setString(String(current.fileUrl ?? ''))
      return
    }

    // 预览图片
    ;(window.top ?? window).tt?.previewImage?.({
      urls: urls,
      current: index !== undefined ? urls[index] : urls[0],
      success: () => {
        onSuccess?.({
          status: 'success',
          data: undefined
        })
      },
      fail: (error: BridgeSDKErrorResponse) => {
        console.log('飞书previewImage失败:', error)
        onError?.({
          status: 'error',
          message:
            error?.errMsg ||
            `Lark ${LocaleUtil.locale('预览失败', 'lyrixi_6a3a5ef00db03994963efebe08432ce1')}`
        })
      },
      onCancel: onCancel
    })
  },
  share(params?: BridgeShareParams) {
    const { title, description, url, imageUrl, onSuccess, onError } = params || {}
    ;(window.top ?? window).tt?.share?.({
      channelType: ['wx', 'wx_timeline', 'system'],
      contentType: 'url',
      title: title,
      content: description,
      url: url,
      image: imageUrl,
      success() {
        onSuccess?.({ status: 'success', data: undefined })
      },
      fail(err: BridgeSDKErrorResponse) {
        console.log('Lark Share onError:', err)

        onError?.({
          status: 'error',
          message:
            err?.message ||
            `Lark ${LocaleUtil.locale('分享失败', 'lyrixi_e8e25af006ef2ebbdb317e1d7c035a0f')}`
        })
      }
    })
  }
}

export default Bridge
