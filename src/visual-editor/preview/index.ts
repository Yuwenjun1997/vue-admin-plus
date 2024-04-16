import { createApp } from 'vue'
import App from './App.vue'
import { setupVant } from '@/plugins/vant'

export const preview = (el: HTMLElement) => {
  const app = createApp(App)
  setupVant(app)
  app.mount(el)
}
