// 内库使用-start
import Icons from '../../icons'
import { ComponentType, SVGProps } from 'react'
// 内库使用-end

function getDefaultIconSvg(type: string): ComponentType<SVGProps<SVGSVGElement>> | null {
  switch (type) {
    case 'success':
      return Icons.CircleOk
    case 'info':
      return Icons.CircleInfo
    case 'warning':
      return Icons.CircleWarning
    case 'error':
      return Icons.CircleClose
    default:
      return null
  }
}

export default getDefaultIconSvg
