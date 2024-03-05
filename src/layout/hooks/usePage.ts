import { unref } from 'vue'
import { Router, useRouter } from 'vue-router'
import { REDIRECT_NAME } from '@/router/constant'

/**
 * @description: redo current page
 */
export const useRedo = (_router?: Router) => {
  function redo(): Promise<boolean> {
    const { replace, currentRoute } = _router || useRouter()
    const { name, fullPath, query } = unref(currentRoute.value)

    return new Promise((resolve) => {
      if (name === REDIRECT_NAME) {
        resolve(false)
        return
      }
      replace({
        name: REDIRECT_NAME,
        params: {
          path: fullPath,
        },
        query: {
          ...query,
        },
      }).then(() => resolve(true))
    })
  }
  return redo
}
