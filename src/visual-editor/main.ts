import { createApp } from 'vue'
import '@/styles/index.scss'
import App from './App.vue'
import Loading from './Loading.vue'
import { setupIconify } from '@/plugins/iconify'
import { setupElementPlus } from '@/plugins/element-ui'
import { setupVant } from '@/plugins/vant'
import { setupStore } from './store'
import { setupLayout } from '@/layout'

async function bootstrap() {
  // 加载动画
  const loading = createApp(Loading)
  loading.mount('#app')

  // 应用渲染
  const app = createApp(App)

  setupIconify()

  setupElementPlus(app)

  setupVant(app)

  // 配置 store
  setupStore(app)

  // 初始化布局
  await setupLayout()

  loading.unmount()
  app.mount('#app')
}

bootstrap()
