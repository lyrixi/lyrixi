import getPosition from './getPosition'
import snapToEdge from './snapToEdge'
import type { AssistiveTouchParams, GapOption } from './../types'

class AssistiveTouch {
  private target!: HTMLElement
  private gap: GapOption | undefined
  private onDragEnd: ((options: Record<string, unknown>) => void) | undefined
  private touches!: {
    isDragging: boolean
    startX: number
    startY: number
    currentLeft: number
    currentTop: number
  }

  constructor(target: HTMLElement, params: AssistiveTouchParams = {}) {
    const { gap, onDragEnd } = params
    if (!target) return

    this.target = target
    this.gap = gap
    this.onDragEnd = onDragEnd

    target.style.position = 'fixed'

    this.touches = {
      isDragging: false,
      startX: 0,
      startY: 0,
      currentLeft: 0,
      currentTop: 0
    }

    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
  }

  // 触摸开始
  private handleTouchStart(e: TouchEvent): void {
    this.touches.isDragging = true
    const touch = e.touches[0]
    this.touches.startX = touch.clientX
    this.touches.startY = touch.clientY
    const pos = getPosition(this.target)
    this.touches.currentLeft = pos.left
    this.touches.currentTop = pos.top
    this.target.style.transition = 'none'
  }

  // 触摸移动
  private handleTouchMove(e: TouchEvent): void {
    if (!this.touches.isDragging) return
    e.preventDefault()
    const touch = e.touches[0]
    const deltaX = touch.clientX - this.touches.startX
    const deltaY = touch.clientY - this.touches.startY

    this.target.style.left = `${this.touches.currentLeft + deltaX}px`
    this.target.style.top = `${this.touches.currentTop + deltaY}px`
  }

  // 触摸结束
  private handleTouchEnd(e: TouchEvent): void {
    if (!this.touches.isDragging) return
    this.touches.isDragging = false

    const changedTouch = e.changedTouches?.[0]
    const endX = changedTouch?.clientX ?? 0
    const endY = changedTouch?.clientY ?? 0
    const diffX = this.touches.startX - endX
    const diffY = this.touches.startY - endY
    if (Math.abs(diffX) < 5 && Math.abs(diffY) < 5) {
      return
    }

    // 贴边
    snapToEdge(this.target, { gap: this.gap })

    if (this.onDragEnd) {
      const pos = getPosition(this.target)
      this.onDragEnd({ ...pos })
    }
  }

  /* --------------------
  Touch Events
  -------------------- */
  events(detach?: boolean): void {
    const action = detach ? 'removeEventListener' : 'addEventListener'
    this.target[action](
      'touchstart',
      this.handleTouchStart as EventListener,
      { passive: false } as AddEventListenerOptions
    )
    this.target[action](
      'touchmove',
      this.handleTouchMove as EventListener,
      { passive: false } as AddEventListenerOptions
    )
    this.target[action]('touchend', this.handleTouchEnd as EventListener, false)
    this.target[action]('touchcancel', this.handleTouchEnd as EventListener, false)
  }

  // attach、dettach事件
  attach(): void {
    this.events()
  }

  detach(): void {
    this.events(true)
  }
}

export default AssistiveTouch
