function accessImageSrc(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    let img = new Image()
    img.src = src
    img.onload = function () {
      resolve(true)
    }
    img.onerror = function () {
      resolve(false)
    }
  })
}

export default accessImageSrc
