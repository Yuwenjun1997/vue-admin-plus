import { createApp } from 'vue'
import './plugins/element-ui'
import './plugins/nprogress'
import './styles/index.scss'
import App from './App.vue'
import Loading from './Loading.vue'
import { setupStore } from './store'
import { router, setupRouter } from './router'
import { setupRouterGuard } from '@/router/guard'
import { sleep } from './utils'

async function bootstrap() {
  // 加载动画
  const loading = createApp(Loading)
  loading.mount('#app')

  await sleep(500)

  // 应用渲染
  const app = createApp(App)

  // 配置 store
  setupStore(app)

  // 配置路由
  setupRouter(app)

  // 路由守卫
  setupRouterGuard(router)

  loading.unmount()
  app.mount('#app')
}

bootstrap()
