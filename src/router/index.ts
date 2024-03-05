import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { basicRoutes } from './routes'
import { addAllRoutes, generateRoutes, resetRouter } from './helper'
import { useMenuStore } from '@/layout/store/menu'

// 白名单应该包含基本静态路由
export const WHITE_NAME_LIST: string[] = []
export function getRouteNames(array: any[]) {
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name)
    getRouteNames(item.children || [])
  })
}
getRouteNames(basicRoutes)

// app router
// 创建一个可以被 Vue 应用程序使用的路由实例
export const router = createRouter({
  // 创建一个 hash 历史记录。
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  // 应该添加到路由的初始路由列表。
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// config router
// 配置路由器
export function setupRouter(app: App<Element>) {
  const menuStore = useMenuStore()
  resetRouter()
  addAllRoutes(generateRoutes(menuStore.rootMenus))
  app.use(router)
}
