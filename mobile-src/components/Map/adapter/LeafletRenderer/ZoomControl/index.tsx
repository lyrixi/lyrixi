import React, { useContext, useImperativeHandle, forwardRef, useRef } from 'react'
import MapContainerContext from '../MapContainer/MapContainerContext'

import type { MapZoomControlProps, MapZoomControlRef } from '../../../types'

// 内库使用-start
import DOMUtil from './../../../../../utils/DOMUtil'
import Icon from '../../../../Icon'
import Icons from '../../../../../icons'
// 内库使用-end

// 缩放控件
const ZoomControl = forwardRef<MapZoomControlRef, MapZoomControlProps>(
  (
    {
      // Value & Display Value
      id,
      style,
      className,
      onZoomIn,
      onZoomOut
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null)
    const mapContainerContext = useContext(MapContainerContext)

    async function zoomOut() {
      if (!mapContainerContext) return
      const zoom = await mapContainerContext.zoomOut()
      onZoomOut?.(zoom)
    }

    async function zoomIn() {
      if (!mapContainerContext) return
      const zoom = await mapContainerContext.zoomIn()
      onZoomIn?.(zoom)
    }

    useImperativeHandle(ref, () => {
      return {
        get element() {
          return rootRef.current
        }
      }
    })

    return (
      <div
        id={id}
        ref={rootRef}
        style={style}
        className={DOMUtil.classNames('lyrixi-map-zoomControl', className)}
      >
        <div
          id={id ? `${id}-in` : undefined}
          className="lyrixi-map-zoomControl-in"
          onClick={zoomIn}
        >
          <Icon svg={Icons.Plus} size="xxxs" className="lyrixi-map-zoomControl-icon" />
        </div>

        <div
          id={id ? `${id}-out` : undefined}
          className="lyrixi-map-zoomControl-out"
          onClick={zoomOut}
        >
          <Icon svg={Icons.Minus} size="xxxs" className="lyrixi-map-zoomControl-icon" />
        </div>
      </div>
    )
  }
)

export default ZoomControl
