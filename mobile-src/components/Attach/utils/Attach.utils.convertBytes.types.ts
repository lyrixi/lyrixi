export const ATTACH_CONVERT_BYTES_UNITS = {
  B: 1,
  KB: 1024,
  MB: 1024 ** 2,
  GB: 1024 ** 3,
  TB: 1024 ** 4
} as const

export type AttachConvertBytesUnit = keyof typeof ATTACH_CONVERT_BYTES_UNITS
