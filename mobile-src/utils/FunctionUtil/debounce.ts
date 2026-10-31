import _debounce from 'lodash/debounce'

import type { DebouncedFunc } from 'lodash'

function debounce<A extends unknown[], R>(
  func: (...args: A) => R,
  wait?: number,
  options?: { leading?: boolean; maxWait?: number; trailing?: boolean }
): DebouncedFunc<(...args: A) => R> {
  return _debounce(func, wait, options)
}

export default debounce
