import SafeArea from '../SafeArea'
import { safeAreaDebug } from '../SafeArea.debug'

export type SafeAreaComponents = typeof SafeArea & { debug: typeof safeAreaDebug }
