// 动态加载script的方法
function loadImage(
  src: string,
  opts?: {
    onError?: (r: { status: string; img: HTMLImageElement; message: string }) => void
    onSuccess?: (r: { status: string; img: HTMLImageElement; message: string }) => void
  }
) {
  const { onError, onSuccess } = opts || {}
  return new Promise((resolve) => {
    let img = new Image()
    img.src = src
    img.onload = function () {
      let result = {
        status: 'success',
        img: img,
        message: ''
      }
      resolve(result)
      // 支持新的 onSuccess
      onSuccess?.(result)
    }
    img.onerror = function () {
      let result = {
        status: 'error',
        img: img,
        message: 'Load image failed'
      }
      resolve(result)
      // 支持新的 onError
      onError?.(result)
    }
  })
}

export default loadImage
