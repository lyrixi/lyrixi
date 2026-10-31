import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import Footer from './Choose/Footer'
import Preview from './Preview'
import Choose from './Choose'

import type { LocationMainProps, LocationMainRef } from '../types'

// 内库使用-start
import DOMUtil from './../../../utils/DOMUtil'
// 内库使用-end

const Main = forwardRef<LocationMainRef, LocationMainProps>(
  (
    {
      // Value & Display Value
      value,
      cacheDuration,
      // Status
      open,
      // Value & Display Value
      autoLocation = true,
      // Status
      nearbyVisible,
      // Style
      className,
      style,
      // Value & Display Value
      id,
      mapConfig,
      getLocation,
      getAddress,
      // Events
      onChange,
      onOk,
      onClear
    },
    ref
  ) => {
    const mainRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => {
      return {
        mainElement: mainRef.current,
        getMainElement: () => mainRef.current
      }
    })

    return (
      <>
        <div
          ref={mainRef}
          id={id}
          style={style}
          className={DOMUtil.classNames('lyrixi-map-main', className)}
        >
          {open === 'preview' && <Preview value={value} mapConfig={mapConfig} />}

          {open === 'choose' && (
            <Choose
              value={value}
              cacheDuration={cacheDuration}
              autoLocation={autoLocation}
              nearbyVisible={nearbyVisible}
              mapConfig={mapConfig}
              getLocation={getLocation}
              getAddress={getAddress}
              onChange={(newValue) => {
                onChange?.(newValue)
              }}
            />
          )}
        </div>
        {(onOk || onClear) && open === 'choose' ? (
          <Footer
            onOk={
              onOk
                ? () => {
                    console.log('选择标注:')
                    onOk?.(value ?? null)
                  }
                : null
            }
            onClear={
              onClear
                ? () => {
                    console.log('清空标注:')
                    onOk?.(null)
                  }
                : null
            }
          />
        ) : null}
      </>
    )
  }
)

export default Main
