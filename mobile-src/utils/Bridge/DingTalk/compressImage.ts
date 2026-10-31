// https://open.dingtalk.com/document/isvapp/jsapi-compress-image
// 压缩图片, file: {filePath: '', fileName: '', fileType: ''}
function compressImage(file: {
  filePath?: string
  fileName?: string
  fileType?: string
  [key: string]: unknown
}) {
  return new Promise<typeof file>((resolve) => {
    const run = (window.top ?? window).dd?.compressImage
    if (!run) {
      resolve(file)
      return
    }
    run({
      filePaths: [file.filePath],
      compressLevel: 2,
      onSuccess: (res: { filePaths?: string[] }) => {
        const { filePaths } = res
        file.filePath = filePaths?.[0] || file.filePath
        resolve(file)
      },
      onError: () => {
        resolve(file)
      }
    })
  })
}

export default compressImage
