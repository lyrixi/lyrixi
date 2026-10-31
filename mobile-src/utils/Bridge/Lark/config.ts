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
        const result = (await formatResponse(res, { platform: 'lark' })) as {
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
          if (isReady) return

          isReady = true
          onError?.({
            status: 'error',
            message: 'config failed: timeout'
          })
        }, 10000)

        const top = window.top ?? window
        top.h5sdk?.config?.({
          appId: result.data?.appId,
          timestamp: result.data?.timeStamp,
          nonceStr: result.data?.nonceStr,
          signature: result.data?.signature,
          jsApiList: ['openLocation', 'getLocation', 'scanCode', 'previewImage'],
          // 成功回调
          onSuccess: (sdkRes: unknown) => {
            // 单例
            if (isReady) return
            isReady = true
            console.log(`config success: `, sdkRes)
            onSuccess?.({
              status: 'success',
              data: undefined
            })
          },
          // 失败回调
          onFail: (err: unknown) => {
            // 单例
            if (isReady) return
            isReady = true
            console.log(`config failed: `, err)
            onError?.({
              status: 'error',
              message: `Lark ${LocaleUtil.locale(
                'config failed',
                'lyrixi_8482a17aad47dfd3f333e7a79c369e8c'
              )}`
            })
          }
        })
      } else {
        onError?.({
          status: 'error',
          message:
            res.message ||
            `Lark ${LocaleUtil.locale(
              '鉴权接口失败，请稍后重试！',
              'lyrixi_7334cbbe6fd40b00e470b91c73f16d2f'
            )}`
        })
      }
    })
    .catch(() => {
      onError?.({
        status: 'error',
        message: `Lark ${LocaleUtil.locale(
          '鉴权接口异常，请稍后重试！',
          'lyrixi_d015103b9b8864df89ed3c7edb96eca0'
        )}`
      })
    })
}

export default config
