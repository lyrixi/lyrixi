import type { SVGProps } from 'react'

import { Flex, Icon } from 'lyrixi-mobile'

function LogoSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 72 72" fill="currentColor" aria-hidden {...props}>
      <g transform="translate(0, 8)">
        <path d="M22 40c0-8.284 6.716-15 15-15s15 6.716 15 15v2H22v-2zm15-19a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
      </g>
    </svg>
  )
}

function Logo() {
  return (
    <Flex justify="center" style={{ marginTop: 40 }}>
      <Icon
        svg={LogoSvg}
        size={72}
        color="default"
        variant="filled"
        style={{ borderRadius: '100%' }}
      />
    </Flex>
  )
}

export default Logo
