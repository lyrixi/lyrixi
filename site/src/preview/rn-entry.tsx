/**
 * Thin RN entry for docs preview.
 * Includes stubs for symbols referenced by curated demos but not rendered deeply.
 */
import type { ComponentType, ReactNode } from 'react'
import { View, Text as RNText } from 'react-native'

export { default as Icons } from '../../../../lyrixi-mobile-rn/src/icons'
export { default as Button } from '../../../../lyrixi-mobile-rn/src/components/Button'
export { default as Text } from '../../../../lyrixi-mobile-rn/src/components/Text'
export { default as Flex } from '../../../../lyrixi-mobile-rn/src/components/Flex'
export { default as Card } from '../../../../lyrixi-mobile-rn/src/components/Card'
export { default as Divider } from '../../../../lyrixi-mobile-rn/src/components/Divider'
export { default as Page } from '../../../../lyrixi-mobile-rn/src/components/Page'
export { default as Icon } from '../../../../lyrixi-mobile-rn/src/components/Icon'
export { default as SafeArea } from '../../../../lyrixi-mobile-rn/src/components/SafeArea'

/** Placeholder so demos that import NavBar still compile under RN-web. */
export function NavBar(props: { children?: ReactNode; title?: string }) {
  return (
    <View style={{ padding: 12, backgroundColor: '#111' }}>
      <RNText style={{ color: '#fff' }}>{props.title || 'NavBar'}</RNText>
      {props.children}
    </View>
  )
}

/** Bridge is native-only in the browser preview. */
export const Bridge = {
  call() {
    return Promise.resolve(null)
  },
  on() {
    return () => undefined
  },
}

export type ButtonColor = string
export type ButtonVariant = string

// Satisfy type-only re-exports some demos import.
export type { ComponentType }
