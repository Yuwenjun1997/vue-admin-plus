import { useMenuStore } from '@/layout/store/menu'
import { useTabsStore } from '@/layout/store/tabs'
import nProgress from 'nprogress'
import { Router } from 'vue-router'

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createProgressGuard(router)
  createMenuActiveGuard(router)
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
    tabsStore.addTab(to.meta)
  })
}
