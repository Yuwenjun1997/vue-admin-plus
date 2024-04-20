import { defineConfig, mergeConfig } from 'vite'
import baseConfig from './base.config'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig(
  mergeConfig(baseConfig, {
    plugins: [
      createHtmlPlugin({
        minify: true,
        pages: [
          {
            filename: 'index.html',
            entry: 'src/visual-editor/main.ts',
            template: 'visual-editor.html',
          },
          {
            filename: 'visual-preview.html',
            entry: 'src/visual-preview/index.ts',
            template: 'visual-preview.html',
          },
        ],
      }),
    ],
  })
)
