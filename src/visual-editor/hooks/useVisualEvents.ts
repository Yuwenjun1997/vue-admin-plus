import { storeToRefs } from 'pinia'
import { useVisualBoxStore } from '../store/visual-box'
import { VisualEditorBlockData, VisualEventData } from '../types'
import { generateNanoid } from '../visual-editor.utils'
import { useVisualRef } from './useVisualRef'

export const useVisualEvents = () => {
  const { currentBlock } = storeToRefs(useVisualBoxStore())
  const { visualRefMap } = useVisualRef()

  const callFuncs = (value: VisualEventData[], block: VisualEditorBlockData, ...event: any[]) => {
    const _self = {
      _vid: block._vid,
      $block: block,
      $ref: visualRefMap[block._vid],
      $refs: visualRefMap,
      $event: event,
      $state: block.model,
    }
    value.forEach((item) => {
      if (item.custom) {
        item.methodToken && new Function(item.methodToken).call(_self, ...event)
      } else {
        item.eventValue && console.log('方法调用中', item.eventValue)
      }
    })
  }

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

  return {
    callFuncs,
    add,
    remove,
    update,
  }
}
