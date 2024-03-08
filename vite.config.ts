import { resolve } from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { visualizer } from 'rollup-plugin-visualizer'
import markdown from './plugins/markdown'

// import fsRouter from './src/plugins/fs-router'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    markdown(),
    // fsRouter(),
    preact({
      prerender: {
        enabled: true,
        additionalPrerenderRoutes: ['/blog', '/not-found'],
        prerenderScript: resolve(process.cwd(), 'src', 'prerender.js'),
      },
    }),

    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: 'visualizer.html', // 分析图生成的文件名
      open: false, // 如果存在本地服务端口，将在打包后自动展示
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      external: ['three'],
      output: {
        paths: {
          three: 'https://unpkg.com/three@0.161.0/build/three.module.js',
        },
        manualChunks: {
          'lang-icon': ['@altenull/github-lang-to-icon'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
  assetsInclude: [`**/*.wasm`],
})
