import StorageCore from './Storage'
import useStorage from './useStorage'

export type StorageComponents = typeof StorageCore & {
  useStorage: typeof useStorage
}
