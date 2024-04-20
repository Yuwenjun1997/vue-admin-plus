import { createEventHook } from '@vueuse/core'

type RouterEvent = Record<string, any>

export const useVisualEventHook = () => {
  const router = useRouter()

  const routerHook = createEventHook<Record<string, any>>()

  const emitRouter = <T extends RouterEvent>(payload: T) => {
    routerHook.trigger(payload)
  }

  routerHook.on((payload) => {
    console.log('payload', payload)
    router.push({ ...payload })
  })

  return {
    emitRouter,
  }
}
