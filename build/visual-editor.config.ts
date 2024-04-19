import { defineConfig, mergeConfig } from 'vite'
import baseConfig from './base.config'
import path from 'path'

const baseSrc = path.resolve(__dirname, '../')

// https://vitejs.dev/config/
export default defineConfig(
  mergeConfig(baseConfig, {
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(baseSrc, './visual-editor.html'),
          'visual-preview': path.resolve(baseSrc, './visual-preview.html'),
        },
      },
    },
  })
)
