declare module 'react-native' {
  import type { ComponentType, CSSProperties, ReactNode, Ref } from 'react'

  export type StyleProp<T> = T | T[] | false | null | undefined
  export type ViewStyle = CSSProperties
  export type TextStyle = CSSProperties
  export type ImageStyle = CSSProperties

  export const View: ComponentType<any>
  export const Text: ComponentType<any>
  export const Pressable: ComponentType<any>
  export const ScrollView: ComponentType<any>
  export const Image: ComponentType<any>
  export const TextInput: ComponentType<any>
  export const StyleSheet: {
    create<T extends Record<string, ViewStyle | TextStyle>>(styles: T): T
    flatten(...styles: any[]): any
    absoluteFillObject: ViewStyle
  }
  export const Platform: { OS: string; select: (map: Record<string, any>) => any }
  export const Dimensions: { get: (key: string) => { width: number; height: number } }
  export const Animated: any
  export const Easing: any
  export const Linking: any
  export const AppState: any
  export const NativeModules: Record<string, any>
  export type NativeSyntheticEvent<T> = { nativeEvent: T }
  export type LayoutChangeEvent = NativeSyntheticEvent<{ layout: { x: number; y: number; width: number; height: number } }>
  export type GestureResponderEvent = any
  export function forwardRef<T, P = {}>(
    render: (props: P, ref: Ref<T>) => ReactNode,
  ): ComponentType<P & { ref?: Ref<T> }>
}
