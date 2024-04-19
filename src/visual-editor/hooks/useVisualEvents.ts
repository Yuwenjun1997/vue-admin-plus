import { storeToRefs } from 'pinia'
import { useVisualBoxStore } from '../store/visual-box'
import { VisualEditorBlockData, VisualEventData } from '../types'
import { generateNanoid } from '../visual-editor.utils'
import { useVisualPages } from './useVisualPages'
import { useVisualRef } from './useVisualRef'

export const useVisualEvents = () => {
  const { visualRefMap } = useVisualRef()
  const { currentBlock, visualStore } = storeToRefs(useVisualBoxStore())

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

  const callFuncs = (value: VisualEventData[], block: VisualEditorBlockData, ...event: any[]) => {
    const { getPage } = useVisualPages()
    const page = getPage(block)
    const _self = {
      _vid: block._vid,
      $block: block,
      $ref: visualRefMap[block._vid],
      $refs: visualRefMap,
      $event: event,
      $store: visualStore.value,
      $props: block.props,
      $page: page?.store,
    }
    value.forEach((item) => {
      if (item.custom) {
        item.methodToken && new Function(item.methodToken).call(_self, ...event)
      } else {
        item.eventValue && console.log('方法调用中', item.eventValue)
      }
    })
  }

  const genEvents = (block: VisualEditorBlockData) => {
    return Object.entries(block.events || {}).reduce((prev: Record<string, Function>, [key, value]) => {
      const eventName = key.charAt(0).toUpperCase() + key.slice(1) // 首字母大写
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
