import React from 'react'
import { AssetUtil } from 'lyrixi-mobile'

export default function LoadJsDemo() {
  function handleLoadJsByCallback() {
    void AssetUtil.loadRemoteJs(
      'https://lyrixi.github.io/lyrixi/assets/plugin/leaflet/js/leaflet.js',
      {
        id: 'leaflet-js',
        onSuccess: () => {
          alert('Js load succeeded')
        },
        onError: () => {
          alert('Js load failed')
        }
      }
    )
  }
  async function handleLoadJsByAsync() {
    const result: { status: string } = (await AssetUtil.loadRemoteJs(
      'https://lyrixi.github.io/lyrixi/assets/plugin/leaflet/js/leaflet.js',
      {
        id: 'leaflet-js'
      }
    )) as { status: string }
    if (result.status === 'success') {
      alert('Js load succeeded')
    } else {
      alert('Js load failed')
    }
  }
  return (
    <>
      <div onClick={handleLoadJsByCallback}>Load js by callback</div>
      <div onClick={handleLoadJsByAsync}>Load js by async</div>
    </>
  )
}
