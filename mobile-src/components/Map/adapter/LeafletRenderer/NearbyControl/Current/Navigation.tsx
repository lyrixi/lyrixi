import React, { useContext } from 'react'

import type { MapNearbyControlNavigationProps } from './Map.NearbyControl.Navigation.types'
import MapProviderContext from '../../../../components/Provider/MapProviderContext'

// 内库使用-start
import LocaleUtil from './../../../../../../utils/LocaleUtil'
import Icon from '../../../../../Icon'
import Icons from '../../../../../../icons'
// 内库使用-end

/* 测试使用-start
import { LocaleUtil, Icon, Icons } from 'lyrixi-mobile'
测试使用-end */

// 导航
function Navigation({ type, longitude, latitude, name, address }: MapNearbyControlNavigationProps) {
  const mapProviderContext = useContext(MapProviderContext)

  if (typeof longitude !== 'number' || typeof latitude !== 'number') return null
  return (
    <span
      className="lyrixi-map-navigation-button"
      onClick={() =>
        mapProviderContext?.openLocation({
          to: {
            type: type === 'gcj02' ? 'gcj02' : 'wgs84',
            longitude: Number(longitude),
            latitude: Number(latitude),
            name,
            address
          }
        })
      }
    >
      <Icon svg={Icons.Navigation} size="xxxs" className="lyrixi-map-navigation-button-icon" />
      <span className="lyrixi-map-navigation-button-text">
        {LocaleUtil.locale('导航', 'lyrixi_056f2d7df6e6b64625c3a2d27ce07b05')}
      </span>
    </span>
  )
}

export default Navigation
