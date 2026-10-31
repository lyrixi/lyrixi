// 官方文档: https://open.dingtalk.com/document/development/jsapi-overview

import formatOpenLocationPoint from './../utils/formatOpenLocationPoint'
import getConfigPayload from './../utils/getConfigPayload'
import compressImage from './compressImage'
import config from './config'
import type { BridgeSDKErrorResponse } from '../WeChat/BridgeSDKErrorResponse.types'
import type {
  BridgeDingTalkChooseImageSuccessResponse,
  BridgeDingTalkFaceDetectSuccessResponse,
  BridgeDingTalkGetLocationSuccessResponse,
  BridgeDingTalkScanCodeSuccessResponse,
  BridgeDingTalkUploadFileSuccessResponse
} from './Bridge.DingTalk.types'
import type { ErrorResult, SuccessResult } from '../../../types'
import type {
  FileItem,
  BridgeChooseMediaParams,
  // BridgeChooseMediaResultData,
  BridgeConfigParams,
  BridgeDetectFaceParams,
  // BridgeDetectFaceResultData,
  BridgeGetLocationParams,
  BridgeGetLocationResultData,
  BridgeLoadParams,
  BridgeOpenLocationParams,
  BridgePreviewMediaParams,
  BridgePreviewMediaSource,
  BridgeScanCodeParams,
  BridgeSetTitleParams,
  BridgeShareParams,
  BridgeUploadFileParams,
  BridgeUploadLocalFile
} from '../types'

// 内库使用-start
import LocaleUtil from './../../LocaleUtil'
import Clipboard from './../../Clipboard'
import GeoUtil from './../../GeoUtil'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Clipboard, GeoUtil } from 'lyrixi-mobile'
测试使用-end */

let Bridge = {
  // 特有方法
  setTitle: function (params?: BridgeSetTitleParams) {
    const { title, onSuccess, onError } = params || {}
    ;(window.top ?? window).dd?.setNavigationTitle?.({
      title: title,
      success: () => {
        onSuccess?.({ status: 'success', data: undefined })
      },
      fail: (error: BridgeSDKErrorResponse) => {
        onError?.({
          status: 'error',
          message:
            error?.errorMessage ||
            `DingTalk ${LocaleUtil.locale(
              '设置标题失败',
              'lyrixi_6dd527e00e48b7580176120795b07b46'
            )}`
        })
      }
    })
  },
  // 通用方法
  load: function (params?: BridgeLoadParams) {
    const { getScriptSrc, onSuccess, onError } = params || {}
    if ((window.top ?? window).dd) {
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
      getScriptSrc?.({ platform: 'dingtalk' }) ||
      '//g.alicdn.com/dingding/dingtalk-jsapi/3.0.25/dingtalk.open.js'

    script.onload = function () {
      if (window.dd) {
        ;(window.top ?? window).dd = window.dd
      }

      onSuccess?.({
        status: 'success',
        data: undefined
      })
    }
    script.onerror = function () {
      onError?.({
        status: 'error',
        message: `DingTalk js ${LocaleUtil.locale(
          '加载失败',
          'lyrixi_866b795eae73791792b09d33d6595fe5'
        )}`
      })
    }

    document.body.appendChild(script)
  },
  config: async function (params?: BridgeConfigParams) {
    const { getConfigUrl, formatHeaders, formatPayload, formatResponse, onSuccess, onError } =
      params || {}
    // 获取配置url
    let url = ''
    if (typeof getConfigUrl === 'function') {
      url = await getConfigUrl({ platform: 'dingtalk' })
    }
    // 构建payload
    let payload: Record<string, unknown> = (await getConfigPayload()) as Record<string, unknown>
    if (typeof formatPayload === 'function') {
      payload = (await formatPayload(payload, { platform: 'dingtalk' })) as Record<string, unknown>
    }
    // 构建header
    let headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (typeof formatHeaders === 'function') {
      headers = (await formatHeaders(headers, { platform: 'dingtalk' })) as Record<string, string>
    }

    config({ url, headers, payload, formatResponse, onSuccess, onError })
  },
  onBack: function () {
    console.log('钉钉不支持监听物理返回')
  },
  openLocation: function (params?: BridgeOpenLocationParams) {
    const { to, scale, onSuccess, onError } = params || {}
    const { latitude, longitude, type = 'wgs84', name, address } = to || {}
    if (typeof latitude !== 'number' || typeof longitude !== 'number') return
    let point = formatOpenLocationPoint({ latitude, longitude, type })
    console.log('调用钉钉地图...', { latitude, longitude, type, name, address, scale })
    ;(window.top ?? window).dd?.openLocation?.({
      title: name || '',
      address: address || '',
      latitude: point?.latitude ?? 0,
      longitude: point?.longitude ?? 0,
      onSuccess: () => {
        onSuccess?.({ status: 'success', data: undefined })
      },
      onError: (error: BridgeSDKErrorResponse) => {
        onError?.({
          status: 'error',
          message:
            error?.errorMessage ||
            `DingTalk ${LocaleUtil.locale(
              '打开地图失败',
              'lyrixi_3dd680a6b28a8b59516034e54bc595b7'
            )}`
        })
      }
    })
  },
  getLocation: function (params?: BridgeGetLocationParams) {
    const { type, onSuccess, onError } = params || {}
    console.log('调用钉钉定位...', type)
    ;(window.top ?? window).dd?.getLocation?.({
      type: 0,
      useCache: false,
      coordinate: '1',
      cacheTimeout: 20,
      withReGeocode: false,
      targetAccuracy: '200',
      onSuccess: (res: BridgeDingTalkGetLocationSuccessResponse) => {
        console.log('钉钉定位完成', res)
        let latitude = res.latitude ?? 0
        let longitude = res.longitude ?? 0
        let currentType = 'gcj02'
        let isInChina = GeoUtil.isInChina({ longitude: longitude, latitude: latitude })
        if (isInChina) {
          currentType = 'gcj02'
        } else {
          currentType = 'wgs84'
        }

        const points = GeoUtil.transformPoint(
          { longitude: longitude, latitude: latitude },
          currentType,
          type ?? 'wgs84'
        )
        if (points) {
          longitude = points.longitude ?? longitude
          latitude = points.latitude ?? latitude
        }

        const data: BridgeGetLocationResultData = {
          type: type ?? 'wgs84',
          latitude: latitude,
          longitude: longitude,
          accuracy: res.accuracy
        }
        console.log('转换后坐标', data)
        onSuccess?.({
          status: 'success',
          code: '',
          message: '',
          data
        })
      },
      onError: (error: BridgeSDKErrorResponse) => {
        onError?.({ status: 'error', message: error?.errorMessage || '' })
      }
    })
  },
  scanCode: function (params?: BridgeScanCodeParams) {
    const { scanType, onSuccess, onError, onCancel } = params || {}
    let type = 'all'
    if (scanType && scanType.length === 1) {
      if (scanType.includes('qrCode')) {
        type = 'qrCode'
      } else if (scanType.includes('barCode')) {
        type = 'barCode'
      }
    }

    ;(window.top ?? window).dd?.biz?.util?.scan?.({
      type: type,
      onSuccess: (res: BridgeDingTalkScanCodeSuccessResponse) => {
        onSuccess?.({
          status: 'success',
          code: '',
          message: '',
          data: { content: res.text || '' }
        })
      },
      onError: (error: BridgeSDKErrorResponse) => {
        onError?.({ status: 'error', message: error?.errorMessage || '' })
      },
      onCancel: onCancel ? () => onCancel({ status: 'cancel', message: '' }) : undefined
    })
  },
  chooseMedia: function (params?: BridgeChooseMediaParams) {
    const {
      count: countIn,
      sourceType,
      sizeType,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      mediaType,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      maxDuration,
      onSuccess,
      onError,
      onCancel
    } = params || {}
    let count = countIn || 9
    if (sourceType?.length === 1 && sourceType.includes('camera') && count > 1) {
      count = 1
    }

    const handleSuccess = async function (res: BridgeDingTalkChooseImageSuccessResponse) {
      let localFiles: Array<Record<string, unknown>> = []
      for (let file of res.files || []) {
        let localFile: Record<string, unknown> = {
          fileThumbnail: file.path,
          fileUrl: file.path,
          filePath: file.path,
          fileType: 'image',
          fileExtension: file.fileType
        }

        if ((sizeType || []).includes('compressed')) {
          localFile = (await compressImage(
            localFile as Parameters<typeof compressImage>[0]
          )) as Record<string, unknown>
        }

        localFiles.push(localFile)
      }

      onSuccess?.({
        status: 'success',
        code: '',
        message: '',
        data: {
          localFiles: localFiles
        }
      })
    }

    const handleError = function (error: BridgeSDKErrorResponse) {
      if (
        error?.errorCode === '11' ||
        error?.errorCode === '-1' ||
        error?.errorCode === 11 ||
        error?.errorCode === -1
      ) {
        onCancel?.({ status: 'cancel', message: error?.errorMessage || '' })
      } else {
        console.error('钉钉uploadImage失败:', error)
        onError?.({
          status: 'error',
          code: String(error?.errorCode ?? '') || undefined,
          message: error?.errorMessage || ''
        })
      }
    }

    console.log('调用钉钉chooseImage:', {
      count: count,
      secret: false,
      position: 'back',
      sourceType: sourceType || ['camera', 'album']
    })
    ;(window.top ?? window).dd?.chooseImage?.({
      count: count,
      secret: false,
      position: 'back',
      sourceType: sourceType || ['camera', 'album'],
      success: handleSuccess,
      fail: handleError
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
      onError,
      onCancel
    } = params || {}
    const localFile = rawLocalFile as BridgeUploadLocalFile | undefined
    const url = (await getUploadUrl?.({ platform: 'dingtalk' })) || ''
    if (!localFile?.fileType || !localFile?.filePath) {
      onError?.({
        status: 'error',
        message: `localFile error`
      })
      return
    }
    if (!url || typeof url !== 'string') {
      onError?.({
        status: 'error',
        message: `url error`
      })
      return
    }

    let payload: Record<string, unknown> = {
      filePath: localFile.filePath,
      fileType: localFile.fileType
    }
    if (typeof formatPayload === 'function') {
      payload = (await formatPayload(payload, { platform: 'dingtalk' })) as Record<string, unknown>
    }
    let headers: Record<string, string> = { 'Content-Type': 'multipart/form-data' }
    if (typeof formatHeaders === 'function') {
      headers = (await formatHeaders(headers, { platform: 'dingtalk' })) as Record<string, string>
    }

    const handleSuccess = async function (res: BridgeDingTalkUploadFileSuccessResponse) {
      console.log('钉钉uploadImage成功:', res)
      const { data, statusCode } = res
      if (statusCode !== 200) {
        onError?.({
          status: 'error',
          message: `DingTalk ${LocaleUtil.locale(
            '网络异常，上传失败',
            'lyrixi_18904cde640c2efd37bc6ed3e9dedc77'
          )}`
        })
        return
      }

      let response: { code: string; data: unknown; status?: string } = {
        code: 'success',
        data: data
      }
      if (typeof data === 'string') {
        try {
          response.data = JSON.parse(data)
        } catch (e) {}
      }

      if (typeof formatResponse === 'function') {
        response = (await formatResponse(response, { platform: 'dingtalk' })) as typeof response
      }

      if (response.status === 'success') {
        onSuccess?.(response as SuccessResult<FileItem>)
      } else {
        onError?.(response as ErrorResult)
      }
    }

    console.log('调用钉钉uploadFile:', {
      url: url.startsWith('http') ? url : window.origin + url,
      headers: headers,
      formData: payload,
      fileName: 'file', // 文件名必传，但其实没什么用, 因为在formData也可以传
      filePath: localFile.filePath,
      fileType: localFile.fileType
    })
    ;(window.top ?? window).dd?.uploadFile?.({
      url: url.startsWith('http') ? url : window.origin + url,
      header: headers,
      formData: payload,
      fileName: 'file', // 文件名必传，但其实没什么用, 因为在formData也可以传
      filePath: localFile.filePath,
      fileType: localFile.fileType,
      success: handleSuccess,
      fail: (error: BridgeSDKErrorResponse) => {
        onError?.({
          status: 'error',
          code: String(error?.errorCode ?? '') || undefined,
          message: error?.errorMessage || ''
        })
      },
      cancel: (error: BridgeSDKErrorResponse) => {
        onCancel?.({
          status: 'cancel',
          code: String(error?.errorCode ?? '') || undefined,
          message: error?.errorMessage || ''
        })
      }
    })
  },
  previewMedia: function (params?: BridgePreviewMediaParams) {
    const { index, sources, onSuccess, onError, onCancel } = params || {}
    type DingTalkPreviewSource = BridgePreviewMediaSource & {
      localFile?: { tempFileUrl?: string }
    }
    const srcList = (sources || []) as DingTalkPreviewSource[]
    let urls = srcList.map((item) => item?.localFile?.tempFileUrl || item?.fileUrl)
    let current = index !== undefined ? srcList[index] : undefined

    // 预览视频
    if (current?.fileType === 'video') {
      Clipboard.setString(String(current.fileUrl ?? ''))
      return
    }

    // 预览图片
    ;(window.top ?? window).dd?.previewImage?.({
      urls: urls,
      current: index ?? 0,
      success: () => {
        onSuccess?.({
          status: 'success',
          data: undefined
        })
      },
      fail: (error: BridgeSDKErrorResponse) => {
        console.log('钉钉previewImage失败:', error)
        onError?.({
          status: 'error',
          code: String(error?.errorCode ?? '') || undefined,
          message:
            error?.errorMessage ||
            `DingTalk ${LocaleUtil.locale('预览失败', 'lyrixi_6a3a5ef00db03994963efebe08432ce1')}`
        })
      },
      cancel: (error: BridgeSDKErrorResponse) => {
        onCancel?.({
          status: 'cancel',
          code: String(error?.errorCode ?? '') || undefined,
          message: error?.errorMessage || ''
        })
      }
    })
  },
  /**
   * 人脸识别活体检测（钉钉 ATM BLE）
   * @see dd.biz.ATMBle.exclusiveLiveCheck
   */
  detectFace: async function (params?: BridgeDetectFaceParams) {
    const { getConfig, onSuccess, onError } = params || {}
    let config: Record<string, unknown> = {}
    if (typeof getConfig === 'function') {
      config = await getConfig({ platform: 'dingtalk' })
    }
    ;(window.top ?? window).dd?.biz?.ATMBle?.exclusiveLiveCheck?.({
      ...config,
      onSuccess: (res: BridgeDingTalkFaceDetectSuccessResponse) => {
        onSuccess?.({
          status: 'success',
          code: '',
          message: '',
          data: {
            match: res?.photoStatus === 1,
            confidence: undefined
          }
        })
      },
      onFail: (err: BridgeSDKErrorResponse) => {
        onError?.({
          status: 'error',
          code: err?.errorCode !== undefined ? String(err.errorCode) : undefined,
          message: err?.errorMessage
        })
      }
    })
  },
  share(params?: BridgeShareParams) {
    const { title, description, url, imageUrl, onSuccess, onError } = params || {}
    ;(window.top ?? window).dd?.biz?.util?.share?.({
      type: 0, // 分享类型，0:全部组件 默认；1:只能分享到钉钉；2:不能分享，只有刷新按钮
      url: url,
      title: title,
      content: description,
      image: imageUrl,
      onSuccess: function () {
        onSuccess?.({ status: 'success', data: undefined })
      },
      onFail: function (err: BridgeSDKErrorResponse) {
        console.log('DingTalk Share onError:', err)
        onError?.({
          status: 'error',
          message:
            err?.errMsg ||
            `DingTalk ${LocaleUtil.locale('分享失败', 'lyrixi_e8e25af006ef2ebbdb317e1d7c035a0f')}`
        })
      }
    })
  }
}

export default Bridge
