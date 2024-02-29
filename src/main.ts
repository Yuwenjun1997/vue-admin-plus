import { createApp } from 'vue'
import './plugins/element-ui'
import './plugins/nprogress'
import './styles/index.scss'
import Nprogress from 'nprogress'
import App from './App.vue'
import Loading from './Loading.vue'
import { createPinia } from 'pinia'
import router from './router/index'
import './permission'
import { sleep } from './utils'

async function bootstrap() {
  // 加载动画
  Nprogress.start()
  createApp(Loading).mount('#app')

  await sleep(500)

  // 应用渲染
  const app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.mount('#app')
}

bootstrap()
