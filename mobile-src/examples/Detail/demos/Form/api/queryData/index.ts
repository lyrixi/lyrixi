// 接入真实接口时恢复：
// import { Device, Loading, LocaleUtil, DataUtil, Request } from 'lyrixi-mobile'
// const locale = LocaleUtil.locale

// 获取数据
function queryData() {
  return new Promise((resolve) => {
    resolve({
      data: {
        input: 'Input content',
        textarea: 'Textarea content',
        autoSize:
          'AutoSize overlength content: AI as a feature involves incorporating AI technologies into existing products to improve their functionalities. On the other hand, AI as a product entails creating standalone AI-driven applications (AI Copilots or Agents) intended to perform specific tasks or deliver unique services',
        select: [{ id: '2', name: 'Option2' }]
      }
    })
  })
}

export default queryData
