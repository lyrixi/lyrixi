import type { SVGProps } from 'react'

import { Flex, Icon, LocaleUtil, Toast } from 'lyrixi-mobile'

const locale = LocaleUtil.locale

function WeChatSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M8.5 6C5.46 6 3 8.01 3 10.54c0 1.45.78 2.73 2.01 3.57l-.51 1.86 2.14-1.07c.58.16 1.2.24 1.86.24 3.04 0 5.5-2.01 5.5-4.54S11.54 6 8.5 6zm-1.6 2.95c-.39 0-.71-.31-.71-.7 0-.39.32-.7.71-.7.39 0 .71.31.71.7 0 .39-.32.7-.71.7zm3.2 0c-.39 0-.71-.31-.71-.7 0-.39.32-.7.71-.7.39 0 .71.31.71.7 0 .39-.32.7-.71.7zM15.5 8c-2.67 0-4.84 1.76-4.84 3.93 0 2.17 2.17 3.93 4.84 3.93.56 0 1.1-.08 1.6-.23l1.84.92-.44-1.6c.95-.74 1.6-1.84 1.6-3.02C19.34 9.76 18.17 8 15.5 8zm-1.28 2.56c-.31 0-.56-.25-.56-.56 0-.31.25-.56.56-.56.31 0 .56.25.56.56 0 .31-.25.56-.56.56zm2.56 0c-.31 0-.56-.25-.56-.56 0-.31.25-.56.56-.56.31 0 .56.25.56.56 0 .31-.25.56-.56.56z" />
    </svg>
  )
}

function QqSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M12 4c-4.42 0-8 2.69-8 6 0 1.86 1.02 3.53 2.62 4.64L6 17l2.53-1.27c.97.27 2 .42 3.07.42 4.42 0 8-2.69 8-6s-3.58-6-8-6z" />
    </svg>
  )
}

const socialIconStyle = {
  width: 44,
  height: 44,
  padding: 4,
  borderRadius: '50%',
  color: '#fff'
}

function SocialButtons() {
  function handleWeChatLogin() {
    Toast.open({ content: String(locale('微信登录即将上线')) })
  }

  function handleQqLogin() {
    Toast.open({ content: String(locale('QQ 登录即将上线')) })
  }

  return (
    <Flex justify="center" align="center" gap={32} style={{ marginTop: 'auto', paddingTop: 32 }}>
      <Icon
        svg={WeChatSvg}
        size={22}
        style={{ ...socialIconStyle, background: '#07c160' }}
        onClick={handleWeChatLogin}
      />
      <Icon
        svg={QqSvg}
        size={22}
        style={{ ...socialIconStyle, background: '#12b7f5' }}
        onClick={handleQqLogin}
      />
    </Flex>
  )
}

export default SocialButtons
