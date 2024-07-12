import path from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import tsConfigPathsPlugin from 'vite-tsconfig-paths'

const tsConfigPaths = tsConfigPathsPlugin({
  projects: [path.resolve('tsconfig.json')],
})

export default defineConfig({
  main: {
    plugins: [tsConfigPaths, externalizeDepsPlugin()],
    publicDir: path.resolve('resources'),
    build: {
      rollupOptions: {
        output: {
          format: 'es',
        },
      },
    },
  },
  preload: {
    plugins: [tsConfigPaths, externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        output: {
          format: 'es',
        },
      },
    },
  },
  renderer: {
    define: {
      'process.platform': JSON.stringify(process.platform),
    },
    resolve: {
      alias: {
        '@renderer': path.resolve('src/renderer/src'),
      },
    },
    plugins: [tsConfigPaths, react()],
  },
})
