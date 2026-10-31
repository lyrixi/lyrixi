export interface TooltipPosition {
  bottom: number | null
  top: number | null
  left: number | null
  right: number | null
}

export interface TooltipUpdatePositionParams {
  referenceElement?: HTMLElement | null
  parentElement?: HTMLElement | null
  animation?: string
  bottom?: string | number | null
  top?: string | number | null
  left?: string | number | null
  right?: string | number | null
  offset?: {
    top?: number
    bottom?: number
    left?: number
    right?: number
  }
}

export interface TooltipGetPositionByReferenceParams {
  referenceElement: HTMLElement | null
  animation: string
}

export interface TooltipGetRelativePositionParams {
  targetElement: HTMLElement
  parentElement: HTMLElement
  animation: string
}
