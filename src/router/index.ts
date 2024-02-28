import routes, { matchRoute } from './routes'
import { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import 'vue-router'

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

/**
 * 注册路由
 * @param routes
 */
export const addRoutes = (routes: RouteRecordRaw[]) => {
  routes.forEach((route) => {
    if (route.name && router.hasRoute(route.name)) return
    router.addRoute('Application', route)
  })
  // 全局拦截要最后添加
  router.addRoute('', matchRoute)
  console.log(router.getRoutes())
}

export default router
