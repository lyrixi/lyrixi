import { Device, Loading, LocaleUtil, Request, Storage } from 'lyrixi-mobile'

import cacheConfig from './../cacheConfig'

const locale = LocaleUtil.locale

// 获取数据
async function queryData() {
  // 修改或者复制id
  let id = Device.getUrlParameter('id') || Device.getUrlParameter('copyId')

  // 新增
  if (!id) {
    return {
      baseData: { test: 'test' },
      formData: (await Storage.getItem(`${cacheConfig.name}:data`)) || {}
    }
  }

  // 修改或者复制
  Loading.open()
  try {
    const result: unknown = await Request.post('/api/examples/edit/load', {
      id: id
    })
    Loading.close()
    const r = result as { code?: string }
    if (r.code === '1') {
      return {
        baseData: { test: 'test' },
        formData: {
          input: 'Input content',
          textarea: 'Textarea content',
          autoSize:
            'AutoSize overlength content: AI as a feature involves incorporating AI technologies into existing products to improve their functionalities. On the other hand, AI as a product entails creating standalone AI-driven applications (AI Copilots or Agents) intended to perform specific tasks or deliver unique services',
          select: [{ id: '2', name: 'Option2' }]
        }
      }
    }
    return {
      status: '500',
      message: locale('获取数据错误！')
    }
  } catch {
    Loading.close()
    return {
      status: '500',
      message: locale('获取数据异常！')
    }
  }
}

export default queryData
