import type { L } from '../../../../Map.leaflet.types'
import type { MapMarkerIcon } from '../../../../types'

function isMapMarkerIcon(icon: unknown): icon is MapMarkerIcon {
  if (icon === null || typeof icon !== 'object') return false
  const value = icon as Record<string, unknown>
  return typeof value.width === 'number' && typeof value.height === 'number'
}

function createMarkerDivIcon(icon: unknown): L.Icon | L.DivIcon | null {
  if (!window.L?.divIcon || !isMapMarkerIcon(icon)) return null

  const {
    backgroundColor,
    backgroundImage,
    borderColor,
    borderRadius,
    borderWidth,
    color,
    fontSize,
    fontWeight,
    height,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    text,
    width
  } = icon

  const hasBorder = borderWidth !== undefined || !!borderColor

  if (backgroundImage && !text && !backgroundColor && !hasBorder && window.L.icon) {
    return window.L.icon({
      iconUrl: backgroundImage,
      iconRetinaUrl: backgroundImage,
      iconAnchor: [width / 2, height],
      iconSize: [width, height]
    })
  }

  const element = document.createElement('div')
  element.textContent = text || ''
  element.style.alignItems = 'center'
  element.style.backgroundColor = backgroundColor || ''
  element.style.backgroundImage = backgroundImage ? `url(${JSON.stringify(backgroundImage)})` : ''
  element.style.backgroundPosition = 'center'
  element.style.backgroundRepeat = 'no-repeat'
  element.style.backgroundSize = 'contain'
  if (borderWidth !== undefined) {
    element.style.borderWidth = `${borderWidth}px`
  }
  if (borderColor) {
    element.style.borderColor = borderColor
  }
  if (hasBorder) {
    element.style.borderStyle = 'solid'
  }
  element.style.borderRadius = borderRadius === undefined ? '' : `${borderRadius}px`
  if (shadowColor) {
    const offsetX = shadowOffset?.width ?? 0
    const offsetY = shadowOffset?.height ?? 0
    const blur = shadowRadius ?? 0
    let shadowColorValue = shadowColor
    if (shadowOpacity !== undefined && shadowColor.startsWith('#')) {
      const hex =
        shadowColor.length === 4
          ? shadowColor
              .slice(1)
              .split('')
              .map((char) => char + char)
              .join('')
          : shadowColor.slice(1)
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      shadowColorValue = `rgba(${r}, ${g}, ${b}, ${shadowOpacity})`
    }
    element.style.boxShadow = `${offsetX}px ${offsetY}px ${blur}px ${shadowColorValue}`
  }
  element.style.color = color ?? '#000'
  element.style.display = 'flex'
  element.style.flexDirection = 'column'
  element.style.fontSize = fontSize === undefined ? '' : `${fontSize}px`
  element.style.fontWeight = fontWeight === undefined ? '' : String(fontWeight)
  element.style.height = `${height}px`
  element.style.justifyContent = 'center'
  element.style.width = `${width}px`

  return window.L.divIcon({
    className: '',
    html: element,
    iconAnchor: [width / 2, height / 2],
    iconSize: [width, height]
  })
}

export default createMarkerDivIcon
export { isMapMarkerIcon }
