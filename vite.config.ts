import { defineConfig, mergeConfig } from 'vite'
import baseConfig from './build/base.config'
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
            entry: 'src/main.ts',
            template: 'index.html',
            injectOptions: {
              data: {
                title: '中后台系统',
              },
            },
          },
          {
            filename: 'visual-editor.html',
            entry: 'src/visual-editor/preview.ts',
            template: 'visual-preview.html',
          },
        ],
      }),
    ],
  })
)
