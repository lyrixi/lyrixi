import _SafeArea from './SafeArea'
import { safeAreaDebug } from './SafeArea.debug'

import type { SafeAreaComponents } from './types/SafeArea.modules.types'

const SafeArea = _SafeArea as SafeAreaComponents

SafeArea.debug = safeAreaDebug

export default SafeArea
