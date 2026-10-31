import EventBusCore from './EventBus'
import useEmit from './useEmit'
import useOn from './useOn'

export type EventBusComponents = typeof EventBusCore & {
  useOn: typeof useOn
  useEmit: typeof useEmit
}
