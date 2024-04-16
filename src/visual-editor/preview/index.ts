import { createApp } from 'vue'
import App from './App.vue'
import { setupVant } from '@/plugins/vant'

export const preview = (el: HTMLElement) => {
  const app = createApp(App)

  app.config.globalProperties.$visual = {
    $http: () => {},
    $api: {
      // 这里可以放置预览时需要的接口
      // 例如：
      getUserInfo() {
        return { name: '张三' }
      },
    },
  }

  setupVant(app)
  app.mount(el)
}
