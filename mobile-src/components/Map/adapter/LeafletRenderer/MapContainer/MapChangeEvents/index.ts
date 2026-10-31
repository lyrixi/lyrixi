import type { L } from '../../../../Map.leaflet.types'

import type {
  MapPoint,
  MapChangeAction,
  MapChangeActionType,
  MapChangeEvent
} from '../../../../types'

import getCenter from '../getCenter'

import type { MapChangeEventsHandlers } from './MapChangeEvents.types'

// 内库使用-start
import GeoUtil from './../../../../../../utils/GeoUtil'
import FunctionUtil from './../../../../../../utils/FunctionUtil'
import ValidatorUtil from './../../../../../../utils/ValidatorUtil'
// 内库使用-end

/* 测试使用-start
import { GeoUtil, ValidatorUtil } from 'lyrixi-mobile'
测试使用-end */

class MapChangeEvents {
  // 上次中心点与缩放级别
  previousCenter: MapPoint | null = null
  previousZoom: number = 0

  // 动作类型: programmatic | gesture
  actionType: MapChangeActionType = 'programmatic'
  // 事件处理函数
  handlers: MapChangeEventsHandlers = {}
  // 当前动作，用于判断moveend是否由拖动引起
  currentAction: 'drag' | 'zoom' | 'pan' | '' = ''

  throttledTriggerMapChange = FunctionUtil.throttle((lmap: L.Map, actions: MapChangeAction[]) => {
    const event = this.buildChangeEvent(lmap, actions)
    this.handlers.onMapChange?.(event)
  }, 1000)

  triggerMapChange(lmap: L.Map, actions: MapChangeAction[]) {
    this.throttledTriggerMapChange(lmap, actions)
  }

  // 构建地图变化事件
  buildChangeEvent(lmap: L.Map, actions: MapChangeAction[]): MapChangeEvent {
    const centerPoint = getCenter(lmap)
    return {
      actions,
      actionType: this.actionType,
      latitude: Number(centerPoint.latitude),
      longitude: Number(centerPoint.longitude),
      type: 'wgs84',
      zoom: Number(lmap.getZoom())
    }
  }

  initEvents(lmap: L.Map, handlers: MapChangeEventsHandlers) {
    this.handlers = handlers
    const mapContainerElement = lmap.getContainer()
    mapContainerElement.addEventListener(
      'wheel',
      () => {
        this.actionType = 'gesture'
      },
      { passive: true }
    )
    mapContainerElement.addEventListener(
      'touchstart',
      () => {
        this.actionType = 'gesture'
      },
      { passive: true }
    )

    // 用户手动拖动
    lmap.on('dragstart', () => {
      this.actionType = 'gesture'
      this.currentAction = 'drag'
      this.previousCenter = getCenter(lmap)
      this.previousZoom = lmap.getZoom()
    })

    // 用户手动缩放
    lmap.on('zoomstart', () => {
      if (this.actionType === 'gesture') {
        this.currentAction = 'zoom'
        this.previousCenter = getCenter(lmap)
        this.previousZoom = lmap.getZoom()
      }
    })

    // moveend 在惯性动画结束后才触发，dragend 只代表松手
    lmap.on('moveend', () => {
      if (!['drag', 'zoom', 'pan'].includes(this.currentAction)) {
        return
      }
      // 重置当前动作
      this.currentAction = ''

      let actions: MapChangeAction[] = []
      let currentCenter = getCenter(lmap)
      let currentZoom = lmap.getZoom()
      if (this.previousZoom !== currentZoom) {
        actions.push('zoom')
      }
      if (!GeoUtil.isSamePoint(this.previousCenter, currentCenter)) {
        actions.push('pan')
      }

      if (ValidatorUtil.isEmpty(actions)) {
        return
      }

      this.triggerMapChange(lmap, actions)
    })
  }
}

export default MapChangeEvents
