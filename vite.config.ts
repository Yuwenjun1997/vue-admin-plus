import { defineConfig, mergeConfig } from 'vite'
import baseConfig from './build/base.config'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(
  mergeConfig(baseConfig, {
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, './index.html'),
          'visual-preview': path.resolve(__dirname, './visual-preview.html'),
        },
      },
    },
  })
)
