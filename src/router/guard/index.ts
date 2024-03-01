import nProgress from 'nprogress'
import { Router } from 'vue-router'

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createProgressGuard(router)
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
