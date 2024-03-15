import { createApp } from 'vue'
import './plugins/element-ui'
import './plugins/nprogress'
import './styles/index.scss'
import App from './App.vue'
import Loading from './Loading.vue'
import { setupStore } from './store'
import { router, setupRouter } from './router'
import { setupRouterGuard } from '@/router/guard'
import { setupLayout } from './layout'
import { setupIconify } from './plugins/iconify'
import { setupVxeTable } from './plugins/vxe-table'
import { setupHighlight } from './plugins/highlight'
import { setupVisual } from './components/VisualComponents/index'
import { setupVueQuill } from './plugins/vue-quill'

async function bootstrap() {
  // 加载动画
  const loading = createApp(Loading)
  loading.mount('#app')

  // 应用渲染
  const app = createApp(App)

  setupVisual(app)

  setupIconify()

  setupVxeTable(app)

  setupHighlight(app)

  setupVueQuill(app)

  // 配置 store
  setupStore(app)

  // 初始化布局
  await setupLayout()

  // 配置路由
  setupRouter(app)

  // 路由守卫
  setupRouterGuard(router)

  loading.unmount()
  app.mount('#app')
}

bootstrap()
