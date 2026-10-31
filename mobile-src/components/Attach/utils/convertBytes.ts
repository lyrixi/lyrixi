import {
  ATTACH_CONVERT_BYTES_UNITS,
  type AttachConvertBytesUnit
} from './Attach.utils.convertBytes.types'
function convertBytes(bytes: number, targetUnit = 'MB') {
  const key = targetUnit.toUpperCase() as AttachConvertBytesUnit
  if (!(key in ATTACH_CONVERT_BYTES_UNITS) || typeof bytes !== 'number') {
    return 0
  }

  return bytes / ATTACH_CONVERT_BYTES_UNITS[key]
}

export default convertBytes
