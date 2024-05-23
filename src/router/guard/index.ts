import { useMenuStore } from '@/layout/store/menu'
import { useTabsStore } from '@/layout/store/tabs'
import { getStorage, setStorage } from '@/utils/storage'
import nProgress from 'nprogress'
import { Router } from 'vue-router'
import { PREV_ROUTES_KEY } from '../constant'
import netConfig from '@/config/net.config'
import { useUserStore } from '@/store/modules/user'

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createProgressGuard(router)
  createMenuActiveGuard(router)
  createHistoryGuard(router)
  createPermissionGuard(router)
}

/**
 * Hooks for handling page state
 */
// function createPageGuard(router: Router) {}

export function createProgressGuard(router: Router) {
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true
    }
    nProgress.start()
    return true
  })

  router.afterEach(async () => {
    nProgress.done()
    return true
  })
}

export function createMenuActiveGuard(router: Router) {
  const menuStore = useMenuStore()
  const tabsStore = useTabsStore()

  router.afterEach((to) => {
    menuStore.activeRootMenuKey = to.matched[0].meta.menuId
    menuStore.activeMenuKey = to.meta.menuId
    const menu = menuStore.getMenuByMenuId(to.meta.menuId)
    menu && tabsStore.addTab(to.meta)
  })
}

export function createHistoryGuard(router: Router) {
  router.afterEach((_to, from) => {
    setStorage(PREV_ROUTES_KEY, from)
  })
}

export function createPermissionGuard(router: Router) {
  const WHITE_ROUTE_NAME = ['Login', 'Redirect']

  const { login } = useUserStore()

  router.beforeEach(async (to) => {
    const token = getStorage(netConfig.tokenName)
    login(token)
    if (!token && !WHITE_ROUTE_NAME.includes(to.name as string)) {
      return { name: 'Login' }
    }
    return true
  })
}
