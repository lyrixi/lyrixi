const hasOwn = {}.hasOwnProperty

function appendClass(value: string, newClass: string): string {
  if (!newClass) {
    return value
  }

  return value ? value + ' ' + newClass : newClass
}

function parseValue(arg: unknown): string {
  if (typeof arg === 'string') {
    return arg.trim()
  }

  if (typeof arg !== 'object') {
    return ''
  }

  if (Array.isArray(arg)) {
    return classNames(...arg)
  }

  if (arg === null) return ''

  if (
    (arg as object).toString !== Object.prototype.toString &&
    !(arg as object).toString.toString().includes('[native code]')
  ) {
    return (arg as object).toString()
  }

  let classes = ''

  for (const key in arg as object) {
    if (hasOwn.call(arg, key) && (arg as Record<string, unknown>)[key]) {
      classes = appendClass(classes, key)
    }
  }

  return classes
}

function classNames(...args: unknown[]): string {
  let classes = ''

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    if (arg) {
      classes = appendClass(classes, parseValue(arg))
    }
  }

  return classes
}

export default classNames
