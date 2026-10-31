import type { ComponentType, SVGProps } from 'react'

// 内库使用-start
import Icons from '../../../icons'
// 内库使用-end

export interface TreeDefaultAvatar {
  svg?: ComponentType<SVGProps<SVGSVGElement>>
  url?: string
}

function getParentDefaultAvatar(params: {
  defaultParentAvatarSvg?: ComponentType<SVGProps<SVGSVGElement>>
  defaultParentAvatarUrl?: string
}): TreeDefaultAvatar | undefined {
  const { defaultParentAvatarSvg, defaultParentAvatarUrl } = params
  if (defaultParentAvatarSvg === undefined && defaultParentAvatarUrl === undefined) {
    return undefined
  }
  if (defaultParentAvatarUrl === 'default') {
    return {
      svg: defaultParentAvatarSvg ?? Icons.FolderColor
    }
  }
  return {
    svg: defaultParentAvatarSvg,
    url: defaultParentAvatarUrl
  }
}

function getDefaultLeafAvatar(params: {
  defaultLeafAvatarSvg?: ComponentType<SVGProps<SVGSVGElement>>
  defaultLeafAvatarUrl?: string
}): TreeDefaultAvatar | undefined {
  const { defaultLeafAvatarSvg, defaultLeafAvatarUrl } = params
  if (defaultLeafAvatarSvg === undefined && defaultLeafAvatarUrl === undefined) {
    return undefined
  }
  if (defaultLeafAvatarUrl === 'default') {
    return {
      svg: defaultLeafAvatarSvg ?? Icons.AvatarFill
    }
  }
  return {
    svg: defaultLeafAvatarSvg,
    url: defaultLeafAvatarUrl
  }
}

const DefaultAvatar = {
  getParentDefaultAvatar,
  getDefaultLeafAvatar
}

export default DefaultAvatar
