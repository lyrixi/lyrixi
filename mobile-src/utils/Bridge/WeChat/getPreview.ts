// 内库使用-start
import Device from './../../../utils/Device'
// 内库使用-end

/* 测试使用-start
import { Device } from 'lyrixi-mobile'
测试使用-end */

// 微信ios平台不支持localId显示图片，需要转成base64后显示
function getPreview(localId: string) {
  return new Promise((resove) => {
    // 安卓可直接显示，无需要转换
    if (Device.os !== 'ios') {
      resove(localId)
      return
    }

    // localId转base64
    const wx = (window.top ?? window).wx
    const getLocal = wx?.getLocalImgData
    if (!getLocal) {
      resove(localId)
      return
    }
    getLocal({
      localId: localId,
      sizeType: 'compressed',
      isScheme: 1,
      success: function (res: { localData?: string }) {
        resove(res.localData)
      },
      fail: function () {
        resove(localId)
      }
    })
  })
}

export default getPreview
