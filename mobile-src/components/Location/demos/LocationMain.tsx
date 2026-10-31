import React, { useState, useRef, useEffect, type ComponentRef } from 'react'
import { Page, Location, type LocationValue } from 'lyrixi-mobile'

export default function LocationMainDemo() {
  const mainRef = useRef<ComponentRef<typeof Location.Main> | null>(null)
  const [value, setValue] = useState<LocationValue | null>(null)

  useEffect(() => {
    // 延迟设置值
    setTimeout(() => {
      setValue({
        address: '江苏省南京市雨花台区玉兰路98号',
        value: '江苏省南京市雨花台区玉兰路98号',
        longitude: 118.7979252979065,
        latitude: 31.968667296242337,
        type: 'gcj02'
      })
    }, 5000)
  }, [])

  return (
    <Page>
      <Location.Main
        ref={mainRef}
        open="choose"
        style={{ height: '400px' }}
        autoLocation={false}
        mapConfig={{
          bmapKeys: {
            android: '',
            ios: '',
            web: ''
          },
          googleKeys: {
            android: '',
            ios: '',
            web: ''
          },
          amapKeys: {
            android: '',
            ios: '',
            web: ''
          },
          type: 'bmap'
        }}
        value={value}
        onChange={(val) => {
          console.log('修改:', val)
          setValue(val)
        }}
      />
    </Page>
  )
}
