// 当前值所占百分比
function getPercent({ min, max, value }: { min: number; max: number; value: number }): number {
  if (typeof min !== 'number' || typeof max !== 'number' || typeof value !== 'number') {
    return 0
  }

  let percent = ((value - min) / (max - min)) * 100
  return percent
}

export default getPercent
