// 与(Attach.getRemainCount, AttachUploader.getRemainCount, MediaUploader.getRemainCount)共用

// 剩余可上传数量
function getRemainCount(maxCount: number, currentCount: number, maxSelectCount?: number) {
  // 矫正错误的入参
  if (!maxCount || isNaN(maxCount)) {
    // eslint-disable-next-line
    maxCount = 5
  }
  if (maxCount < 1) {
    // eslint-disable-next-line
    maxCount = 1
  }
  if (!currentCount || isNaN(currentCount)) {
    // eslint-disable-next-line
    currentCount = 0
  }

  // 计算剩余可上传数量
  let remainCount = maxCount - currentCount

  // 单次上传限制
  if (maxSelectCount) {
    if (remainCount > maxSelectCount) {
      return maxSelectCount
    }
  }

  return remainCount
}

export default getRemainCount
