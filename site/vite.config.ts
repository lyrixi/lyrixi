import path from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const mobileRoot = path.resolve(rootDir, '../lyrixi-mobile')

/**
 * Docs site build.
 * - JS/CSS chunks → docs/static/ (avoids clashing with external docs/assets/)
 * - Root `assets/` is copied to docs/assets/ by site/scripts/copy-assets.mjs
 */
export default defineConfig({
  root: __dirname,
  base: '/lyrixi/',
  publicDir: path.resolve(__dirname, 'public'),
  plugins: [
    react(),
    svgr({
      include: '**/*.svg',
      svgrOptions: {
        exportType: 'named',
        namedExport: 'ReactComponent',
        svgo: false,
      },
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: 'lyrixi-mobile', replacement: path.resolve(mobileRoot, 'src/index.ts') },
    ],
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        paths: [path.resolve(mobileRoot, 'src')],
      },
    },
  },
  server: {
    fs: {
      allow: [rootDir, mobileRoot],
    },
  },
  build: {
    outDir: path.resolve(rootDir, 'docs'),
    emptyOutDir: true,
    // Keep Vite hashed chunks out of docs/assets (reserved for external CDN-like assets).
    assetsDir: 'static',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        preview: path.resolve(__dirname, 'preview.html'),
      },
    },
  },
})
