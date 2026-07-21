import { Button, Divider, Page, type ButtonColor, type ButtonVariant } from 'lyrixi-mobile-rn'
import { View } from 'react-native'

const themeColors = ['default', 'primary', 'info', 'warning', 'danger', 'success'] as const
const variants = ['solid', 'text', 'outlined', 'filled', 'dashed'] as const

/**
 * Simplified RN Button demo for react-native-web preview.
 * Avoids NavBar / Bridge dependencies from the full library demo.
 */
export default function ButtonDemo() {
  return (
    <Page style={{ backgroundColor: 'white' }}>
      <Page.Main>
        <Divider>variant × color</Divider>
        {themeColors.map((color) => (
          <View key={color} style={{ marginTop: 16 }}>
            <Divider>{color}</Divider>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {variants.map((variant) => (
                <Button
                  key={`${color}-${variant}`}
                  variant={variant as ButtonVariant}
                  color={color as ButtonColor}
                  radius="m"
                  style={{ margin: 8 }}
                >
                  {variant}
                </Button>
              ))}
            </View>
          </View>
        ))}
      </Page.Main>
    </Page>
  )
}
