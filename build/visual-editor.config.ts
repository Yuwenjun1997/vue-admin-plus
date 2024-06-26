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
            template: 'index.html',
            injectOptions: {
              data: {
                title: '可视化设计',
              },
            },
          },
          {
            filename: 'visual-preview.html',
            entry: 'src/visual-editor/preview.ts',
            template: 'visual-preview.html',
          },
        ],
      }),
    ],
  })
)
