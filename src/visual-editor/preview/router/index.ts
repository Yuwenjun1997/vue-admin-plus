import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { addAllRoutes, generateRoutes } from './helper'

// 路由配置
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [],
})

// 配置路由器
export function setupRouter(app: App<Element>) {
  const { visualPages } = useVisualBoxStore()
  const defaultPage = visualPages.find((item) => item.isDefault)
  router.addRoute({ path: '/', redirect: defaultPage?.path || '/404' })
  addAllRoutes(generateRoutes(visualPages))
  app.use(router)
}
