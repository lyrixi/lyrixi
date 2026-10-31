import StorageCore from './Storage'
import useStorage from './useStorage'

import type { StorageComponents } from './Storage.modules.types'

const Storage = StorageCore as StorageComponents
Storage.useStorage = useStorage

export default Storage
