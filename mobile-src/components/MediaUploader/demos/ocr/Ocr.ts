import { LocaleUtil, Request, Loading, Toast, FileItem } from 'lyrixi-mobile'

// 新的OCR识别：单个照片识别
function recognizeItem(item: FileItem | null) {
  // eslint-disable-next-line
  return new Promise<FileItem | null>(async (resolve) => {
    // 识别完成
    if (!item) {
      resolve(item)
      return
    }

    // 没有必要数据直接报错
    if (!item.fileUrl) {
      item.ocrErrMsg = String(LocaleUtil.locale(`缺少url参数, 无法进行ocr识别！`))

      Toast.open({ content: String(item.ocrErrMsg) })
      resolve(item)
      return
    }

    Request.post(
      'ocrRecognizeUrl',
      {
        imageUrl: item.fileUrl
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then((result: unknown) => {
        item.ocrResult = result || null
        const r = result as { code?: string; message?: string } | null

        Loading.close()
        if (r?.code === '1') {
          resolve(item)
        } else {
          item.ocrErrMsg = r?.message || String(LocaleUtil.locale('名片识别失败！'))
          Toast.open({ content: String(item.ocrErrMsg) })
          Loading.close()
          resolve(item)
        }
      })
      .catch(() => {
        Loading.close()
        item.ocrErrMsg = String(LocaleUtil.locale('名片识别失败！'))
        resolve(item)
      })
  })
}

const ocr = { recognizeItem }

export default ocr
