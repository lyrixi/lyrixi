import type { BridgeSuccessCallback, BridgeErrorCallback } from '../types'

// 内库使用-start
import Request from './../../../utils/Request'
import LocaleUtil from './../../../utils/LocaleUtil'
// 内库使用-end

/* 测试使用-start
import { Request, LocaleUtil } from 'lyrixi-mobile'
测试使用-end */

function config(params?: {
  url?: string
  headers?: Record<string, string>
  payload?: Record<string, unknown>
  formatResponse?: (response: unknown, options: { platform: string }) => Promise<unknown> | unknown
  onSuccess?: BridgeSuccessCallback
  onError?: BridgeErrorCallback
}) {
  const { url, headers, payload, formatResponse, onSuccess, onError } = params || {}
  if (!url || !payload) return
  // 获取鉴权信息
  Request.post(url, payload, {
    headers: headers
  })
    .then(async (response: unknown) => {
      const res = response as { code?: string; message?: string } & Record<string, unknown>
      if (res.code === '1') {
        if (!formatResponse) return
        const result = (await formatResponse(res, { platform: 'dingtalk' })) as {
          status?: string
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
        let isReady = false

        // config 超时
        setTimeout(() => {
          // 单例
          if (isReady) return

          isReady = true
          onError?.({
            status: 'error',
            message: `DingTalk ${LocaleUtil.locale(
              '超时',
              'lyrixi_e944c7c9017a815650ce6b78f81685e7'
            )}`
          })
        }, 10000)

        const top = window.top ?? window
        // 必填，需要使用的jsapi列表，注意：不要带dd。
        top.dd?.config?.({
          agentId: result.data?.agentId, // 必填，微应用ID
          appId: result.data?.appId, // 必填，企业ID
          timeStamp: result.data?.timeStamp, // 必填，生成签名的时间戳
          nonceStr: result.data?.nonceStr, // 必填，自定义固定字符串。
          signature: result.data?.signature, // 必填，签名
          type: 0, // 选填。0表示微应用的jsapi,1表示服务窗的jsapi；不填默认为0。该参数从dingtalk.js的0.8.3版本开始支持
          // https://open.dingtalk.com/document/orgapp/client-api-comparison-table
          jsApiList: [
            'biz.map.view', // openLocation也使用此ApiList
            'device.geolocation.get', // getLocation也使用此ApiList
            'biz.util.scan',
            'biz.util.chooseImage',
            'uploadFile',
            // 以下api不需要鉴权
            'biz.util.previewImage'
            // 'previewImage',
            // 'closePage',
            // 'setNavigationTitle'
          ]
        })

        // 该方法必须带上，用来捕获鉴权出现的异常信息，否则不方便排查出现的问题
        top.dd?.error?.(function (err: { errorMessage?: string }) {
          console.error('鉴权失败:', err)
          onError?.({
            status: 'error',
            message: `DingTalk ${LocaleUtil.locale(
              '鉴权失败',
              'lyrixi_c0a3c7a55fe9e9647c0957dfa2beeeb6'
            )} ${err?.errorMessage || ''}`
          })
        })
        top.dd?.ready?.(function () {
          console.log('鉴权成功')
          onSuccess?.({
            status: 'success',
            data: undefined
          })
        })
      } else {
        console.log('钉钉鉴权接口失败，请稍后重试！')
        onError?.({
          status: 'error',
          message:
            res.message ||
            `DingTalk ${LocaleUtil.locale(
              '鉴权接口失败，请稍后重试！',
              'lyrixi_7334cbbe6fd40b00e470b91c73f16d2f'
            )}`
        })
      }
    })
    .catch((err) => {
      console.log('钉钉鉴权接口异常，请稍后重试！', err)
      onError?.({
        status: 'error',
        message: `DingTalk ${LocaleUtil.locale(
          '鉴权接口异常，请稍后重试！',
          'lyrixi_d015103b9b8864df89ed3c7edb96eca0'
        )}`
      })
    })
}

export default config
