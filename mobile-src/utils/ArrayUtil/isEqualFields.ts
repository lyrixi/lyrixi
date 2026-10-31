// 比较列表中每一项的id是否相等
function isEqualFields(
  array1: Record<string, unknown>[],
  array2: Record<string, unknown>[],
  fieldNames: string[] = ['id']
): boolean {
  return array1.every((item: Record<string, unknown>, index: number) => {
    for (const fieldName of fieldNames) {
      if (item[fieldName] !== array2[index]?.[fieldName]) return false
    }
    return true
  })
}

export default isEqualFields
