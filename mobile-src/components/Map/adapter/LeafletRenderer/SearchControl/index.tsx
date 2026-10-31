import React, { forwardRef } from 'react'
import Page from './Page'

import type { MapSearchControlProps, MapSearchControlRef } from '../../../types'
import type { MapSearchBarExoticComponent } from './Map.SearchControl.SearchBar.types'

// 内库使用-start
import SearchBar from './../../../../ToolBar/Search'
import DOMUtil from './../../../../../utils/DOMUtil'
// 内库使用-end

/* 测试使用-start
import { ToolBar } from 'lyrixi-mobile'
测试使用-end */

const MapSearchBar = SearchBar as MapSearchBarExoticComponent

// 搜索
const SearchControl = forwardRef<MapSearchControlRef, MapSearchControlProps>(
  ({ onChange, style, className }, ref) => {
    const [open, setOpen] = React.useState(false)

    return (
      <>
        <MapSearchBar
          ref={ref}
          readOnly
          className={DOMUtil.classNames('lyrixi-map-searchControl-navigation', className)}
          style={style}
          onClick={() => {
            setOpen(!open)
          }}
        />

        <Page open={open} onClose={() => setOpen(false)} onChange={onChange} />
      </>
    )
  }
)

export default SearchControl
