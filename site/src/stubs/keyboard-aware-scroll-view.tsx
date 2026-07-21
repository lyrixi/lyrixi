import { forwardRef, type CSSProperties, type ReactNode } from 'react'

type Props = {
  children?: ReactNode
  style?: CSSProperties | CSSProperties[]
  [key: string]: unknown
}

/** ScrollView stand-in for keyboard-aware wrapper used by RN Page. */
const KeyboardAwareScrollView = forwardRef<HTMLDivElement, Props>(function KeyboardAwareScrollView(
  { children, style, ...rest },
  ref,
) {
  const flat = Array.isArray(style) ? Object.assign({}, ...style.filter(Boolean)) : style
  return (
    <div ref={ref} style={{ overflow: 'auto', height: '100%', ...flat }} {...rest}>
      {children}
    </div>
  )
})

export { KeyboardAwareScrollView }
export default KeyboardAwareScrollView
