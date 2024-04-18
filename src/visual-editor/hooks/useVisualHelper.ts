import { storeToRefs } from 'pinia'
import { useVisualBoxStore } from '../store/visual-box'
import { VisualEditorBlockData, VisualEventData } from '../types'
import { useVisualRef } from './useVisualRef'

export const useVisualHelper = () => {
  const { visualRefMap } = useVisualRef()
  const { visualStore } = storeToRefs(useVisualBoxStore())

  const callFuncs = (value: VisualEventData[], block: VisualEditorBlockData, ...event: any[]) => {
    const _self = {
      _vid: block._vid,
      $block: block,
      $ref: visualRefMap[block._vid],
      $refs: visualRefMap,
      $event: event,
      $state: block.model,
      $rootStore: visualStore.value,
      $store: block.store,
    }
    value.forEach((item) => {
      if (item.custom) {
        item.methodToken && new Function(item.methodToken).call(_self, ...event)
      } else {
        item.eventValue && console.log('方法调用中', item.eventValue)
      }
    })
  }

  const genEventMap = (block: VisualEditorBlockData) => {
    return Object.entries(block.events || {}).reduce((prev: Record<string, Function>, [key, value]) => {
      const eventName = key.charAt(0).toUpperCase() + key.slice(1) // 首字母大写
      if (value.length) {
        prev[`on${eventName}`] = (...args: any[]) => callFuncs(value, block, ...args)
      }
      return prev
    }, {})
  }

  return { callFuncs, genEventMap }
}
