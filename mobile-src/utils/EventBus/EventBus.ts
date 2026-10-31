import type { EventBusEventHandler } from './EventBus.types'

const EventBus = {
  events: {} as Record<string, EventBusEventHandler[]>,
  on: function (eventName: string, fn: EventBusEventHandler): void {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(fn)
  },
  emit: function (eventName: string, ...args: unknown[]): boolean {
    const fns = this.events[eventName]
    if (!Array.isArray(fns) || !fns.length) return false
    // eslint-disable-next-line
    for (let i = 0, fn: EventBusEventHandler | undefined; (fn = fns[i++]); ) {
      fn.apply(this, args)
    }
    return true
  },
  off: function (eventName: string, fn: EventBusEventHandler): boolean {
    const fns = this.events[eventName]
    if (!Array.isArray(fns) || !fns.length) return false
    for (let i = 0; i < fns.length; i++) {
      if (fns[i] === fn) {
        fns.splice(i, 1)
        break
      }
    }
    return true
  },
  destroy: function (eventName?: string): void {
    if (!eventName) {
      this.events = {}
      return
    }
    delete this.events[eventName]
  }
}

export default EventBus
