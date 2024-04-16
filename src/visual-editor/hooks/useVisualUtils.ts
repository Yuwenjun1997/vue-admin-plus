import { useVisualBoxStore } from '@/visual-editor/store/visual-box'
import { storeToRefs } from 'pinia'
import { VisualEditorBlockData } from '../types'

export const useVisualUtils = () => {
  const { currentBlock } = storeToRefs(useVisualBoxStore())

  const isActive = (block: VisualEditorBlockData) => currentBlock.value && currentBlock.value._vid === block._vid

  const hasSlots = (block: VisualEditorBlockData) => Object.keys(block.slots).length > 0

  return {
    isActive,
    hasSlots,
  }
}
