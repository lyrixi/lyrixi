import type { DistrictType } from '../../types/Cascader.DistrictMain.utils.formatType.types'

function formatType(type: string): DistrictType {
  if (['country', 'province', 'city', 'district', 'street'].includes(type)) {
    return type as DistrictType
  }
  console.error(`lyrixi Cascader: ${type} is not a valid type`)
  return 'street'
}

export default formatType
