import { MenuOption } from '@/layout/types'
import { WHITE_NAME_LIST, router } from '..'
import { LAYOUT } from '../constant'

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

// add route
export function addRoute(menu: any) {
  if (!menu.meta.layout && !menu.meta.component) return
  const route = { ...menu, component: menu.meta.layout ? LAYOUT : () => import(menu.meta.component as string) }
  router.addRoute(route)
}

// add all routes
export function addAllRoutes(menus: MenuOption[]) {
  menus.forEach((menu) => (menu.component = menu.meta.layout ? LAYOUT : () => import(menu.meta.component as string)))
  console.log(menus)
}
