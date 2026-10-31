import type { BridgeWeChatWecomAgentConfigParams } from './Bridge.WeChat.types'

// 内库使用-start
import Request from './../../../utils/Request'
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { Request, LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

// 企业微信自建应用和SASS应用鉴权
function wecomAgentConfig(params?: BridgeWeChatWecomAgentConfigParams) {
  const { url, headers, payload, formatResponse, onSuccess, onError } = params || {}
  if (!url || !payload?.appId) {
    onError?.({
      status: 'error',
      message: `WeChat ${LocaleUtil.locale(
        '缺少参数',
        'lyrixi_f06ec979541f5f1283216579ac421380'
      )}: url or appId`
    })
    return
  }

  Request.post(url, payload, {
    headers: headers
  })
    .then(async (response: unknown) => {
      const res = response as { code?: string; message?: string } & Record<string, unknown>
      if (res.code === '1') {
        if (!formatResponse) return
        const result = (await formatResponse(res, { platform: 'wecom' })) as Record<
          string,
          unknown
        > & {
          status?: string
          message?: string
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
        if (!wx?.agentConfig) {
          onError?.({ status: 'error', message: 'wx.agentConfig not available' })
          return
        }
        wx.agentConfig({
          ...result,
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

          //必填
          debug: false,
          beta: true,
          success: function () {
            onSuccess?.({
              status: 'success',
              data: undefined
            })
          },
          fail: function (err: { errMsg?: string }) {
            console.error('鉴权失败:', err)
            onError?.({
              status: 'error',
              message:
                err.errMsg ||
                `WeChat ${LocaleUtil.locale(
                  '鉴权失败，请稍后重试！',
                  'lyrixi_2a3ba5ab52970d065f994590dcb73c9b'
                )}`
            })
          }
        })
      } else {
        onError?.({
          status: 'error',
          message:
            res.message ||
            `WeChat ${LocaleUtil.locale(
              '鉴权接口失败，请稍后重试！',
              'lyrixi_7334cbbe6fd40b00e470b91c73f16d2f'
            )}`
        })
      }
    })
    .catch(() => {
      onError?.({
        status: 'error',
        message: `WeChat ${LocaleUtil.locale(
          '鉴权接口异常，请稍后重试！',
          'lyrixi_d015103b9b8864df89ed3c7edb96eca0'
        )}`
      })
    })
}

export default wecomAgentConfig
