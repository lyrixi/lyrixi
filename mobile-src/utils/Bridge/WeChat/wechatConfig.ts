import type { BridgeWeChatWechatConfigParams } from './Bridge.WeChat.types'

// 内库使用-start
import Request from './../../../utils/Request'
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { Request, LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

function wechatConfig(params?: BridgeWeChatWechatConfigParams) {
  const { url, headers, payload, formatResponse, onSuccess, onError } = params || {}
  if (!url || !payload?.appId) {
    onError?.({
      status: 'error',
      message: `WeChat ${LocaleUtil.locale(
        '缺少参数',
        'lyrixi_f06ec979541f5f1283216579ac421380',
        undefined
      )}: url or appId`
    })
    return
  }

  // 微信鉴权
  Request.post(url, payload, {
    headers: headers
  })
    .then(async (response: unknown) => {
      const res = response as { code?: string; message?: string } & Record<string, unknown>
      if (res.code === '1') {
        if (!formatResponse) return
        const result = (await formatResponse(res, { platform: 'wechat' })) as {
          status: string
          message?: string
          data?: Record<string, unknown>
        }
        if (result.status === 'error') {
          onError?.({
            status: 'error',
            message: result.message
          })
          return
        }
        const top = window.top ?? window
        const wx = top.wx
        if (!wx) {
          onError?.({ status: 'error', message: 'wx JSSDK not loaded' })
          return
        }
        wx?.config?.(
          Object.assign({ beta: true, debug: !!top._debug_ }, result.data, {
            jsApiList: [
              'openLocation',
              'getLocation',
              'chooseImage',
              'uploadImage',
              'previewImage',
              'getLocalImgData',
              'scanQRCode',
              'onHistoryBack',
              'hideOptionMenu',
              'showMenuItems',
              'hideMenuItems',
              'hideAllNonBaseMenuItem',
              'selectExternalContact',
              'getCurExternalContact',
              'getCurExternalChat',
              'openUserProfile',
              'sendChatMessage',
              'startRecord',
              'stopRecord',
              'uploadVoice',
              'onVoiceRecordEnd',
              'playVoice',
              'pauseVoice',
              'stopVoice',
              'onVoicePlayEnd',
              'updateAppMessageShareData',
              'updateTimelineShareData',
              'openDefaultBrowser',
              'shareToExternalMoments',
              'shareAppMessage'
            ],

            // 填入打开小程序的开放标签名
            openTagList: ['wx-open-launch-weapp']
          })
        )

        wx?.error?.((err) => {
          console.log(err)
          onError?.({
            status: 'error',
            message: JSON.stringify(err)
          })
        })
        wx?.ready?.(() => {
          console.log('鉴权完成')
          onSuccess?.({
            status: 'success',
            data: undefined
          })
        })
      } else {
        onError?.({
          status: 'error',
          message:
            res.message ||
            `WeChat ${LocaleUtil.locale(
              '鉴权接口失败，请稍后重试！',
              'lyrixi_7334cbbe6fd40b00e470b91c73f16d2f',
              undefined
            )}`
        })

        console.log(
          res.message ||
            `WeChat ${LocaleUtil.locale(
              '鉴权接口失败，请稍后重试！',
              'lyrixi_7334cbbe6fd40b00e470b91c73f16d2f',
              undefined
            )}`
        )
      }
    })
    .catch(() => {
      onError?.({
        status: 'error',
        message: `WeChat ${LocaleUtil.locale(
          '鉴权接口异常，请稍后重试！',
          'lyrixi_d015103b9b8864df89ed3c7edb96eca0',
          undefined
        )}`
      })
    })
}

export default wechatConfig
