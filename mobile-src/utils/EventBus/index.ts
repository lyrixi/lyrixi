import EventBusCore from './EventBus'
import useEmit from './useEmit'
import useOn from './useOn'

import type { EventBusComponents } from './EventBus.modules.types'

const EventBus = EventBusCore as EventBusComponents
EventBus.useOn = useOn
EventBus.useEmit = useEmit

export default EventBus
