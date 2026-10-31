import uploadFile from './uploadFile'
import navigateBrowser from './../utils/navigateBrowser'
import type { ErrorResult, SuccessResult } from '../../../types'
import type {
  FileItem,
  BridgeLoadParams,
  BridgeConfigParams,
  BridgeSetTitleParams,
  BridgeNavigateParams,
  BridgeNavigateBackParams,
  BridgeTelParams,
  BridgeOpenLocationParams,
  BridgeGetLocationParams,
  BridgeGetLocationResultData,
  BridgeGetBrowserLocationParams,
  BridgeScanCodeParams,
  BridgeUploadFileParams,
  BridgeUploadLocalFile,
  BridgePreviewMediaParams,
  BridgePreviewFileParams,
  BridgeShareParams
} from '../types'

// 内库使用-start
import LocaleUtil from './../../LocaleUtil'
import Clipboard from './../../Clipboard'
import GeoUtil from './../../GeoUtil'
import Device from './../../Device'
import Toast from './../../../components/Toast'
import MathUtil from './../../MathUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Clipboard, GeoUtil, Device, Toast } from 'lyrixi-mobile'
测试使用-end */

let Browser = {
  /** 调试开关：为 true 时 getBrowserLocation / scanCode 等走模拟逻辑 */
  debug: false,
  load: function (params?: BridgeLoadParams) {
    const { onSuccess } = params || {}
    onSuccess?.({
      status: 'success',
      data: undefined
    })
  },
  config: async function (params?: BridgeConfigParams) {
    const { onSuccess } = params || {}
    onSuccess?.({
      status: 'success',
      data: undefined
    })
  },
  onBack: function () {
    Toast.open({
      content: `Browser ${LocaleUtil.locale(
        '此平台不支持',
        'lyrixi_60a7978c99ee3bd2f538096ee46727ca'
      )} onBack`
    })
  },
  setTitle: function (params?: BridgeSetTitleParams) {
    const { title, onSuccess } = params || {}
    const topWin = window.top ?? window
    topWin.document.title = title ?? ''
    onSuccess?.({ status: 'success', data: undefined })
  },
  navigatePush: function (params?: BridgeNavigateParams) {
    navigateBrowser(params, 'push')
  },
  navigateReplace: function (params?: BridgeNavigateParams) {
    navigateBrowser(params, 'replace')
  },
  navigateBack: function (params?: BridgeNavigateBackParams) {
    const { steps = 1, onSuccess } = params || {}
    window.history.go(-steps)
    onSuccess?.({ status: 'success', data: undefined })
  },
  navigateLaunch: function (params?: BridgeNavigateParams) {
    navigateBrowser(params, 'launch')
  },
  tel: function (params?: BridgeTelParams) {
    const { number, onSuccess, onError } = params || {}
    if (Device.device === 'pc') {
      Toast.open({
        content: `Browser ${LocaleUtil.locale(
          '此平台不支持',
          'lyrixi_60a7978c99ee3bd2f538096ee46727ca'
        )} tel`
      })
      return
    }
    if (!MathUtil.isNumber(number)) {
      onError?.({
        status: 'error',
        message: `Browser ${LocaleUtil.locale(
          '电话号码格式错误',
          'lyrixi_219a4aae2d70f722737a324656fe4f13'
        )}`
      })
      return
    }
    window.location.href = 'tel:' + number
    onSuccess?.({ status: 'success', data: undefined })
  },
  openLocation: function (params?: BridgeOpenLocationParams) {
    const { to, onError } = params || {}
    const { latitude, longitude } = to || {}
    if (typeof latitude !== 'number' || typeof longitude !== 'number') return
    let message = `Browser ${LocaleUtil.locale(
      'openLocation仅可在企业微信或APP中使用',
      'lyrixi_0e963a39eb4b363f9465618162b7d7d5',

      ['openLocation']
    )}`
    Toast.open({
      content: message
    })
    onError?.({ status: 'error', message: message })
  },
  getLocation: function (params?: BridgeGetLocationParams) {
    this.getBrowserLocation(params)
  },
  getBrowserLocation: function (params?: BridgeGetBrowserLocationParams) {
    const { type, onSuccess, onError } = params || {}
    if (this.debug) {
      console.log('模拟浏览器定位...', type)
      setTimeout(() => {
        const data: BridgeGetLocationResultData =
          type === 'gcj02'
            ? {
                type: type || 'wgs84',
                latitude: 39.909187,
                longitude: 116.397451,
                accuracy: 3
              }
            : {
                type: type || 'wgs84',
                latitude: 39.907783490367706,
                longitude: 116.39120737493609,
                accuracy: 3
              }
        onSuccess?.({
          status: 'success',
          code: '',
          message: '',
          data
        })
      }, 2000)
      return
    }

    if (navigator.geolocation) {
      console.log('调用浏览器定位...', type)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let longitude = position.coords.longitude
          let latitude = position.coords.latitude
          if (typeof longitude !== 'number' || typeof latitude !== 'number') {
            onError?.({
              status: 'error',
              code: 'LATLNG_ERROR',
              message: `Browser ${LocaleUtil.locale(
                '定位失败',
                'lyrixi_9831baf6b76c1da7b69b463033b924cc'
              )}`
            })
          }

          console.log('调用浏览器定位成功', { type, longitude, latitude })
          if (type === 'gcj02') {
            const points = GeoUtil.transformPoint(
              { longitude: longitude, latitude: latitude },
              'wgs84',
              'gcj02'
            )
            if (points) {
              longitude = points.longitude ?? longitude
              latitude = points.latitude ?? latitude
            }
          }
          onSuccess?.({
            status: 'success',
            code: '',
            message: '',
            data: {
              longitude,
              latitude,
              type: type || 'wgs84',
              accuracy: position.coords.accuracy ?? undefined
            }
          })
        },
        (error) => {
          let code = ''
          let message = ''
          switch (error.code) {
            case error.PERMISSION_DENIED:
              code = 'PERMISSION_DENIED'
              message = `Browser ${LocaleUtil.locale(
                '定位失败,用户拒绝请求地理定位',
                'lyrixi_f8cfa8427bee70b3f5759bcbce99b4b3'
              )}`
              break
            case error.POSITION_UNAVAILABLE:
              code = 'POSITION_UNAVAILABLE'
              console.log(
                `Browser ${LocaleUtil.locale(
                  '定位失败,位置信息是不可用',
                  'lyrixi_c9eb59bd4d16540b9f2295104060284f'
                )}`
              )
              message = `Browser ${LocaleUtil.locale(
                '定位失败,位置信息是不可用',
                'lyrixi_c9eb59bd4d16540b9f2295104060284f'
              )}`
              break
            case error.TIMEOUT:
              code = 'TIMEOUT'
              console.log(
                `Browser ${LocaleUtil.locale(
                  '定位失败,位置信息是不可用',
                  'lyrixi_c9eb59bd4d16540b9f2295104060284f'
                )}`
              )
              message = `Browser ${LocaleUtil.locale(
                '定位失败,请求获取用户位置超时',
                'lyrixi_8a95092c3c8f57da8b4a619eeead5795'
              )}`
              break
            case 0:
              code = 'UNKNOWN_ERROR'
              console.log(
                `Browser ${LocaleUtil.locale(
                  '定位失败,位置信息是不可用',
                  'lyrixi_c9eb59bd4d16540b9f2295104060284f'
                )}`
              )
              message = `Browser ${LocaleUtil.locale(
                '定位失败,定位系统失效',
                'lyrixi_b7ad4da2f97870b26920561f33ab14ab'
              )}`
              break
            default:
              code = 'LOCATION_ERROR'
              console.log(
                `Browser ${LocaleUtil.locale(
                  '定位失败',
                  'lyrixi_9831baf6b76c1da7b69b463033b924cc'
                )}`
              )
              message = `Browser ${LocaleUtil.locale(
                '定位失败',
                'lyrixi_9831baf6b76c1da7b69b463033b924cc'
              )}`
          }
          let res: ErrorResult = { status: 'error', code: code, message: message }
          console.log('调用浏览器定位失败', res)
          onError?.(res)
        },
        {
          enableHighAccuracy: true,
          timeout: 8000,
          maximumAge: 0
        }
      )
    } else {
      let res: ErrorResult = {
        status: 'error',
        code: 'LOCATION_NOT_SUPPORTED_ERROR',
        message: `Browser ${LocaleUtil.locale(
          '此平台不支持',
          'lyrixi_60a7978c99ee3bd2f538096ee46727ca'
        )}`
      }
      onError?.(res)
    }
    return
  },
  scanCode: function (params?: BridgeScanCodeParams) {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      scanType,
      onSuccess,
      onError,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onCancel
    } = params || {}
    if (!this.debug) {
      let message = `Browser ${LocaleUtil.locale(
        '此平台不支持',
        'lyrixi_60a7978c99ee3bd2f538096ee46727ca'
      )} scanCode`
      Toast.open({
        content: message
      })
      if (onError)
        onError({
          status: 'error',
          message: message
        })
      return
    }
    setTimeout(function () {
      if (onSuccess)
        onSuccess({
          status: 'success',
          code: '',
          message: '',
          data: { content: '504823170310092750280333' }
        })
    }, 500)
  },
  chooseMedia: function () {
    let message = `Browser ${LocaleUtil.locale(
      '此平台不支持',
      'lyrixi_60a7978c99ee3bd2f538096ee46727ca'
    )} chooseMedia`
    Toast.open({
      content: message
    })
  },
  uploadFile: async function (params?: BridgeUploadFileParams) {
    const {
      localFile: rawLocalFile,
      getUploadUrl,
      formatHeaders,
      formatPayload,
      formatResponse,
      onSuccess,
      onError
    } = params || {}
    const localFile = rawLocalFile as BridgeUploadLocalFile | undefined
    let url = (await getUploadUrl?.({ platform: 'browser' })) || ''
    if (!url || typeof url !== 'string') {
      onError?.({
        status: 'error',
        message: `url error`
      })
      return
    }
    if (!localFile?.filePath || !localFile?.fileType) {
      onError?.({ status: 'error', message: 'localFile error' })
      return
    }
    let payload: Record<string, unknown> = {
      filePath: localFile.filePath,
      fileType: localFile.fileType
    }
    if (typeof formatPayload === 'function') {
      payload = (await formatPayload(payload, { platform: 'browser' })) as Record<string, unknown>
    }
    let headers: Record<string, string> = { 'Content-Type': 'multipart/form-data' }
    if (typeof formatHeaders === 'function') {
      headers = (await formatHeaders(headers, { platform: 'browser' })) as Record<string, string>
    }

    let response = (await uploadFile({
      url: url,
      headers: headers,
      payload: payload as Record<string, string | Blob>
    })) as { status: string; [key: string]: unknown }

    if (response.status === 'success' && typeof formatResponse === 'function') {
      response = await formatResponse(response, { platform: 'browser' })
    }

    if (response?.status === 'success') {
      onSuccess?.(response as SuccessResult<FileItem>)
    } else {
      onError?.(response as ErrorResult)
    }
  },
  previewMedia: function (params?: BridgePreviewMediaParams) {
    const { onError } = params || {}
    onError?.({
      status: 'error',
      message: `Browser ${LocaleUtil.locale(
        '此平台不支持',
        'lyrixi_60a7978c99ee3bd2f538096ee46727ca'
      )} previewMedia`
    })
  },
  previewFile: function (params?: BridgePreviewFileParams) {
    const { onError } = params || {}
    let message = `Browser ${LocaleUtil.locale(
      '此平台不支持',
      'lyrixi_60a7978c99ee3bd2f538096ee46727ca'
    )} previewFile`
    Toast.open({
      content: message
    })
    onError?.({ status: 'error', message: message })
  },
  share(params?: BridgeShareParams) {
    const { url, onSuccess } = params || {}
    Clipboard.setString(url || '')
    onSuccess?.({
      status: 'success',
      data: undefined
    })
  }
}
export default Browser
