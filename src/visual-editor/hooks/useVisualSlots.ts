import { storeToRefs } from 'pinia'
import { useVisualBoxStore } from '../store/visual-box'
import { VisualBlockSlotMap } from '../types'

export const useVisualSlots = () => {
  const { visualEditor } = storeToRefs(useVisualBoxStore())
  const { applyVisualEditor } = useVisualBoxStore()

  const add = () => {
    if (!visualEditor.value) return
    if (!visualEditor.value.createSlotHandler) return
    visualEditor.value.slots = visualEditor.value.slots || []
    visualEditor.value.slots.push(visualEditor.value.createSlotHandler())
    applyVisualEditor()
  }

  const remove = (index: number) => {
    if (!visualEditor.value) return
    visualEditor.value.slots?.splice(index, 1)
    applyVisualEditor()
  }

  const init = (slopMap: VisualBlockSlotMap) => {
    if (!visualEditor.value) return
    if (!visualEditor.value.createSlotHandler) return
    visualEditor.value.slots = Object.entries(slopMap).map(([_slotKey, slotValue]) => {
      // @ts-ignore
      const slot = visualEditor.value.createSlotHandler()
      Object.entries(slot).forEach(([key, value]) => {
        value.defaultValue = slotValue.props[key]
      })
      return slot
    })
  }

  return {
    add,
    remove,
    init,
  }
}
