import '@/plugins/nprogress'
import './preview/styles/index.scss'
import { createApp } from 'vue'
import App from './Preview.vue'
import { setupVant } from '@/plugins/vant'
import { setupStore } from './store'
import { setupRouterGuard } from './preview/router/guard'
import { router, setupRouter } from './preview/router'

function bootstrap() {
  const app = createApp(App)

  // 注册全局组件
  setupVant(app)

  // 注册store
  setupStore(app)

  // 注册router
  setupRouter(app)

  // 路由守卫
  setupRouterGuard(router)

  // 准备就绪后挂载应用
  app.mount('#app')
}

bootstrap()
