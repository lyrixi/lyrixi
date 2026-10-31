import path from 'node:path'

import type Config from '@umijs/bundler-webpack/compiled/webpack-5-chain'

/** Same SVG handling as lyrixi-mobile (Icon / v2 icons). */
export function configureSrcSvgWebpack(memo: Config, mobileRoot: string) {
  const v2IconsDir = path.resolve(mobileRoot, 'src/library/v2/icons')
  const svgrLoader = require.resolve('@umijs/bundler-webpack/dist/loader/svgr')

  if (memo.module.rules.has('svgr')) {
    memo.module.rule('svgr').exclude.add(v2IconsDir)
  }
  if (memo.module.rules.has('svg')) {
    memo.module.rule('svg').exclude.add(v2IconsDir)
  }

  memo.module
    .rule('src-svg-component')
    .before('svgr')
    .test(/\.svg$/)
    .include.add(v2IconsDir)
    .end()
    .issuer(/\.[jt]sx?$/)
    .type('javascript/auto')
    .use('svgr-loader')
    .loader(svgrLoader)
    .options({
      exportType: 'named',
      namedExport: 'ReactComponent',
      svgo: false,
    })
}
