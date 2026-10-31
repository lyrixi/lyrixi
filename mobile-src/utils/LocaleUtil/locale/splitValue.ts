// Split value by variable: {0}{1}...
function splitValue(value: string): string[] {
  return value.split(/{(\d+)}/).map((part: string, index: number) => {
    if (index % 2 === 1) {
      return `variable:${part}`
    }
    return part
  })
}

export default splitValue
