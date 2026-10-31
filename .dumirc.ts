import path from 'node:path'

import { defineConfig } from 'dumi'

import { MOBILE_ROOT, mobileResolve } from './config/mobile-root'
import { configureSrcSvgWebpack } from './scripts/configureSrcSvgWebpack'

const mobileSrc = path.join(MOBILE_ROOT, 'src')
const mobileNodeModules = path.join(MOBILE_ROOT, 'node_modules')

export default defineConfig({
  outputPath: 'docs',
  base: '/lyrixi/',
  publicPath: '/lyrixi/',
  favicons: ['/lyrixi/assets/images/favicon.ico'],
  logo: '/lyrixi/assets/images/logo.png',
  locales: [{ id: 'zh-CN', name: '中文' }],
  resolve: mobileResolve(),
  alias: {
    src: mobileSrc,
    'lyrixi-mobile': mobileSrc,
    'lyrixi-mobile/': `${mobileSrc}/`,
  },
  conventionRoutes: {
    exclude: [new RegExp('index/components/')],
  },
  themeConfig: {
    name: 'Lyrixi',
    nav: [
      { title: '指南', link: '/' },
      { title: '组件', link: '/components/install' },
      { title: '工具', link: '/utils' },
      { title: '模板', link: '/examples' },
    ],
    footer:
      'Copyright © Lyrixi · <a href="https://github.com/lyrixi/lyrixi-mobile" target="_blank" rel="noreferrer">lyrixi-mobile</a>',
    deviceWidth: 375,
    hd: { rules: [] },
    compact: false,
  },
  metas: [{ name: 'viewport', content: 'width=device-width,viewport-fit=cover' }],
  styles: [
    `
    :root {
      --lyrixi-brand: #35e6b6;
      --lyrixi-brand-hover: #60f8d0;
      --lyrixi-bg: #1a1a1a;
      --lyrixi-bg-elevated: #282828;
      --lyrixi-border: #3a3a3a;
      --lyrixi-text: #f8f8f8;
      --lyrixi-text-secondary: #989898;
      --dumi-primary-color: #35e6b6;
    }
    * { scrollbar-width: thin !important; }
    .dumi-default-header-content,
    .dumi-default-doc-layout > main {
      max-width: none !important;
    }
    .dumi-default-sidebar {
      width: 250px !important;
    }
    .dumi-default-header {
      background: var(--lyrixi-bg-elevated) !important;
      border-bottom: 1px solid var(--lyrixi-border) !important;
    }
    .dumi-default-header a,
    .dumi-default-header .dumi-default-logo {
      color: var(--lyrixi-text) !important;
    }
    .dumi-default-navbar > li > a.active,
    .dumi-default-navbar > li > a:hover {
      color: var(--lyrixi-brand) !important;
    }
    .dumi-default-previewer-editor-tip-btn {
      cursor: pointer !important;
    }
    .dumi-default-previewer-editor-tip-btn * {
      pointer-events: none;
    }
    .dumi-default-previewer-meta .dumi-default-source-code-editor-textarea {
      display: none;
    }
    .dumi-default-previewer-meta.active .dumi-default-source-code-editor-textarea {
      display: block;
      background: #fff;
      color: #000;
    }
  `,
  ],
  headScripts: [
    `window.onload = function () {
      var root = document.getElementById('root');
      if (!root) return;
      root.addEventListener('click', function (e) {
        var t = e.target;
        if (t && t.classList && t.classList.contains('dumi-default-previewer-editor-tip-btn')) {
          var meta = t.closest('.dumi-default-previewer-meta');
          if (meta) meta.classList.toggle('active');
        }
      }, false);
    };`,
  ],
  chainWebpack(memo) {
    memo.resolve.alias.set('src', mobileSrc)
    memo.resolve.modules.prepend(mobileNodeModules)
    configureSrcSvgWebpack(memo, MOBILE_ROOT)
  },
})
