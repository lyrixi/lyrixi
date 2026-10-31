import getDefaultDateValue from './getDefaultDateValue'

function getDefaultRangeValue({
  min,
  max
}: {
  min?: Date | null
  max?: Date | null
}): [Date, Date] {
  const startDate = getDefaultDateValue({ min, max })
  const endDate = getDefaultDateValue({ min, max })

  return [startDate, endDate]
}

export default getDefaultRangeValue
