import { createEventHook } from '@vueuse/core'
import { router } from '@/visual-editor/preview/router/index'

type RouterEvent = Record<string, any>

export const useVisualEventHook = () => {
  const routerHook = createEventHook<Record<string, any>>()

  const emitRouter = <T extends RouterEvent>(payload: T) => {
    routerHook.trigger(payload)
  }

  routerHook.on((payload) => {
    console.log(router.getRoutes())
    // router.push({ path: payload.path, query: payload.query })
    router.push({ path: payload.path })
    console.log('event paylod', payload)
  })

  return {
    emitRouter,
  }
}
