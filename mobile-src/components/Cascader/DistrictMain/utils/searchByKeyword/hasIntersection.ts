// Check if the current array has any intersection with the target array
function hasIntersection(currentArray: string[], targetArray: string[]): boolean {
  if (!Array.isArray(currentArray) || !Array.isArray(targetArray)) return false
  return targetArray.some((targetItem) => currentArray.includes(targetItem))
}

export default hasIntersection
