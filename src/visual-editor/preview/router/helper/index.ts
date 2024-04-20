import { router } from '..'
import { RouteRecordRaw } from 'vue-router'
import { VisualEditorPage } from '@/visual-editor/types'
import { NOT_FOUND, VIEW_COMPONENT } from '../constant'

/**
 * 生成路由
 * @param menus
 */
export function generateRoutes(menus: VisualEditorPage[]): RouteRecordRaw[] {
  return menus.map((menu) => {
    const route = {} as RouteRecordRaw
    route.path = `/:pageId${menu.path}`
    route.path = menu.path
    route.name = menu.pageId
    route.meta = { menuId: menu.pageId, title: menu.title }
    route.component = VIEW_COMPONENT
    return route
  })
}

/**
 * 添加全部路由
 * @param menus
 */
export function addAllRoutes(routes: RouteRecordRaw[]) {
  routes.forEach((route) => router.addRoute(route))
  router.addRoute({ path: '/404', name: '404', component: NOT_FOUND })
  router.addRoute({ path: '/:pathMatch(.*)*', redirect: '/404' })
}
