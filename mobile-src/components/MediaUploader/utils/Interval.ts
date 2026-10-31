import type { MediaUploaderIntervalTracker } from './interval/MediaUploader.utils.interval.types'

function Interval(interval: number): MediaUploaderIntervalTracker {
  let lastCallTime = 0

  return {
    isTimeout() {
      const now = Date.now()
      const currentInterval = now - lastCallTime

      lastCallTime = now

      if (currentInterval < interval && lastCallTime > 0) {
        return false
      } else {
        return true
      }
    }
  }
}

export default Interval
