import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueSetupExtend from 'vite-plugin-vue-setup-extend' // 引入插件

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@/': `${pathSrc}/`,
      '~/': `${pathSrc}/`,
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [
        ElementPlusResolver(), // Auto import icon components
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
    }),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
    vueSetupExtend(),
  ],
})
