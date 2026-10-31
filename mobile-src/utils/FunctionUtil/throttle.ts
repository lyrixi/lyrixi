import _throttle from 'lodash/throttle'

import type { DebouncedFunc } from 'lodash'

function throttle<A extends unknown[], R>(
  func: (...args: A) => R,
  wait?: number,
  options?: { leading?: boolean; trailing?: boolean }
): DebouncedFunc<(...args: A) => R> {
  return _throttle(func, wait, options)
}

export default throttle
