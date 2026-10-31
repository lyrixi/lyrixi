import React from 'react'
import { AssetUtil } from 'lyrixi-mobile'

export default function AssetUtilDemo() {
  return (
    <>
      <div>
        {AssetUtil.getFileExtension(
          'https://lyrixi.github.io/lyrixi/assets/plugin/leaflet/js/leaflet.js'
        )}
      </div>
      <div>{AssetUtil.getFileExtension('leaflet.pdf')}</div>
      <div>
        {AssetUtil.getFileExtension(
          'https://lyrixi.github.io/lyrixi/assets/plugin/leaflet/js/leaflet.image'
        )}
      </div>
      <div>
        {AssetUtil.getFileExtension(
          'https://lyrixi.github.io/lyrixi/assets/plugin/leaflet/js/leaflet.'
        ) || 'No Extension'}
      </div>
      <div>{AssetUtil.getFileExtension('leaflet. a') || 'No Extension'}</div>
    </>
  )
}
