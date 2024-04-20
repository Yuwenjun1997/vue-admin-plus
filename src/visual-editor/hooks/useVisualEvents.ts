import { storeToRefs } from 'pinia'
import { useVisualBoxStore } from '../store/visual-box'
import { VisualEditorBlockData, VisualEventData } from '../types'
import { generateNanoid } from '../visual-editor.utils'
import { useVisualPages } from './useVisualPages'
import { useVisualRef } from './useVisualRef'
import { useVisualEventHook } from './useVisualEventHook'

export const useVisualEvents = () => {
  const { visualRefMap } = useVisualRef()
  const { currentBlock, visualStore } = storeToRefs(useVisualBoxStore())

  const router = useRouter()

  const add = (form: VisualEventData) => {
    form._vid = `event_${generateNanoid()}`
    currentBlock.value?.events[form.key]?.push({ ...form })
  }

  const remove = (method: VisualEventData) => {
    const index = currentBlock.value?.events[method.key]?.findIndex((item) => item._vid === method._vid)
    if (typeof index !== 'number' || index === -1) return
    currentBlock.value?.events[method.key]?.splice(index, 1)
  }

  const update = (form: VisualEventData) => {
    const index = currentBlock.value?.events[form.key]?.findIndex((item) => item._vid === form._vid)
    if (typeof index !== 'number' || index === -1) return
    currentBlock.value?.events[form.key]?.splice(index, 1, { ...form })
  }

  const { emitRouter } = useVisualEventHook()

  const callFuncs = (value: VisualEventData[], block: VisualEditorBlockData, ...events: any[]) => {
    const { getPage } = useVisualPages()
    const page = getPage(block)
    const _self = {
      _vid: block._vid,
      $block: block,
      $ref: visualRefMap[block._vid],
      $refs: visualRefMap,
      $events: events,
      $store: visualStore.value,
      $props: block.props,
      $pageStore: page?.store,
      $router: router,
    }
    value.forEach((item) => {
      if (item.custom) {
        item.methodToken && new Function(item.methodToken).call(_self, ...events)
      } else {
        if (item.eventName === 'routerEvent') {
          emitRouter(item.eventParams)
        }
      }
    })
  }

  function toCamelCase(eventName: string) {
    return eventName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  }

  const genEvents = (block: VisualEditorBlockData) => {
    return Object.entries(block.events || {}).reduce((prev: Record<string, Function>, [key, value]) => {
      // 将事件名转换为大驼峰命名
      // 例如：on-click 转换为 OnClick
      const eventName = toCamelCase(key)
      if (value.length) {
        prev[`on${eventName}`] = (...args: any[]) => callFuncs(value, block, ...args)
      }
      return prev
    }, {})
  }

  return {
    add,
    remove,
    update,
    callFuncs,
    genEvents,
  }
}
