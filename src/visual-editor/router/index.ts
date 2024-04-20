import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

// 路由配置
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/visual-editor/views/index.vue'),
    },
  ],
})

// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router)
}
