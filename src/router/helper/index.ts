import { MenuOption } from '@/layout/types'
import { WHITE_NAME_LIST, router } from '..'
import { LAYOUT, PREV_ROUTES_KEY, VIEW_COMPONENT } from '../constant'
import { RouteRecordRaw } from 'vue-router'
import { getStorage } from '@/utils/storage'

const modules = import.meta.glob('@/views/**/*.vue')

/**
 * 路由组件路径替换
 * @/views/system/menu/edit.vue 转为 /src/views/system/menu/edit.vue
 * @param path
 */
const resolvePath = (path: string) => {
  return path.replace('@', '/src')
}

/**
 * 重置路由
 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

/**
 * 生成路由
 * @param menus
 */
export function generateRoutes(menus: MenuOption[]): RouteRecordRaw[] {
  return menus.map((menu) => {
    const route = {} as RouteRecordRaw
    route.path = menu.path
    route.name = menu.name
    route.meta = menu.meta
    route.redirect = menu.redirect
    if (menu.meta.layout) {
      route.component = LAYOUT
    } else if (menu.meta.component) {
      route.component = modules[resolvePath(menu.meta.component)]
    } else {
      route.component = VIEW_COMPONENT
    }
    if (menu.children) {
      route.children = generateRoutes(menu.children)
    }
    return route
  })
}
// export function generateRoutes(menus: MenuOption[]): RouteRecordRaw[] {
//   return menus.map((menu) => {
//     const route = {} as RouteRecordRaw
//     route.path = menu.path
//     route.name = menu.name
//     route.meta = menu.meta
//     route.redirect = menu.redirect
//     if (menu.meta.layout) {
//       route.component = LAYOUT
//     } else if (menu.meta.component) {
//       route.component = modules[resolvePath(menu.meta.component)]
//     }
//     return route
//   })
// }

/**
 * 添加全部路由
 * @param menus
 */
export function addAllRoutes(routes: RouteRecordRaw[]) {
  routes.forEach((route) => router.addRoute(route))
}

export function getPrevRoute(): RouteRecordRaw | null {
  return getStorage(PREV_ROUTES_KEY)
}
