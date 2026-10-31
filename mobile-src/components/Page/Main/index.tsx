import React, { forwardRef, useRef, useImperativeHandle } from 'react'
import TopContainer from './TopContainer'
import isBottom from './utils/isBottom'
import topRefreshOk from './utils/topRefreshOk'

import type { PageMainProps, PageMainRef, PageMainTouchesState } from '../types'

// 内库使用-start
import Device from './../../../utils/Device'
import DOMUtil from './../../../utils/DOMUtil'
import LocaleUtil from './../../../utils/LocaleUtil'
import SafeArea from './../../SafeArea'
// 内库使用-end

/* 测试使用-start
import { Device, DOMUtil, LocaleUtil, SafeArea } from 'lyrixi-mobile'
测试使用-end */

function touchClientY(e: React.TouchEvent<HTMLElement>): number {
  return e.touches[0]?.clientY ?? e.changedTouches[0]?.clientY ?? 0
}

const Main = forwardRef<PageMainRef, PageMainProps>(
  (
    {
      // Value & Display Value
      id,
      threshold = 50,
      // Status
      safeArea,
      // Value & Display Value
      touchStopPropagation = true,
      // Style
      className,
      style,
      // Elements
      children,
      // Events
      onTopRefresh,
      onBottomRefresh,
      onScroll,
      onScrollEnd
    },
    ref
  ) => {
    const rootRef = useRef<HTMLElement | null>(null)
    const isLoadingRef = useRef(false)
    const topContainerRef = useRef<HTMLDivElement | null>(null)
    const scrollThrottleRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    const touchesRef = useRef<PageMainTouchesState>({
      isTop: true,
      startY: 0,
      currentY: 0,
      diffY: 0
    })

    function handleTouchStart(e: React.TouchEvent<HTMLElement>) {
      if (touchStopPropagation) e.stopPropagation()
      if (isLoadingRef.current) return
      const topEl = topContainerRef.current
      if (!topEl) return

      if (e.currentTarget.scrollTop <= 0) touchesRef.current.isTop = true
      else touchesRef.current.isTop = false

      topEl.style.webkitTransitionDuration = '0ms'

      touchesRef.current.startY = touchClientY(e)
      touchesRef.current.diffY = 0
    }

    function handleTouchMove(e: React.TouchEvent<HTMLElement>) {
      if (touchStopPropagation) e.stopPropagation()
      if (isLoadingRef.current) return
      if (!touchesRef.current.isTop) return
      const topEl = topContainerRef.current
      if (!topEl) return

      touchesRef.current.currentY = touchClientY(e)
      touchesRef.current.diffY = touchesRef.current.currentY - touchesRef.current.startY

      if (touchesRef.current.diffY < 20) {
        return
      }

      if (touchesRef.current.diffY > 100) touchesRef.current.diffY = 100
      topEl.style.height = touchesRef.current.diffY + 'px'
      const topIcon = topEl.querySelector?.('.lyrixi-page-main-pull-push-icon')
      const topText = topEl.querySelector?.('.lyrixi-page-main-pull-push-text')
      if (touchesRef.current.diffY >= threshold) {
        topIcon?.classList.add('lyrixi-page-main-pull-push-icon-down')
        if (topText)
          topText.innerHTML = LocaleUtil.locale(
            '释放立即刷新',
            'lyrixi_bb045b7b0ce191f0568fb4d0a9858b8d',
            undefined
          ) as string
      } else {
        topIcon?.classList.remove('lyrixi-page-main-pull-push-icon-down')
        if (topText)
          topText.innerHTML = LocaleUtil.locale(
            '下拉可以刷新',
            'lyrixi_76985db7270fb8bc2add09291b637964',
            undefined
          ) as string
      }
    }

    async function handleTouchEnd(e: React.TouchEvent<HTMLElement>) {
      if (touchStopPropagation) e.stopPropagation()
      if (isLoadingRef.current) return
      if (!touchesRef.current.isTop) return
      const topEl = topContainerRef.current
      if (!topEl) return

      topEl.style.webkitTransitionDuration = '150ms'

      if (touchesRef.current.diffY <= threshold) {
        topEl.style.height = '0'
      } else {
        const topIcon = topEl.querySelector?.('.lyrixi-page-main-pull-push-icon')
        const topText = topEl.querySelector?.('.lyrixi-page-main-pull-push-text')
        topEl.style.height = threshold + 'px'
        topIcon?.classList.remove('lyrixi-page-main-pull-push-icon-down')
        topIcon?.classList.add('lyrixi-page-main-pull-push-icon-loading')
        if (topText)
          topText.innerHTML = `${
            LocaleUtil.locale(
              '加载中',
              'lyrixi_f013ea9dcba3f5ca1278aa850931fec8',
              undefined
            ) as string
          }...`

        if (onTopRefresh) {
          isLoadingRef.current = true
          const isOk = await onTopRefresh()
          await topRefreshOk(topEl, isOk)
          isLoadingRef.current = false
        }
      }
    }

    async function handleScroll(e: React.UIEvent<HTMLElement>) {
      if (onScroll) onScroll(e)

      document.documentElement.classList.add(`lyrixi-${Device.os}-scrolling`)
      if (scrollThrottleRef.current) {
        window.clearTimeout(scrollThrottleRef.current)
      }
      scrollThrottleRef.current = setTimeout(() => {
        onScrollEnd?.(e)
        document.documentElement.classList.remove(`lyrixi-${Device.os}-scrolling`)
      }, 500)

      if (!onBottomRefresh || isLoadingRef.current) return
      if (isBottom(rootRef.current)) {
        isLoadingRef.current = true
        await onBottomRefresh()
        isLoadingRef.current = false
      }
    }

    return (
      <main
        id={id}
        ref={rootRef}
        style={style}
        className={(DOMUtil.classNames as (...args: unknown[]) => string)(
          'lyrixi-page-main',
          className
        )}
        onTouchStart={onTopRefresh ? handleTouchStart : undefined}
        onTouchMove={onTopRefresh ? handleTouchMove : undefined}
        onTouchEnd={onTopRefresh ? handleTouchEnd : undefined}
        onScroll={onScroll || onBottomRefresh ? handleScroll : undefined}
      >
        <TopContainer ref={topContainerRef} />
        {children}
        {safeArea === true && <SafeArea />}
      </main>
    )
  }
)
export default Main
